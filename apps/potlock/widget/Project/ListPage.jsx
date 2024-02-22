const { ownerId, userIsRegistryAdmin, tab, yoctosToUsd, DONATION_CONTRACT_ID } = props;

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

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
  ${loraCss}

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
const projects = useMemo(
  () =>
    userIsRegistryAdmin
      ? props.registeredProjects
      : props.registeredProjects.filter((project) => project.status === "Approved"),
  [props.registeredProjects, userIsRegistryAdmin]
);

const [totalDonation, setTotalDonation] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);
const [filteredProjects, setFilteredProjects] = useState(projects);
const [searchTerm, setSearchTerm] = useState("");

Near.asyncView(DONATION_CONTRACT_ID, "get_config", {}).then((result) => {
  const lastDonationAmount = props.yoctosToUsd(result.net_donations_amount);
  setTotalDonated(lastDonationAmount);
  setTotalDonation(result.total_donations_count);
});

const donateRandomly = () => {
  State.update({
    isModalOpen: true,
    successfulDonation: null,
  });
};

const featuredProjectIds = ["magicbuild.near", "potlock.near", "yearofchef.near"];
const featuredProjects = useMemo(
  () => projects.filter((project) => featuredProjectIds.includes(project.id)),
  projects
);

const [totalDonations, totalDonors] = useMemo(() => {
  if (!props.donations) {
    return ["", "", ""];
  }
  let totalDonations = new Big("0");
  let donors = {};
  props.donations.forEach((donation) => {
    const totalAmount = new Big(donation.total_amount);
    const referralAmount = new Big(donation.referrer_fee || "0");
    const protocolAmount = new Big(donation.protocol_fee || "0");
    totalDonations = totalDonations.plus(totalAmount.minus(referralAmount).minus(protocolAmount));
    donors[donation.donor_id] = true;
  });
  return [totalDonations.div(1e24).toNumber().toFixed(2), Object.keys(donors).length];
}, [props.donations]);

const handleDonateRandomly = (e) => {
  e.preventDefault();
  props.openDonateToProjectModal();
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
  MOST_TO_LEAST_DONATIONS: "Most to Least Donations",
  LEAST_TO_MOST_DONATIONS: "Least to Most Donations",
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
  switch (sortType) {
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
  let findId = [];
  const dataArr = projects;
  let alldata = [];
  dataArr.forEach((item) => {
    const data = Social.getr(`${item.id}/profile`);
    alldata.push(data);
    if (data) {
      if (
        data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        findId.push(item.id);
      }
    }
  });
  let projectFilterBySearch = [];
  dataArr.forEach((project) => {
    const data = Social.getr(`${project.id}/profile`);
    findId.forEach((id) => {
      if (tagSelected.length > 0) {
        if (data.category == tagSelected[0]) {
          if (project.id == id) {
            projectFilterBySearch.push(project);
          }
        }
      } else {
        if (project.id == id) {
          projectFilterBySearch.push(project);
        }
      }
    });
  });

  setFilteredProjects(projectFilterBySearch);
};

return (
  <>
    <HeroContainer>
      <Hero src={HERO_BACKGROUND_IMAGE_URL} alt="hero" />
      {/* <Widget
        src={`${ownerId}/widget/Components.Header`}
        props={{
          ...props,
          ownerId,
          tab,
          yoctosToUsd,
          title1: "Transforming",
          title2: "Funding for Public Goods",
          description:
            "Discover impact projects, donate directly, & participate in funding rounds.",
          centered: true,
          containerStyle: {
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            marginBottom: "24px",
            background:
              "radial-gradient(80% 80% at 40.82% 50%, white 25%, rgba(255, 255, 255, 0) 100%)",
          },
          buttonPrimary: (
            <Widget
              src={`${ownerId}/widget/Project.ButtonDonateRandomly`}
              props={{
                ...props,
              }}
            />
          ),
          buttonSecondary: (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                text: "Register Your Project",
                disabled: false,
                href: props.hrefWithEnv(`?tab=createproject`),
                style: { padding: "16px 24px" },
              }}
            />
          ),
          // TODO: refactor this
          children: totalDonations && (
            <InfoCardsContainer>
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: props.nearToUsd
                    ? `$${(totalDonations * props.nearToUsd).toFixed(2)}`
                    : `${totalDonations} N`,
                  infoTextSecondary: "Total Contributed",
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: totalDonors,
                  infoTextSecondary: "Unique Donors",
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: props.donations ? props.donations.length : "-",
                  infoTextSecondary: "Donations",
                }}
              />
            </InfoCardsContainer>
          ),
        }}
      /> */}
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
                openDonationSuccessModal: (donation) => {
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
              src={`${ownerId}/widget/Project.ModalDonationSuccess`}
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
              href: props.hrefWithEnv(`?tab=createproject`),
              style: { padding: "16px 24px" },
            }}
          /> */}
          <ButtonRegisterProject href={"?tab=createproject"}>
            Register Your Project
          </ButtonRegisterProject>
        </ButtonsContainer>
        <Stats>
          <StatsTitle>
            {totalDonated || "-"}
            <StatsSubTitle>Donated</StatsSubTitle>
          </StatsTitle>
          <StatsTitle>
            {totalDonation || "-"}
            <StatsSubTitle>Donations</StatsSubTitle>
          </StatsTitle>
        </Stats>
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
          title: "Sort",
          tab: tab,
          numItems: filteredProjects.length,
          itemName: tab == "pots" ? "pot" : "project",
          sortList: Object.values(SORT_FILTERS),
          setSearchTerm: (value) => {
            searchByWords(projects, value);
          },
          handleSortChange: (filter) => {
            handleSortChange(filter);
          },
        }}
      />
      {/* {tab != "pots" && tab != "pot" && (
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
        )} */}
    </Header>
    <ProjectsContainer>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          ...props,
          items: filteredProjects,
          renderItem: (project) => {
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
          },
        }}
      />
    </ProjectsContainer>
  </>
);
