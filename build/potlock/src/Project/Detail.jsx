const ownerId = "potlock.near";
const registryId = "registry.potlock.near";

const profile = props.profile ?? Social.getr(`${props.projectId}/profile`);

const projects = props.projects ?? Near.view(registryId, "get_projects", {});

if (!profile || !projects) {
  return "Loading";
}

const registeredProject = projects.find(
  (project) => project.id == props.projectId && project.status == "Approved"
);

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));

  // @media screen and (max-width: 768px) {
  //   .mb-2 {
  //     width: 64px;
  //     height: 64px;
  //   }
  // }
`;

const SidebarContainer = styled.div`
  width: 25%;
  // width: 500px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 252px 68px 68px 68px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 240px 16px 32px 16px;
  }
`;

const BodyContainer = styled.div`
  flex: 1;
`;

// these will be passed down to child components
props.navOptions = [
  {
    label: "Home",
    id: "home",
    disabled: false,
    source: `${ownerId}/widget/Project.About`,
  },
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: `${ownerId}/widget/Project.Feed`,
  },
  {
    label: "Pots",
    id: "pots",
    disabled: true,
  },
  {
    label: "Attestations",
    id: "attestations",
    disabled: true,
  },
  {
    label: "Funding Raised",
    id: "funding",
    disabled: true,
  },
];

if (!props.nav) props.nav = "home"; // default to home tab

const imageHeightPx = 120;
const profileImageTranslateYPx = 220;

return (
  <Wrapper>
    {!registeredProject ? (
      <div style={{ textAlign: "center", paddingTop: "12px" }}>Project not found</div>
    ) : (
      <>
        <Widget
          src={`${ownerId}/widget/Project.BannerHeader`}
          props={{
            ...props,
            profile,
            // profileImageTranslateYPx,
            // containerStyle: {
            //   paddingLeft: "64px",
            // },
            backgroundStyle: {
              objectFit: "cover",
              left: 0,
              top: 0,
              height: "280px",
            },
            // TODO: image styles will vary based on viewport width, so should default to being set in the widget. can also be overriden using imageStyle prop if desired.
            // imageStyle: {
            //   width: `${imageHeightPx}px`,
            //   height: `${imageHeightPx}px`,
            // },
          }}
        />
        <Container>
          {/* <div class="row align-items-start"> */}
          <SidebarContainer
          // class="col-3"
          >
            <Widget
              src={`${ownerId}/widget/Project.NavOptions`}
              props={{
                ...props,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Project.Linktree`}
              props={{
                ...props,
                linktree: profile.linktree,
              }}
            />
          </SidebarContainer>
          <BodyContainer
          // class="col-9"
          >
            <Widget
              src={`${ownerId}/widget/Project.Body`}
              props={{
                ...props,
                profile,
              }}
            />
          </BodyContainer>
          {/* </div> */}
        </Container>
        {/* <BodyContainerMobile>
          <div class="col-12">
            <Widget
              src={`${ownerId}/widget/Project.Body`}
              props={{
                ...props,
                profile,
              }}
            />
          </div>
        </BodyContainerMobile> */}
      </>
    )}
  </Wrapper>
);
