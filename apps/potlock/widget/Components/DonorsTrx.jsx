const { allDonations, filter } = props;
const [currentPage, setCurrentPage] = useState(1);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setCurrentPage(1);
}, [filter]);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { ownerId } = VM.require("potlock.near/widget/constants");

const { getTimePassed, _address, reverseArr } = VM.require(
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

const NEAR_DECEMIALS = 24;

const calcNetDonationAmount = (amount, decimals) => Big(amount).div(Big(`1e${decimals}`));

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
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .map((donation) => {
          const {
            donor_id,
            recipient_id,
            donated_at_ms,
            donated_at,
            project_id,
            ft_id,
            total_amount,
          } = donation;
          const projectId = recipient_id || project_id;
          const isNear = ft_id === "near";

          const frMetaDate = !isNear ? Near.view(ft_id, "ft_metadata", {}) : null;
          const assetIcon = isNear ? nearLogo : frMetaDate.icon;

          const decimals = isNear ? NEAR_DECEMIALS : frMetaDate.decimals;

          console.log("decimals", decimals);

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
                <img src={assetIcon} alt={ft_id} />

                {decimals ? calcNetDonationAmount(total_amount, decimals).toFixed(2) : "-"}
              </div>

              <div>{getTimePassed(donated_at_ms || donated_at)} ago</div>
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
        data: allDonations,
        currentPage,
        perPage: perPage,
        bgColor: "#292929",
      }}
    />
  </Container>
) : (
  <NoResult>No Donations</NoResult>
);
