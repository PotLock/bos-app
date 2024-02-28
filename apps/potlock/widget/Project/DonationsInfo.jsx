const { ownerId, DONATION_CONTRACT_ID } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  DONATION_CONTRACT_ID: "",
};
const { nearToUsd, nearToUsdWithFallback } = VM.require("potlock.near/widget/utils") || {
  nearToUsd: 1,
  nearToUsdWithFallback: () => "",
};
const loraCss = fetch("https://fonts.cdnfonts.com/css/lora").body;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  // width: 100%;
  // background: green;
  gap: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const donationsForProject = Near.view(DONATION_CONTRACT_ID, "get_donations_for_recipient", {
  recipient_id: props.projectId,
});

const [totalDonations, totalDonors, totalReferralFees] = useMemo(() => {
  if (!donationsForProject) {
    return ["", ""];
  }
  const donors = [];
  let totalDonationAmount = new Big(0);
  let totalReferralFees = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    const totalAmount = new Big(donation.total_amount);
    const referralAmount = new Big(donation.referrer_fee || "0");
    const protocolAmount = new Big(donation.protocol_fee || "0");
    totalDonationAmount = totalDonationAmount.plus(
      totalAmount.minus(referralAmount).minus(protocolAmount)
    );
    totalReferralFees = totalReferralFees.plus(referralAmount);
  }
  return [
    totalDonationAmount.div(1e24).toNumber().toFixed(2),
    donors.length,
    totalReferralFees.div(1e24).toNumber().toFixed(2),
  ];
}, [donationsForProject]);

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Components.InfoCard`}
      props={{
        infoTextPrimary: nearToUsd
          ? `$${(totalDonations * nearToUsd).toFixed(2)}`
          : `${totalDonations} N`,
        infoTextSecondary: "Contributed",
      }}
    />
    <Widget
      src={`${ownerId}/widget/Components.InfoCard`}
      props={{
        infoTextPrimary: totalReferralFees ? nearToUsdWithFallback(totalReferralFees) : "-",
        infoTextSecondary: "Referral Fees",
      }}
    />
  </Container>
);
