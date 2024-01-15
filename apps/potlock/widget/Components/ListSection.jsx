const { ownerId, removeProjectsFromCart, addProjectsToCart, setIsCartModalOpen } = props;
const filterList = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Most to Least Donations",
  "Least to Most Donations",
];
const tagsList = [
  "DeFi",
  "Open Source",
  "Non Profit",
  "Social Impact",
  "Climate",
  "Public Good",
  "Community",
  "Education",
];
const donationContractId = "donate.potlock.near";
const [totalProjects, setTotalProjects] = useState(props.items);
const [displayProject, setDisplayProject] = useState([]);
const [lastNumberOfProject, setLastNumberOfProject] = useState(0);
const [searchTerm, setSearchTerm] = useState(null);

if (!totalProjects) return "loading";

const loadProjects = () => {
  setLastNumberOfProject(lastNumberOfProject + 9);
  setDisplayProject(
    totalProjects.slice(0, lastNumberOfProject + 9).map((item) => (
      <Widget
        src={`${ownerId}/widget/Components.ProjectCard`}
        props={{
          ...item,
          isExistedInCart: props.cart && !!props.cart[item.id],
          removeProjectsFromCart: (projectId) => {
            removeProjectsFromCart(projectId);
          },
          addProjectsToCart: (project) => {
            addProjectsToCart(project);
          },
          setIsCartModalOpen: (isOpen) => {
            setIsCartModalOpen(isOpen);
          },
          totalAmount: (donations) => totalAmount(donations),
        }}
        key={key}
      />
    ))
  );
};

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

const sortHighestToLowest = (projects) => {
  const sort = (a, b) => {
    return parseFloat(b.total) - parseFloat(a.total);
  };
  const projectLength = projects.length;

  for (let i = 0; i < projectLength - 1; i++) {
    for (let j = 0; j < projectLength - 1 - i; j++) {
      if (sort(projects[j], projects[j + 1]) > 0) {
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

const sortLowestToHighest = (projects) => {
  const sort = (a, b) => {
    return parseFloat(b.total) - parseFloat(a.total);
  };
  const projectLength = projects.length;

  for (let i = 0; i < projectLength - 1; i++) {
    for (let j = 0; j < projectLength - 1 - i; j++) {
      if (sort(projects[j], projects[j + 1]) < 0) {
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
  const newTotalProjects = [];
  const promises = totalProjects.map((project) => {
    return Near.asyncView(donationContractId, "get_donations_for_recipient", {
      recipient_id: project.id,
    }).then((res) => {
      const total = totalAmount(res);
      newTotalProjects.push({ ...project, total });
    });
  });
  Promise.all(promises).then(() => {
    setTotalProjects(newTotalProjects);
  });
}, []);

const handleFilterChange = (filterType) => {
  switch (filterType) {
    case "Newest to Oldest":
      sortNewToOld(totalProjects);
      break;
    case "Oldest to Newest":
      sortOldToNew(totalProjects);
      break;
    case "Most to Least Donations":
      sortHighestToLowest(totalProjects);
      break;
    case "Least to Most Donations":
      sortLowestToHighest(totalProjects);
      break;
  }
};

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

const OnBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

return (
  <Container>
    <Header>
      <Title>all projects {totalProjects.length}</Title>

      {/* Search bar */}
      <Widget
        src={`${ownerId}/widget/Project.SearchBar`}
        props={{
          projectLength: totalProjects.length,
          setSearchTerm: (value) => {
            setSearchTerm(value);
          },
          handleFilterChange: (filter) => {
            handleFilterChange(filter);
          },
        }}
      />
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
    {lastNumberOfProject >= totalProjects.length && <OnBottom>On bottom</OnBottom>}
  </Container>
);
