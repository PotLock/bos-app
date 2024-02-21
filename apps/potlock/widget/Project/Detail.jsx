const {
  ownerId,
  projectId,
  userIsRegistryAdmin,
  REGISTRY_CONTRACT_ID,
  tab,
  POT_FACTORY_CONTRACT_ID,
  DONATION_CONTRACT_ID,
} = props;

const { ProjectOptions } = VM.require(`${ownerId}/widget/Project.Options`);

const project = Near.view(REGISTRY_CONTRACT_ID, "get_project_by_id", { project_id: projectId });
if (!project || project == null) {
  return "Loading";
}

if (project == undefined) {
  return "Project not found";
}
// Fetch Project Donations
// const donations = Near.view(DONATION_CONTRACT_ID, "get_donations_for_recipient", {
//   recipient_id: projectId,
// });

const profile = Social.getr(`${projectId}/profile`);
if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    {project.status !== "Approved" && (
      <Widget src={`${ownerId}/widget/Project.ProjectBanner`} props={{ ...props, project }} />
    )}
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        project,
        nav: props.nav ?? "home",
        navOptions: ProjectOptions(props),
      }}
    />
  </Wrapper>
);
