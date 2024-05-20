const { sponsors, filter, tab, hrefWithParams } = props;
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
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  overflow: hidden;
  .transcation {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      gap: 1rem;
      color: #7b7b7b;
      div {
        display: flex;
        align-items: center;
        font-weight: 600;
        &:last-of-type {
          justify-content: flex-end;
        }
      }
    }
    .address {
      width: 190px;
      margin-right: auto;
      justify-content: start !important;
    }
    .rank {
      width: 40px;
      margin-right: 2rem;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 768px) {
    .transcation {
      font-size: 12px;
      .header {
        padding: 0.5rem;
      }
      .rank {
        margin-right: 0;
        width: 30px;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .transcation .address {
      width: 135px;
      flex: 1;
    }
  }
`;

const TrRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid #c7c7c7;
  > div {
    display: flex;
    align-items: center;
  }

  .address {
    color: #292929;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 2px;
    transition: all 200ms;
    .profile-image {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }
  .sponsors-amount {
    justify-content: flex-end;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Percentage = styled.div`
  background: #ebebeb;
  box-shadow: 0px -1px 0px 0px #dbdbdb inset, 0px 0px 0px 0.5px #dbdbdb;
  border-radius: 4px;
  padding: 2px 4px;
  min-width: 60px;
  text-align: right;
`;

const NoResult = styled.div`
  font-size: 1.125rem;
  text-align: center;
`;

const totalDonations = 0;
sponsors.forEach((donation) => {
  totalDonations += donation.amount;
});

const ProfileImg = ({ donor_id }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: donor_id, style: {} }} />
);

return sponsors.length ? (
  <Container>
    <div className="transcation">
      <div className="header">
        <div className="rank">Rank</div>
        <div className="address">Donor</div>
        <div>Amount</div>
        {nearToUsd && !isInPot && <div>Amount (USD)</div>}
      </div>
      {sponsors.slice((currentPage - 1) * perPage, currentPage * perPage).map((donation, idx) => {
        const { donor_id, amount, percentage_share } = donation;

        return (
          <TrRow>
            <div className="rank">#{idx + 1 + (currentPage - 1) * perPage}</div>

            <a
              href={hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
              className="address"
              target="_blank"
            >
              <ProfileImg donor_id={donor_id} />

              <OverlayTrigger placement="top" overlay={<Tooltip>{donor_id}</Tooltip>}>
                <div> {_address(donor_id, 15)}</div>
              </OverlayTrigger>
            </a>
            <div className="sponsors-amount">
              {amount.toFixed(2).replace(/[.,]00$/, "")}N{" "}
              <Percentage>{percentage_share === "0" ? "<0.01" : percentage_share}%</Percentage>{" "}
            </div>
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
        data: sponsors,
        currentPage,
        perPage: perPage,
        bgColor: "#292929",
      }}
    />
  </Container>
) : (
  <NoResult>No Sponsors</NoResult>
);
