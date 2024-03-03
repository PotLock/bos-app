const { projectId, tab } = props;

const { DONATION_CONTRACT_ID, ownerId } = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
  ownerId: "",
};
const { ProjectOptions } = VM.require(`${ownerId}/widget/Project.Options`);

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    asyncGetDonationsForRecipient: () => {},
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
  asyncGetDonationsForProject: () => {},
  asyncGetDonationsForRecipient: () => {},
};

let RegistrySDK =
  VM.require("potlock.near/widget/SDK.registry") ||
  (() => ({
    getProjectById: () => "",
  }));
RegistrySDK = RegistrySDK({ env: props.env });

const project = RegistrySDK.getProjectById(projectId);

if (!project || project == null) {
  return "Loading";
}

if (project == undefined) {
  return "Project not found";
}

const [directDonations, setDirectDonations] = useState(null);
// mapping of pot IDs to array of Round Matching Donations for the project
const [matchingRoundDonations, setMatchingRoundDonations] = useState({});

const getProjectRoundDonations = (potId, potDetail) => {
  return PotSDK.asyncGetDonationsForProject(potId, projectId)
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
  DonateSDK.asyncGetDonationsForRecipient(projectId).then((donations) => {
    donations = donations.map((donation) => ({
      ...donation,
      type: "DIRECT",
    }));
    setDirectDonations(donations);
  });
}

if (pots && !matchingRoundDonations[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    PotSDK.asyncGetConfig(pot.id).then((potDetail) => {
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
