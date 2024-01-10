const { ownerId } = props;
// const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

const [totalProjects, setTotalProjects] = useState(props.items);

const filterNewToOld = useMemo(() => {
  setTotalProjects(totalProjects.sort((a, b) => b.submitted_ms - a.submitted_ms));
}, [totalProjects]);

const filterOldToNew = useMemo(() => {
  setTotalProjects(totalProjects.sort((a, b) => a.submitted_ms - b.submitted_ms));
}, [totalProjects]);

console.log(totalProjects);

if (!totalProjects) return "loading";

const [displayProject, setDisplayProject] = useState([]);
const [lastNumberOfProject, setLastNumberOfProject] = useState(0);
const loadProjects = () => {
  setLastNumberOfProject(lastNumberOfProject + 9);
  setDisplayProject(
    totalProjects
      .slice(0, lastNumberOfProject + 9)
      .map((item) => (
        <Widget
          src={"orasci-contributor.near/widget/Potlock.Components.ProjectCard"}
          props={{ ...item, totalAmount: (donations) => totalAmount(donations) }}
          key={key}
        />
      ))
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectList = styled.div`
  display: grid;
  gap: 31px;

  // For mobile devices (1 column)
  @media screen and (max-width: 739px) {
    grid-template-columns: repeat(1, 1fr);
  }

  // For tablet devices (2 columns)
  @media screen and (min-width: 740px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // For desktop devices (3 columns)
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 1.12px;
  text-transform: uppercase;
`;

const TagsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: #292929;
`;

const Tags = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px -1px 0px 0px #c7c7c7 inset, 0px 0px 0px 0.5px #c7c7c7;
`;

const totalAmount = (donations) => {
  if (!donations) return 0;
  let totalDonationAmount = new Big(0);
  for (const donation of donations) {
    totalDonationAmount = totalDonationAmount.plus(new Big(donation.total_amount));
  }
  return props.nearToUsd
    ? (props.nearToUsd * totalDonationAmount.div(1e24).toNumber()).toFixed(2)
    : totalDonationAmount.div(1e24).toNumber().toFixed(2);
};

return (
  <Container>
    <Header>
      <Title>all projects {totalProjects.length}</Title>
      <Widget
        src={"orasci-contributor.near/widget/Potlock.Home.SearchBar"}
        props={{ filterNewToOld: () => filterNewToOld(), filterOldToNew: () => filterOldToNew() }}
      />
      <TagsWrapper></TagsWrapper>
    </Header>
    <InfiniteScroll loadMore={loadProjects} hasMore={lastNumberOfProject < totalProjects.length}>
      <ProjectList>{displayProject}</ProjectList>
    </InfiniteScroll>
  </Container>
);
