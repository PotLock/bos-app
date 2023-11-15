const ownerId = "potlock.near";

const projects = props.registeredProjects || [];

const projectIds = useMemo(
  () => projects.filter((project) => project.status === "Approved").map((project) => project.id),
  [projects]
);

const Container = styled.div`
  padding: 24px 64px;

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
  }
`;

return (
  <Container>
    <Widget key="feed" src={`${ownerId}/widget/Project.Feed`} props={{ accounts: projectIds }} />
  </Container>
);
