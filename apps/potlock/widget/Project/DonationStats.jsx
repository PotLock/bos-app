const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  margin-top: 40px;
  @media screen and (max-width: 739px) {
    padding-top: 30px;
    flex-direction: row;
    gap: 20px;
  }
`;

const StatsTitle = styled.div`
  font-size: 50px;
  display: flex;
  flex-direction: row;
  align-items: end;
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
  const lastDonationAmount = Big(result.net_donations_amount).div(Big(1e24));
  setDonations(parseFloat(lastDonationAmount).toFixed(2));
  setTotalDonated(result.total_donations_count);
});

return (
  totalDonated > 0 && (
    <Stats>
      <StatsTitle>
        ${totalDonations > 0 && totalDonations}
        <StatsSubTitle>Donated</StatsSubTitle>
      </StatsTitle>
      <StatsTitle>
        {totalDonated > 0 && totalDonated}
        <StatsSubTitle>Donations</StatsSubTitle>
      </StatsTitle>
    </Stats>
  )
);
