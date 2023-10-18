const ownerId = "potlock.near";
const registryId = "registry1.tests.potlock.near"; // TODO: update when registry is deployed

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Separator = styled.div`
  width: 100%;
  height: 96px;
  background-color: #f8f8f8;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
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
  padding: 96px 64px;
`;

const sampleProjects = [
  {
    id: "1.near",
    name: "Space Explorer",
    description: "Navigate through the uncharted territories of outer space.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["React", "GraphQL"],
  },
  {
    id: "2.near",
    name: "Weather App",
    description: "Get the latest weather updates for your location.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Vue", "REST API"],
  },
  {
    id: "3.near",
    name: "Recipe Book",
    description: "Find and save your favorite recipes.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Angular", "Firebase"],
  },
  {
    id: "4.near",
    name: "Fitness Tracker",
    description: "Monitor your fitness journey.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Svelte", "MongoDB"],
  },
  {
    id: "5.near",
    name: "Bookstore",
    description: "Discover and purchase books online.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["React", "Stripe API"],
  },
  {
    id: "6.near",
    name: "Job Finder",
    description: "Connect employers and job seekers.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Python", "Django"],
  },
  {
    id: "7.near",
    name: "Social Media App",
    description: "Connect with friends and family.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["MERN Stack"],
  },
  {
    id: "8.near",
    name: "E-commerce Platform",
    description: "Shop your favorite items online.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["MERN Stack"],
  },
];

State.init({
  // registeredProjects: null, // TODO: change this back to null
  registeredProjects: sampleProjects,
  getRegisteredProjectsError: "",
});

// if (context.accountId && !state.registeredProjects) {
//   Near.asyncView(registryId, "get_projects", {})
//     .then((projects) => {
//       State.update({ registeredProjects: projects });
//     })
//     .catch((e) => {
//       console.log("error getting projects: ", e);
//       State.update({ getRegisteredProjectsError: e });
//     });
// }

if (!state.registeredProjects) return <>Loading...</>;

return (
  <>
    <Widget
      src={`${ownerId}/widget/Components.Header`}
      props={{
        title1: "Transforming",
        title2: "Funding for Public Goods",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
        centered: true,
        buttonPrimary: (
          <Widget
            src={`${ownerId}/widget/Buttons.ActionButton`}
            props={{
              type: "primary",
              text: "Explore projects",
              disabled: false,
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
            }}
          />
        ),
      }}
    />
    <Separator />
    {/* <SectionTitle>Featured projects</SectionTitle> */}
    {/* <Widget
      src={`${ownerId}/widget/Project.Carousel`}
      props={{
        projects: sampleProjects,
      }}
    /> */}
    <ProjectsContainer>
      <SectionHeader>
        <SectionTitle>All projects</SectionTitle>
        <ProjectsCount>{state.registeredProjects.length}</ProjectsCount>
      </SectionHeader>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          projects: state.registeredProjects,
          renderItem: (project) => (
            <Widget
              src={`${ownerId}/widget/Project.Card`}
              props={{
                project,
              }}
            />
          ),
        }}
      />
    </ProjectsContainer>
  </>
);
