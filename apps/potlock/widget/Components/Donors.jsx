const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { calcNetDonationAmount, filterByDate } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const pots = PotFactorySDK.getPots();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetMatchingPoolDonations: () => {},
};

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    asyncGetDonations: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const Container = styled.div`
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
          order: -1;
          scale: 1;
          width: 100%;
        }
      }
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  font-size: 14px;
  margin-bottom: 24px;
  .menu-item {
    font-weight: 600;
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
  }
  .selected {
    gap: 10px;
    .label {
      text-transform: uppercase;
      color: #7b7b7b;
    }
    .count {
      color: #dd3345;
    }
  }
  .select {
    width: fit-content;
  }
`;

const LoadingWrapper = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const Filter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .option {
    padding: 0.8em 1em;
    border-radius: 8px;
    color: #292929;
    box-shadow: 0px -1px 0px 0px #dbdbdb inset, 0px 0px 0px 0.5px #dbdbdb;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    &.active,
    :hover {
      background: #292929;
      color: white;
    }
  }
  @media only screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const Loading = () => <LoadingWrapper>Loading...</LoadingWrapper>;

const [index, setIndex] = useState(0);
const [currentTab, setTab] = useState("leaderboard");
const [title, setTitle] = useState("");
const [filter, setFilter] = useState("");
const [allDonationsFetched, setAllDonationsFetched] = useState(false);
const [donationsByPage, setDonationsByPage] = useState({});
const [sponsorsByPage, setSponsorsByPage] = useState({});
const [fetchDonationsError, setFetchDonationsError] = useState("");

const limit = 900;
const cachedDonationsValidityPeriod = 1000 * 60 * 5; // 5 minutes

const getSponsorshipDonations = (potId) => {
  return PotSDK.asyncGetMatchingPoolDonations(potId).then((donations) => {
    if (sponsorsByPage[potId]) return "";
    setSponsorsByPage((prevSponsorsByPage) => {
      Storage.set("sponsorsByPage", {
        val: { ...prevSponsorsByPage, [potId]: donations },
        ts: Date.now(),
      });
      return { ...prevSponsorsByPage, [potId]: donations };
    });
  });
};

// Get Sponsorship Donations

if (pots && !sponsorsByPage[pots[pots.length - 1].id]) {
  const cachedSponsors = Storage.get("sponsorsByPage");
  if (cachedSponsors && cachedSponsors.ts > Date.now() - cachedDonationsValidityPeriod) {
    console.log("using cached sponsors");
    setSponsorsByPage(cachedSponsors.val);
  } else if (cachedSponsors !== null) {
    pots.forEach((pot) => {
      getSponsorshipDonations(pot.id, potDetail);
    });
  }
}

const sponsors = useMemo(() => {
  if (!sponsorsByPage[pots[pots.length - 1].id]) return [];
  let sponsors = Object.values(sponsorsByPage).flat();
  sponsors = sponsors.filter((donation) => filterByDate(filter, donation));
  sponsors = sponsors.reduce((accumulator, currentDonation) => {
    accumulator[currentDonation.donor_id] = {
      amount:
        (accumulator[currentDonation.donor_id].amount || 0) +
        calcNetDonationAmount(currentDonation),
      ...currentDonation,
    };
    return accumulator;
  }, {});
  sponsors = Object.values(sponsors).sort((a, b) => b.amount - a.amount);
  return sponsors;
}, [sponsorsByPage, filter]);

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
    DonateSDK.asyncGetDonations(limit * index, limit)
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
  donations = donations.filter((donation) => filterByDate(filter, donation));
  const totalsByDonor = donations.reduce((accumulator, currentDonation) => {
    accumulator[currentDonation.donor_id] = {
      amount:
        (accumulator[currentDonation.donor_id].amount || 0) +
        (currentDonation.ft_id === "near" ? calcNetDonationAmount(currentDonation) : 0),
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
        src="https://ipfs.near.social/ipfs/bafkreicjk6oy6465ps32owoomppfkvimbjlnhbaldvf6ujuyhkjas6ghjq"
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

const filterOptions = [
  { text: "All Time", value: "all" },
  { text: "1Y", value: "year" },
  { text: "1M", value: "month" },
  { text: "1W", value: "week" },
  { text: "24H", value: "day" },
];

const MenuItem = ({ count, children, className }) => (
  <div className={`menu-item ${className || ""}`}>
    <div className="label">{children}</div>
    <div className="count">{count}</div>
  </div>
);

const tabs = [
  {
    label: "Donor Leaderboard",
    val: "leaderboard",
    count: sortedDonations.length,
  },
  {
    label: "Sponsors Leaderboard",
    val: "sponsors",
    count: sponsors.length,
  },
  {
    label: "Donor Feed",
    val: "feed",
    count: allDonations.length,
  },
];

const options = [
  { tab: "feed", src: "Components.DonorsTrx" },
  { tab: "leaderboard", src: "Components.DonorsLeaderboard" },
  { tab: "sponsors", src: "Components.DonorsLeaderboard" },
];

const sortList = tabs.map((tab) => ({
  label: (
    <MenuItem key={tab.val} count={tab.count}>
      {tab.label}
    </MenuItem>
  ),
  val: tab,
}));

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
          <Widget
            src={`${ownerId}/widget/Components.DonorsCards`}
            props={{ ...props, sponsors, sortedDonations, currentTab }}
          />
        </div>
        <Tabs>
          <Widget
            src={`${ownerId}/widget/Inputs.Dropdown`}
            props={{
              sortVal: title,
              title: (
                <MenuItem className="selected" count={tabs[0].count}>
                  {tabs[0].val}{" "}
                </MenuItem>
              ),
              sortList: sortList,
              FilterMenuCustomStyle: `left:0; right:auto;`,
              handleSortChange: ({ val: option }) => {
                setTitle(
                  <MenuItem className="selected" count={option.count}>
                    {option.val}
                  </MenuItem>
                );
                setTab(option.val);
              },
            }}
          />
          <Filter>
            {filterOptions.map((option) => (
              <div
                className={`option ${filter === option.value ? "active" : ""}`}
                key={option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.text}
              </div>
            ))}
          </Filter>
        </Tabs>
        <Widget
          src={`${ownerId}/widget/${options.find((option) => option.tab == currentTab).src}`}
          props={{
            ...props,
            allDonations: allDonations,
            filter,
            sponsors,
            sortedDonations,
            currentTab,
          }}
        />
      </>
    )}
  </Container>
);
