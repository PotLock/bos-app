const { getTagsFromSocialProfileData, getTeamMembersFromSocialProfileData } = VM.require(
  "potlock.near/widget/utils"
) || {
  getTagsFromSocialProfileData: () => [],
  getTeamMembersFromSocialProfileData: () => [],
};

const { HomeBannerBackground } = VM.require("potlock.near/widget/Pots.HomeBannerBackground") || {
  HomeBannerBackground: () => {},
};

// Card Skeleton - Loading fallback
const loadingSkeleton = styled.keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const CardSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 447px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  margin-left: auto;
  margin-right: auto;

  animation-name: ${loadingSkeleton};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const HeaderSkeleton = styled.div`
  display: block;
  width: 100%;
  height: 168px;
  background: #eee;
`;

const ProfileImageSkeleton = styled.div`
  background: #e0e0e0;
  margin-left: 32px;
  transform: translateY(148px);
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 999px;
`;

const TitleSkeleton = styled.div`
  width: 120px;
  height: 24px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const DescriptionSkeleton = styled.div`
  width: 83%;
  height: 48px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const TagSkeleton = styled.div`
  background: #eee;
  border-radius: 4px;
  height: 34px;
  width: 110px;
  margin: 24px;
`;

const FooterItemSkeleton = styled.div`
  width: 150px;
  height: 40px;
  background: #eee;

  @media screen and (max-width: 390px) {
    width: 100px;
  }
`;

const DonationsInfoContainerSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  border-top: 1px #f0f0f0 solid;
`;

const DonationsInfoItemSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const CardSkeleton = () => (
  <CardSkeletonContainer>
    <HeaderSkeleton />
    <ProfileImageSkeleton />
    <TitleSkeleton />
    <DescriptionSkeleton />
    <TagSkeleton />
    <DonationsInfoContainerSkeleton>
      <DonationsInfoItemSkeleton>
        <FooterItemSkeleton />
      </DonationsInfoItemSkeleton>
      <DonationsInfoItemSkeleton>
        <FooterItemSkeleton />
      </DonationsInfoItemSkeleton>
    </DonationsInfoContainerSkeleton>
  </CardSkeletonContainer>
);

// ListPage Content

const { tab } = props;
const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { yoctosToUsd } = VM.require("potlock.near/widget/utils") || { yoctosToUsd: () => "" };
const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

const headerTitleFontSizePx = 88;

const HeaderContainer = styled.div`
  width: 100%;
  // background: #fffaf4;
  // background: white;
  padding: 80px 64px;

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderTitle = styled.div`
  color: #2e2e2e;
  font-size: ${headerTitleFontSizePx}px;
  font-weight: 500;
  word-wrap: break-word;
  position: relative;
  text-align: center;
  z-index: 1;
  position: relative;
  font-family: "Lora";
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeaderDescription = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 400;
  word-wrap: break-word;
  max-width: 866px;
  text-align: center;
  margin-top: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
`;

const Underline = styled.div`
  position: absolute;
  top: ${headerTitleFontSizePx - 40}px;
  left: -40px;
  z-index: -1;

  @media (max-width: 768px) {
    top: 30px;
    left: -30px;
  }
`;

const containerStyle = props.containerStyle ?? {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px 64px 24px 64px;

  @media screen and (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #2e2e2e;
  font-family: Mona-Sans;
`;

const ProjectsCount = styled.div`
  color: #7b7b7b;
  font-size: 24px;
  font-weight: 400;
  margin-left: 32px;

  @media screen and (max-width: 768px) {
    margin-left: 16px;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: hidden;
  padding-top: 5px;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  justify-content: center;
  min-height: 400px;
  overflow: hidden;
  .background {
    position: absolute;
    pointer-events: none;
    height: 100%;
    left: 0;
    top: 0;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px;
  }
  .sub-title {
    color: #dd3345;
    font-weight: 600;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 12px;
  }
  .title {
    letter-spacing: -0.4px;
    font-weight: 500;
    font-size: 40px;
    font-family: "Lora";
    margin: 0;
  }

  .btns {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 40px;
    font-size: 14px;
    a,
    button {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: 6px;
      box-shadow: 0px 0px 0px 1px #292929, 0px -2px 0px 0px #292929 inset;
      border: none;
      text-decoration: none;
      color: #292929;
      transition: all 300ms;
      &:hover {
        background: #292929;
        color: white;
      }
    }
    button {
      color: white;
      background: #dd3345;
      &:hover {
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .content {
      padding: 64px 20px;
    }
    .title {
      font-size: 36px;
    }
    .btns {
      flex-direction: column;
      gap: 1rem;
      margin-top: 24px;
    }
    .line-break {
      display: none;
    }
  }
  @media only screen and (max-width: 480px) {
    .btns a,
    button {
      width: 100%;
      padding: 12px 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 64px 0;
  @media screen and (max-width: 768px) {
    padding: 64px 20px 0px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  color: rgb(41, 41, 41);
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;

const ProjectList = styled.div`
  display: grid;
  gap: 31px;
  padding-bottom: 3rem;
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

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  .filter-menu {
    left: 0;
    right: auto;
  }
  .left-side-menu {
    left: auto;
    right: 0;
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    > div:nth-of-type(2) {
      width: 100%;
      order: -1;
      flex: auto;
    }
    .filter-menu {
      width: 250px !important;
    }
    .left-side-menu {
      right: auto;
      left: 0;
    }
  }
`;

State.init({
  isModalOpen: false,
  successfulDonation: null,
});

let ListsSDK =
  VM.require("potlock.near/widget/SDK.lists") ||
  (() => ({
    getRegistrations: () => {},
    isRegistryAdmin: () => {},
  }));
ListsSDK = ListsSDK({ env: props.env });

const accountId = context.accountId;
const isRegistryAdmin = ListsSDK.isRegistryAdmin(context.accountId);
const allRegistrations = ListsSDK.getRegistrations() || [];
const isRegisteredProject = allRegistrations.find(
  (registration) => registration.registrant_id === accountId
);

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const projects = useMemo(() => {
  allRegistrations.sort((a, b) =>
    b.status === "Approved" ? -1 : a.status === "Approved" ? 1 : a.status.localeCompare(b.status)
  );
  allRegistrations.sort((a, b) => b.submitted_ms - a.submitted_ms);
  return allRegistrations;
}, allRegistrations);

const featuredProjectIds = ["magicbuild.near", "potlock.near", "yearofchef.near"];
const featuredProjects = useMemo(
  () => projects.filter((project) => featuredProjectIds.includes(project.registrant_id)),
  projects
);
const [totalDonation, setTotalDonation] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);
const [filteredProjects, setFilteredProjects] = useState(projects);
const [searchTerm, setSearchTerm] = useState("");
const [sort, setSort] = useState("Sort");

const tagsList = {
  Category: [
    {
      label: "Desci",
      val: "Desci",
    },
    {
      label: "Open Source",
      val: "Open Source",
    },
    {
      label: "Non Profit",
      val: "Non Profit",
    },
    {
      label: "Social Impact",
      val: "Social Impact",
    },
    {
      label: "Climate",
      val: "Climate",
    },
    {
      label: "Public Good",
      val: "Public Good",
    },
    {
      label: "Community",
      val: "Community",
    },
    {
      label: "Education",
      val: "Education",
    },
  ],
  Status: [
    {
      label: "All",
      val: "all",
    },
    {
      label: "Approved",
      val: "Approved",
    },
    {
      label: "Pending",
      val: "Pending",
    },
    {
      label: "Rejected",
      val: "Rejected",
    },
    {
      label: "Graylisted",
      val: "Graylisted",
    },
    {
      label: "Blacklisted",
      val: "Blacklisted",
    },
  ],
};

useEffect(() => {
  if (filteredProjects.length < 1) {
    setFilteredProjects(projects);
  }
}, [projects]);

const donateConfig = DonateSDK.getConfig();
if (donateConfig && !totalDonated && !totalDonation) {
  const lastDonationAmount = yoctosToUsd(donateConfig.net_donations_amount);
  setTotalDonated(lastDonationAmount);
  setTotalDonation(donateConfig.total_donations_count);
}

const donateRandomly = () => {
  State.update({
    isModalOpen: true,
    successfulDonation: null,
  });
};

const containerStyleHeader = {
  position: "absolute",
  height: "100%",
  top: 0,
  left: 0,
  marginBottom: "24px",
  background: "radial-gradient(80% 80% at 40.82% 50%, white 25%, rgba(255, 255, 255, 0) 100%)",
};

const SORT_FILTERS = {
  ALL: "All",
  NEW_TO_OLD: "Newest to Oldest",
  OLD_TO_NEW: "Oldest to Newest",
  // MOST_TO_LEAST_DONATIONS: "Most to Least Donations",
  // LEAST_TO_MOST_DONATIONS: "Least to Most Donations",
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

  setFilteredProjects(projects);
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

  setFilteredProjects(projects);
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
  setFilteredProjects(projects);
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
  setFilteredProjects(projects);
};

const handleSortChange = (sortType) => {
  setSort(sortType);
  switch (sortType) {
    case "All":
      setFilteredProjects(filteredProjects);
      break;
    case "Newest to Oldest":
      sortNewToOld(filteredProjects);
      break;
    case "Oldest to Newest":
      sortOldToNew(filteredProjects);
      break;
    case "Most to Least Donations":
      sortHighestToLowest(filteredProjects);
      break;
    case "Least to Most Donations":
      sortLowestToHighest(filteredProjects);
      break;
  }
};

const searchByWords = (projects, searchTerm) => {
  searchTerm = searchTerm.toLowerCase().trim();
  let results = [];
  // const dataArr = projects;
  // let alldata = [];
  projects.forEach((project) => {
    const { registrant_id, status } = project;
    const data = Social.getr(`${registrant_id}/profile`);
    // alldata.push(data);
    if (registrant_id.includes(searchTerm) || status.toLowerCase().includes(searchTerm)) {
      results.push(project);
    } else if (data) {
      if (
        data.description.toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        getTagsFromSocialProfileData(data).join("").toLowerCase().includes(searchTerm) ||
        getTeamMembersFromSocialProfileData(data).join("").toLowerCase().includes(searchTerm)
      ) {
        results.push(project);
      }
    }
  });
  setFilteredProjects(results);
};

const checkAllTrue = (arr) => arr.every((item) => item === true);

const filterProjects = (filters) =>
  projects.filter((item) => {
    const filterVals = Object.keys(filters).map((type) => {
      if (type === "Category") {
        const data = Social.getr(`${item.registrant_id}/profile`);
        const tagsForProfile = getTagsFromSocialProfileData(data);
        return filters[type].some((tag) => tagsForProfile.includes(tag));
      }

      if (type === "Status") {
        if (filters[type].includes("all")) return true;
        return filters[type].includes(item.status);
      }
      return true;
    });
    return checkAllTrue(filterVals);
  });
const handleTag = (selectedFilters) => {
  const projectFilterBySearch = filterProjects(selectedFilters);
  setFilteredProjects(projectFilterBySearch);
};

const getRandomProject = () => {
  if (projects) {
    const randomIndex = Math.floor(Math.random() * projects.length);
    return projects[randomIndex]?.registrant_id;
  }
};

return (
  <>
    <HeroContainer>
      <HomeBannerBackground className="background" />
      <div className="content">
        <h3 className="sub-title">Transforming Funding for Public Goods</h3>
        <h1 className="title">
          Discover impact projects, donate directly, & <br className="line-break" /> participate in
          funding rounds.
        </h1>
        <div className="btns">
          <button onClick={donateRandomly} className="donate-btn">
            Donate Randomly
          </button>

          <a
            href={
              isRegisteredProject ? `?tab=project&projectId=${accountId}` : "?tab=createproject"
            }
          >
            {isRegisteredProject ? "View Your Project" : "Register Your Project"}
          </a>
        </div>
      </div>
    </HeroContainer>
    <Content>
      <ContainerHeader>
        <Header>
          <Title>Featured Projects</Title>
        </Header>

        <ProjectList>
          {(featuredProjects || []).map((project) => {
            return (
              <Widget
                src={`${ownerId}/widget/Project.Card`}
                loading={
                  <div
                    style={{
                      width: "355px",
                      height: "455px",
                      borderRadius: "12px",
                      background: "white",
                      boxShadow: "0px -2px 0px #dbdbdb inset",
                      border: "1px solid #dbdbdb",
                    }}
                  />
                }
                props={{
                  ...props,
                  projectId: project.registrant_id,
                  allowDonate: true,
                }}
              />
            );
          })}
        </ProjectList>
      </ContainerHeader>
      <Header>
        <Title>
          All Projects
          <span style={{ color: "#DD3345", marginLeft: "8px", fontWeight: 600 }}>
            {projects.length}
          </span>
        </Title>
        <FilterWrapper>
          <Widget
            src={`${ownerId}/widget/Inputs.FilterDropdown`}
            props={{
              ...props,
              onClick: handleTag,
              multipleOptions: true,
              options: tagsList,
              menuClass: "filter-menu",
            }}
          />
          <Widget
            src={`${ownerId}/widget/Project.SearchBar`}
            props={{
              title: sort,
              tab: tab,
              numItems: filteredProjects.length,
              itemName: "project",
              sortList: Object.values(SORT_FILTERS),
              FilterMenuClass: `left-side-menu`,
              setSearchTerm: (value) => {
                searchByWords(projects, value);
              },
              handleSortChange: (filter) => {
                handleSortChange(filter);
              },
            }}
          />
        </FilterWrapper>
      </Header>
      <ProjectsContainer>
        {filteredProjects.length ? (
          <Widget
            src={`${ownerId}/widget/Project.ListSection`}
            props={{
              ...props,
              items: filteredProjects,
              shouldShuffle: !isRegistryAdmin,
              renderItem: (project) => {
                return (
                  <Widget
                    src={`${ownerId}/widget/Project.Card`}
                    loading={<CardSkeleton />}
                    props={{
                      ...props,
                      projectId: project.registrant_id,
                      allowDonate: true,
                      // allowDonate:
                      //   sybilRequirementMet &&
                      //   publicRoundOpen &&
                      //   project.project_id !== accountId,
                      // requireVerification: !sybilRequirementMet,
                    }}
                  />
                );
              },
            }}
          />
        ) : (
          <div style={{ alignSelf: "flex-start", margin: "24px 0px" }}>No results</div>
        )}
      </ProjectsContainer>
    </Content>
    {state.isModalOpen && (
      <Widget
        src={`${ownerId}/widget/ModalDonation.Main`}
        props={{
          ...props,
          isModalOpen: state.isModalOpen,
          projectId: getRandomProject(),
          onClose: () =>
            State.update({
              isModalOpen: false,
            }),
          openDonationModalSuccess: (donation) => {
            State.update({
              isModalOpen: false,
              successfulDonation: donation,
            });
          },
        }}
      />
    )}
    {state.successfulDonation && (
      <Widget
        src={`${ownerId}/widget/Project.ModalSuccess`}
        props={{
          ...props,
          successfulDonation: state.successfulDonation,
          isModalOpen: state.successfulDonation != null,
          onClose: () =>
            State.update({
              successfulDonation: null,
            }),
        }}
      />
    )}
  </>
);
