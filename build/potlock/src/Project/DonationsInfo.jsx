const donationContractId = "donate.potlock.near";

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

const InfoCard = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid rgba(219, 82, 27, 0.36);
  //   background: yellow;
  background: #fef6ee;
  box-shadow: 0px -2px 0px rgba(219, 82, 27, 0.36) inset;
  gap: 8px;
  min-width: 260px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoTextPrimary = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  // word-wrap: break-word;
  text-align: flex-end;
  font-family: "Lora";
  ${loraCss}
`;

const InfoTextSecondary = styled.div`
  color: #ea6a25;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const donationsForProject = Near.view(donationContractId, "get_donations_for_recipient", {
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
    <InfoCard>
      <InfoTextPrimary>
        {props.nearToUsd
          ? `$${(totalDonations * props.nearToUsd).toFixed(2)}`
          : `${totalDonations} N`}
      </InfoTextPrimary>
      <InfoTextSecondary>Contributed</InfoTextSecondary>
    </InfoCard>
    <InfoCard>
      <InfoTextPrimary>{totalDonors}</InfoTextPrimary>
      <InfoTextSecondary>{totalDonors === 1 ? "Donor" : "Donors"}</InfoTextSecondary>
    </InfoCard>
    <InfoCard>
      <InfoTextPrimary>
        {" "}
        {props.nearToUsd
          ? `$${(totalReferralFees * props.nearToUsd).toFixed(2)}`
          : `${totalReferralFees} N`}
      </InfoTextPrimary>
      <InfoTextSecondary>Referral Fees</InfoTextSecondary>
    </InfoCard>
  </Container>
);
