const { DONATION_CONTRACT_ID } = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
};
const { yoctosToUsd } = VM.require("potlock.near/widget/utils") || { yoctosToUsd: () => "" };
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

const [totalDonations, setTotalDonations] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);

Near.asyncView(DONATION_CONTRACT_ID, "get_config", {}).then((result) => {
  const lastDonationAmount = yoctosToUsd(result.net_donations_amount);
  setTotalDonated(lastDonationAmount);
  setTotalDonations(result.total_donations_count);
});

return (
  <Stats>
    <StatsTitle>
      {totalDonated || "~"}
      <StatsSubTitle>Donated</StatsSubTitle>
    </StatsTitle>
    <StatsTitle>
      {totalDonations || "~"}
      <StatsSubTitle>Donations</StatsSubTitle>
    </StatsTitle>
  </Stats>
);
