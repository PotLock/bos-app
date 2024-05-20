const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
  padding: 0 40px;
  @media screen and (max-width: 768px) {
    gap: 1rem;
    padding: 0 20px;
  }
`;

const StatsTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;
  font-size: 20px;
  color: #dd3345;
`;

const StatsSubTitle = styled.div`
  color: #656565;
  font-size: 14px;
  font-weight: 400;
`;

const { yoctosToUsdWithFallback } = VM.require("${config_account}/widget/utils") || {
  yoctosToUsdWithFallback: (amount) => amount,
};
let DonateSDK =
  VM.require("${config_account}/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const DonationStats = () => {
  const data = DonateSDK.getConfig() || {
    net_donations_amount: 0,
    total_donations_count: 0,
  };

  const lastDonationAmount = data.net_donations_amount
    ? yoctosToUsdWithFallback(data.net_donations_amount, true)
    : null;
  const totalDonations = data.total_donations_count;

  return (
    <Stats>
      <StatsTitle>
        {lastDonationAmount || "-"}
        <StatsSubTitle>Donated</StatsSubTitle>
      </StatsTitle>
      <StatsTitle>
        {totalDonations || "-"}
        <StatsSubTitle>Donations</StatsSubTitle>
      </StatsTitle>
    </Stats>
  );
};

return {
  DonationStats,
};
