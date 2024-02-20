const {
  ownerId,
  POT_FACTORY_CONTRACT_ID,
  DONATION_CONTRACT_ID,
  SUPPORTED_FTS: { NEAR },
} = props;
const accountId = props.accountId ?? context.accountId;

const { ProfileOptions } = VM.require(`${ownerId}/widget/Profile.Options`);

if (!accountId) {
  return "No account ID";
}

const [pots, setPots] = useState(null);
const [directDonations, setDirectDonation] = useState(null);
const [sponsorship, setSponsorship] = useState({});
const [potDonations, setPotDonations] = useState([]);

const getPotConfig = (potId) => Near.asyncView(potId, "get_config", {});

const getSponsorships = (potId, potDetail) => {
  return Near.asyncView(potId, "get_matching_pool_donations", {}).then((donations) => {
    donations = donations.filter((donations) => donations.donor_id === accountId);
    const updatedDonations = donations.map((donation) => ({
      ...donation,
      base_currency: potDetail.base_currency,
      pot_name: potDetail.pot_name,
      pot_id: potId,
    }));
    if (sponsorship[potId]) return "";
    setSponsorship((sponsorship) => {
      return { ...sponsorship, [potId]: updatedDonations };
    });
  });
};

// Get Direct Donations
if (!directDonations) {
  Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_donor", {
    donor_id: accountId,
  }).then((donations) => setDirectDonation(donations));
}
// Get Sponsorships
if (!pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    setPots(pots || []);
  });
}
if (pots.length && !sponsorship[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    getPotConfig(pot.id).then((potDetail) => {
      getSponsorships(pot.id, potDetail);
    });
  });
}

const allDonations = useMemo(() => {
  const sponsorshipsValue = Object.values(sponsorship).flat();
  const allDonations = [...(directDonations || []), ...sponsorshipsValue];
  allDonations.sort((a, b) => b.donated_at - a.donated_at);
  return allDonations;
}, [sponsorship, directDonations]);

props.donations = allDonations;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const fast = !props.profile;

if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

props.navOptions = ProfileOptions(props);

if (!props.nav) props.nav = "feed";

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        accounts: [accountId],
      }}
    />
  </Wrapper>
);
