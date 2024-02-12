const { ownerId } = props;
const { calcDonations, reverseArr } = VM.require(`${ownerId}/widget/Components.DonorsUtils`);

const [totalDonations, setDonations] = useState([]);
const [index, setIndex] = useState(0);
const [page, setPage] = useState(0);
const [currentTab, setTab] = useState("Leaderboard");

const perPage = 30; // need to be less than 50

const limit = 100;

// Get all Donations
const donationsPart = Near.view("donate.potlock.near", "get_donations", {
  from_index: limit * index,
  limit: limit,
});

if (donationsPart === null) return "loading";

if (
  donationsPart.length === limit &&
  totalDonations[totalDonations.length - 1].id !== donationsPart[donationsPart.length - 1].id
) {
  setIndex(index + 1);
  setDonations([...totalDonations, ...donationsPart]);
  return "loading";
}
const donations = [...totalDonations];

if (donationsPart.length < limit) {
  donations.push(...donationsPart);
}

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

const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: scroll;
  .header {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 1rem;
    background: var(--primary-color);
    color: white;
    margin-bottom: 1rem;
    min-width: 600px;
    div {
      text-align: center;
    }
  }
`;
const Tabs = styled.div`
  display: flex;
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
`;

const rank1 = Social.getr(`${sortedDonations[0].donor_id}/profile`);
const rank2 = Social.getr(`${sortedDonations[1].donor_id}/profile`);
const rank3 = Social.getr(`${sortedDonations[2].donor_id}/profile`);

if (rank1 === null || rank2 === null || rank3 === null) return "loading";

const leaderboard = [
  {
    rank: "#2",
    id: sortedDonations[1].donor_id,
    name: rank2.name || sortedDonations[1].donor_id,
    description: rank2.description || "-",
    image: rank2.image,
    backgroundImage: rank2.backgroundImage,
    amount: sortedDonations[1].amount,
  },
  {
    rank: (
      <img
        src="https://ipfs.near.social/ipfs/bafkreigpq56kv3p4kjtneiclx6sne3qrxtg5jho34yq2j6nnxli3p7aboe"
        alt="top"
      />
    ),
    id: sortedDonations[0].donor_id,
    name: rank2.name || sortedDonations[0].donor_id,
    className: "top",
    description: rank1.description || "-",
    image: rank1.image,
    backgroundImage: rank1.backgroundImage,
    amount: sortedDonations[0].amount,
  },
  {
    rank: "#3",
    id: sortedDonations[2].donor_id,
    name: rank2.name || sortedDonations[2].donor_id,
    description: rank3.description || "-",
    image: rank3.image,
    backgroundImage: rank3.backgroundImage,
    amount: sortedDonations[2].amount,
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
            props={{ donation, ownerId }}
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
    </Tabs>
    {currentTab === "Transactions" && (
      <Transactions>
        <div className="header">
          <div>ID</div>
          <div>Donor ID</div>
          <div>Amount</div>
          <div>Project ID</div>
          <div>Date</div>
        </div>
        {reverseArr(donations)
          .slice(page * perPage, (page + 1) * perPage)
          .map((donation) => {
            return (
              <Widget
                key={donation.id}
                src={`${ownerId}/widget/Components.DonorsRow`}
                props={{ donation, ownerId }}
              />
            );
          })}
      </Transactions>
    )}
    {currentTab === "Leaderboard" && (
      <Transactions>
        <div className="header">
          <div>Rank</div>
          <div>Name</div>
          <div>Amount</div>
          <div>Amount (USD)</div>
          <div>Percentage Share</div>
        </div>
        {setDonations.slice(page * perPage, (page + 1) * perPage).map((donation) => {
          return (
            <Widget
              key={donation.id}
              src={`${ownerId}/widget/Components.DonorsRow`}
              props={{ donation, ownerId }}
            />
          );
        })}
      </Transactions>
    )}
    <Widget
      src="baam25.near/widget/pagination"
      props={{
        onClick: (page) => {
          setPage(page);
        },
        data: donations,
        page: page,
        perPage: perPage,
        bgColor: "var(--primary-color)",
      }}
    />
  </Container>
);
