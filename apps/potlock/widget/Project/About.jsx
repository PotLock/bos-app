const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { name, description, plPublicGoodReason } = props.profile;
const { getTeamMembersFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTeamMembersFromSocialProfileData: () => [],
};

const Container = styled.div`
  max-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Header = styled.div`
  color: #2e2e2e;
  font-size: 40px;
  font-weight: 500;
  font-family: "Lora";
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;

const About = () => (
  <Widget
    src={`${ownerId}/widget/Project.AboutItem`}
    props={{
      ...props,
      title: "Overview",
      text: <Markdown text={description} />,
    }}
  />
);

const PublicGoodReason = () => (
  <Widget
    src={`${ownerId}/widget/Project.AboutItem`}
    props={{
      ...props,
      title: "Why we are a public good",
      text: plPublicGoodReason || "None provided",
    }}
  />
);

const Team = () => (
  <Widget
    src={`${ownerId}/widget/Project.Team`}
    props={{
      ...props,
      team: getTeamMembersFromSocialProfileData(props.profile),
    }}
  />
);

return (
  <Container>
    <HeaderContainer>
      <Header>About {name}</Header>
    </HeaderContainer>
    <About />
    <PublicGoodReason />
    <Team />
  </Container>
);
