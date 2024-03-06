const { projectId } = props;

let { getPots } = VM.require("${config/account}/widget/SDK.potfactory") ?? {
  getPots: () => [],
};

const pots = getPots();

const PotSDK = VM.require("${config/account}/widget/SDK.pot") || {
  asyncGetApprovedApplications: () => {},
};

const [potIds, setPotIds] = useState(null); // ids[] of pots that approved project

const getApprovedApplications = (potId) =>
  PotSDK.asyncGetApprovedApplications(potId)
    .then((applications) => {
      if (applications.some((app) => app.project_id === projectId))
        setPotIds([...(potIds || []), potId]);
    })
    .catch((err) =>
      console.log(`Error fetching approved applications for ${potId}`)
    );

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
      src={"${config/account}/widget/Project.ListSection"}
      props={{
        ...props,
        tab: "pots",
        items: potIds,
        renderItem: (pot) => (
          <Widget
            src={"${config/account}/widget/Pots.Card"}
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
