const { ownerId, potId, yoctosToNear, yoctosToUsd } = props;

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TITLE_LENGTH = 36;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  // width: 100%;
  // max-width: 45%;
  min-width: 320px;
  min-height: 300px;
  // border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #464646 inset;
  border: 1px solid #292929;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  padding: 32px;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  word-wrap: break-word;
`;

const Description = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  word-wrap: break-word;
`;

const Subtitle = styled.span`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

const potConfig = Near.view(potId, "get_config", {});

if (!potConfig)
  return (
    <Card style={{ justifyContent: "center", alignItems: "center" }}>
      {potConfig == null ? (
        <div class="spinner-border text-secondary" role="status" />
      ) : (
        <div>Pot {potId} not found.</div>
      )}
    </Card>
  );

const {
  pot_name,
  pot_description,
  base_currency,
  public_donations_count,
  matching_pool_balance,
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
} = potConfig;
// console.log("potConfig", potConfig);

// const totalAmount =
//   props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_public_donations);

const description = !pot_description
  ? "No description"
  : pot_description.length > MAX_DESCRIPTION_LENGTH
  ? `${pot_description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
  : pot_description;

const title = !pot_name
  ? "No title"
  : pot_name.length > MAX_TITLE_LENGTH
  ? `${pot_name.slice(0, MAX_TITLE_LENGTH)}...`
  : pot_name;

const now = Date.now();
const applicationNotStarted = now < application_start_ms;
const applicationOpen = now >= application_start_ms && now < application_end_ms;
const publicRoundNotStarted = now < public_round_start_ms;
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;
// const publicRoundOpen = true;
const publicRoundClosed = now >= public_round_end_ms;

const amountNear = yoctosToNear(matching_pool_balance);
const amountUsd = yoctosToUsd(matching_pool_balance);

return (
  <Card href={props.hrefWithEnv(`?tab=pot&potId=${potId}`)}>
    <CardSection>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardSection>
    <CardSection style={{ background: "#F6F5F3", borderTop: "1px #7B7B7B solid" }}>
      <Title>
        {amountNear}
        {amountUsd && (
          <span style={{ fontSize: "14px", fontWeight: 400, lineHeight: "24px" }}>{amountUsd}</span>
        )}
        <span style={{ color: "#7B7B7B", marginLeft: "8px", fontSize: "14px" }}>Matching Pool</span>
      </Title>
      {/* Application tag */}
      {applicationOpen && (
        <Widget
          src={`${ownerId}/widget/Pots.Tag`}
          props={{
            ...props,
            backgroundColor: "#EFFEFA",
            borderColor: "#33DDCB",
            textColor: "#023131",
            text: props.daysUntil(application_end_ms) + " left to apply",
            textStyle: { fontWeight: 500, marginLeft: "8px" },
            preElements: (
              <Widget
                src={`${ownerId}/widget/Components.Indicator`}
                props={{
                  colorOuter: "#CAFDF3",
                  colorInner: "#33DDCB",
                  animate: true,
                }}
              />
            ),
          }}
        />
      )}
      {/* Matching round tag */}
      {publicRoundOpen ||
        (publicRoundClosed && (
          <Widget
            src={`${ownerId}/widget/Pots.Tag`}
            props={{
              ...props,
              backgroundColor: publicRoundOpen ? "#F7FDE8" : "#EBEBEB",
              borderColor: publicRoundOpen ? "#9ADD33" : "#DBDBDB",
              textColor: publicRoundOpen ? "#192C07" : "#192C07",
              text: publicRoundOpen
                ? props.daysUntil(public_round_end_ms) + " left in round"
                : "Round closed",
              textStyle: { fontWeight: 500, marginLeft: "8px" },
              preElements: (
                <Widget
                  src={`${ownerId}/widget/Components.Indicator`}
                  props={{
                    colorOuter: publicRoundOpen ? "#D7F5A1" : "#DBDBDB",
                    colorInner: publicRoundOpen ? "#9ADD33" : "#A6A6A6",
                    animate: publicRoundOpen,
                  }}
                />
              ),
            }}
          />
        ))}
    </CardSection>
  </Card>
);
