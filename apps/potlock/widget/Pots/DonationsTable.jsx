const { allDonations, filter, handleSearch, sortDonation, currentFilter, hrefWithParams } = props;
const [currentPage, setCurrentPage] = useState(1);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setCurrentPage(1);
}, [filter]);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { ownerId } = VM.require("potlock.near/widget/constants");

const { getTimePassed, _address, calcNetDonationAmount } = VM.require(
  `potlock.near/widget/Components.DonorsUtils`
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  padding-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  overflow: hidden;
  align-items: center;
  gap: 2rem;
  .transcation {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    gap: 1rem;
    color: #292929;
    border-bottom: 1px solid rgba(199, 199, 199, 0.5);
    div {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      &.sort {
        cursor: pointer;
        gap: 8px;
        svg {
          transition: rotate 300ms;
        }
      }
    }
    .price {
      width: 70px;
    }
  }
  .address {
    width: 143px !important;
    justify-content: flex-start !important;
  }
  @media only screen and (max-width: 768px) {
    .header {
      display: none;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  font-size: 14px;
  background: #f6f5f3;
  padding: 0.5rem 1rem;
  @media only screen and (max-width: 780px) {
    gap: 0.5rem;
  }
`;

const SearchBar = styled.input`
  background: none;
  width: 100%;
  outline: none;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const TrRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid rgb(199 199 199 / 50%);
  > div {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 600;
    width: 74px;
    justify-content: flex-start;
    span {
      display: none;
    }
    img {
      width: 1.125rem;
    }
  }
  .address {
    color: #292929;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 2px;
    transition: all 200ms;
    font-weight: 600;
    .profile-image {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }
  .date span {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    .project {
      display: none !important;
    }
    .price {
      min-width: 120px;
      gap: 8px;
      width: fit-content;
      justify-content: flex-start;
      span {
        display: inline-block;
      }
    }
    .date {
      width: 100%;
      justify-content: start;
      gap: 4px;
      span {
        display: inline;
      }
    }
    .address .profile-image {
      margin-right: 0.5rem;
    }
  }
`;

const MobileProjectAddress = styled.a`
  width: fit-content;
  color: #7b7b7b;
  border-radius: 14px;
  padding: 4px 6px;
  border: 1px solid var(--Neutral-200, #dbdbdb);
  background: var(--Neutral-100, #ebebeb);
  cursor: pointer;
  display: none;
  align-items: center;
  gap: 0.5rem;
  margin-left: 4px;
  .profile-image {
    width: 1.125rem;
    height: 1.125rem;
    display: flex !important;
  }
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const Arrow = (props) => (
  <svg
    {...props}
    style={{ rotate: !props.active ? "0deg" : "180deg" }}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 6L1.0575 7.0575L5.25 2.8725V12H6.75V2.8725L10.935 7.065L12 6L6 0L0 6Z"
      fill="#7B7B7B"
    />
  </svg>
);

const ProfileImg = ({ address }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: address, style: {} }} />
);

return (
  <Container>
    <div className="transcation">
      <div className="header">
        <div className="address">Donor</div>
        <div className="address">Project</div>
        <div className="sort price" onClick={() => sortDonation("price")}>
          Amount
          {currentFilter === "price" && <Arrow active={filter.price} />}
        </div>
        <div className="sort" onClick={() => sortDonation("date")}>
          Date
          {currentFilter === "date" && <Arrow active={!filter.date} />}
        </div>
      </div>
      <SearchBarContainer>
        <SearchIcon>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7549 14.2549H14.9649L14.6849 13.9849C15.6649 12.8449 16.2549 11.3649 16.2549 9.75488C16.2549 6.16488 13.3449 3.25488 9.75488 3.25488C6.16488 3.25488 3.25488 6.16488 3.25488 9.75488C3.25488 13.3449 6.16488 16.2549 9.75488 16.2549C11.3649 16.2549 12.8449 15.6649 13.9849 14.6849L14.2549 14.9649V15.7549L19.2549 20.7449L20.7449 19.2549L15.7549 14.2549ZM9.75488 14.2549C7.26488 14.2549 5.25488 12.2449 5.25488 9.75488C5.25488 7.26488 7.26488 5.25488 9.75488 5.25488C12.2449 5.25488 14.2549 7.26488 14.2549 9.75488C14.2549 12.2449 12.2449 14.2549 9.75488 14.2549Z"
              fill="#C7C7C7"
            />
          </svg>
        </SearchIcon>
        <SearchBar placeholder="Search donations" onChange={handleSearch} />
      </SearchBarContainer>
      {allDonations.length > 0 ? (
        allDonations.slice((currentPage - 1) * perPage, currentPage * perPage).map((donation) => {
          const { donor_id, recipient_id, donated_at_ms, donated_at, project_id } = donation;
          const projectId = recipient_id || project_id;
          return (
            <TrRow>
              <a
                href={hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
                className="address"
                target="_blank"
              >
                <ProfileImg address={donor_id} />
                <OverlayTrigger placement="top" overlay={<Tooltip>{donor_id}</Tooltip>}>
                  <div>{_address(donor_id)}</div>
                </OverlayTrigger>
              </a>

              <a
                href={hrefWithParams(`?tab=project&projectId=${projectId}`)}
                className="address project"
                target="_blank"
              >
                <ProfileImg address={projectId} />
                <OverlayTrigger placement="top" overlay={<Tooltip>{projectId}</Tooltip>}>
                  <div>{_address(projectId)}</div>
                </OverlayTrigger>
              </a>

              <div className="price">
                <span>Donated</span>
                <img src={nearLogo} alt="NEAR" />
                {calcNetDonationAmount(donation).toFixed(2)}
              </div>

              <div className="date">
                {getTimePassed(donated_at_ms || donated_at)} ago <span> to </span>
                <MobileProjectAddress
                  href={hrefWithParams(`?tab=project&projectId=${projectId}`)}
                  target="_blank"
                >
                  <ProfileImg address={projectId} />
                  {_address(projectId)}
                </MobileProjectAddress>
              </div>
            </TrRow>
          );
        })
      ) : (
        <TrRow>No donations</TrRow>
      )}
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
);
