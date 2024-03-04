const { projectId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const pots = PotFactorySDK.getPots();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetApprovedApplications: () => {},
};

const [potIds, setPotIds] = useState(null); // ids[] of pots that approved project

const getApprovedApplications = (potId) =>
  PotSDK.asyncGetApprovedApplications(potId)
    .then((applications) => {
      if (applications.some((app) => app.project_id === projectId))
        setPotIds([...(potIds || []), potId]);
    })
    .catch((err) => console.log(`Error fetching approved applications for ${potId}`));

if (pots && !potIds) {
  pots.forEach((pot) => {
    getApprovedApplications(pot.id);
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
        renderItem: (pot) => (
          <Widget
            src={`${ownerId}/widget/Pots.Card`}
            props={{
              ...props,
              potId: pot,
              // potConfig: potsConfig[pot], // TODO: this should be fetched in the pot card widget
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
