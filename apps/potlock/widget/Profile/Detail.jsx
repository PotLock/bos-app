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
const [directDonations, setDirectDonations] = useState(null);
// mapping of pot IDs to array of sponsorship (matching pool) donations to this pot for this user
const [sponsorshipDonations, setSponsorshipDonations] = useState({});
const [potDonations, setPotDonations] = useState([]);

const getPotConfig = (potId) => Near.asyncView(potId, "get_config", {});

const getSponsorshipDonations = (potId, potDetail) => {
  return Near.asyncView(potId, "get_matching_pool_donations", {}).then((donations) => {
    donations = donations.filter((donations) => donations.donor_id === accountId);
    const updatedDonations = donations.map((donation) => ({
      ...donation,
      base_currency: potDetail.base_currency,
      pot_name: potDetail.pot_name,
      pot_id: potId,
    }));
    if (sponsorshipDonations[potId]) return "";
    setSponsorshipDonations((prevSponsorshipDonations) => {
      return { ...prevSponsorshipDonations, [potId]: updatedDonations };
    });
  });
};

// Get Direct Donations
if (!directDonations) {
  Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_donor", {
    donor_id: accountId,
  }).then((donations) => setDirectDonations(donations));
}
// Get Sponsorship Donations
if (!pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    setPots(pots || []);
  });
}
if (pots.length && !sponsorshipDonations[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    getPotConfig(pot.id).then((potDetail) => {
      getSponsorshipDonations(pot.id, potDetail);
    });
  });
}

const allDonations = useMemo(() => {
  const sponsorshipDonationsValue = Object.values(sponsorshipDonations).flat();
  const allDonations = [...(directDonations || []), ...sponsorshipDonationsValue];
  allDonations.sort((a, b) => b.donated_at - a.donated_at);
  return allDonations;
}, [sponsorshipDonations, directDonations]);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

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
        accounts: [accountId],
        donations: allDonations,
        nav: props.nav ?? "feed",
        navOptions: ProfileOptions(props),
      }}
    />
  </Wrapper>
);
