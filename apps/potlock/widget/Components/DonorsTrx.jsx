const { allDonations, filter } = props;
const [page, setPage] = useState(0);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setPage(0);
}, [filter]);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { getTimePassed, _address, calcNetDonationAmount, reverseArr } = VM.require(
  `potlock.near/widget/Components.DonorsUtils`
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
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
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
      }
    }
    .address {
      width: 143px !important;
    }
  }
  @media only screen and (max-width: 768px) {
    .transcation {
      font-size: 12px;
      .header {
        padding: 10px 0;
        div {
          width: 80px !important;
        }
      }
      .address {
        width: 80px !important;
        justify-content: center;
        .profile-image {
          display: none !important;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .transcation {
      font-size: 9px;
    }
  }
`;

const TrRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  padding: 20px 10px;

  > div,
  > span {
    width: 100px;
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

const ProfileImg = ({ address }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: address, style: {} }} />
);

return allDonations.length ? (
  <Container>
    <div className="transcation">
      <div className="header">
        <div className="address">Donor</div>
        <div className="address">Project</div>
        <div>Amount</div>
        <div>Date</div>
      </div>
      {reverseArr(allDonations)
        .slice(page * perPage, (page + 1) * perPage)
        .map((donation) => {
          const { donor_id, recipient_id, donated_at_ms, donated_at, project_id } = donation;
          const projectId = recipient_id || project_id;
          return (
            <TrRow>
              <a
                href={props.hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
                className="address"
                target="_blank"
              >
                <ProfileImg address={donor_id} />
                {_address(donor_id)}
              </a>

              <a
                href={props.hrefWithParams(`?tab=project&projectId=${projectId}`)}
                className="address"
                target="_blank"
              >
                <ProfileImg address={projectId} />
                {_address(projectId)}
              </a>

              <div className="price">
                <img src={nearLogo} alt="NEAR" />
                {calcNetDonationAmount(donation).toFixed(2)}
              </div>

              <div>{getTimePassed(donated_at_ms || donated_at)} ago</div>
            </TrRow>
          );
        })}
    </div>
    <Widget
      src="baam25.near/widget/pagination"
      props={{
        onClick: (page) => {
          setPage(page);
        },
        data: allDonations,
        page: page,
        perPage: perPage,
        bgColor: "#292929",
      }}
    />
  </Container>
) : (
  <NoResult>No Donations</NoResult>
);
