const ownerId = "potlock.near";
const donationContractId = "donate.potlock.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
Big.PE = 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 380px;
  //   background: white;
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

// TODO: move this to state to handle selected FT once we support multiple FTs
// TODO: note this is duplicated in Cart.CheckoutItem
const SUPPORTED_FTS = {
  NEAR: {
    iconUrl: IPFS_BASE_URL + "bafkreicwkm5y7ojxnnfnmuqcs6ykftq2jvzg6nfeqznzbhctgl4w3n6eja",
    toIndivisible: (amount) => new Big(amount).mul(new Big(10).pow(24)),
    fromIndivisible: (amount) => amount / 10e24,
  },
};

const MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT = 0.1;

const [amountsByFt, totalAmount, donationTooSmall] = useMemo(() => {
  const amountsByFt = {};
  let donationTooSmall = false;
  Object.entries(props.cart).forEach(([projectId, { ft, amount }]) => {
    if (!amountsByFt[ft]) amountsByFt[ft] = 0;
    amountsByFt[ft] += parseFloat(amount || 0);
    if (amountsByFt[ft] < MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT) donationTooSmall = true;
  });
  const totalAmount = Object.values(amountsByFt).reduce((acc, amount) => acc + amount, 0);
  return [amountsByFt, totalAmount, donationTooSmall];
}, [props]);

// TODO: handle successful transaction
// https://everything.dev/potlock.near/widget/Index?tab=cart&transactionHashes=8pgCqfpsFe2PZsTeugM3BnqhtpUmmrPXy6v4XgJcQ6TW

const handleDonate = () => {
  // const transactions = [
  //     // set data on social.near
  //     {
  //       contractName: "social.near",
  //       methodName: "set",
  //       deposit: Big(JSON.stringify(socialArgs).length * 0.00003).mul(Big(10).pow(24)),
  //       args: socialArgs,
  //     },
  //   ];
  //   if (!props.edit) {
  //     transactions.push(
  //       // register project on potlock
  //       {
  //         contractName: registryId,
  //         methodName: "register",
  //         deposit: Big(0.05).mul(Big(10).pow(24)),
  //         args: potlockRegistryArgs,
  //       }
  //     );
  //     if (!existingHorizonProject) {
  //       transactions.push(
  //         // register on NEAR Horizon
  //         {
  //           contractName: horizonId,
  //           methodName: "add_project",
  //           args: horizonArgs,
  //         }
  //       );
  //     }
  //   }
  const transactions = [];
  Object.entries(props.cart).forEach(([projectId, { ft, amount, referrerId }]) => {
    const amountFloat = parseFloat(amount || 0);
    const amountIndivisible = SUPPORTED_FTS[ft].toIndivisible(amountFloat);
    const args = { recipient_id: projectId };
    if (referrerId) args.referrer_id = referrerId;
    transactions.push({
      contractName: donationContractId,
      methodName: "donate",
      args,
      deposit: amountIndivisible.toString(),
    });
  });
  Near.call(transactions);
};

return (
  <Container>
    <Title>Breakdown summary</Title>
    <CurrencyHeader>
      <CurrencyHeaderText>Currency</CurrencyHeaderText>
      <CurrencyHeaderText>{props.nearToUsd ? "USD" : "NEAR"}</CurrencyHeaderText>
    </CurrencyHeader>
    {Object.entries(amountsByFt).map(([ft, amount]) => {
      const amountFloat = parseFloat(amount || 0);
      return (
        <BreakdownItemContainer>
          <BreakdownItemLeft>
            <CurrencyIcon src={SUPPORTED_FTS[ft].iconUrl} />
            <BreakdownItemText>{amountFloat.toFixed(2)}</BreakdownItemText>
          </BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownItemText>
              {props.nearToUsd
                ? `$${(amountFloat * props.nearToUsd).toFixed(2)}`
                : `${amountFloat.toFixed(2)} N`}
            </BreakdownItemText>
          </BreakdownItemRight>
        </BreakdownItemContainer>
      );
    })}
    <TotalContainer>
      <TotalText>Total</TotalText>
      <TotalText>
        {props.nearToUsd
          ? `$${(totalAmount * props.nearToUsd).toFixed(2)}`
          : `${totalAmount.toFixed(2)} N`}
      </TotalText>
    </TotalContainer>
    <Widget
      src={`${ownerId}/widget/Buttons.ActionButton`}
      props={{
        type: "primary",
        // text: `Donate $${(totalAmount * props.nearToUsd || 0).toFixed(2)}`,
        text: `Donate ${
          props.nearToUsd
            ? `$${(totalAmount * props.nearToUsd).toFixed(2)}`
            : `${totalAmount.toFixed(2)} N`
        }`,
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
