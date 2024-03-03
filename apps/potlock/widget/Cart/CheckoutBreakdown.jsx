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
  }));

DonateSDK = DonateSDK({ env: props.env });

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

const [amountsByFt, totalAmount, donationTooSmall] = useMemo(() => {
  const amountsByFt = {};
  let donationTooSmall = false;
  Object.entries(props.cart || {}).forEach(([projectId, { ft, amount }]) => {
    if (!amountsByFt[ft]) amountsByFt[ft] = 0;
    amountsByFt[ft] += parseFloat(amount || 0);
    if (amountsByFt[ft] < MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT) donationTooSmall = true;
  });
  const totalAmount = Object.values(amountsByFt).reduce((acc, amount) => acc + amount, 0);
  return [amountsByFt, totalAmount, donationTooSmall];
}, [props]);

const handleDonate = () => {
  const transactions = [];
  let potIdContained;

  Object.entries(props.cart).forEach(([projectId, { ft, amount, referrerId, note, potId }]) => {
    const amountFloat = 0;
    if (ft == "NEAR") {
      amountFloat = parseFloat(amount || 0);
    } else {
      amountFloat = parseFloat((amount / props.cart[props.projectId]?.price).toFixed(2) || 0);
    }
    const amountIndivisible = SUPPORTED_FTS[ft].toIndivisible(amountFloat);
    const donateContractArgs = {};
    const potContractArgs = {};
    if (potId) {
      potContractArgs.project_id = projectId;
      potContractArgs.referrer_id = referrerId;
      potIdContained = potId;
    } else {
      donateContractArgs.recipient_id = projectId;
      donateContractArgs.referrer_id = referrerId;
      donateContractArgs.message = note;
    }
    transactions.push({
      contractName: potId ?? DONATION_CONTRACT_ID,
      methodName: "donate",
      args: potId ? potContractArgs : donateContractArgs,
      deposit: amountIndivisible.toString(),
      gas: "300000000000000",
    });
  });

  const now = Date.now();
  Near.call(transactions);
  console.log("props.cart: ", props.cart);
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
      console.log("donations: ", donations);
      for (const donation of donations) {
        const { recipient_id, project_id, donated_at_ms, donated_at, total_amount } = donation;
        const matchingCartItem = props.cart[project_id || recipient_id];
        if (matchingCartItem && (donated_at_ms > now || donated_at > now)) {
          foundDonations.push(donation);
        }
      }
      console.log("foundDonations: ", foundDonations);
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
return (
  <Container>
    <Title>Breakdown summary</Title>
    <CurrencyHeader>
      <CurrencyHeaderText>Currency</CurrencyHeaderText>
      <CurrencyHeaderText>
        {props.cart[props.projectId]?.ft == "USD" ? "USD" : "NEAR"}
      </CurrencyHeaderText>
    </CurrencyHeader>
    {Object.entries(amountsByFt).map(([ft, amount]) => {
      const amountFloat = parseFloat(amount || 0);
      return (
        <BreakdownItemContainer>
          <BreakdownItemLeft>
            {props.cart[props.projectId]?.ft == "NEAR" ? (
              <CurrencyIcon src={SUPPORTED_FTS[ft].iconUrl} />
            ) : (
              "$"
            )}
            <BreakdownItemText>{amountFloat.toFixed(2)}</BreakdownItemText>
          </BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownItemText>{amountFloat.toFixed(2)} N</BreakdownItemText>
          </BreakdownItemRight>
        </BreakdownItemContainer>
      );
    })}
    <TotalContainer>
      <TotalText>Total</TotalText>
      <TotalText>{totalAmount.toFixed(2)} N</TotalText>
    </TotalContainer>
    <Widget
      src={`${ownerId}/widget/Components.Button`}
      props={{
        type: "primary",
        text: `Donate ${`${totalAmount.toFixed(2)} N`}`,
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
