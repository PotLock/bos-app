const { sponsors, sortedDonations, filter, currentTab, tab } = props;
const donations = currentTab === "sponsors" ? sponsors : sortedDonations;
const isInPot = tab === "pot";

const { ownerId } = VM.require("potlock.near/widget/constants");
const { nearToUsd } = VM.require("potlock.near/widget/utils") || {
  nearToUsd: 1,
};

const [currentPage, setCurrentPage] = useState(1);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setCurrentPage(1);
}, [filter]);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { getTimePassed, _address, calcNetDonationAmount, reverseArr } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .transcation {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      gap: 1rem;
      background: #f6f5f3;
      color: #292929;
      div {
        width: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
      }
    }
    .address {
      width: 190px !important;
      margin-right: auto;
      justify-content: start !important;
    }
    .rank {
      width: 80px !important;
    }
  }
  @media only screen and (max-width: 768px) {
    .transcation {
      font-size: 12px;
      .header {
        padding: 10px 0;
        div {
          width: 80px;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .transcation {
      font-size: 9px;
      .address {
        width: 120px !important;
      }
    }
  }
`;

const TrRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  padding: 20px 10px;
  > div,
  > span {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .price {
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      width: 1.5rem;
    }
  }
  .address {
    color: #292929;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 2px;
    transition: all 200ms;
    .profile-image {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 10px 0;
    > div,
    > span {
      width: 80px;
    }
    .price {
      gap: 8px;
      img {
        width: 1.25rem;
      }
    }
    .address .profile-image {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
  @media only screen and (max-width: 480px) {
    .price img {
      width: 1rem;
    }
  }
`;

const NoResult = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const totalDonations = 0;
donations.forEach((donation) => {
  totalDonations += donation.amount;
});

const ProfileImg = ({ donor_id }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: donor_id, style: {} }} />
);

return donations.length ? (
  <Container>
    <div className="transcation">
      <div className="header">
        <div className="rank">Rank</div>
        <div className="address">Donor</div>
        <div>Amount</div>
        {isInPot && <div>Percentage</div>}
        {nearToUsd && !isInPot && <div>Amount (USD)</div>}
      </div>
      {donations.slice((currentPage - 1) * perPage, currentPage * perPage).map((donation, idx) => {
        const { donor_id, amount, percentage_share } = donation;

        return (
          <TrRow>
            <div className="rank">#{idx + 1 + (currentPage - 1) * perPage}</div>

            <a
              href={props.hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
              className="address"
              target="_blank"
            >
              <ProfileImg donor_id={donor_id} />

              {_address(donor_id, 15)}
            </a>

            <div className="price">
              <img src={nearLogo} alt="NEAR" />
              {amount.toFixed(2).replace(/[.,]00$/, "")}
            </div>
            {isInPot && <div>{percentage_share}%</div>}
            {nearToUsd && !isInPot && <div>~${(amount * nearToUsd).toFixed(2)}</div>}
          </TrRow>
        );
      })}
    </div>
    <Widget
      src={`${ownerId}/widget/Components.Pagination`}
      props={{
        onPageChange: (page) => {
          setCurrentPage(page);
        },
        data: donations,
        currentPage,
        perPage: perPage,
        bgColor: "#292929",
      }}
    />
  </Container>
) : (
  <NoResult>No Donations</NoResult>
);
