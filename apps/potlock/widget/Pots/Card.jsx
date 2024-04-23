const { potId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { daysUntil, yoctosToNear, yoctosToUsd } = VM.require("potlock.near/widget/utils") || {
  daysUntil: () => "",
  yoctosToNear: () => "",
  yoctosToUsd: () => "",
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
};
const potConfig = PotSDK.getConfig(potId);

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TITLE_LENGTH = 36;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  min-height: 300px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  padding-bottom: 5px;
  height: 100%;
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
  > div {
    font-weight: inherit;
    display: flex;
    align-items: baseline;
  }
  .usd-amount {
    font-size: 14px;
    font-weight: 400;
    margin-left: 0.25rem;
  }
  .text {
    font-size: 14px;
    color: #7b7b7b;
    margin-left: 0.5rem;
  }
`;

const Description = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  word-wrap: break-word;
  a {
    color: rgb(123, 123, 123);
  }
`;

const Subtitle = styled.span`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

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
  cooldown_end_ms,
  all_paid_out,
} = potConfig;

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
const cooldownPending = public_round_end_ms && now >= public_round_end_ms && !cooldown_end_ms;
const cooldownOpen = now >= public_round_end_ms && now < cooldown_end_ms;
const payoutsPending = cooldown_end_ms && now >= cooldown_end_ms && !all_paid_out;
const payoutsCompleted = all_paid_out;
const amountNear = yoctosToNear(matching_pool_balance, true);
const amountUsd = yoctosToUsd(matching_pool_balance);

const tags = [
  /* Application's has not started tag */
  {
    backgroundColor: "#EFFEFA",
    borderColor: "#33DDCB",
    textColor: "#023131",
    text: "Sponsorship Open",
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    preElementsProps: {
      colorOuter: "#CAFDF3",
      colorInner: "#33DDCB",
      animate: true,
    },
    visibility: now < application_start_ms,
  },
  /* Application tag */
  {
    backgroundColor: "#EFFEFA",
    borderColor: "#33DDCB",
    textColor: "#023131",
    text: daysUntil(application_end_ms) + " left to apply",
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    preElementsProps: {
      colorOuter: "#CAFDF3",
      colorInner: "#33DDCB",
      animate: true,
    },
    visibility: applicationOpen,
  },
  /* Matching round open tag */
  {
    backgroundColor: "#F7FDE8",
    borderColor: "#9ADD33",
    textColor: "#192C07",
    text: daysUntil(public_round_end_ms) + " left to donate",
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    preElementsProps: {
      colorOuter: "#D7F5A1",
      colorInner: "#9ADD33",
      animate: true,
    },
    visibility: publicRoundOpen,
  },
  /* Cooldown pending tag */
  {
    backgroundColor: "#F5F3FF",
    borderColor: "#A68AFB",
    textColor: "#2E0F66",
    text: "Cooldown pending",
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    preElementsProps: {
      colorOuter: "#EDE9FE",
      colorInner: "#A68AFB",
      animate: true,
    },
    visibility: cooldownPending,
  },
  /* Matching round cooldown tag */
  {
    backgroundColor: "#F5F3FF",
    borderColor: "#A68AFB",
    textColor: "#2E0F66",
    text: "Challenge period",
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    preElementsProps: {
      colorOuter: "#EDE9FE",
      colorInner: "#A68AFB",
      animate: true,
    },
    visibility: cooldownOpen,
  },
  /* Payouts pending tag */
  {
    backgroundColor: "#F7FDE8",
    borderColor: "#9ADD33",
    textColor: "#192C07",
    text: "Payouts pending",
    preElementsProps: {
      colorOuter: "#D7F5A1",
      colorInner: "#9ADD33",
      animate: true,
    },
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    visibility: payoutsPending,
  },
  /* Matching round closed tag */
  {
    backgroundColor: "#464646",
    borderColor: "#292929",
    textColor: "#FFF",
    text: "Payouts completed",
    preElementsProps: {
      colorOuter: "#656565",
      colorInner: "#A6A6A6",
      animate: false,
    },
    textStyle: { fontWeight: 500, marginLeft: "8px" },
    visibility: payoutsCompleted,
  },
];

const Tag = (props) => (
  <Widget
    src={`${ownerId}/widget/Pots.Tag`}
    props={{
      ...props,
      ...(props.preElementsProps
        ? {
            preElements: (
              <Widget
                src={`${ownerId}/widget/Components.Indicator`}
                props={props.preElementsProps}
              />
            ),
          }
        : {}),
    }}
  />
);

return (
  <Card
    href={props.hrefWithParams(`?tab=pot&potId=${potId}`)}
    data-testid={applicationOpen ? "active-pot" : "inactive-pot"}
  >
    <CardSection>
      <Title>{title}</Title>
      <Description>
        <Markdown text={description} />
      </Description>
    </CardSection>
    <CardSection
      style={{
        background: "#F6F5F3",
        borderTop: "1px #7B7B7B solid",
        marginTop: "auto",
        height: "fit-content",
      }}
    >
      <Title>
        <div>
          {amountNear}
          {amountUsd && <span className="usd-amount">{amountUsd}</span>}
          <span className="text">in pot</span>
        </div>
      </Title>
      {tags.map((tag) => (tag.visibility ? <Tag {...tag} key={tag.text} /> : ""))}
    </CardSection>
  </Card>
);
