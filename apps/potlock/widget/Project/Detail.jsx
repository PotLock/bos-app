const { ownerId, projectId, userIsRegistryAdmin, REGISTRY_CONTRACT_ID } = props;

const profile = props.profile ?? Social.getr(`${projectId}/profile`);

const project = Near.view(REGISTRY_CONTRACT_ID, "get_project_by_id", { project_id: projectId });

if (!profile || project == null) {
  return "Loading";
}

if (project == undefined) {
  return "Project not found";
}

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

const Banner = styled.div`
  width: 100%;
  // max-height: 50px;
  background: ${project.status === "Pending" ? "#E6B800" : "#dd3345"};
  // background: rgb(6 10 15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 8px;
  border-radius: 4px;
  // border-bottom: 2px rgb(96, 100, 102) solid;
`;

const BannerText = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  word-break: break-all;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 4px;
  }
`;

const BannerAlertSvg = styled.svg`
  width: 18px;

  @media screen and (max-width: 768px) {
    width: 14px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// these will be passed down to child components
props.navOptions = [
  {
    label: "Home",
    id: "home",
    disabled: false,
    source: `${ownerId}/widget/Project.About`,
    href: props.hrefWithEnv(`?tab=project&projectId=${projectId}&nav=home`),
  },
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: `${ownerId}/widget/Project.Feed`,
    href: props.hrefWithEnv(`?tab=project&projectId=${projectId}&nav=feed`),
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
    {project.status !== "Approved" && (
      <Banner>
        <Row>
          <BannerAlertSvg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            aria-hidden="true"
            // width="18px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            ></path>
          </BannerAlertSvg>
          <BannerText>
            This project status is {project.status} and has not been approved.
          </BannerText>
        </Row>
        {project.review_notes && (
          <BannerText style={{ fontStyle: "italic" }}>
            Admin review notes: {project.review_notes}
          </BannerText>
        )}
      </Banner>
    )}
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
          src={`${ownerId}/widget/Components.NavOptions`}
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
            project,
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
  </Wrapper>
);
