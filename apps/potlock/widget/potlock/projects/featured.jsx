const featuredProjects = [
  "potlock.near",
  "nearefi.near",
  "near-africa.near",
  "keypom.near",
];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  gap: 2em;

  & > h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  }
`;
return (
  <div>
    <Container>
      <h1>Featured Projects</h1>

      {featuredProjects.map((accountId) => (
        <Widget
          src={`potlock.near/widget/potlock.projects.projectCard`}
          props={{
            accountId,
          }}
        />
      ))}
    </Container>
  </div>
);
