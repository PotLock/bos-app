const { calcNetDonationAmount, filterByDate } = VM.require(
  `${props.ownerId}/widget/Components.DonorsUtils`
);
const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  margin-top: 40px;
`;

const StatsTitle = styled.div`
  font-size: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-weight: 600;
`;

const StatsSubTitle = styled.div`
  font-size: 20px;
`;

const [totalDonations, setDonations] = useState([]);
const [index, setIndex] = useState(0);
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
    Near.asyncView("donate.potlock.near", "get_donations", {
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
  const donations = Object.values(donationsByPage).flat();
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
}, [donationsByPage, allDonationsFetched]);

let total = 0;
sortedDonations.forEach((donation) => {
  total += donation.amount;
});

return (
  <Stats>
    <StatsTitle>
      {sortedDonations.length}
      <StatsSubTitle>Unique Donors</StatsSubTitle>
    </StatsTitle>
    <StatsTitle>
      ${total.toFixed(2)}
      <StatsSubTitle>Donated</StatsSubTitle>
    </StatsTitle>
    <StatsTitle>
      {allDonations.length}
      <StatsSubTitle>Donations</StatsSubTitle>
    </StatsTitle>
  </Stats>
);
