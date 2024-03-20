const { projectId, donations, hrefWithParams } = props;
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const { nearToUsd } = VM.require("potlock.near/widget/utils") || {
  nearToUsd: 1,
};

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  _address: () => "",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .search-bar > div {
    background: white;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: white;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2), 0px 2px 4px -2px rgba(82, 82, 82, 0.3);
  border: 1px solid rgba(41, 41, 41, 0.5);
  padding-bottom: 1rem;
  .transaction {
    display: flex;
    flex-direction: column;
    width: 100%;
    .header {
      background: #f6f5f3;
      color: black;
      font-weight: 600;
      div {
        width: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .address {
        width: 160px;
        text-align: center;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      margin: 8px 16px;
    }
    .type {
      width: 150px;
    }
    @media only screen and (max-width: 992px) {
      > div {
        margin: 0;
      }
      .header .address {
        width: 130px;
      }
      .header div {
        font-size: 12px;
      }
    }
    @media only screen and (max-width: 480px) {
      > div {
        padding: 1rem 0.5rem;
        gap: 0.5rem;
      }
      .header .address {
        width: 120px;
      }
      .header div {
        width: 50px;
        font-size: 10px;
      }
    }
  }
`;

const TrRow = styled.div`
  > div,
  > span {
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #292929;
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
    width: 160px;
    justify-content: flex-start;
    padding: 10px;
    border-radius: 2px;
    transition: all 200ms;
    p {
      text-align: center;
      margin: 0;
    }
    .profile-image {
      margin-right: 1rem;
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0;
    }
    :hover {
      background: #f6f5f3;
    }
  }
  @media only screen and (max-width: 992px) {
    > div,
    > span {
      font-size: 12px;
    }
    .price {
      gap: 0.5rem;
      img {
        width: 1rem;
      }
    }
    .address {
      font-size: 12px;
      width: 120px;
      padding: 4px;
      .profile-image {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    > div,
    > span {
      font-size: 10px;
      width: 50px;
    }
    .address {
      font-size: 10px;
      .profile-image {
        margin-right: 0.5rem;
      }
    }
  }
`;
const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0;
  .label {
    color: #7b7b7b;
  }
  .item,
  .count {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .amount {
    font-weight: 600;
  }
  .count {
    margin-left: auto;
  }
  .count .amount {
    color: #dd3345;
  }
  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Filter = styled.div`
  display: flex;
  position: relative;
  img {
    height: 1rem;
    cursor: pointer;
  }
`;

const Search = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #dbdbdb;
  img {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  input {
    padding: 1rem 0;
    padding-left: 3rem;
    width: 100%;
    &:focus {
      border: none;
      box-shadow: none;
    }
  }
`;

const APPLICATIONS_FILTERS = projectId
  ? {
      ALL: "All donations",
      DIRECT: "Direct donations",
      MATCHED_DONATIONS: "Matched donations",
    }
  : {
      ALL: "All donations",
      DIRECT: "Direct donations",
      SPONSORSHIP: "Sponsorship",
      MATCHED_DONATIONS: "Matched donations",
    };

const [currentPage, setCurrentPage] = useState(1);
const [totalDonations, setTotalDonation] = useState(donations);
const [filteredDonations, setFilteredDonations] = useState(donations);
const [search, setSearch] = useState("");
const [sortVal, setSortVal] = useState(APPLICATIONS_FILTERS.ALL);
const perPage = 30; // need to be less than 50

const totalAmountNear = useMemo(() => {
  let total = Big(0);
  donations.forEach((donation) => {
    if (donation.ft_id === "near" || donation.base_currency === "near") {
      total = total.plus(Big(donation.total_amount));
    }
  });
  return total;
}, [donations]);

const totalDonationAmountNear = SUPPORTED_FTS["NEAR"].fromIndivisible(totalAmountNear.toString());

const stats = [
  ...(nearToUsd
    ? [{ label: "Donated", amount: (totalDonationAmountNear * nearToUsd).toFixed(2) }]
    : []),
];

useEffect(() => {
  setTotalDonation(donations);
  setFilteredDonations(donations);
}, [donations]);

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

const sortDonations = (sortVal) => {
  const displayedDonations = searchDonations(search);
  let filtered;
  if (sortVal && sortVal !== APPLICATIONS_FILTERS.ALL) {
    filtered = displayedDonations.filter((donation) => {
      return APPLICATIONS_FILTERS[donation.type] === sortVal;
    });
    return filtered;
  } else {
    return displayedDonations;
  }
};

const getName = (donation) => {
  switch (APPLICATIONS_FILTERS[donation.type]) {
    case APPLICATIONS_FILTERS.DIRECT:
      return _address(donation.recipient_id);
    case APPLICATIONS_FILTERS.SPONSORSHIP:
      return _address(donation.pot_name);
    case APPLICATIONS_FILTERS.MATCHED_DONATIONS:
      return (
        <p>
          &lt;{_address(donation.pot_name)}&gt;
          <br /> {_address(donation.project_id)}
        </p>
      );
    default:
      return _address(donation.recipient_id);
  }
};

return (
  <Container>
    <Stats>
      {stats.map((stat) => (
        <div className="item">
          <div className="amount">${stat.amount}</div>
          <div className="label">{stat.label}</div>
        </div>
      ))}
      <div className="count">
        <div className="label">ALL DONATIONS</div>
        <div className="amount">{donations.length}</div>
      </div>
    </Stats>
    <div className="search-bar">
      <Widget
        src={`${ownerId}/widget/Project.SearchBar`}
        props={{
          title: sortVal,
          tab: tab,
          numItems: donations.length,
          itemName: "donation",
          sortList: Object.values(APPLICATIONS_FILTERS),
          setSearchTerm: (value) => {
            setSearch(value);
            const filtered = searchDonations(value);
            setFilteredDonations(filtered);
          },
          handleSortChange: (sortVal) => {
            const filtered = sortDonations(sortVal);
            setFilteredDonations(filtered);
            setSortVal(sortVal);
          },
        }}
      />
    </div>
    <Table>
      <div className="transaction">
        <div className="header">
          <div className="address">{projectId ? "Donor" : "Project Name"}</div>
          <div className="type">Type</div>
          <div>Amount</div>
          <div>Extra Fee</div>
        </div>
        {!filteredDonations.length && <div>No donations to display</div>}
        {filteredDonations
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((donation) => {
            const {
              recipient_id,
              donor_id,
              total_amount,
              pot_id,
              base_currency,
              ft_id,
              referrer_fee,
              chef_fee,
              protocol_fee,
              type,
              project_id,
            } = donation;

            const isPot = !!pot_id;
            const donationAmount =
              SUPPORTED_FTS[(base_currency || ft_id).toUpperCase()].fromIndivisible(total_amount);

            const recepientUrl = isPot
              ? `?tab=pot&potId=${pot_id}`
              : `?tab=project&projectId=${recipient_id}`;
            const profileUrl = `?tab=profile&accountId=${donor_id}`;
            const url = projectId ? profileUrl : recepientUrl;

            const name = projectId ? _address(donor_id) : getName(donation);
            const profileImg = projectId ? donor_id : project_id || recipient_id;

            const fees = SUPPORTED_FTS[(base_currency || ft_id).toUpperCase()].fromIndivisible(
              referrer_fee || 0 + chef_fee || 0 + protocol_fee || 0,
              3
            );
            return (
              <TrRow>
                <a href={hrefWithParams(url)} className="address" target="_blank">
                  {type === "SPONSORSHIP" ? (
                    <img
                      className="profile-image"
                      src="https://ipfs.near.social/ipfs/bafkreib447lbtzgo4mbegsush6ybv5evwreeydgmlg2agn6vxlsf5gpmdq"
                      alt="pot"
                    />
                  ) : (
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: profileImg, style: {} }}
                    />
                  )}
                  {name}
                </a>
                <div className="type">{APPLICATIONS_FILTERS[type]}</div>
                <div className="price">
                  <img src={nearLogo} alt="NEAR" />
                  {donationAmount}
                </div>
                <div className="price">
                  <img src={nearLogo} alt="NEAR" />
                  {fees}
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
          data: donations,
          currentPage,
          perPage: perPage,
          bgColor: "#7B7B7B",
        }}
      />
    </Table>
  </Container>
);
