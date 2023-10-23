const ownerId = "potlock.near";
const registryId = "registry1.tests.potlock.near"; // TODO: update when registry is deployed

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const DEFAULT_BANNER_IMAGE_URL =
  IPFS_BASE_URL + "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u";

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

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
  padding: 96px 64px 24px 64px;
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

State.init({
  registeredProjects: null, // TODO: change this back to null
  // registeredProjects: sampleProjects,
  getRegisteredProjectsError: "",
});

if (context.accountId && !state.registeredProjects) {
  Near.asyncView(registryId, "get_projects", {})
    .then((projects) => {
      // get social data for each project
      // name
      // description
      // bannerImage
      // profileImage
      // category
      // horizon stuff, e.g. tags
      Near.asyncView("social.near", "get", {
        keys: projects.map((project) => `${project.id}/profile/**`),
      }).then((socialData) => {
        console.log("social data: ", socialData);
        const formattedProjects = projects.map((project) => {
          console.log("project line 153: ", project);
          const profileData = socialData[project.id]?.profile;
          console.log("profileData line 154: ", profileData);
          let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
          if (profileData.image) {
            const imageUrl = getImageUrlFromSocialImage(profileData.image);
            if (imageUrl) profileImageUrl = imageUrl;
          }
          // get banner image URL
          let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
          if (profileData.backgroundImage) {
            const imageUrl = getImageUrlFromSocialImage(profileData.backgroundImage);
            if (imageUrl) bannerImageUrl = imageUrl;
          }
          const formatted = {
            id: project.id,
            name: profileData.name ?? "",
            description: profileData.description ?? "",
            bannerImageUrl,
            profileImageUrl,
            tags: [profileData.category.text ?? ""], // TODO: change this to get tags from horizon/social
          };
          console.log("formatted: ", formatted);
          return formatted;
        });
        console.log("formatted projects: ", formattedProjects);
        State.update({ registeredProjects: formattedProjects });
      });
    })
    .catch((e) => {
      console.log("error getting projects: ", e);
      State.update({ getRegisteredProjectsError: e });
    });
}

console.log("state in ListPage: ", state);

if (!state.registeredProjects) return "";

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
