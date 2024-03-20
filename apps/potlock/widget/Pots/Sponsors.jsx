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

const OuterTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px rgba(41, 41, 41, 0.5) solid;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2);
  border-radius: 2px;
  width: 100%;
  margin-top: 35px;
  padding-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f6f5f3;
  width: 100%;
`;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: flex-start;
  padding: 10px 20px;
  width: 24%;
  @media screen and (min-width: 390px) and (max-width: 768px) {
    padding: 10px 15px;
  }
  @media screen and (max-width: 390px) {
    padding: 10px;
  }
`;

const HeaderItemText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  @media screen and (max-width: 390px) {
    font-size: 12px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  width: 24%;
  @media screen and (min-width: 390px) and (max-width: 768px) {
    padding: 10px 15px;
    gap: 10px;
  }
  @media screen and (max-width: 390px) {
    padding: 10px;
    gap: 0px;
  }
`;

const RowText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  @media screen and (max-width: 390px) {
    font-size: 12px;
  }
`;

const { base_currency } = potDetail;

const maxRowItemLength = 14;

return (
  <>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
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
          src={`${ownerId}/widget/Components.DonorsLeaderboard`}
          props={{
            ...props,
            sortedDonations: state.sponsorshipDonations,
          }}
        />
      </TableContainer>
    </Container>
  </>
);
