const { ownerId } = props;
const accountId = props.accountId ?? context.accountId;

const { ProfileOptions } = VM.require(`${ownerId}/widget/Project.Options`);

if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const fast = !props.profile;

if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  --primary-color: #dd3345;
`;

const Container = styled.div`
  padding-top: 252px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-top: 240px;
  }
`;

const SidebarContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const profileLink = `/${ownerId}/widget/Index?tab=profile&accountId=${accountId}`;

props.navOptions = ProfileOptions(props);

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        profile,
        projectId: accountId,
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "280px",
        },
      }}
    />
    <Container>
      <Widget
        src={`${ownerId}/widget/Project.SidebarContainer`}
        props={{ ...props, linktree: profile.linktree }}
      />
      <Widget
        src={`${ownerId}/widget/Profile.Details`}
        props={{
          ...props,
          profile,
          accountId,
          profileLink,
        }}
      />
    </Container>
  </Wrapper>
);
