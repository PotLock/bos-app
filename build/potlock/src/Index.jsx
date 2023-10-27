const ownerId = "potlock.near";

const CREATE_PROJECT_TAB = "createproject";
const EDIT_PROJECT_TAB = "editproject";
const PROJECTS_LIST_TAB = "projects";
const PROJECT_DETAIL_TAB = "project";

const Theme = styled.div`
  * {
    font-family: "Mona-Sans";
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 400;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Regular.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 500;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Medium.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 600;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-SemiBold.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 700;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Bold.woff) format("woff");
  }
`;

State.init({
  tnc: true,
  tncIsFetched: false,
  tosAccept: true,
});

const tabContentWidget = {
  [CREATE_PROJECT_TAB]: "Project.Create",
  [EDIT_PROJECT_TAB]: "Project.Create",
  [PROJECTS_LIST_TAB]: "Project.ListPage",
  [PROJECT_DETAIL_TAB]: "Project.Detail",
};

const getWidget = (props) => {
  if (props.tab in tabContentWidget) {
    return tabContentWidget[props.tab];
  }
  // backup (TODO: review)
  return "Project.ListPage";
};

const getTabWidget = (tab) => {
  if (tab in tabContentWidget) {
    return tabContentWidget[tab];
  }

  return "Project.ListPage";
};

const props = {
  ...props,
  urlProps: props,
};

if (props.tab === EDIT_PROJECT_TAB) {
  props.edit = true;
}

const tabContent = <Widget src={`${ownerId}/widget/${getTabWidget(props.tab)}`} props={props} />;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  // padding: 3em;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  border-top: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--base-white, #fff);

  &.form {
    border: none;
    background: #fafafa;
  }
`;

const isForm = [CREATE_PROJECT_TAB].includes(props.tab);

return (
  <Theme>
    <Widget src={`${ownerId}/widget/Nav`} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
  </Theme>
);
