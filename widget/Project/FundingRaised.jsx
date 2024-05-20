const { donations, potPayouts, directDonations, matchingRoundDonations, profile } = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 1rem;
  border-radius: 12px;
  gap: 24px;
  background: #f6f5f3;
  .text {
    font-family: "Lora";
    font-size: 22px;
    font-style: italic;
    font-weight: 500;
    color: #292929;
  }
  img {
    width: 100%;
    max-width: 604px;
  }
  @media screen and (max-width: 768px) {
    padding: 1.5rem 1rem;
    .text {
      font-size: 16px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 100%;
  background: #c7c7c7;
  height: 1px;
  margin: 3rem 0;
`;

const externalFunding = profile.plFundingSources ? JSON.parse(profile.plFundingSources) : [];

// Get total donations & Unique donors count
const [totalDonationAmountNear, uniqueDonors, totalMatched] = useMemo(() => {
  let totalNear = Big(0);
  const uniqueDonors = [...new Set(donations.map((donation) => donation.donor_id))];
  donations.forEach((donation) => {
    if (donation.ft_id === "near" || donation.base_currency === "near") {
      totalNear = totalNear.plus(Big(donation.total_amount || donation.amount));
    }
  });
  const totalDonationAmountNear = SUPPORTED_FTS["NEAR"].fromIndivisible(totalNear.toString());
  let totalMatched = Big(0);
  potPayouts.forEach((payout) => {
    totalMatched = totalMatched.plus(Big(payout.amount));
  });
  totalMatched = SUPPORTED_FTS["NEAR"].fromIndivisible(totalMatched.toString());
  return [totalDonationAmountNear, uniqueDonors?.length, totalMatched];
}, [donations]);

return externalFunding.length === 0 && donations.length === 0 ? (
  <NoResults>
    <img
      src="https://ipfs.near.social/ipfs/bafkreif5awokaip363zk6zqrsgmpehs6rap3w67engc4lxdlk4x6iystru"
      alt="pots"
    />
    <div className="text">No funds have been raised for this project.</div>
  </NoResults>
) : (
  <Container>
    {externalFunding.length > 0 && (
      <Widget
        src={`${ownerId}/widget/Project.ExternalFunding`}
        props={{ ...props, externalFunding }}
      />
    )}
    {externalFunding.length > 0 && donations.length > 0 && <Line />}

    {donations.length > 0 && (
      <Widget
        src={`${ownerId}/widget/Project.PotlockFunding`}
        props={{ ...props, totalDonationAmountNear, uniqueDonors, totalMatched }}
      />
    )}
  </Container>
);
