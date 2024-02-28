const { POT_FACTORY_CONTRACT_ID, projectId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

// ids[] of pots that approved project
const [potIds, setPotIds] = useState(null);
const [potsConfig, setPotsConfig] = useState(null);

const getApprovedApplications = (potId) =>
  Near.asyncView(potId, "get_approved_applications", {})
    .then((applications) => {
      if (applications.some((app) => app.project_id === projectId))
        setPotIds([...(potIds || []), potId]);
    })
    .catch((err) => console.log(`Error fetching approved applications for ${potId}`));

if (!potIds) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {})
    .then((pots) => {
      pots.forEach((pot) => {
        getApprovedApplications(pot.id);
      });
    })
    .catch((err) => console.log("error fetching pots", err));
}

if (!potsConfig) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_config", {}).then((potFactoryConfig) => {
    setPotsConfig(potFactoryConfig);
  });
}

const Container = styled.div`
  > div {
    padding-top: 0rem;
  }
`;

return potIds ? (
  <Container>
    <Widget
      src={`${ownerId}/widget/Project.ListSection`}
      props={{
        ...props,
        tab: "pots",
        items: potIds,
        itemsAll: potsConfig,
        renderItem: (pot) => (
          <Widget
            src={`${ownerId}/widget/Pots.Card`}
            props={{
              ...props,
              potId: pot,
              potConfig: potsConfig[pot],
            }}
          />
        ),
        maxCols: 2,
      }}
    />
  </Container>
) : (
  <div>Loading...</div>
);
