const { ownerId, potId, potDetail } = props;
// console.log("props in header: ", props);

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

const potConfig = Near.view(potId, "get_config", {});

if (!potConfig) return "";

// console.log("pot config: ", potConfig);

const {
  pot_name,
  pot_description,
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
  base_currency,
  matching_pool_balance,
  registry_provider,
} = potConfig;

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

const now = Date.now();
const applicationOpen = now >= application_start_ms && now < application_end_ms;
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;
// const publicRoundOpen = true;

const formatDate = (timestamp) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";

  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'

  // Minutes should be two digits
  const minuteFormatted = minute < 10 ? "0" + minute : minute;

  return `${month} ${day}, ${year} ${hour}:${minuteFormatted}${ampm}`;
};

const daysUntil = (timestamp) => {
  const now = new Date();
  const futureDate = new Date(timestamp);
  const differenceInTime = futureDate - now;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} to go`;
};

const handleFundMatchingPool = () => {
  // TODO: Implement
};

const handleApplyToPot = () => {
  props.setApplicationModalOpen(true);
};

const totalMatchingPoolAmount =
  props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(matching_pool_balance);

const Status = () => {
  if (applicationOpen) {
    return (
      <Row style={{ marginBottom: "8px" }}>
        <Widget
          src={`${ownerId}/widget/Components.Indicator`}
          props={{
            colorOuter: "#CAFDF3",
            colorInner: "#33DDCB",
          }}
        />
        <StatusText style={{ color: "#0B7A74" }}>All applications are open</StatusText>
      </Row>
    );
  }
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
      </ColumnRightSegment>
      <Row style={{ gap: "24px" }}>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Fund matching pool",
            onClick: handleFundMatchingPool,
          }}
        />
        {applicationOpen && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "tertiary",
              text: "Apply to pot",
              onClick: handleApplyToPot,
            }}
          />
        )}
      </Row>
    </Column>
  </Container>
);
