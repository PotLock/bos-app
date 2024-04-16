// get donations
const {
  potId,
  allDonations,
  potDetail: { base_currency },
} = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const { getTimePassed, _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  getTimePassed: () => "",
  _address: (address) => address,
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getPublicRoundDonations: () => {},
};

State.init({
  filteredDonations: [],
  currentFilter: "date",
  filter: {
    date: false, // false === ascending
    price: false, // false === ascending
  },
});

const { filteredDonations, currentFilter, filter } = state;

useEffect(() => {
  if (allDonations && filteredDonations.length === 0) {
    const sortedDonations = [...allDonations].reverse();
    State.update({ filteredDonations: sortedDonations });
  }
}, [allDonations]);
if (!allDonations) return <div class="spinner-border text-secondary" role="status" />;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  gap: 1.5rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding-right: 10px;
  }
`;

const OuterText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const DonationsCount = styled.div`
  font-size: 16px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px rgba(41, 41, 41, 0.5) solid;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2);
  border-radius: 2px;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const Sort = styled.div`
  display: none;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;
  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    gap: 8px;
    color: #7b7b7b;
    &.active {
      color: #292929;
    }
    svg {
      transition: rotate 300ms;
    }
  }
  @media screen and (max-width: 768px) {
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

const searchDonations = (searchTerm) => {
  // filter donations that match the search term (donor_id, project_id)
  const filteredDonations = allDonations.filter((donation) => {
    const { donor_id, project_id } = donation;
    const searchFields = [donor_id, project_id];

    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  return filteredDonations;
};

const sortDonation = (type) => {
  const sort = !filter[type];
  State.update({ currentFilter: type, filter: { ...filter, [type]: sort } });
  if (type === "price") {
    const sortedDonations = filteredDonations.sort((a, b) =>
      sort ? b.total_amount - a.total_amount : a.total_amount - b.total_amount
    );
    State.update({ filteredDonations: sortedDonations });
  } else if (type === "date") {
    const sortedDonations = filteredDonations.sort((a, b) => {
      return sort ? b.donated_at - a.donated_at : a.donated_at - b.donated_at;
    });
    State.update({ filteredDonations: sortedDonations });
  }
};

const handleSearch = ({ target: { value } }) => {
  const filteredDonations = searchDonations(value);
  State.update({ filteredDonations });
};

const ProfileImg = (address) => (
  <Widget
    src={`${ownerId}/widget/Project.ProfileImage`}
    props={{
      ...props,
      accountId: address,
      style: {},
    }}
  />
);

return (
  <Container>
    <OuterTextContainer>
      <OuterText>All donations</OuterText>
      <DonationsCount>{allDonations.length}</DonationsCount>
    </OuterTextContainer>
    <Sort>
      <div
        className={`${currentFilter === "date" ? "active" : ""}`}
        onClick={() => sortDonation("date")}
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
    <Widget
      src={`${ownerId}/widget/Pots.DonationsTable`}
      props={{
        ...props,
        filteredDonations,
        filter,
        currentFilter,
        handleSearch,
        sortDonation,
      }}
    />
  </Container>
);
