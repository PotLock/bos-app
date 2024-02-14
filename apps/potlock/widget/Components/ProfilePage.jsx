const accountId = props.accountId ?? context.accountId;

const { ownerId } = props;

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
  padding: 252px 68px 68px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 280px 16px 32px 16px;
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

props.navOptions = [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "mob.near/widget/MainPage.N.Feed",
    href: props.hrefWithEnv(`${profileLink}&nav=feed`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${ownerId}/widget/Pots.Donations`,
    href: props.hrefWithEnv(`${profileLink}&nav=donations`),
  },
  {
    label: "Widgets",
    id: "widgets",
    disabled: false,
    source: `mob.near/widget/LastWidgets"`,
    href: props.hrefWithEnv(`${profileLink}&nav=widgets`),
  },
];

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
      <SidebarContainer>
        <Widget
          src={`${ownerId}/widget/Components.NavOptions`}
          props={{
            ...props,
          }}
        />
        {profile.linktree && (
          <Widget
            src={`${ownerId}/widget/Project.Linktree`}
            props={{
              ...props,
              linktree: profile.linktree,
            }}
          />
        )}
      </SidebarContainer>
      <Widget
        src={`${ownerId}/widget/Profile.Body`}
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
