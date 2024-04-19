const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  padding-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
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
    gap: 2rem;
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
      margin-right: 5rem;
    }
  }
  .address {
    /* width: 143px !important; */
    flex: 1;
    justify-content: flex-start !important;
  }
  @media only screen and (max-width: 992px) {
    .header .price {
      margin-right: 0;
    }
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
  gap: 1rem;
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
  gap: 2rem;
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
    margin-right: 5rem;
    justify-content: flex-start;
    span {
      display: none;
    }
    img {
      width: 1.125rem;
    }
  }
  .address {
    position: relative;
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
    :hover {
      text-decoration: none;
      .flag {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
  .project-mobile-view {
    position: relative;
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
    .flag {
      left: -50%;
      .tip-icon {
        padding-left: 50%;
      }
    }
    :hover {
      text-decoration: none;
      .flag {
        opacity: 1;
        pointer-events: all;
      }
    }
    @media only screen and (max-width: 768px) {
      display: flex;
    }
  }
  .date span {
    display: none;
  }
  @media only screen and (max-width: 992px) {
    .price {
      margin-right: 0;
    }
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

const Flag = styled.div`
  display: flex;
  align-content: center;
  gap: 12px;
  margin-left: auto;
  opacity: 0;
  pointer-events: none;
  font-weight: 500;
  transition: 300ms ease-in-out;
  @media only screen and (max-width: 992px) {
    opacity: 1;
    div {
      display: none;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const FlagTooltipWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: all 300ms ease 0s;
  top: 100%;
  background: white;
  z-index: 1;
  box-shadow: 0px 0px 1px 0px rgba(41, 41, 41, 0.74), 0px 3px 3px 0px rgba(123, 123, 123, 0.12),
    0px 6px 6px 0px rgba(123, 123, 123, 0.12);
  border-radius: 4px;
  padding: 1rem;
  max-width: 550px;
  width: max-content;
  margin-top: 8px;
  cursor: default;
  .content {
    display: flex;
    gap: 1rem;
    .content-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .profile-image {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0;
    }
    .title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .role {
      font-weight: 600;
      color: #7b7b7b;
    }
    .dot {
      width: 5px;
      height: 5px;
      background: #7b7b7b;
      border-radius: 50%;
    }
    .admin {
      font-weight: 600;
      display: flex;
      gap: 4px;
    }
    .text {
      color: #7b7b7b;
    }
    .flaged {
      color: #ed464f;
      font-weight: 600;
      &:hover {
        text-decoration: none;
      }
    }
  }
  .tip-icon {
    display: flex;
    z-index: 1;
    position: absolute;
    top: 0;
    height: 8px;
    transform: translateY(-100%);
    width: 100%;
    justify-content: flex-start;
    left: 0;
    padding-left: 2.5rem;

    svg {
      stroke: rgb(41 41 41 / 21%);
    }
  }
  @media only screen and (max-width: 768px) {
    width: 300px;
    padding: 0.5rem;
    font-size: 12px;
    .content .profile-image {
      display: none !important;
    }
  }
`;

const accountId = context.accountId;

const FlagBtn = ({ isFlagged, isProject, address }) =>
  isFlagged && accountId === isFlagged.flaggedBy ? (
    <Flag className="flag" onClick={(e) => handleFlag(e, address, isFlagged)}>
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.86 2.5L8.26 4.5H13.5V10.5H10.14L9.74 8.5H2.5V2.5H7.86ZM9.5 0.5H0.5V17.5H2.5V10.5H8.1L8.5 12.5H15.5V2.5H9.9L9.5 0.5Z"
          fill="#7B7B7B"
        />
      </svg>
      <div>Unflag {isProject ? "project" : "donor"}</div>
    </Flag>
  ) : (
    <Flag className="flag" onClick={(e) => handleFlag(e, address, isFlagged)}>
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.86 2.5L8.26 4.5H13.5V10.5H10.14L9.74 8.5H2.5V2.5H7.86ZM9.5 0.5H0.5V17.5H2.5V10.5H8.1L8.5 12.5H15.5V2.5H9.9L9.5 0.5Z"
          fill="#7B7B7B"
        />
      </svg>
      <div>Flag {isProject ? "project" : "donor"}</div>
    </Flag>
  );

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

const FlagTooltip = ({ flag, href, address }) => (
  <FlagTooltipWrapper className="flag" onClick={(e) => e.preventDefault()}>
    <div className="tip-icon">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 5.24537e-07L-2.54292e-07 8L12 8L6 5.24537e-07Z" fill="white" />
      </svg>
    </div>
    <div className="content">
      <ProfileImg address={flag.flaggedBy} />
      <div className="content-info">
        <div className="title">
          <div className="role">{flag.role}</div>
          <div className="dot" />
          <div className="admin">
            {_address(flag.flaggedBy)} has flagged
            <a href={href} className="flaged" target="_blank" onClick={(e) => e.stopPropagation()}>
              {_address(address)}
            </a>
          </div>
        </div>
        <div className="text">{flag.potFlaggedAcc[address]}</div>
      </div>
    </div>
  </FlagTooltipWrapper>
);

const AddressItem = ({ href, address, isFlagged, isProject, className }) => (
  <a
    href={href}
    className={className}
    target="_blank"
    onClick={(e) => {
      isFlagged ? e.preventDefault() : null;
    }}
  >
    <ProfileImg address={address} />
    <div
      style={{
        color: isFlagged ? "#ed464f" : "#292929",
        fontWeight: "600",
      }}
    >
      {_address(address)}
    </div>
    {isFlagged && <FlagTooltip flag={isFlagged} href={href} address={address} />}
    {hasAuthority && (
      <FlagBtn isProject={isProject} className="flag" address={address} isFlagged={isFlagged} />
    )}
  </a>
);

const { ownerId } = VM.require("potlock.near/widget/constants");
const { getTimePassed, _address, calcNetDonationAmount } = VM.require(
  `potlock.near/widget/Components.DonorsUtils`
);
const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getFlaggedAccounts: () => {},
};

const {
  filteredDonations,
  filter,
  handleSearch,
  sortDonation,
  currentFilter,
  hrefWithParams,
  potDetail,
  potId,
} = props;
const { admins, owner, chef, all_paid_out } = potDetail;
const SOCIAL_CONTRACT_ID = "social.near";

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const [currentPage, setCurrentPage] = useState(1);
const [flagAddress, setFlagAddress] = useState(null);
const [successFlag, setSuccessFlag] = useState(null);
const [updateFlaggedAddresses, setUpdateFlaggedAddresses] = useState(false);
const [flaggedAddresses, setFlaggedAddresses] = useState([]);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setCurrentPage(1);
}, [filter]);

useEffect(() => {
  PotSDK.getFlaggedAccounts(potDetail, potId)
    .then((data) => setFlaggedAddresses(data))
    .catch((err) => console.log("error getting the flagged accounts ", err));
}, [successFlag, updateFlaggedAddresses]);

const handleFlag = (e, address, isFlagged) => {
  e.preventDefault();
  if (isFlagged) {
    // remove flagged account
    // get latest pLBlacklistedAccounts updates
    Near.asyncView(SOCIAL_CONTRACT_ID, "get", {
      keys: [`${accountId}/profile/**`],
    }).then((profileData) => {
      const profile = profileData[accountId].profile;

      const pLBlacklistedAccounts = JSON.parse(profile.pLBlacklistedAccounts || "{}");
      const potFlaggedAcc = pLBlacklistedAccounts[potId] || {};
      delete potFlaggedAcc[address];

      const socialArgs = {
        data: {
          [accountId]: {
            profile: {
              pLBlacklistedAccounts: JSON.stringify({
                ...pLBlacklistedAccounts,
                [potId]: {
                  ...potFlaggedAcc,
                },
              }),
            },
          },
        },
      };
      const depositFloat = JSON.stringify(socialArgs).length * 0.00015;

      const socialTransaction = {
        contractName: SOCIAL_CONTRACT_ID,
        methodName: "set",
        args: socialArgs,
        deposit: Big(depositFloat).mul(Big(10).pow(24)),
      };
      Near.call(socialTransaction);

      // update flaggedAddresses
      // TODO: check if it is successful before the update
      setTimeout(() => {
        setUpdateFlaggedAddresses(!updateFlaggedAddresses);
      }, 3000);
    });
  } else {
    // open flagModal
    setFlagAddress(address);
  }
};

const potAdmins = [owner, chef, ...admins];
const hasAuthority = potAdmins.includes(accountId) && !all_paid_out;

const checkIfIsFlagged = (address) => flaggedAddresses.find((obj) => obj.potFlaggedAcc[address]);

return (
  <Container>
    <div className="transcation">
      <div className="header">
        <div
          className="address"
          onClick={() => {
            setSuccessFlag({
              address: "re.near",
              reason: "test tEST Tetset",
            });
          }}
        >
          Donor
        </div>
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
      {filteredDonations.length > 0 ? (
        filteredDonations
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((donation) => {
            const { donor_id, recipient_id, donated_at_ms, donated_at, project_id } = donation;
            const projectId = recipient_id || project_id;

            const isDonorFlagged = checkIfIsFlagged(donor_id);
            const isProjectFlagged = checkIfIsFlagged(projectId);

            const projectHref = hrefWithParams(`?tab=project&projectId=${projectId}`);
            const profileHref = hrefWithParams(`?tab=profile&accountId=${donor_id}`);
            return (
              <TrRow>
                {/* Donor */}
                <AddressItem
                  address={donor_id}
                  isFlagged={isDonorFlagged}
                  href={profileHref}
                  isProject={false}
                  className="address"
                />

                {/* Project */}

                <AddressItem
                  address={projectId}
                  isFlagged={isProjectFlagged}
                  href={projectHref}
                  isProject={true}
                  className="address project"
                />

                <div className="price">
                  <span>Donated</span>
                  <img src={nearLogo} alt="NEAR" />
                  {calcNetDonationAmount(donation).toFixed(2)}
                </div>

                <div className="date">
                  {getTimePassed(donated_at_ms || donated_at)} ago <span> to </span>
                  <AddressItem
                    address={projectId}
                    isFlagged={isProjectFlagged}
                    href={projectHref}
                    isProject={true}
                    className="project-mobile-view"
                  />
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
        data: filteredDonations,
        currentPage,
        perPage: perPage,
        bgColor: "#292929",
      }}
    />
    <Widget
      src={`${ownerId}/widget/Pots.FlagModal`}
      props={{
        ...props,
        flagAddress: flagAddress,
        isModalOpen: flagAddress != null,
        setSuccessFlag,
        onClose: () => setFlagAddress(null),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Pots.FlagSuccessModal`}
      props={{
        ...props,
        successFlag: successFlag,
        isModalOpen: successFlag != null,

        onClose: () => setSuccessFlag(null),
      }}
    />
  </Container>
);
