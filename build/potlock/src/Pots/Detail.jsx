const ownerId = "potlock.near";

console.log("props in Pot Detail: ", props);

// const registeredProject = projects.find(
//   (project) => project.id == props.projectId && project.status == "Approved"
// );

// const name = profile.name || "No-name profile";
// const image = profile.image;
// const backgroundImage = profile.backgroundImage;
// const tags = Object.keys(profile.tags ?? {});

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
  padding: 0px 68px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 240px 16px 32px 16px;
  }
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 68px 0px;
`;

const BodyContainer = styled.div`
  flex: 1;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #292929;
`;

const { potId } = props;

State.init({
  potDetail: null,
});

if (state.potDetail === null) {
  const potDetail = Near.view(potId, "get_config", {});
  if (potDetail !== null) {
    State.update({ potDetail });
  }
}

console.log("state in pot detail: ", state);

const noPot = state.potDetail === undefined;
const loading = state.potDetail === null;

// these will be passed down to child components
props.navOptions = [
  {
    label: "Projects",
    id: "projects",
    disabled: false,
    source: `${ownerId}/widget/Pots.Projects`,
    href: `?tab=pot&potId=${potId}&nav=projects`,
  },
  {
    label: "Applications",
    id: "applications",
    disabled: false,
    source: `${ownerId}/widget/Pots.Applications`,
    href: `?tab=pot&potId=${potId}&nav=applications`,
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${ownerId}/widget/Pots.Donations`,
    href: `?tab=pot&potId=${potId}&nav=donations`,
  },
  {
    label: "Settings",
    id: "settings",
    disabled: false,
    source: `${ownerId}/widget/Pots.Settings`,
    href: `?tab=pot&potId=${potId}&nav=settings`,
  },
];

if (!props.nav) props.nav = "projects"; // default to home tab

// const imageHeightPx = 120;
// const profileImageTranslateYPx = 220;

if (loading) return "Loading...";

if (noPot) return "No pot found";

return (
  <Wrapper>
    {/* {!registeredProject ? (
      <div style={{ textAlign: "center", paddingTop: "12px" }}>Project not found</div>
    ) : ( */}
    <>
      <Widget
        src={`${ownerId}/widget/Pots.Header`}
        props={{
          ...props,
        }}
      />
      <Container>
        <Divider />
        <ContainerInner>
          <SidebarContainer
          // class="col-3"
          >
            <Widget
              src={`${ownerId}/widget/Components.NavOptions`}
              props={{
                ...props,
              }}
            />
          </SidebarContainer>
          <BodyContainer
          // class="col-9"
          >
            <Widget
              src={props.navOptions.find((option) => option.id == props.nav).source}
              props={{
                ...props,
              }}
            />
          </BodyContainer>
        </ContainerInner>
      </Container>
    </>
    {/* )} */}
  </Wrapper>
);
