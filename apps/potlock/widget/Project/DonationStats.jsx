const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  margin-top: 40px;
  @media screen and (max-width: 739px) {
    padding-top: 30px;
    flex-direction: column;
    gap: 20px;
  }
`;

const StatsTitle = styled.div`
  font-size: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  @media screen and (max-width: 739px) {
    font-size: 40px;
    font-weight: 500;
  }
`;

const StatsSubTitle = styled.div`
  font-size: 20px;
`;

const [totalDonations, setDonations] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);

Near.asyncView("donate.potlock.near", "get_config", {}).then((result) => {
  const lastDonationAmount = props.yoctosToUsd(result.net_donations_amount);
  setTotalDonated(lastDonationAmount);
  setDonations(result.total_donations_count);
});

return totalDonations > 0 ? (
  <Stats>
    <StatsTitle>
      {totalDonated}
      <StatsSubTitle>Donated</StatsSubTitle>
    </StatsTitle>
    <StatsTitle>
      {totalDonations > 0 && totalDonations}
      <StatsSubTitle>Donations</StatsSubTitle>
    </StatsTitle>
  </Stats>
) : (
  ""
);
