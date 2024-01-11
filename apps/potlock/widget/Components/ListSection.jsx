const { ownerId } = props;
// const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

const [totalProjects, setTotalProjects] = useState(props.items);

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

const filterList = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Most to Least Donations",
  "Least to Most Donations",
];

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

const tagsList = ["DeFi", "Open source", "Non profit"];

const [filterType, setFilterType] = useState(null);

const [openFilter, setOpenFilter] = useState(false);

const sortNewToOld = (projects) => {
  const projectLength = projects.length;

  for (let i = 0; i < projectLength - 1; i++) {
    for (let j = 0; j < projectLength - i - 1; j++) {
      if (projects[j].submitted_ms < projects[j + 1].submitted_ms) {
        const temp = projects[j];
        projects[j] = projects[j + 1];
        projects[j + 1] = temp;
      }
    }
  }
  setTotalProjects(projects);
  setDisplayProject([]);
  setLastNumberOfProject(0);
};

const sortOldToNew = (projects) => {
  const projectLength = projects.length;

  for (let i = 0; i < projectLength - 1; i++) {
    for (let j = 0; j < projectLength - i - 1; j++) {
      if (projects[j].submitted_ms > projects[j + 1].submitted_ms) {
        const temp = projects[j];
        projects[j] = projects[j + 1];
        projects[j + 1] = temp;
      }
    }
  }
  setTotalProjects(projects);
  setDisplayProject([]);
  setLastNumberOfProject(0);
};

useEffect(() => {
  switch (filterType) {
    case "Newest to Oldest":
      sortNewToOld(totalProjects);
      break;
    case "Oldest to Newest":
      sortOldToNew(totalProjects);
      break;
  }
}, [filterType]);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
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

const Tag = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px -1px 0px 0px #c7c7c7 inset, 0px 0px 0px 0.5px #c7c7c7;
  border: 1px solid #c7c7c7;
  &:hover {
    background: #fef6ee;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: #f0f0f0;
  padding: 12px 24px;
`;

const SearchBar = styled.input`
  background: none;
  width: 100%;
  border-radius: 
  outline: none;
  border: none;
  color: #525252;
`;

const FilterButton = styled.div`
  white-space: nowrap;
  display: flex;
  cursor: pointer;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #525252;
`;

const FilterIcon = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
`;

const FilterMenu = styled.div`
  position: absolute;
  background: #fff;
  top: 100%;
  right: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid rgba(41, 41, 41, 0.36);
  box-shadow: 0px 12px 20px -4px rgba(123, 123, 123, 0.32),
    0px 4px 8px -3px rgba(123, 123, 123, 0.2), 0px 0px 2px 0px rgba(123, 123, 123, 0.36);
`;

const FilterItem = styled.div`
  cursor: pointer;
  padding: 8px;
  display: flex;
  gap: 12px;
  white-space: nowrap;
  &:hover {
    background: #dd3345;
    color: #fff;
    border-radius: 6px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

return (
  <Container>
    <Header>
      <Title>all projects {totalProjects.length}</Title>

      {/* Search bar */}
      <SearchBarContainer>
        <SearchIcon>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7549 14.2549H14.9649L14.6849 13.9849C15.6649 12.8449 16.2549 11.3649 16.2549 9.75488C16.2549 6.16488 13.3449 3.25488 9.75488 3.25488C6.16488 3.25488 3.25488 6.16488 3.25488 9.75488C3.25488 13.3449 6.16488 16.2549 9.75488 16.2549C11.3649 16.2549 12.8449 15.6649 13.9849 14.6849L14.2549 14.9649V15.7549L19.2549 20.7449L20.7449 19.2549L15.7549 14.2549ZM9.75488 14.2549C7.26488 14.2549 5.25488 12.2449 5.25488 9.75488C5.25488 7.26488 7.26488 5.25488 9.75488 5.25488C12.2449 5.25488 14.2549 7.26488 14.2549 9.75488C14.2549 12.2449 12.2449 14.2549 9.75488 14.2549Z"
              fill="#C7C7C7"
            />
          </svg>
        </SearchIcon>
        <SearchBar placeholder={`Search (${totalProjects.length}) projects`} />
        <div
          style={{ position: "relative" }}
          onMouseOver={() => setOpenFilter(true)}
          onMouseOut={() => setOpenFilter(false)}
        >
          <FilterButton>
            Sort
            <FilterIcon>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.88667L10.1133 6L11.0533 5.06L8 2L4.94 5.06L5.88667 6L8 3.88667ZM8 12.1133L5.88667 10L4.94667 10.94L8 14L11.06 10.94L10.1133 10L8 12.1133Z"
                  fill="#7B7B7B"
                />
              </svg>
            </FilterIcon>
          </FilterButton>
          {openFilter && (
            <FilterMenu>
              {filterList.map((filter, key) => (
                <FilterItem key={key} onClick={() => setFilterType(filter)}>
                  {filter}
                </FilterItem>
              ))}
            </FilterMenu>
          )}
        </div>
      </SearchBarContainer>
      {/* <Widget
        src={"orasci-contributor.near/widget/Potlock.Home.SearchBar"}
        props={{
          projectLength: totalProjects.length,
        }}
      /> */}
      <TagsWrapper>
        Tags:
        {tagsList.map((tag, key) => (
          <Tag key={key}>{tag}</Tag>
        ))}
      </TagsWrapper>
    </Header>
    <InfiniteScroll loadMore={loadProjects} hasMore={lastNumberOfProject < totalProjects.length}>
      <ProjectList>{displayProject}</ProjectList>
    </InfiniteScroll>
  </Container>
);
