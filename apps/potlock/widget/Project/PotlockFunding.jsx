const {
  hrefWithParams,
  donations,
  directDonations,
  matchingRoundDonations,
  potPayouts,
  sponsorships,
  projectId,
  totalDonationAmountNear,
  uniqueDonors,
  totalMatched,
} = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const { _address, getTimePassed } = VM.require(`potlock.near/widget/Components.DonorsUtils`) || {
  _address: () => "",
  getTimePassed: () => "",
};
const { nearToUsd } = VM.require("potlock.near/widget/utils");

const [filter, setFilter] = useState({
  date: false, // false === ascending
  price: false, // false === ascending
});
const [currentFilter, setCurrentFilter] = useState("date");
const [sort, setSort] = useState("all");
const [currentPage, setCurrentPage] = useState(1);
const [totalDonations, setTotalDonations] = useState(donations);
const [filteredDonations, setFilteredDonations] = useState(donations);
const [search, setSearch] = useState("");

const perPage = 30; // need to be less than 50

useEffect(() => {
  setTotalDonations(donations);
  setFilteredDonations(donations);
}, [donations]);

const sortList = {
  all: {
    label: "All donations",
    val: "all",
    count: donations?.length,
  },
  direct: {
    label: "Direct donations",
    val: "direct",
    count: directDonations?.length,
  },
  matched: {
    label: "Matched donations",
    val: "matched",
    count: matchingRoundDonations?.length,
  },
  ...(projectId
    ? {
        payout: {
          label: "Matching pool allocations",
          val: "payout",
          count: potPayouts?.length,
        },
      }
    : {
        sponsorship: {
          label: "Sponsorships",
          val: "sponsorship",
          count: sponsorships?.length,
        },
      }),
};

const searchDonations = (searchTerm) => {
  const filteredApplications = totalDonations.filter((item) => {
    const searchIn = [
      item.pot_name || "",
      item.recipient_id || "",
      item.project_id || "",
      item.donor_id || "",
      item.pot_id || "",
    ];
    return searchIn.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  return filteredApplications;
};

const getDate = (donation) => donation.donated_at_ms || donation.donated_at;

const sortDonation = (type) => {
  setCurrentFilter(type);
  const sort = !filter[type];
  setFilter({ ...filter, [type]: sort });
  if (type === "price") {
    const sortedDonations = filteredDonations.sort((a, b) =>
      sort ? b.total_amount - a.total_amount : a.total_amount - b.total_amount
    );
    setFilteredDonations(sortedDonations);
  } else if (type === "date") {
    const sortedDonations = filteredDonations.sort((a, b) => {
      return sort ? getDate(a) - getDate(b) : getDate(b) - getDate(a);
    });
    setFilteredDonations(sortedDonations);
  }
};

const filterDonations = (sortVal) => {
  const displayedDonations = searchDonations(search);
  let filtered;
  if (sortVal && sortVal !== "all") {
    filtered = displayedDonations.filter((donation) => {
      return sortList[donation.type].val === sortVal;
    });
    return filtered;
  } else {
    return displayedDonations;
  }
};

const getName = (donation) => {
  switch (donation.type) {
    case "direct":
      return projectId ? donation.donor_id : donation.recipient_id;
    case "sponsorship":
      return donation.pot_name;
    case "payout":
      return donation.pot_name;
    case "matched":
      return projectId ? donation.donor_id : donation.project_id;
    default:
      return projectId ? donation.donor_id : donation.recipient_id;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const PotlockFunding = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  background: #fff;
  overflow: hidden;
  .header {
    border-bottom: 0.5px solid #7b7b7b;
    padding: 0.5rem 1rem;
    div {
      font-weight: 600;
    }
    @media screen and (max-width: 768px) {
      .tab {
        display: none;
      }
      .funding {
        display: block;
      }
    }
  }
  .funding-row {
    padding: 1rem;
  }
  .header,
  .funding-row {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    font-size: 14px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      gap: 4px;
    }
  }
  .tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 156px;
    justify-content: left;
    &.sort {
      cursor: pointer;
      svg {
        transition: rotate 300ms;
      }
    }
    @media screen and (max-width: 768px) {
      white-space: nowrap;
      width: 60px;
    }
  }
  .funding {
    flex: 1;
  }
  .price {
    gap: 1rem;
    font-weight: 600;
    justify-content: left;
    svg {
      width: 1.5em;
    }
  }
  .date {
    justify-content: right;
  }
  @media screen and (max-width: 768px) {
    .price {
      gap: 0.5rem;
    }
    .date {
      width: 100%;
      justify-content: left;
      color: #7b7b7b;
      margin-left: 2.5rem;
    }
  }
`;

const FundingSrc = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 100%;
  gap: 1rem;
  .profile-image {
    width: 24px;
    height: 24px;
  }
  .funding-src {
    display: flex;
    flex-direction: column;
    .pot-name {
      color: inherit;
      font-weight: inherit;
      display: none;
    }
    a {
      color: #292929;
      transition: 300ms;
      font-weight: 600;
      :hover {
        text-decoration: none;
        color: #dd3345;
      }
    }
    .type {
      color: #7b7b7b;
    }
  }
  @media screen and (max-width: 768px) {
    .funding-src .type {
      display: none;
    }
    .funding-src .pot-name {
      display: inline-block;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f6f5f3;
  position: relative;
  svg {
    width: 18px;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    pointer-events: none;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-left: 50px;
    border: none;
    background: transparent;
    :focus {
      outline: none;
    }
  }
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 24px 0;
  align-items: center;
  .item {
    display: flex;
    height: fit-content;
    gap: 8px;
    padding-right: 1rem;
    align-items: center;
    :nth-child(2) {
      border-right: 1px solid #7b7b7b;
      border-left: 1px solid #7b7b7b;
      padding-left: 1rem;
    }
    :nth-child(3) {
      padding-left: 1rem;
    }
    .item-value {
      font-weight: 600;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .dropdown {
    margin-left: auto;
    @media screen and (max-width: 480px) {
      margin-right: auto;
      margin-left: 0;
    }
  }
`;

const Sort = styled.div`
  display: none;
  justify-content: space-between;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    gap: 8px;
    color: #7b7b7b;
    svg {
      transition: rotate 300ms;
    }
    &.active {
      color: #292929;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const DropdownLabel = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .label {
    font-weight: 500;
  }
  .count {
    display: flex;
    width: ${({ digit }) => 24 + (digit - 1) * 6}px;
    height: ${({ digit }) => 24 + (digit - 1) * 6}px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #ebebeb;
  }
`;

const ImgIcon = styled.img`
  width: 21px;
  height: 21px;
`;
const stats = {
  ...(totalDonationAmountNear
    ? {
        Donated: (
          <>
            {totalDonationAmountNear}N
            {nearToUsd && <span>~${(totalDonationAmountNear * nearToUsd).toFixed(2)}</span>}
          </>
        ),
      }
    : {}),
  ...(uniqueDonors ? { [`Unique donor${uniqueDonors === 1 ? "" : "s"}`]: uniqueDonors } : {}),
  ...(uniqueDonors ? { "Total Matched": totalMatched + "N" } : {}),
};

const NearIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="near-logo">
    <rect width="24" height="24" rx="12" fill="#CECECE" />
    <path
      d="M15.616 6.61333L13.1121 10.3333C12.939 10.5867 13.2719 10.8933 13.5117 10.68L15.9756 8.53333C16.0422 8.48 16.1354 8.52 16.1354 8.61333V15.32C16.1354 15.4133 16.0155 15.4533 15.9623 15.3867L8.50388 6.45333C8.26415 6.16 7.91787 6 7.53163 6H7.26526C6.5727 6 6 6.57333 6 7.28V16.72C6 17.4267 6.5727 18 7.27858 18C7.71809 18 8.13097 17.7733 8.3707 17.3867L10.8746 13.6667C11.0477 13.4133 10.7148 13.1067 10.475 13.32L8.0111 15.4533C7.94451 15.5067 7.85128 15.4667 7.85128 15.3733V8.68C7.85128 8.58667 7.97114 8.54667 8.02442 8.61333L15.4828 17.5467C15.7225 17.84 16.0821 18 16.4551 18H16.7214C17.4273 18 18 17.4267 18 16.72V7.28C18 6.57333 17.4273 6 16.7214 6C16.2686 6 15.8557 6.22667 15.616 6.61333Z"
      fill="black"
    />
  </svg>
);

const ProfileImg = ({ address }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: address, style: {} }} />
);

const PotIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3ZM12 2C12 2.37912 11.8945 2.7336 11.7113 3.03569C14.6721 3.33449 17.0882 5.47841 17.7921 8.3C17.9279 8.84425 18 9.41371 18 10H16.3H3.7H2C2 9.41371 2.07208 8.84425 2.20786 8.3C2.9118 5.47841 5.3279 3.33449 8.28871 3.03569C8.10549 2.7336 8 2.37912 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM9 4.7C6.66751 4.7 4.68694 6.20674 3.97852 8.3H16.0215C15.3131 6.20674 13.3325 4.7 11 4.7H9ZM0 11H2H4H16H18H20V13H18V19C18 20.1046 17.1046 21 16 21H4C2.89543 21 2 20.1046 2 19V13H0V11ZM4 19V13H16V19H4Z"
      fill="#7B7B7B"
    />
  </svg>
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

const [ftMetadata, setFtMetadata] = useState({});

useEffect(() => {
  // Fetches FT metadata (required for icons & decimals)
  const metadata = {};
  const ftIds = totalDonations.reduce((acc, donation) => {
    if (donation.ft_id && donation.ft_id !== "near") {
      acc.add(donation.ft_id);
    }
    return acc;
  }, new Set());
  ftIds.forEach((ftId) => {
    Near.asyncView(ftId, "ft_metadata", {})
      .then((ftMetadata) => {
        metadata[ftId] = ftMetadata;
        if (Object.keys(metadata).length === ftIds.size) {
          setFtMetadata(metadata);
        }
      })
      .catch((e) => {
        console.error("error getting ft metadata: ", e);
      });
  });
}, [totalDonationa]);

return (
  <Container>
    {projectId && <Title>Potlock Funding</Title>}
    <Stats>
      {Object.keys(stats).map((k) => (
        <div className="item">
          <div className="item-value">{stats[k]}</div>
          <div className="item-label">{k}</div>
        </div>
      ))}
      <div className="dropdown">
        <Widget
          src={`${ownerId}/widget/Inputs.Dropdown`}
          props={{
            sortVal: (
              <DropdownLabel digit={sortList[sort].count.toString().length}>
                <div className="label">{sortList[sort].label}</div>
                <div className="count">{sortList[sort].count}</div>
              </DropdownLabel>
            ),
            showCount: true,
            sortList: Object.values(sortList),
            FilterMenuCustomStyle: `left:auto; right:0;`,
            handleSortChange: ({ val }) => {
              const filtered = filterDonations(val);
              setFilteredDonations(filtered);
              setSort(val);
            },
          }}
        />
      </div>
    </Stats>
    <Sort>
      <div
        onClick={() => sortDonation("date")}
        className={`${currentFilter === "date" ? "active" : ""}`}
      >
        Sort Date {currentFilter === "date" && <Arrow active={!filter.date} />}
      </div>
      <div
        onClick={() => sortDonation("price")}
        className={`${currentFilter === "price" ? "active" : ""}`}
      >
        Sort Amount {currentFilter === "price" && <Arrow active={filter.price} />}
      </div>
    </Sort>
    <PotlockFunding>
      <div className="header">
        <div className="funding tab">{projectId ? "Funding Source" : "Project Name"}</div>
        <div className="tab sort" onClick={() => sortDonation("price")}>
          Amount {currentFilter === "price" && <Arrow active={filter.price} />}
        </div>
        <div className="tab sort date" onClick={() => sortDonation("date")}>
          Date {currentFilter === "date" && <Arrow active={!filter.date} />}
        </div>
      </div>
      <SearchBar>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.7549 14.2549H14.9649L14.6849 13.9849C15.6649 12.8449 16.2549 11.3649 16.2549 9.75488C16.2549 6.16488 13.3449 3.25488 9.75488 3.25488C6.16488 3.25488 3.25488 6.16488 3.25488 9.75488C3.25488 13.3449 6.16488 16.2549 9.75488 16.2549C11.3649 16.2549 12.8449 15.6649 13.9849 14.6849L14.2549 14.9649V15.7549L19.2549 20.7449L20.7449 19.2549L15.7549 14.2549ZM9.75488 14.2549C7.26488 14.2549 5.25488 12.2449 5.25488 9.75488C5.25488 7.26488 7.26488 5.25488 9.75488 5.25488C12.2449 5.25488 14.2549 7.26488 14.2549 9.75488C14.2549 12.2449 12.2449 14.2549 9.75488 14.2549Z"
            fill="#C7C7C7"
          />
        </svg>
        <input
          className=""
          placeholder="Search funding"
          onChange={(e) => {
            if (currentPage !== 1) setCurrentPage(1);
            setSearch(e.target.value);
            const filtered = searchDonations(e.target.value);
            setFilteredDonations(filtered);
          }}
          type="text"
        />
      </SearchBar>
      {filteredDonations
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .map((donation) => {
          const {
            donor_id,
            total_amount,
            amount,
            pot_id,
            recipient_id,
            project_id,
            paid_at,
            base_currency,
            ft_id,
            type,
            donated_at,
            donated_at_ms,
          } = donation;

          const ftId = ft_id || base_currency;

          const donationAmount = parseFloat(
            Big(total_amount || amount)
              .div(Big(10).pow(ftId === "near" ? 24 : ftMetadata[ftId]?.decimals || 24))
              .toFixed(2)
          );
          const addTrailingZeros = (number) => {
            if ((number < 100) & (number >= 0.1)) return number.toFixed(1);
            return number;
          };
          const isPot = type === "payout" || type === "sponsorship";

          const url = isPot
            ? `?tab=pot&potId=${pot_id}`
            : projectId
            ? `?tab=profile&accountId=${donor_id}`
            : `?tab=project&projectId=${project_id || recipient_id}`;

          const name = _address(getName(donation), 15);

          return (
            <div className="funding-row">
              <FundingSrc>
                {isPot ? (
                  <PotIcon className="profile-image" />
                ) : (
                  <ProfileImg address={projectId ? donor_id : recipient_id || project_id} />
                )}
                <div className="funding-src">
                  <a href={hrefWithParams(url)} target="_blank">
                    {isPot && (
                      <span className="pot-name"> {projectId ? "Matching Pool" : "Sponsor"} :</span>
                    )}{" "}
                    {name}
                  </a>
                  <div className="type">{sortList[type].label?.slice(0, -1)}</div>
                </div>
              </FundingSrc>
              <div className="price tab">
                <div className="near-icon">
                  {ftId === "near" ? <NearIcon /> : <ImgIcon src={ftMetadata[ftId]?.icon} />}
                </div>
                {addTrailingZeros(donationAmount)}
              </div>
              <div className="tab date">
                {getTimePassed(donated_at_ms || donated_at || paid_at, true)} ago
              </div>
            </div>
          );
        })}
      {filteredDonations.length === 0 && <div className="funding-row">No Donations</div>}
    </PotlockFunding>
    <Widget
      src={`${ownerId}/widget/Components.Pagination`}
      props={{
        onPageChange: (page) => {
          setCurrentPage(page);
        },
        data: filteredDonations,
        currentPage,
        perPage: perPage,
        bgColor: "#7B7B7B",
      }}
    />
  </Container>
);
