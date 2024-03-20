const { yoctosToNear } = VM.require("potlock.near/widget/utils") || { yoctosToNear: () => "" };
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetDonationsForDonor: () => {},
};

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    asyncGetDonationsForDonor: () => {},
    getContractId: () => "",
  }));

DonateSDK = DonateSDK({ env: props.env });

const DONATION_CONTRACT_ID = DonateSDK.getContractId();

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
Big.PE = 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
  width: 380px;
  //   background: white;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

const CurrencyHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  background: #f0f0f0;
`;

const CurrencyHeaderText = styled.div`
  color: #7b7b7b;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  word-wrap: break-word;
`;

const BreakdownItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const BreakdownItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  gap: 8px;
`;

const BreakdownItemRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BreakdownItemText = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
`;

const CurrencyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-top: 1px #7b7b7b solid;
`;

const TotalText = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

const ErrorText = styled.div`
  color: #dd3345;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  width: 100%;
  text-align: center;
`;

const MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT = 0.1;

const [tokens, amountsByFt, totalAmount, donationTooSmall] = useMemo(() => {
  const tokens = {};
  const amountsByFt = {};
  let donationTooSmall = false;
  Object.entries(props.cart || {}).forEach(([projectId, { token, amount }]) => {
    const ft = token.text;
    if (!amountsByFt[ft]) amountsByFt[ft] = 0;
    amountsByFt[ft] += parseFloat(amount || 0);
    if (amountsByFt[ft] < MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT) donationTooSmall = true;
    tokens[ft] = token;
  });
  const totalAmount = Object.values(amountsByFt).reduce((acc, amount) => acc + amount, 0);
  return [tokens, amountsByFt, totalAmount, donationTooSmall];
}, [props]);

// console.log("amountsByFt: ", amountsByFt);
// console.log("tokens: ", tokens);

const handleDonate = () => {
  const transactions = [];
  let potIdContained;

  Object.entries(props.cart).forEach(([projectId, { token, amount, referrerId, note, potId }]) => {
    const isFtDonation = token.text != "NEAR";
    const amountIndivisible = Big(parseFloat(amount)).mul(
      Big(10).pow(isFtDonation ? token.decimals : 24)
    );
    const args = {};
    if (isFtDonation) {
      args.receiver_id = DONATION_CONTRACT_ID;
      args.amount = amountIndivisible.toString();
      args.memo = JSON.stringify({
        recipient_id: projectId,
        referrer_id: referrerId || null,
        bypass_protocol_fee: false,
        message: note || null,
      });
    } else {
      // pot & generic contract args
      args.project_id = projectId;
      args.referrer_id = referrerId;
      args.message = note;
      // donation contract args
      args.recipient_id = projectId;
      // other
      potIdContained = potId;
    }
    transactions.push({
      contractName: isFtDonation ? token.id : potId ?? DONATION_CONTRACT_ID,
      methodName: isFtDonation ? "ft_transfer_call" : "donate",
      args,
      deposit: isFtDonation ? "1" : amountIndivisible.toString(),
      gas: "300000000000000",
    });
  });

  // if cart contains a non-NEAR token, add storage_deposit to beginning of transactions
  // for each non-NEAR donation: 0.008 base amount for donation storage + 0.0001 NEAR per character in message
  if (Object.keys(amountsByFt).some((ft) => ft !== "NEAR")) {
    const requiredDepositFloat = transactions.reduce((acc, { methodName, args }) => {
      if (methodName === "donate") return acc;
      const baseAmount = 0.008;
      const argsAmount = (args.message.length || 0) * 0.0001;
      return acc + baseAmount + argsAmount;
    }, 0);
    transactions.unshift({
      contractName: DONATION_CONTRACT_ID,
      methodName: "storage_deposit",
      args: {},
      deposit: Big(requiredDepositFloat).mul(Big(10).pow(24)),
      gas: "100000000000000",
    });
  }

  const now = Date.now();
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <-------- EXTENSION WALLET HANDLING -------->
  // poll for updates
  // TODO: update this to also poll Pot contract
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    (potIdContained
      ? PotSDK.asyncGetDonationsForDonor(potIdContained, context.accountId)
      : DonateSDK.asyncGetDonationsForDonor(context.accountId)
    ).then((donations) => {
      // for each project, there should be a matching donation that occurred since now()
      const foundDonations = [];
      // go through donations, add to foundDonations list
      for (const donation of donations) {
        const { recipient_id, project_id, donated_at_ms, donated_at, total_amount } = donation;
        const matchingCartItem = props.cart[project_id || recipient_id];
        if (matchingCartItem && (donated_at_ms > now || donated_at > now)) {
          foundDonations.push(donation);
        }
      }
      if (foundDonations.length) {
        // donations found
        // display success message & clear cart
        clearInterval(pollId);
        props.updateSuccessfulDonationRecipientId(foundDonations[0].recipient_id);
        props.setCheckoutSuccess(true);
        props.clearCart();
      }
    });
  }, pollIntervalMs);
};
// console.log("props", props);

// console.log("supported fts: ", SUPPORTED_FTS);
// console.log("props.cart: ", props.cart);
// console.log("props.projectId: ", props.projectId);
return (
  <Container>
    <Title>Breakdown summary</Title>
    <CurrencyHeader>
      <CurrencyHeaderText>Currency</CurrencyHeaderText>
      <CurrencyHeaderText>Amount</CurrencyHeaderText>
    </CurrencyHeader>
    {Object.entries(amountsByFt).map(([ft, amount]) => {
      const amountFloat = parseFloat(amount || 0);
      return (
        <BreakdownItemContainer>
          <BreakdownItemLeft>
            {ft == "NEAR" ? (
              <CurrencyIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
            ) : (
              <CurrencyIcon src={tokens[ft].icon} />
            )}
            <BreakdownItemText>{tokens[ft].text}</BreakdownItemText>
          </BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownItemText>{amountFloat.toFixed(2)}</BreakdownItemText>
          </BreakdownItemRight>
        </BreakdownItemContainer>
      );
    })}
    {Object.keys(amountsByFt).length <= 1 &&
      amountsByFt.NEAR && ( // only show total if NEAR is the only currency being donated (otherwise it is inaccurate and confusing)
        <TotalContainer>
          <TotalText>Total</TotalText>
          <TotalText>{totalAmount.toFixed(2)}</TotalText>
        </TotalContainer>
      )}
    <Widget
      src={`${ownerId}/widget/Components.Button`}
      props={{
        type: "primary",
        text: `Process Donation`,
        disabled: !Object.keys(props.cart).length || donationTooSmall || !context.accountId,
        onClick: handleDonate,
        style: {
          width: "100%",
        },
      }}
    />
    {donationTooSmall && (
      <ErrorText>
        Minimum required donation per project is {MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT} N
      </ErrorText>
    )}
    {!context.accountId && <ErrorText>Please sign in to donate</ErrorText>}
  </Container>
);
