const { profile, accountId, ownerId, profileLink } = props;
const nav = props.nav ?? "feed";

const tags = Object.keys(profile.tags ?? {});

const donations = Near.view("donate.potlock.near", "get_donations_for_donor", {
  donor_id: accountId,
});

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 0%;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 16px;
  width: 100%;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: #2e2e2e;
  line-height: 56px;
  font-family: "Lora";
  ${loraCss}

  @media screen and (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const AccountId = styled.div`
  color: #7b7b7b;
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const ShareIconContainer = styled.svg`
  width: 24px;
  height: 24px;

  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
const ShareIcon = (
  <ShareIconContainer>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="0.363"
    >
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
    </svg>
  </ShareIconContainer>
);

return (
  <Body>
    <Header>
      <NameContainer>
        <Name>{profile.name}</Name>
        {canEdit && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              text: "Edit profile",
              disabled: false,
              href: props.hrefWithEnv(`?tab=editproject&projectId=${props.projectId}`),
            }}
          />
        )}
      </NameContainer>
      <AccountInfoContainer>
        <AccountId>@{accountId}</AccountId>
        <Widget
          src={`${ownerId}/widget/Project.Share`}
          props={{
            text: "https://app.potlock.org" + profileLink,
            // label: "Share",
            clipboardIcon: ShareIcon,
          }}
        />
      </AccountInfoContainer>
      {tags.length > 0 && (
        <div>
          <Widget
            src={`${ownerId}/widget/Project.Tags`}
            props={{
              ...props,
              tags,
            }}
          />
        </div>
      )}
      <div className="public-tags collapse show">
        <button
          className="btn btn-sm btn-outline-secondary border-0"
          data-bs-toggle="collapse"
          data-bs-target={`.public-tags`}
          aria-expanded="false"
          aria-controls={"public-tags"}
        >
          <i className="bi bi-arrows-angle-expand me-1"></i>Show public tags
        </button>
      </div>
      <div className="collapse public-tags">
        <Widget src="mob.near/widget/PublicTags" props={{ accountId }} />
      </div>
      <Widget
        src={`${ownerId}/widget/Project.Actions`}
        props={{
          ...props,
          projectId: accountId,
          showDonate: false,
        }}
      />
    </Header>
    {nav === "feed" && (
      <div
        className="tab-pane fade show active"
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
      >
        <div className="mx-auto">
          {profile.description && (
            <Widget
              key="desc"
              loading=""
              src="mob.near/widget/MainPage.N.Post"
              props={{
                accountId,
                pinned: true,
                blockHeight: "now",
                content: {
                  text: profile.description,
                },
              }}
            />
          )}
          <Widget
            key="feed"
            src="mob.near/widget/MainPage.N.Feed"
            props={{ accounts: [accountId] }}
          />
        </div>
      </div>
    )}
    {nav === "widgets" && <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />}
    {nav === "donations" && (
      <Widget
        src={`${ownerId}/widget/Components.DonorsTrx`}
        props={{ ...props, donations: donations, showDonor: false }}
      />
    )}
    {(nav === "followers" || nav === "following") && (
      <Widget
        src={`${ownerId}/widget/Profile.FollowTabs`}
        props={{ ...props, accountId, tab: nav }}
      />
    )}
  </Body>
);
