const ownerId = "potlock.near";

const { name, description } = props.profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
`;

const Header = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 600;
  // font-family: Lora;
`;

const DonationsInfo = () => (
  <Widget
    src={`${ownerId}/widget/Project.DonationsInfo`}
    props={{
      ...props,
    }}
  />
);

const About = () => (
  <Widget
    src={`${ownerId}/widget/Project.AboutItem`}
    props={{
      ...props,
      title: "Overview",
      text: description,
    }}
  />
);

const Team = () => (
  <Widget
    src={`${ownerId}/widget/Project.Team`}
    props={{
      ...props,
      team: Object.keys(props.profile.team ?? {}),
    }}
  />
);

return (
  <Container>
    <Header>About {name}</Header>
    <DonationsInfo />
    <About />
    <Team />
  </Container>
);
