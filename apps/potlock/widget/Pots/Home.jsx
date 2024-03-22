const { ownerId } = props;

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getContractId: () => {},
    getConfig: () => {},
    asyncGetPots: () => {},
    canUserDeployPot: () => {},
  }));

const [pots, setPots] = useState(null);

PotFactorySDK = PotFactorySDK({ env: props.env });
const potFactoryContractId = PotFactorySDK.getContractId();
const potFactoryConfig = PotFactorySDK.getConfig();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
};

if (!pots) {
  PotFactorySDK.asyncGetPots().then((pots) => {
    pots.forEach(({ id }) => {
      PotSDK.asyncGetConfig(id).then((potConfig) =>
        setPots((prevPot) => ({
          ...prevPot,
          [id]: { ...potConfig, id },
        }))
      );
    });
  });
}
const currentDate = Date.now();

const compareFunction = (a, b) => {
  if (currentDate >= a.public_round_start_ms && currentDate < a.public_round_end_ms) {
    return -1; // a comes first
  } else if (currentDate >= b.public_round_start_ms && currentDate < b.public_round_end_ms) {
    return 1; // b comes first
  }
  // current date is between application_start_ms and application_end_ms
  else if (currentDate >= a.application_start_ms && currentDate < a.application_end_ms) {
    return -1; // a comes first
  } else if (currentDate >= b.application_start_ms && currentDate < b.application_end_ms) {
    return 1; // b comes first
  }
  //  current date is greater than public_round_end_ms
  else if (currentDate > a.public_round_end_ms) {
    return -1; // a comes first
  } else if (currentDate > b.public_round_end_ms) {
    return 1; // b comes first
  }
  // Default case: no change in order
  return 0;
};

const potsConfig = useMemo(() => {
  console.log("pots", pots);
  if (pots) {
    const potsVal = Object.values(pots);
    const sortedPots = potsVal.sort(compareFunction);
    return sortedPots;
  } else {
    return [];
  }
}, [pots]);

console.log(potsConfig);

const canDeploy = PotFactorySDK.canUserDeployPot(context.accountId);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 48px;
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 64px;
  }
  @media only screen and (max-width: 768px) {
    .content {
      padding: 0 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 50px;
`;

const Count = styled.div`
  margin-top: 48px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 24px;
  .text {
    font-size: 18px;
    font-weight: 600;
  }
  .line {
    height: 1px;
    flex: 1;
    background: #c7c7c7;
  }
`;

if (!potFactoryConfig) {
  return <div class="spinner-border text-secondary" role="status" />;
}
return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.HomeBanner`}
      props={{
        ...props,
        canDeploy,
      }}
    />

    <div className="content">
      <Count>
        <div className="text">All Pots</div>
        <div>{pots.length}</div>
        <div className="line" />
      </Count>
      {pots && (
        <Widget
          src={`${ownerId}/widget/Project.ListSection`}
          props={{
            ...props,
            items: potsConfig,
            renderItem: (pot) => (
              <Widget
                src={`${ownerId}/widget/Pots.Card`}
                props={{
                  ...props,
                  potId: pot.id,
                }}
              />
            ),
            maxCols: 3,
            responsive: [
              {
                breakpoint: 1114,
                items: 2,
              },
              {
                breakpoint: 768,
                items: 1,
              },
            ],
          }}
        />
      )}
    </div>
  </Container>
);
