const { ownerId, potId, MAX_DONATION_MESSAGE_LENGTH, formatDate } = props;

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

Big.PE = 100;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 80px;
  gap: 40px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  word-wrap: break-word;
  font-family: "Lora";

  ${loraCss}
`;

const Description = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const ColumnRightSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 24px 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const H2 = styled.div`
  color: #292929;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

const H3 = styled.div`
  color: #7b7b7b;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const Time = styled.span`
  color: #292929;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const StatusText = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
  margin-left: 12px;
`;

const ModalTitle = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;

State.init({
  isMatchingPoolModalOpen: false,
  matchingPoolDonationAmountNear: "",
  matchingPoolDonationAmountNearError: "",
  matchingPoolDonationMessage: "",
  matchingPoolDonationMessageError: "",
});

// console.log("props in header: ", props);
const potDetail = Near.view(potId, "get_config", {});

if (!potDetail) return "";

console.log("pot config: ", potDetail);

const {
  owner,
  admins,
  chef,
  pot_name,
  pot_description,
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
  min_matching_pool_donation_amount,
  base_currency,
  matching_pool_balance,
  registry_provider,
  cooldown_end_ms,
  all_paid_out,
} = potDetail;

const minmatchingPoolDonationAmountNear = props.SUPPORTED_FTS[
  base_currency.toUpperCase()
].fromIndivisible(min_matching_pool_donation_amount);

const now = Date.now();
const applicationOpen = now >= application_start_ms && now < application_end_ms;
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;
const publicRoundClosed = now >= public_round_end_ms;
const userIsAdminOrGreater = admins.includes(context.accountId) || owner === context.accountId;
const userIsChefOrGreater = userIsAdminOrGreater || chef === context.accountId;

const canPayoutsBeSet = publicRoundClosed && userIsChefOrGreater && !cooldown_end_ms;
const canPayoutsBeProcessed =
  publicRoundClosed && userIsAdminOrGreater && now >= cooldown_end_ms && !all_paid_out;
const cooldownPeriodInProgress = publicRoundClosed && now < cooldown_end_ms;
const potComplete = all_paid_out;

const existingApplication = Near.view(potId, "get_application_by_project_id", {
  project_id: context.accountId,
});

const canApply = applicationOpen && !existingApplication && !userIsChefOrGreater;

// const publicRoundOpen = true;

const daysUntil = (timestamp) => {
  const now = new Date();
  const futureDate = new Date(timestamp);
  const differenceInTime = futureDate - now;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} to go`;
};

const handleFundMatchingPool = () => {
  State.update({ isMatchingPoolModalOpen: true });
};

const handleApplyToPot = () => {
  props.setApplicationModalOpen(true);
};

const totalMatchingPoolAmount =
  props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(matching_pool_balance);

const handleMatchingPoolDonation = () => {
  const { matchingPoolDonationAmountNear } = state;
  // TODO: implement
  const args = {
    message: state.matchingPoolDonationMessage,
    matching_pool: true,
    // TODO: ADD REFERRER ID
  };
  // const deposit = Big(JSON.stringify(args).length * 0.00003).plus(Big("10000000000000000000000")); // add extra 0.01 NEAR as buffer
  const amountFloat = parseFloat(matchingPoolDonationAmountNear || 0);
  if (!amountFloat) {
    State.update({ matchingPoolDonationAmountNearError: "Invalid amount" });
    return;
  }
  const amountIndivisible =
    props.SUPPORTED_FTS[base_currency.toUpperCase()].toIndivisible(amountFloat);
  const transactions = [
    {
      contractName: potId,
      methodName: "donate",
      deposit: amountIndivisible,
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ----> // TODO: implement
};

const handleProcessPayouts = () => {
  // TODO: implement admin_process_payouts
  const args = {};
  const transactions = [
    {
      contractName: potId,
      methodName: "admin_process_payouts",
      deposit: "0",
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ----> // TODO: implement
};

return (
  <Container>
    <Column style={{ gap: "48px" }}>
      <Title>{pot_name}</Title>
      <Description>{pot_description}</Description>
    </Column>
    <Column>
      <ColumnRightSegment
        style={{ borderTop: "1px #7B7B7B solid", borderBottom: "1px #7B7B7B solid" }}
      >
        <Row style={{ gap: "8px" }}>
          <H2>{`${totalMatchingPoolAmount} ${base_currency.toUpperCase()} `}</H2>
          <Description>Matching funds available</Description>
        </Row>
      </ColumnRightSegment>
      <ColumnRightSegment>
        {applicationOpen && (
          <>
            <Row
              style={{
                // marginTop: "24px",
                marginBottom: "8px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Widget
                  src={`${ownerId}/widget/Components.Indicator`}
                  props={{
                    colorOuter: "#CAFDF3",
                    colorInner: "#33DDCB",
                  }}
                />
                <StatusText style={{ color: "#0B7A74" }}>All applications are open</StatusText>
              </Row>
              <StatusText style={{ color: "#292929" }}>{daysUntil(application_end_ms)}</StatusText>
            </Row>
            <H3>
              Application starts on <Time>{formatDate(application_start_ms)}</Time> and ends on{" "}
              <Time>{formatDate(application_end_ms)}</Time>
            </H3>
          </>
        )}
        {publicRoundOpen && (
          <>
            <Row
              style={{
                marginTop: applicationOpen ? "24px" : "0px",
                marginBottom: "8px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Widget
                  src={`${ownerId}/widget/Components.Indicator`}
                  props={{
                    colorOuter: "#D7F5A1",
                    colorInner: "#9ADD33",
                  }}
                />
                <StatusText style={{ color: "#4A7714" }}>Matching round live</StatusText>
              </Row>
              <StatusText style={{ color: "#292929" }}>{daysUntil(public_round_end_ms)}</StatusText>
            </Row>
            <H3>
              Round starts on <Time>{formatDate(public_round_start_ms)}</Time> and ends on{" "}
              <Time>{formatDate(public_round_end_ms)}</Time>
            </H3>
          </>
        )}
        {publicRoundClosed && <props.ToDo>Add round closed indicator</props.ToDo>}
      </ColumnRightSegment>
      <Row style={{ gap: "24px" }}>
        {now < public_round_end_ms && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: publicRoundOpen ? "secondary" : "primary",
              text: "Fund matching pool",
              onClick: handleFundMatchingPool,
            }}
          />
        )}
        {canApply && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "tertiary",
              text: "Apply to pot",
              onClick: handleApplyToPot,
            }}
          />
        )}
        {publicRoundOpen && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: "Donate to projects",
              href: `?tab=pot&potId=${potId}&nav=projects`,
            }}
          />
        )}
        {canPayoutsBeSet && (
          <Widget
            src={`${ownerId}/widget/Pots.CalculateSetPayoutsButton`}
            props={{
              ...props,
              potDetail,
            }}
          />
        )}
        {canPayoutsBeProcessed && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              ...props,
              type: "primary",
              text: "Process Payouts",
              onClick: handleProcessPayouts,
            }}
          />
        )}
        {cooldownPeriodInProgress && (
          <div>Cooldown period ends on {formatDate(cooldown_end_ms)}</div>
        )}
        {potComplete && <div style={{ color: "red" }}>Pot complete</div>}
      </Row>
    </Column>
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen: state.isMatchingPoolModalOpen,
        onClose: () => State.update({ isMatchingPoolModalOpen: false }),
        children: (
          <>
            <ModalTitle>
              Enter matching pool contribution amount
              {min_matching_pool_donation_amount === "1"
                ? "(no minimum)"
                : `(Min. ${totalMatchingPoolAmount} ${base_currency.toUpperCase()})`}
            </ModalTitle>
            <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Enter amount here in NEAR",
                value: state.matchingPoolDonationAmountNear,
                onChange: (matchingPoolDonationAmountNear) =>
                  State.update({ matchingPoolDonationAmountNear }),
                validate: () => {
                  // TODO: add validation logic here
                  State.update({ matchingPoolDonationAmountNearError: "" });
                },
                error: state.matchingPoolDonationAmountNearError,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Inputs.TextArea`}
              props={{
                noLabel: true,
                inputRows: 5,
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Enter an optional message",
                value: state.matchingPoolDonationMessage,
                onChange: (matchingPoolDonationMessage) =>
                  State.update({ matchingPoolDonationMessage }),
                validate: () => {
                  if (state.matchingPoolDonationMessage.length > MAX_DONATION_MESSAGE_LENGTH) {
                    State.update({
                      matchingPoolDonationMessageError: `Message must be less than ${MAX_DONATION_MESSAGE_LENGTH} characters`,
                    });
                    return;
                  }

                  State.update({ matchingPoolDonationMessageError: "" });
                },
                error: state.matchingPoolDonationMessageError,
              }}
            />
            <props.ToDo>NB: No referrals yet</props.ToDo>
            <props.ToDo>Display fees breakdown and amount after fees</props.ToDo>
            <Row style={{ justifyContent: "flex-end", marginTop: "12px" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  disabled:
                    !state.matchingPoolDonationAmountNear ||
                    !!state.matchingPoolDonationAmountNearError ||
                    !parseFloat(state.matchingPoolDonationAmountNear),
                  text: `Contribute${
                    state.matchingPoolDonationAmountNear
                      ? ` ${state.matchingPoolDonationAmountNear} ${base_currency.toUpperCase()}`
                      : ""
                  } to matching pool`,
                  onClick: handleMatchingPoolDonation,
                }}
              />
            </Row>
          </>
        ),
      }}
    />
  </Container>
);
