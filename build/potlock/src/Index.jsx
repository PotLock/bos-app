const ownerId = "potlock.near";

const CREATE_PROJECT_TAB = "createproject";
const PROJECT_DETAIL_TAB = "project";

const monaSansCss = fetch("https://fonts.cdnfonts.com/css/mona-sans").body;

if (!monaSansCss) return "";

const Theme = styled.div`
  * {
    font-family: "Mona-Sans";
  }
  ${monaSansCss}
`;

State.init({
  tnc: true,
  tncIsFetched: false,
  tosAccept: true,
});

const tabContentWidget = {
  [CREATE_PROJECT_TAB]: "Project.Create",
  projects: "Project.ListPage",
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

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${getTabWidget(props.tab)}`}
    props={{
      ...props,
      urlProps: props,
    }}
  />
);

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
