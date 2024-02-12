const { ownerId } = props;
const { calcDonations, filterByDate } = VM.require(`${ownerId}/widget/Components.DonorsUtils`);

const [totalDonations, setDonations] = useState([]);
const [index, setIndex] = useState(0);
const [page, setPage] = useState(0);
const [currentTab, setTab] = useState("Leaderboard");
const [filter, setFilter] = useState("");

const perPage = 30;

const limit = 100;

// Get all Donations
const donationsPart = Near.view("donate.potlock.near", "get_donations", {
  from_index: limit * index,
  limit: limit,
});

if (donationsPart === null) return "loading...";

if (
  donationsPart.length === limit &&
  totalDonations[totalDonations.length - 1].id !== donationsPart[donationsPart.length - 1].id
) {
  setIndex(index + 1);
  setDonations([...totalDonations, ...donationsPart]);
  return "loading...";
}
let donations = [...totalDonations];

if (donationsPart.length < limit) {
  donations.push(...donationsPart);
}

// Filter Donation
donations = donations.filter((donation) => filterByDate(filter.value, donation));

const uniqueDonations = donations.reduce((accumulator, currentDonation) => {
  const existingDonation = accumulator.find((item) => item.donor_id === currentDonation.donor_id);

  if (existingDonation) {
    // Update the total amount if the donor_id already exists
    existingDonation.amount += calcDonations(currentDonation);
  } else {
    // Add a new entry if the donor_id doesn't exist
    accumulator.push({
      ...currentDonation,
      amount: calcDonations(currentDonation),
    });
  }

  return accumulator;
}, []);

// Sorted Unique Donors according to amount
const sortedDonations = uniqueDonations.sort((a, b) => b.amount - a.amount);

const Container = styled.div`
  --primary-color: #dd3345;
  display: flex;
  flex-direction: column;

  .leaderboard {
    width: 100%;
    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-top: 20px;
    }
    .cards {
      display: flex;
      gap: 3rem;
      margin-top: 2rem;
      margin-bottom: 5rem;
      > div {
        width: 30%;
        display: flex;
      }
      .top {
        width: 40%;
        scale: 1.05;
      }
      @media only screen and (max-width: 670px) {
        flex-direction: column;
        justify-content: center;
        > div {
          width: 100%;
          display: flex;
        }
        .top {
          scale: 1;
          width: 100%;
        }
      }
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  font-size: 14px;
  color: rgb(123, 123, 123);
  margin-bottom: 2rem;
  div {
    transition: all 300ms;
    cursor: pointer;
    font-weight: 500;
    :hover {
      color: black;
    }
    &.active {
      color: black;
    }
  }
  .select {
    width: fit-content;
  }
`;

const NoResult = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const rank1 = Social.getr(`${sortedDonations[0].donor_id}/profile`);
const rank2 = Social.getr(`${sortedDonations[1].donor_id}/profile`);
const rank3 = Social.getr(`${sortedDonations[2].donor_id}/profile`);

if (rank1 === null || rank2 === null || rank3 === null) return "loading...";

console.log("rank1", rank1);
console.log("rank2", rank2);
console.log("rank3", rank3);

const leaderboard = [
  {
    rank: "#2",
    id: sortedDonations[1].donor_id,
    amount: sortedDonations[1].amount,
    profile: rank2,
  },
  {
    rank: (
      <img
        src="https://ipfs.near.social/ipfs/bafkreigpq56kv3p4kjtneiclx6sne3qrxtg5jho34yq2j6nnxli3p7aboe"
        alt="top"
      />
    ),
    id: sortedDonations[0].donor_id,
    name: rank1.name || sortedDonations[0].donor_id,
    className: "top",
    amount: sortedDonations[0].amount,
    profile: rank1,
  },
  {
    rank: "#3",
    id: sortedDonations[2].donor_id,
    amount: sortedDonations[2].amount,
    profile: rank3,
  },
];

const tabs = ["Leaderboard", "Transactions"];

return (
  <Container>
    <div className="leaderboard">
      <h1>Donors Leaderboard</h1>
      <div className="cards">
        {leaderboard.map((donation) => (
          <Widget
            key={donation.id}
            src={`${ownerId}/widget/Components.DonorsCard`}
            props={{ ...props, donation }}
          />
        ))}
      </div>
    </div>
    <Tabs>
      {tabs.map((tab) => (
        <div key={tab} className={currentTab === tab && "active"} onClick={() => setTab(tab)}>
          {tab}
        </div>
      ))}
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          noLabel: true,
          placeholder: "Filter",
          containerStyles: { width: "fit-content", marginLeft: "auto", color: "black" },
          options: [
            { text: "Today", value: "day" },
            { text: "Last Week", value: "week" },
            { text: "Last Month", value: "month" },
            { text: "All Time", value: "all" },
          ],
          value: filter,
          onChange: (filter) => {
            setFilter(filter);
          },
        }}
      />
    </Tabs>

    {currentTab === "Transactions" &&
      (donations.length ? (
        <Widget
          src={`${ownerId}/widget/Components.DonorsTrx`}
          props={{ ...props, donations: donations }}
        />
      ) : (
        <NoResult>No Donations</NoResult>
      ))}
    {currentTab === "Leaderboard" &&
      (sortedDonations.length ? (
        <Widget
          src={`${ownerId}/widget/Components.DonorsLeaderboard`}
          props={{ ...props, donations: sortedDonations }}
        />
      ) : (
        <NoResult>No Donations</NoResult>
      ))}
  </Container>
);
