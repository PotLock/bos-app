const potId = "build.v1.potfactory.potlock.near";

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
  asyncGetApplications: () => {},
  asyncGetPublicRoundDonations: () => {},
  getFlaggedAccounts: () => {},
};

const [flaggedAddresses, setFlaggedAddresses] = useState([]);
const [selectedAccounts, setSelectedAccounts] = useState([]);
const [message, setMessage] = useState("");
const data = {
  "sound-grain.near": "Fraudulent twitter and funded by meteor gas tank @BillCollin45999",
  "traindragon.near": "fraudulent twitter and funded by meteor gas tank @TommyElmer63269",
  "warmlemon6985.near": "fraudulent twitter and funded by meteor gas tank @DmitroNovo70513",
  "tall-wiki.near": "fraudulent twitter, bot @JoshuaEdwa58041",
  "new-ram.near": "fraudulent twitter, bot @CliffordCh50589",
  "0x112.near": "fraudulent twitter, bot @JeremiahCl82301",
  "jennydo.near": "Banned twitter @cormier31053, bot bio",
  "the-flash.near": "Fraudulent twitter, bot @JordanArno26760",
  "bestpoker.near": "Banned twitter, generated profile @DonaldsonM1365",
  "dooma1n.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "markjazz.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "arturwr777.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "yurabmx.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "matveii.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "egorka1.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "arzudev.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "pastorkoschey.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "danyanester.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "deniscrypto.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "zedin14.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "kirruusha1.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "dimadmtravel.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "jekavsu.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "roll1t.near":
    "Batch created accounts (different batches, transitively the same funder), banned or fradulent twitter account made on same day",
  "cheap-palace.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "proud-shirt.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "happy-pant.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "cool-uni.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "bigstreet.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "slow-juice.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "many-dove.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "smallrobe.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "low-yard.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "major-icon.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "blue-rice.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "bluelibrary36.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "strong-lemon.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "clear-hare.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "nice-shirt.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "pure-viper.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "flat-jail.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "jennylove.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "bitcoin99.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "redgoat1310.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "haijenny.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "black-ant.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "nearandnear.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "flat-lace.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "nearfuture.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "firm-belt.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "flowchain.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "same-zest.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "hoanghai1.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "brc2.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "free-island.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "hoanghoang.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "kind-icon.near": "Fradulent or banned twitter account, funded by meteor-gastank",
  "narrow-query.near": "Fradulent or banned twitter account, funded by meteor-gastank",
};

const handleCheckboxChange = (address) => {
  if (selectedAccounts.includes(address)) {
    setSelectedAccounts(selectedAccounts.filter((item) => item !== address));
  } else {
    setSelectedAccounts([...selectedAccounts, address]);
  }
};

const potDetail = PotSDK.getConfig(potId);

PotSDK.getFlaggedAccounts(potDetail, potId)
  .then((data) => setFlaggedAddresses(data))
  .catch((err) => console.log("error getting the flagged accounts ", err));

const allDonationsPaginated = useCache(() => {
  const limit = 480; // number of donations to fetch per req
  const donationsCount = potDetail.public_donations_count;
  const paginations = [
    ...Array(parseInt(donationsCount / limit) + (donationsCount % limit > 0 ? 1 : 0)).keys(),
  ];
  try {
    const allDonations = paginations.map((index) =>
      PotSDK.asyncGetPublicRoundDonations(potId, {
        from_index: index * limit,
        limit: limit,
      })
    );
    return Promise.all(allDonations);
  } catch (error) {
    console.error(`error getting public donations from ${index} to ${index * limit}`, error);
  }
}, "pot-public-donations");

const [flagAddress, setFlagAddress] = useState(null);

const mergedData = ((allDonationsPaginated && allDonationsPaginated.flat()) || []).reduce(
  (acc, entry) => {
    if (!acc.includes(entry.donor_id)) {
      acc.push(entry.donor_id);
    }
    return acc;
  },
  []
);

// Convert mergedData object back to array
const mergedArray = Object.values(mergedData);

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FlagButton = styled.button`
  margin-left: 10px; /* Add margin between the address and button */
`;

const CheckboxInput = styled.div`
  display: inline-block;
  margin-right: 8px;

  & input[type="checkbox"] {
    width: 40px;
    height: 40px;
  }
  & input[type="checkbox"]:checked {
    background-color: black;
  }
`;

const isFlagged = (address) => flaggedAddresses.find((obj) => obj.potFlaggedAcc[address]);

return (
  <p>
    <input value={flagAddress} onChange={(e) => setFlagAddress(e.target.value)} />
    <FlagButton
      onClick={() => {
        const pLBlacklistedAccounts = JSON.parse(
          Social.get(`${context.accountId}/profile/pLBlacklistedAccounts`, "final") || "{}"
        );
        const potFlaggedAcc = pLBlacklistedAccounts[potId] || {};
        Social.set({
          profile: {
            pLBlacklistedAccounts: JSON.stringify({
              ...pLBlacklistedAccounts,
              [potId]: {
                ...data,
              },
            }),
          },
        });
      }}
    >
      Flag selected
    </FlagButton>
    <textarea value={message} onChange={(e) => setMessage(e.target.value)} />

    {mergedArray.length > 0 &&
      mergedArray.map((address, index) => {
        const flagged = isFlagged(address);

        if (!flagged) {
          return (
            <Row key={index}>
              <CheckboxInput>
                <input
                  type="checkbox"
                  checked={selectedAccounts.includes(address)}
                  onClick={() => handleCheckboxChange(address)}
                />
              </CheckboxInput>
              <p>{address}</p>
              <Widget src="potlock.near/widget/Twitter" props={{ address }} />
              <FlagButton
                onClick={() => {
                  setFlagAddress(address);
                }}
              >
                Flag
              </FlagButton>
            </Row>
          );
        }
      })}

    <Widget
      src={"potlock.near/widget/Pots.FlagModal"}
      props={{
        potId,
        flagAddress: flagAddress || selectedAccounts,
        isModalOpen: flagAddress != null,
        onClose: () => setFlagAddress(null),
      }}
    />
  </p>
);
