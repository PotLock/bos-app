const ownerId = "potlock.near";
const registryId = "registry.potlock.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

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
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0px 64px 96px 64px;
  // background: #fafafa;
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
`;

const Hero = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const userIsAdmin = props.registryAdmins && props.registryAdmins.includes(context.accountId);

const projects = useMemo(
  () =>
    userIsAdmin
      ? props.registeredProjects
      : props.registeredProjects.filter((project) => project.status === "Approved"),
  [props.registeredProjects, userIsAdmin]
);

return (
  <>
    <HeroContainer>
      <Hero src={HERO_BACKGROUND_IMAGE_URL} alt="hero" />
      <Widget
        src={`${ownerId}/widget/Components.Header`}
        props={{
          title1: "Transforming",
          title2: "Funding for Public Goods",
          description:
            "Discover impact projects, donate directly, or get automatic referral fees for raising donations",
          centered: true,
          containerStyle: {
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            background:
              "radial-gradient(80% 80% at 40.82% 50%, white 25%, rgba(255, 255, 255, 0) 100%)",
          },
          buttonPrimary: (
            <Widget
              src={`${ownerId}/widget/Buttons.ActionButton`}
              props={{
                type: "primary",
                text: "Explore projects",
                disabled: false,
                style: { padding: "16px 24px" },
              }}
            />
          ),
          buttonSecondary: (
            <Widget
              src={`${ownerId}/widget/Buttons.NavigationButton`}
              props={{
                type: "secondary",
                text: "Create project",
                disabled: false,
                href: `?tab=createproject`,
                style: { padding: "16px 24px" },
              }}
            />
          ),
        }}
      />
    </HeroContainer>
    <ProjectsContainer>
      <SectionHeader>
        <SectionTitle>All projects</SectionTitle>
        <ProjectsCount>{projects.length}</ProjectsCount>
      </SectionHeader>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          projects,
          renderItem: (project) => (
            <Widget
              src={`${ownerId}/widget/Project.Card`}
              props={{
                project,
                ...props,
              }}
            />
          ),
        }}
      />
    </ProjectsContainer>
  </>
);
