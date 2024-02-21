const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

const StatsTitle = styled.div`
  color: #292929;
  font-size: 44px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 500;
    gap: 5px;
  }
`;

const StatsSubTitle = styled.div`
  color: #525252;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
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
