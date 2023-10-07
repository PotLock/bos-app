const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 0.5em;
  width: 100%;
  max-width: 1300px;

  div {
    width: 20%;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    div {
      width: 49%;
    }

    div:last-child {
      width: 100%;
    }
  }
`;

return (
  <div>
    <Stats>
      <Widget
        src={`nearhorizon.near/widget/Stats.Card`}
        props={{
          value: "100",
          label: "Projects",
        }}
      />
      <Widget
        src={`nearhorizon.near/widget/Stats.Card`}
        props={{
          value: state.statsIsFetched
            ? Number(state.stats.TOTAL_ACCOUNTS).toLocaleString("en-US", {
                notation: "compact",
              }) + "+"
            : "$40,000",
          label: "Matched Donations",
        }}
      />
      <Widget
        src={`nearhorizon.near/widget/Stats.Card`}
        props={{
          value: state.statsIsFetched
            ? Number(state.stats.TOTAL_ACCOUNTS).toLocaleString("en-US", {
                notation: "compact",
              }) + "+"
            : "2000",
          label: "Total donors",
        }}
      />
      <Widget
        src={`nearhorizon.near/widget/Stats.Card`}
        props={{
          value: Number(3).toLocaleString("en-US", {
            notation: "compact",
          }),
          label: "Rounds",
        }}
      />
      <Widget
        src={`potlock.near/widget/potlock.home.stats.link`}
        className="link"
      />
    </Stats>
  </div>
);
