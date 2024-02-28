const { POT_FACTORY_CONTRACT_ID, projectId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

// ids[] of pots that approved project
const [pots, setPots] = useState(null);
const [potsConfig, setPotsConfig] = useState(null);

const GetProjectStatus = (potId) =>
  Near.asyncView(potId, "get_application_by_project_id", {
    project_id: projectId,
  })
    .then((project) => {
      if (project?.status === "Approved") setPots([...(pots || []), potId]);
    })
    .catch((err) => console.log(`application does not exist on ${potId}`));

if (!pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {})
    .then((pots) => {
      console.log(pots);
      pots.forEach((pot) => {
        GetProjectStatus(pot.id);
      });
    })
    .catch((err) => console.log("error fetching pots", err));
}

if (!potFactoryConfig) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_config", {}).then((potFactoryConfig) => {
    setPotsConfig(potFactoryConfig);
  });
}

const Container = styled.div`
  > div {
    padding-top: 0rem;
  }
`;

return pots ? (
  <Container>
    <Widget
      src={`${ownerId}/widget/Project.ListSection`}
      props={{
        ...props,
        tab: "pots",
        items: pots,
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
