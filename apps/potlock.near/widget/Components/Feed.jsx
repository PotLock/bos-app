const { getProjects } = VM.require("${config/account}/widget/SDK.registry") || {
  getProjects: () => [],
};

const projects = getProjects();

const projectIds = projects
  .filter((project) => project.status === "Approved")
  .map((project) => project.id);

const Container = styled.div`
  padding: 24px 64px;

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
  }
`;

return (
  <Container>
    <Widget
      key="feed"
      src={"${config/account}/widget/Profile.Feed"}
      props={{ accounts: projectIds }}
    />
  </Container>
);
