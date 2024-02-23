const {
  ownerId,
  projectId,
  userIsRegistryAdmin,
  REGISTRY_CONTRACT_ID,
  tab,
  POT_FACTORY_CONTRACT_ID,
  DONATION_CONTRACT_ID,
} = props;

const { ProjectOptions } = VM.require(`${ownerId}/widget/Project.Options`);

const project = Near.view(REGISTRY_CONTRACT_ID, "get_project_by_id", { project_id: projectId });

if (!project || project == null) {
  return "Loading";
}

if (project == undefined) {
  return "Project not found";
}

// Fetch Project Donations
const [pots, setPots] = useState(null);
const [directDonations, setDirectDonations] = useState(null);
// mapping of pot IDs to array of Round Matching Donations for the project
const [matchingRoundDonations, setMatchingRoundDonations] = useState({});

const getPotConfig = (potId) => Near.asyncView(potId, "get_config", {});

const getProjectRoundDonations = (potId, potDetail) => {
  return Near.asyncView(potId, "get_donations_for_project", {
    project_id: projectId,
  })
    .then((donations) => {
      const updatedDonations = donations.map((donation) => ({
        ...donation,
        base_currency: potDetail.base_currency,
        pot_name: potDetail.pot_name,
        pot_id: potId,
        type: "MATCHED_DONATIONS",
      }));
      if (roundDonations[potId]) return "";
      setMatchingRoundDonations((prevmMatchingRoundDonations) => {
        return { ...prevmMatchingRoundDonations, [potId]: updatedDonations };
      });
    })
    .catch(() => {
      if (roundDonations[potId]) return "";
      setMatchingRoundDonations((prevmMatchingRoundDonations) => {
        return { ...prevmMatchingRoundDonations, [potId]: [] };
      });
    });
};

// Get Project Direct Donations
if (!directDonations) {
  Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_recipient", {
    recipient_id: projectId,
  }).then((donations) => {
    donations = donations.map((donation) => ({
      ...donation,
      type: "DIRECT",
    }));
    setDirectDonations(donations);
  });
}
if (!pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    setPots(pots || []);
  });
}
if (pots.length && !matchingRoundDonations[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    getPotConfig(pot.id).then((potDetail) => {
      getProjectRoundDonations(pot.id, potDetail);
    });
  });
}

const allDonations = useMemo(() => {
  const RoundDonationsValue = Object.values(matchingRoundDonations).flat();
  const allDonations = [...(directDonations || []), ...RoundDonationsValue];
  allDonations.sort(
    (a, b) => (b.donated_at_ms || b.donated_at) - (a.donated_at_ms || a.donated_at)
  );
  return allDonations;
}, [matchingRoundDonations, directDonations]);

const profile = Social.getr(`${projectId}/profile`);
if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    {project.status !== "Approved" && (
      <Widget src={`${ownerId}/widget/Project.ProjectBanner`} props={{ ...props, project }} />
    )}
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        project,
        nav: props.nav ?? "home",
        donations: allDonations,
        navOptions: ProjectOptions(props),
      }}
    />
  </Wrapper>
);
