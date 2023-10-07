State.init({
  selectedTab: props.tab || "overview",
});
// add join page to sidebar and put donate button taking from donate tab // need to fork sidebar

const accountId = props.accountId ?? context.accountId ?? "potlock.near";

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `#/potlock.near/widget/potlock.project.profile?accountId=${accountId}`; // need to fork own profile page

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px minmax(0, 1fr);
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 900px) {
    height: 100px;
  }
`;

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 900px) {
    margin-top: -40px;
  }
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const Bio = styled.div`
  color: #11181c;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 48px;

  > *:last-child {
    margin-bottom: 0 !important;
  }

  @media (max-width: 900px) {
    margin-bottom: 48px;
  }
`;

if (profile === null) {
  return "Loading";
}

return (
  <Wrapper>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      <SidebarWrapper>
        <Widget
          src="potlock.near/widget/potlock.project.sidebar.main"
          props={{
            accountId,
            profile,
          }}
        />
      </SidebarWrapper>

      <Content>
        <Tabs>
          <TabsButton
            href={`${accountUrl}&tab=overview`}
            selected={state.selectedTab === "overview"}
          >
            Overview
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=requests`}
            selected={state.selectedTab === "requests"}
          >
            Requests
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=documents`}
            selected={state.selectedTab === "documents"}
          >
            Documents
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=team`}
            selected={state.selectedTab === "team"}
          >
            Team
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=funding`}
            selected={state.selectedTab === "funding"}
          >
            Funding
          </TabsButton>
        </Tabs>

        {state.selectedTab === "overview" && (
          <>
            {profile.description && (
              <>
                <Widget
                  src={`nearhorizon.near/widget/Project.About`}
                  props={{ accountId: accountId, isAdmin: false }}
                />

                <Bio>
                  <Widget
                    src="near/widget/SocialMarkdown"
                    props={{ text: profile.description }}
                  />
                </Bio>
              </>
            )}

            <Widget
              src="near/widget/Posts.Feed"
              props={{ accounts: [accountId] }}
            />
          </>
        )}

        {state.selectedTab === "documents" && (
          <Widget
            src={`nearhorizon.near/widget/Project.Documents`}
            props={{ accountId: props.accountId, isAdmin: false }}
          />
        )}
        {state.selectedTab === "funding" && (
          <Widget
            src={`potlock.near/widget/potlock.project.funding.main`}
            props={{ accountId: props.accountId, isAdmin: false }}
          />
        )}
        {state.selectedTab === "team" && (
          <>
            {" "}
            <Widget
              src={`nearhorizon.near/widget/Project.People`}
              props={{ accountId: props.accountId, isAdmin: false }}
            />
          </>
        )}
        {state.selectedTab === "requests" && (
          <>
            {" "}
            <Widget
              src={`nearhorizon.near/widget/Project.Requests`}
              props={{ accountId: props.accountId }}
            />
          </>
        )}
      </Content>
    </Main>
  </Wrapper>
);
