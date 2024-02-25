const { DONATION_CONTRACT_ID, ownerId } = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
  ownerId: "",
};
const { calcNetDonationAmount, filterByDate } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);

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

const LoadingWrapper = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const Loading = () => <LoadingWrapper>Loading...</LoadingWrapper>;

const [totalDonations, setDonations] = useState([]);
const [index, setIndex] = useState(0);
const [currentTab, setTab] = useState("Leaderboard");
const [filter, setFilter] = useState("");
const [allDonationsFetched, setAllDonationsFetched] = useState(false);
const [donationsByPage, setDonationsByPage] = useState({});
const [fetchDonationsError, setFetchDonationsError] = useState("");

const limit = 900;
const cachedDonationsValidityPeriod = 1000 * 60 * 5; // 5 minutes

if (!allDonationsFetched && !donationsByPage[index]) {
  // first, try to get from cache
  const cacheKey = `donationsByPage-${index}-${limit}`;
  const cachedDonations = Storage.get(cacheKey);
  if (cachedDonations && cachedDonations.ts > Date.now() - cachedDonationsValidityPeriod) {
    console.log("using cached donations for page ", index);
    setDonationsByPage({ ...donationsByPage, [index]: cachedDonations.val });
    if (cachedDonations.val.length === limit) {
      setIndex(index + 1);
    } else {
      setAllDonationsFetched(true);
    }
  } else if (cachedDonations !== null) {
    // null means it's loading (async)
    console.log("fetching donations for page", index);
    const startTime = Date.now();
    Near.asyncView(DONATION_CONTRACT_ID, "get_donations", {
      from_index: limit * index,
      limit: limit,
    })
      .then((donationsPart) => {
        const endTime = Date.now();
        console.log("fetched donations for index", index, "in", endTime - startTime, "ms");
        // cache the result
        Storage.set(cacheKey, { val: donationsPart, ts: Date.now() });
        setDonationsByPage({ ...donationsByPage, [index]: donationsPart });
        if (donationsPart.length === limit) {
          setIndex(index + 1);
        } else {
          setAllDonationsFetched(true);
        }
      })
      .catch((e) => {
        setFetchDonationsError(e);
      });
  }
}

const [allDonations, totalsByDonor, sortedDonations] = useMemo(() => {
  if (!allDonationsFetched) return [[], {}, []];
  let donations = Object.values(donationsByPage).flat();
  donations = donations.filter((donation) => filterByDate(filter.value, donation));
  const totalsByDonor = donations.reduce((accumulator, currentDonation) => {
    accumulator[currentDonation.donor_id] = {
      amount:
        (accumulator[currentDonation.donor_id].amount || 0) +
        calcNetDonationAmount(currentDonation),
      ...currentDonation,
    };
    return accumulator;
  }, {});
  const sortedDonations = Object.values(totalsByDonor).sort((a, b) => b.amount - a.amount);
  return [donations, totalsByDonor, sortedDonations];
}, [donationsByPage, allDonationsFetched, filter]);

const leaderboard = [
  {
    rank: "#2",
    id: sortedDonations[1].donor_id,
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
    className: "top",
    amount: sortedDonations[0].amount,
  },
  {
    rank: "#3",
    id: sortedDonations[2].donor_id,
    amount: sortedDonations[2].amount,
  },
];

const tabs = ["Leaderboard", "Transactions"];

return (
  <Container>
    {fetchDonationsError ? (
      <div>
        <h1>Error fetching donations</h1>
        <p>{fetchDonationsError}</p>
      </div>
    ) : !allDonationsFetched ? (
      <Loading />
    ) : (
      <>
        <div className="leaderboard">
          <h1>Donors Leaderboard</h1>
          <div className="cards">
            {leaderboard.map((donor) => (
              <Widget
                key={donor.id}
                src={`${ownerId}/widget/Components.DonorsCard`}
                props={{ ...props, donor }}
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
          (allDonations.length ? (
            <Widget
              src={`${ownerId}/widget/Components.DonorsTrx`}
              props={{ ...props, donations: allDonations, filter }}
            />
          ) : (
            <NoResult>No Donations</NoResult>
          ))}
        {currentTab === "Leaderboard" &&
          (sortedDonations.length ? (
            <Widget
              src={`${ownerId}/widget/Components.DonorsLeaderboard`}
              props={{ ...props, donations: sortedDonations, filter }}
            />
          ) : (
            <NoResult>No Donations</NoResult>
          ))}
      </>
    )}
  </Container>
);
