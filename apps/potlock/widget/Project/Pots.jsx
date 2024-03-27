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
const [loading, setLoading] = useState(true); // ids[] of pots that approved project

const getApprovedApplications = (potId) =>
  PotSDK.asyncGetApprovedApplications(potId)
    .then((applications) => {
      if (applications.some((app) => app.project_id === projectId)) {
        setPotIds([...(potIds || []), potId]);
      }
      if (pots[pots.length - 1].id === potId) setLoading(false);
    })
    .catch(() => console.log(`Error fetching approved applications for ${potId}`));

if (pots && loading) {
  pots.forEach((pot) => {
    getApprovedApplications(pot.id);
  });
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > div {
    padding-top: 0rem;
  }
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const NoResults = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 68px 105px;
  border-radius: 12px;
  background: #f6f5f3;
  .text {
    font-family: "Lora";
    max-width: 290px;
    font-size: 22px;
    font-style: italic;
    font-weight: 500;
    color: #292929;
  }
  img {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 24px 16px;
    .text {
      font-size: 16px;
    }
    img {
      width: 100%;
    }
  }
`;

const PotCard = ({ potId }) => (
  <Widget
    src={`${ownerId}/widget/Pots.Card`}
    props={{
      ...props,
      potId,
      tab: "pots",
    }}
  />
);

return loading ? (
  "Loading..."
) : potIds.length ? (
  <Container>
    {potIds.map((potId) => (
      <PotCard potId={potId} />
    ))}
  </Container>
) : (
  <NoResults>
    <div className="text">This project has not participated in any pots yet.</div>
    <img
      src="https://ipfs.near.social/ipfs/bafkreibcjfkv5v2e2n3iuaaaxearps2xgjpc6jmuam5tpouvi76tvfr2de"
      alt="pots"
    />
  </NoResults>
);
