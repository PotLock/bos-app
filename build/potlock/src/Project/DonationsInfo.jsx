const donationContractId = "donate.potlock.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  // background: green;
  gap: 40px;
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
`;

const InfoTextPrimary = styled.div`
  color: #2e2e2e;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  // word-wrap: break-word;
  text-align: flex-end;
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

const [totalDonations, totalDonors] = useMemo(() => {
  if (!donationsForProject) {
    return ["", ""];
  }
  const donors = [];
  let totalDonationAmount = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    totalDonationAmount = totalDonationAmount.plus(new Big(donation.total_amount));
  }
  return [totalDonationAmount.div(1e24).toNumber().toFixed(2), donors.length];
}, [donationsForProject]);

return (
  <Container>
    <InfoCard>
      <InfoTextPrimary>${totalDonations}</InfoTextPrimary>
      <InfoTextSecondary>Contributed</InfoTextSecondary>
    </InfoCard>
    <InfoCard>
      <InfoTextPrimary>{totalDonors}</InfoTextPrimary>
      <InfoTextSecondary>{totalDonors === 1 ? "Donor" : "Donors"}</InfoTextSecondary>
    </InfoCard>
  </Container>
);
