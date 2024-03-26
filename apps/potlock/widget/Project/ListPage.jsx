const { getTagsFromSocialProfileData, getTeamMembersFromSocialProfileData } = VM.require(
  "potlock.near/widget/utils"
) || {
  getTagsFromSocialProfileData: () => [],
  getTeamMembersFromSocialProfileData: () => [],
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

const showStats = !props.tab || props.tab == "projects";

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
  // padding: 0px 64px 96px 64px;
  // background: #fafafa;

  // @media screen and (max-width: 768px) {
  //   margin-top: 200px;
  // }
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;

  @media screen and (max-width: 768px) {
    min-height: 600px;
  }
`;

const Hero = styled.img`
  width: 100%;
  height: 100%;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const InfoCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  margin: 40px 0;
  gap: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    // justify-content: center;
  }
`;

const Button = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #dd3345;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const ButtonRegisterProject = styled.a`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #fef6ee;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: #2e2e2e;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

const StatsTitle = styled.div`
  color: #292929;
  font-size: 44px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 500;
    gap: 5px;
  }
`;

const StatsSubTitle = styled.div`
  color: #525252;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
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
  cursor: pointer;
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

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  padding-top: 20px;
  @media screen and (min-width: 740px) and (max-width: 1400px) {
    ${props.tab !== "pot" && "padding-top: 120px;"}
  }
  // mobile
  @media screen and (max-width: 739px) {
    padding-top: 40px;
  }
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
    grid-template-columns: repeat(${!props.maxCols || props.maxCols > 2 ? "3" : "2"}, 1fr);
  }
`;

State.init({
  isModalOpen: false,
  successfulDonation: null,
});

let RegistrySDK =
  VM.require("potlock.near/widget/SDK.registry") ||
  (() => ({
    getProjects: () => {},
    isRegistryAdmin: () => {},
  }));
RegistrySDK = RegistrySDK({ env: props.env });

const isRegistryAdmin = RegistrySDK.isRegistryAdmin(context.accountId);

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const allProjects = RegistrySDK.getProjects() || [];

// console.log("allProjects: ", allProjects);

const projects = useMemo(() => {
  if (!isRegistryAdmin) {
    return allProjects.filter((project) => project.status === "Approved");
  }
  allProjects.sort((a, b) => b.submitted_ms - a.submitted_ms);
  return allProjects;
}, allProjects);

// console.log("projects: ", projects);

const featuredProjectIds = ["magicbuild.near", "potlock.near", "yearofchef.near"];
const featuredProjects = useMemo(
  () => projects.filter((project) => featuredProjectIds.includes(project.id)),
  projects
);
const [totalDonation, setTotalDonation] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);
const [filteredProjects, setFilteredProjects] = useState(projects);
const [searchTerm, setSearchTerm] = useState("");
const [sort, setSort] = useState("Sort");
const [tagsList, setTagsList] = useState([
  {
    label: "Desci",
    selected: false,
  },
  {
    label: "Open Source",
    selected: false,
  },
  {
    label: "Non Profit",
    selected: false,
  },
  {
    label: "Social Impact",
    selected: false,
  },
  {
    label: "Climate",
    selected: false,
  },
  {
    label: "Public Good",
    selected: false,
  },
  {
    label: "Community",
    selected: false,
  },
  {
    label: "Education",
    selected: false,
  },
]);

useEffect(() => {
  if (filteredProjects.length < 1) {
    setFilteredProjects(projects);
  }
}, [projects]);

// console.log("filter", filteredProjects);

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
      setFilteredProjects(projects);
      break;
    case "Newest to Oldest":
      sortNewToOld(projects);
      break;
    case "Oldest to Newest":
      sortOldToNew(projects);
      break;
    case "Most to Least Donations":
      sortHighestToLowest(projects);
      break;
    case "Least to Most Donations":
      sortLowestToHighest(projects);
      break;
  }
};

const searchByWords = (projects, searchTerm) => {
  searchTerm = searchTerm.toLowerCase().trim();
  let results = [];
  // const dataArr = projects;
  // let alldata = [];
  projects.forEach((project) => {
    const { id, status } = project;
    const data = Social.getr(`${id}/profile`);
    // alldata.push(data);
    if (id.includes(searchTerm) || status.toLowerCase().includes(searchTerm)) {
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
  //let projectFilterBySearch = [];
  // projects.forEach((project) => {
  //   const data = Social.getr(`${project.id}/profile`);
  //   findId.forEach((id) => {
  //     if (tagSelected.length > 0) {
  //       if (data.category == tagSelected[0]) {
  //         if (project.id == id) {
  //           results.push(project);
  //         }
  //       }
  //     } else {
  //       if (project.id == id) {
  //         results.push(project);
  //       }
  //     }
  //   });
  // });

  setFilteredProjects(results);
};
const handleTag = (key) => {
  //console.log(tagsList[key].value);
  const tags = tagsList;
  tags[key].selected = !tagsList[key].selected;
  const dataArr = projects;
  let tagSelected = [];
  tagsList.forEach((tag) => {
    if (tag.selected) {
      tagSelected.push(tag.label);
    }
  });
  let projectFilterBySearch = [];
  dataArr.forEach((item) => {
    const data = Social.getr(`${item.id}/profile`);
    const tagsForProfile = getTagsFromSocialProfileData(data);
    tagSelected.forEach((tag) => {
      if (tagsForProfile.includes(tag)) {
        projectFilterBySearch.push(item);
      }
    });
  });
  if (tagSelected.length == 0) {
    setFilteredProjects(dataArr);
  } else {
    setFilteredProjects(projectFilterBySearch);
  }
  setTagsList(tags);
};

return (
  <>
    <HeroContainer>
      {/* <Hero src={HERO_BACKGROUND_IMAGE_URL} alt="hero" /> */}
      <HeaderContainer style={containerStyleHeader}>
        <HeaderContent>
          <HeaderTitle>
            Transforming
            <Underline>
              <svg
                width="340"
                height="42"
                viewBox="0 0 340 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.29967 39C-14.0566 35.9491 49.9788 32.436 71.4774 30.6444C151.734 23.9564 232.915 20.5161 312.9 15"
                  stroke="#DD3345"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M31.2997 27C9.94337 23.9491 73.9788 20.436 95.4774 18.6444C175.734 11.9564 256.915 8.51608 336.9 3"
                  stroke="#DD3345"
                  stroke-width="5"
                  stroke-linecap="round"
                />
              </svg>
            </Underline>
          </HeaderTitle>
          <HeaderTitle>Funding for Public Goods</HeaderTitle>
          <HeaderDescription>
            Discover impact projects, donate directly, & participate in funding rounds.
          </HeaderDescription>
        </HeaderContent>

        <ButtonsContainer>
          {/* <Widget
            src={`${ownerId}/widget/Project.ButtonDonateRandomly`}
            props={{
              ...props,
            }}
          /> */}
          <Button onClick={donateRandomly}>Donate Randomly</Button>
          {state.isModalOpen && (
            <Widget
              src={`${ownerId}/widget/Project.ModalDonation`}
              props={{
                ...props,
                isModalOpen: state.isModalOpen,
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
          {/* <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              text: "Register Your Project",
              disabled: false,
              href: props.hrefWithParams(`?tab=createproject`),
              style: { padding: "16px 24px" },
            }}
          /> */}
          <ButtonRegisterProject href={"?tab=createproject"}>
            Register Your Project
          </ButtonRegisterProject>
        </ButtonsContainer>
        <Widget src="potlock.near/widget/Project.DonationStats" />
      </HeaderContainer>
    </HeroContainer>
    {props.tab != "pots" && props.tab != "pot" && (
      <ContainerHeader>
        <Header>
          <Title>Featured projects</Title>
        </Header>

        <ProjectList>
          {featuredProjects.map((project) => {
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
                  // potId,
                  projectId: project.id,
                  allowDonate: true,
                  // allowDonate:
                  //   sybilRequirementMet &&
                  //   publicRoundOpen &&
                  //   project.project_id !== context.accountId,
                  // requireVerification: !sybilRequirementMet,
                }}
              />
            );
          })}
        </ProjectList>
        <OnBottom></OnBottom>
      </ContainerHeader>
    )}
    <Header>
      <Title>
        all {tab == "pots" ? "pots" : "projects"}
        <span style={{ color: "#DD3345", marginLeft: "8px", fontWeight: 600 }}>
          {projects.length}
        </span>
      </Title>
      <Widget
        src={`${ownerId}/widget/Project.SearchBar`}
        props={{
          title: sort,
          tab: tab,
          numItems: filteredProjects.length,
          itemName: tab == "pots" ? "pot" : "project",
          sortList: Object.values(SORT_FILTERS),
          FilterMenuCustomStyle: `left:auto !important; right:0;`,
          setSearchTerm: (value) => {
            searchByWords(projects, value);
          },
          handleSortChange: (filter) => {
            handleSortChange(filter);
          },
        }}
      />
      {tab != "pots" && tab != "pot" && (
        <TagsWrapper>
          Tags:
          {tagsList.map((tag, key) => (
            <Tag
              key={key}
              onClick={() => handleTag(key)}
              className={`${
                tag.selected && "gap-2 bg-[#FEF6EE]"
              } p-2 rounded border text-sm flex items-center  cursor-pointer`}
            >
              {tag.selected && (
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.86204 7.58116L1.08204 4.80117L0.135376 5.74116L3.86204 9.46783L11.862 1.46783L10.922 0.527832L3.86204 7.58116Z"
                    fill="#F4B37D"
                  ></path>
                </svg>
              )}
              {tag.label}
            </Tag>
          ))}
        </TagsWrapper>
      )}
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
                    // potId,
                    projectId: project.id,
                    allowDonate: true,
                    // allowDonate:
                    //   sybilRequirementMet &&
                    //   publicRoundOpen &&
                    //   project.project_id !== context.accountId,
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
  </>
);
