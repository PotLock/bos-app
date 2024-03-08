const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { name, description, plPublicGoodReason } = props.profile;
const { getTeamMembersFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTeamMembersFromSocialProfileData: () => [],
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  // width: 100%;
  // background: yellow;
`;

const Header = styled.div`
  color: #2e2e2e;
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;

// const DonationsInfo = () => (
//   <Widget
//     src={`${ownerId}/widget/Project.DonationsInfo`}
//     props={{
//       ...props,
//     }}
//   />
// );

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
      title: "Public Good Reason",
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
      {/* <DonationsInfo /> */}
    </HeaderContainer>
    <About />
    <PublicGoodReason />
    <Team />
  </Container>
);
