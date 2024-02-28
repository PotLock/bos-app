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

const { yoctosToUsd } = VM.require("potlock.near/widget/utils") || {
  yoctosToUsd: (amount) => amount,
};
const PotlockDonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
  }));
const donate = PotlockDonateSDK({ env: props.env });

console.log("donate in DonationStats: ", donate);

const data = donate.getConfig() || {
  net_donations_amount: 0,
  total_donations_count: 0,
};

const lastDonationAmount = yoctosToUsd(data.net_donations_amount);
const totalDonations = data.total_donations_count;

return (
  <Stats>
    <StatsTitle>
      {lastDonationAmount || "~"}
      <StatsSubTitle>Donated</StatsSubTitle>
    </StatsTitle>
    <StatsTitle>
      {totalDonations || "~"}
      <StatsSubTitle>Donations</StatsSubTitle>
    </StatsTitle>
  </Stats>
);
