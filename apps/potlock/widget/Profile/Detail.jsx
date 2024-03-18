const {
  DONATION_CONTRACT_ID,
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
  ownerId: "",
  SUPPORTED_FTS: {
    NEAR: {},
  },
};

const accountId = props.accountId ?? context.accountId;

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getDonationsForDonor: () => {},
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const pots = PotFactorySDK.getPots();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
  asyncGetDonationsForDonor: () => {},
};

const { ProfileOptions } = VM.require(`${ownerId}/widget/Profile.Options`) || {
  ProfileOptions: () => [],
};

if (!accountId) {
  return "No account ID";
}

const [directDonations, setDirectDonations] = useState(null);
// mapping of pot IDs to array of sponsorship (matching pool) donations to this pot for this user
const [potDonations, setPotDonations] = useState({});

const getpotDonations = (potId, potDetail) => {
  return PotSDK.asyncGetDonationsForDonor(potId, accountId)
    .then((donations) => {
      donations = donations.filter((donations) => donations.donor_id === accountId);
      const updatedDonations = donations.map((donation) => ({
        ...donation,
        base_currency: potDetail.base_currency,
        pot_name: potDetail.pot_name,
        pot_id: potId,
        type: donation.project_id ? "matched" : "sponsorship",
      }));
      if (potDonations[potId]) return "";
      setPotDonations((prevpotDonations) => {
        return { ...prevpotDonations, [potId]: updatedDonations };
      });
    })
    .catch(() => {
      if (potDonations[potId]) return "";
      setPotDonations((prevpotDonations) => {
        return { ...prevpotDonations, [potId]: [] };
      });
    });
};

// Get Direct Donations
let donationsForDonor = DonateSDK.getDonationsForDonor(accountId);
if (donationsForDonor && !directDonations) {
  donationsForDonor = donationsForDonor.map((donation) => ({
    ...donation,
    type: "direct",
  }));
  setDirectDonations(donationsForDonor);
}
// Get Sponsorship Donations
if (pots && !potDonations[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    PotSDK.asyncGetConfig(pot.id).then((potDetail) => {
      getpotDonations(pot.id, potDetail);
    });
  });
}

const [allDonations, sponsorships, matchingRoundDonations] = useMemo(() => {
  const potDonationsValue = Object.values(potDonations).flat();

  const sponsorships = potDonationsValue.filter((donation) => donation.type === "sponsorship");
  const matchingRoundDonations = potDonationsValue.filter(
    (donation) => donation.type === "matched"
  );
  const allDonations = [...(directDonations || []), ...potDonationsValue];
  allDonations.sort(
    (a, b) => (b.donated_at || b.donated_at_ms) - (a.donated_at || a.donated_at_ms)
  );
  return [allDonations, sponsorships, matchingRoundDonations];
}, [potDonations, directDonations]);

// Get total donations & Unique donors count
const [totalDonationAmount] = useMemo(() => {
  let total = Big(0);
  allDonations.forEach((donation) => {
    total = total.plus(Big(donation.total_amount || donation.amount));
  });
  const totalDonationAmount = NEAR.fromIndivisible(total.toString());

  return [totalDonationAmount];
}, [allDonations]);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const tags = Object.keys(profile.tags || {});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        tags,
        accounts: [accountId],
        donations: allDonations,
        totalDonationAmount,
        matchingRoundDonations,
        sponsorships,
        directDonations,
        nav: props.nav ?? "donations",
        navOptions: ProfileOptions(props),
        post: accountId === context.accountId,
      }}
    />
  </Wrapper>
);
