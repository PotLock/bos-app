const {
  profile,
  accountId,
  ownerId,
  profileLink,
  getTagsFromSocialProfileData,
  POT_FACTORY_CONTRACT_ID,
  DONATION_CONTRACT_ID,
  SUPPORTED_FTS: { NEAR },
} = props;

const [directDonations, setDirectDonation] = useState([]);
const [sponsorship, setSponsorship] = useState([]);
const [potDonations, setPotDonations] = useState([]);

if (!props.nav) props.nav = "feed";

const tags = getTagsFromSocialProfileData(profile);

const getPotConfig = (potId) => Near.asyncView(potId, "get_config", {});

const getSponsorships = (potId, potDetail) => {
  Near.asyncView(potId, "get_matching_pool_donations", {}).then((donations) => {
    donations = donations.filter((donations) => donations.donor_id === accountId);
    const updatedDonations = (donations = donations.map((donation) => ({
      ...donation,
      base_currency: potDetail.base_currency,
      pot_name: potDetail.pot_name,
      pot_id: potId,
    })));
    setSponsorship(updatedDonations);
  });
};

// Get Sponsorships
if (!directDonations.length) {
  Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_donor", {
    donor_id: accountId,
  }).then((donations) => setDirectDonation(donations));
}
// Get Direct Donations
if (!sponsorship.length) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    pots.forEach((pot) => {
      getPotConfig(pot.id).then((potDetail) => {
        getSponsorships(pot.id, potDetail);
      });
    });
  });
}

// Get Total Donations
const [allDonations] = useMemo(() => {
  const donations = [...sponsorship, ...directDonations];
  donations.sort((a, b) => b.donated_at - a.donated_at);
  return [donations];
}, [directDonations, sponsorship]);

props.donations = allDonations;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 0%;
  .nav-view {
    width: 100%;
    padding: 24px 50px;
    background: #f6f5f3;
  }
`;

return (
  <Body>
    <Widget
      src={`${ownerId}/widget/Project.BodyHeader`}
      props={{
        ...props,
        id: accountId,
        tags: tags,
      }}
    />
    {/* body */}
    <div className="nav-view">
      <Widget
        src={props.navOptions.find((option) => option.id == props.nav).source}
        props={{
          ...props,
        }}
      />
    </div>
  </Body>
);
