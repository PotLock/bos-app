// get donations
const { potId, potDetail } = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getMatchingPoolDonations: () => {},
};

let sponsorshipDonations = PotSDK.getMatchingPoolDonations(potId);

const { NEAR } = SUPPORTED_FTS;

State.init({
  sponsorshipDonations: null,
});

if (sponsorshipDonations && !state.sponsorshipDonations) {
  // accumulate donations for each address
  sponsorshipDonations = sponsorshipDonations.reduce((accumulator, currentDonation) => {
    accumulator[currentDonation.donor_id] = {
      amount:
        parseFloat(accumulator[currentDonation.donor_id].amount || 0) +
        parseFloat(SUPPORTED_FTS.NEAR.fromIndivisible(currentDonation.net_amount)),
      ...currentDonation,
    };
    return accumulator;
  }, {});

  // add % share of total to each donation
  const total = SUPPORTED_FTS.NEAR.fromIndivisible(potDetail.matching_pool_balance);

  sponsorshipDonations = Object.values(sponsorshipDonations).sort((a, b) => b.amount - a.amount);
  sponsorshipDonations = sponsorshipDonations.map((donation) => {
    return {
      ...donation,
      percentage_share: ((donation.amount / total) * 100).toFixed(2).replace(/[.,]00$/, ""),
    };
  });
  State.update({ sponsorshipDonations });
}

if (!state.sponsorshipDonations) return <div class="spinner-border text-secondary" role="status" />;

const columns = ["Rank", "Donor", "Amount", "Percentage"];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 99%;
  }
  @media screen and (max-width: 390px) {
    width: 98%;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 35px;
  padding-bottom: 1rem;
`;

const { base_currency } = potDetail;

const maxRowItemLength = 14;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.SponsorsBoard`}
      props={{
        ...props,
        donations: state.sponsorshipDonations.slice(0, 6),
        base_currency: base_currency,
      }}
    />
    <TableContainer>
      <Widget
        src={`${ownerId}/widget/Pots.SponsorsTable`}
        props={{
          ...props,
          sponsors: state.sponsorshipDonations,
        }}
      />
    </TableContainer>
  </Container>
);
