const { ownerId, id, userIsRegistryAdmin, REGISTRY_CONTRACT_ID, tab } = props;

const projectId = id;
props.projectId = projectId;
const accountId = props.id ?? context.accountId;
props.accountId = accountId;

const { ProjectOptions, ProfileOptions } = VM.require(`${ownerId}/widget/Project.Options`);

let project, donations;
if (tab === "project") {
  project = Near.view(REGISTRY_CONTRACT_ID, "get_project_by_id", { project_id: projectId });
  if (!profile || project == null) {
    return "Loading";
  }

  if (project == undefined) {
    return "Project not found";
  }
  // Fetch Project Donations
  donations = Near.view("donate.potlock.near", "get_donations_for_recipient", {
    recipient_id: projectId,
  });
  props.donations = donations;
  props.showProject = false; // hide recepientId row

  if (!props.nav) props.nav = "home"; // default to home tab
}

const profile = Social.getr(`${id}/profile`);
if (profile === null) {
  return "Loading";
}
console.log("profile", profile);
const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;
const SidebarContainer = styled.div`
  width: 25%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Container = styled.div`
  padding: 252px 68px 68px 68px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 240px 16px 32px 16px;
  }
`;
const BodyContainer = styled.div`
  flex: 1;
  --primary-color: #dd3345;
`;

const BannerText = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  word-break: break-all;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 4px;
  }
`;

props.navOptions = tab === "project" ? ProjectOptions(props) : ProfileOptions(props);
const imageHeightPx = 120;
const profileImageTranslateYPx = 220;

return (
  <Wrapper>
    {/* {project.status !== "Approved" && (
     
    )} */}
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        profile,

        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "280px",
        },
      }}
    />
    <Container>
      <SidebarContainer>
        <Widget
          src={`${ownerId}/widget/Components.NavOptions`}
          props={{
            ...props,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Project.Linktree`}
          props={{
            ...props,
            linktree: profile.linktree,
          }}
        />
      </SidebarContainer>
      <BodyContainer>
        <Widget
          src={`${ownerId}/widget/Project.Body`}
          props={{
            ...props,
            profile,
            project,
          }}
        />
      </BodyContainer>
    </Container>
  </Wrapper>
);
