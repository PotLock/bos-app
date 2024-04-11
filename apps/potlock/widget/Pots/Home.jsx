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
const [inProgressRounds, setInProgressRounds] = useState([]);
const [filteredRounds, setFilteredRounds] = useState([]);
const [completedRounds, setCompletedRounds] = useState([]);
const [filterSelcted, setFilterSelected] = useState([]);
const [sortBy, setSortBy] = useState("");

PotFactorySDK = PotFactorySDK({ env: props.env });
const potFactoryContractId = PotFactorySDK.getContractId();
const potFactoryConfig = PotFactorySDK.getConfig();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
};

const currentDate = Date.now();

const filters = {
  application_open: (round) =>
    currentDate > round.application_start_ms && currentDate < round.application_end_ms,
  application_closed: (round) => currentDate > round.application_end_ms,
  round_end: (round) => currentDate > round.public_round_end_ms,
  round_open: (round) =>
    currentDate > round.public_round_start_ms && currentDate < round.public_round_end_ms,
  cooldown: (round) =>
    currentDate > round.public_round_end_ms && currentDate < round.cooldown_end_ms,
  completed: (round) => round.all_paid_out,
};

const sortOptions = {
  sort: [
    {
      label: "Most to least in pot",
      val: "least_pots",
    },
    {
      label: "Least to most in pot",
      val: "most_pots",
    },
    {
      label: "Most to least donations",
      val: "most_donations",
    },
    {
      label: "Least to most donations",
      val: "least_donations",
    },
  ],
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

const compareFunction = (a, b) => {
  // Cooldown Rounds
  if (filters.cooldown(a)) {
    return -1;
  } else if (filters.cooldown(b)) {
    return 1;
  }
  // Active Rounds
  else if (filters.round_open(a)) {
    return -1;
  } else if (filters.round_open(b)) {
    return 1;
  }
  // Application period
  else if (filters.application_open(a)) {
    return -1;
  } else if (filters.application_open(b)) {
    return 1;
  }
  // Default case: no change in order
  return 0;
};

useEffect(() => {
  if (pots) {
    const potsVal = Object.values(pots);
    const completed = [];
    const inprogress = [];
    potsVal.forEach((round) => {
      if (filters.completed(round)) {
        completed.push(round);
      } else {
        inprogress.push(round);
      }
    });
    inprogress.sort(compareFunction);
    setFilteredRounds(inprogress);
    setInProgressRounds(inprogress);
    setCompletedRounds(completed);
  }
}, [pots]);

const canDeploy = PotFactorySDK.canUserDeployPot(context.accountId);

const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 18px;
  font-weight: 600;
  .span {
    font-weight: 600;
  }
`;

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
    margin-top: 3rem;
  }
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    ${Title} {
      margin-right: auto;
      margin-bottom: 0;
    }
    .filters {
      gap: 1rem;
      display: flex;
      align-items: center;
      .sort {
        width: 286px;
        flex-direction: column;
        padding: 0.5rem;
        gap: 0;
        .title {
          display: none;
        }
        .option {
          border: none;
          width: 100%;
          padding: 0.5rem;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .content {
      padding: 0 20px;
    }
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #c7c7c7;
  margin: 3rem 0;
`;

if (!potFactoryConfig) {
  return <div class="spinner-border text-secondary" role="status" />;
}

const menuClass = `
width: 286px;
flex-direction: column;
padding: 0.5rem;
gap: 0;
.title{
  display: none;
}
.option{
  border: none;
  width: 100%;
  padding: 0.5rem;
}
`;

const handleFilter = ({ val }) => {
  let filteredRounds = inProgressRounds;
  let selectedUpdated = [];

  if (filterSelcted.includes(val)) {
    selectedUpdated = filterSelcted.filter((item) => item !== val);
    setFilterSelected(selectedUpdated);
  } else {
    selectedUpdated = [...filterSelcted, val];
    setFilterSelected(selectedUpdated);
  }

  if (selectedUpdated.length === 0) {
    return setFilteredRounds(inProgressRounds);
  }

  filteredRounds = filteredRounds.filter((round) =>
    selectedUpdated.some((key) => {
      return filters[key](round) === true;
    })
  );

  setFilteredRounds(filteredRounds);
};

const handleSort = ({ val }) => {
  const sortedRounds = filteredRounds;
  switch (val) {
    case "least_pots":
      sortedRounds.sort((a, b) => Big(b.matching_pool_balance) - Big(a.matching_pool_balance));
      break;
    case "most_pots":
      sortedRounds.sort((a, b) => Big(a.matching_pool_balance) - Big(b.matching_pool_balance));
      break;
    case "most_donations":
      sortedRounds.sort((a, b) => Big(b.total_public_donations) - Big(a.total_public_donations));
      break;
    case "least_donations":
      sortedRounds.sort((a, b) => Big(a.total_public_donations) - Big(b.total_public_donations));
      break;
  }

  setFilteredRounds(sortedRounds);
  setSortBy(val);
};

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
      <div className="header">
        <Title>
          Active Pots <span>{filteredRounds.length}</span>
        </Title>
        <div className="filters">
          <Widget
            src={`${ownerId}/widget/Inputs.FilterDropdown`}
            props={{
              ...props,
              onClick: handleFilter,
              multipleOptions: true,
              selected: filterSelcted,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.FilterDropdown`}
            props={{
              ...props,
              label: "Sort",
              labelIcon: "right",
              options: sortOptions,
              selected: sortBy,
              onClick: handleSort,
              menuClass: "sort",
            }}
          />
        </div>
      </div>

      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          ...props,
          items: filteredRounds,
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
      <Line />
      <Title>
        Completed Pots <span>{completedRounds.length}</span>
      </Title>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          ...props,
          items: completedRounds,
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
    </div>
  </Container>
);
