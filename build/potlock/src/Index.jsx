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

// if (context.accountId && !state.tncIsFetched) {
//   Near.asyncView(
//     "social.near",
//     "get",
//     {
//       keys: [
//         `${context.accountId}/profile/horizon_tnc`,
//         `${context.accountId}/index/tosAccept`,
//       ],
//     },
//     "final",
//     false
//   ).then((data) =>
//     State.update({
//       tnc: data[context.accountId]?.profile?.horizon_tnc === "true",
//       tosAccept:
//         data[context.accountId]?.index?.tosAccept &&
//         data[context.accountId]?.index?.tosAccept.length > 0,
//       tncIsFetched: true,
//     })
//   );
// }

const tabContentWidget = {
  // home: "Dashboard",
  // inbox: "Inbox",
  // manage: "Manage",
  // project: "Project.Page",
  // request: "Request.Page",
  // vendor: "Vendor.Page",
  // backer: "Investor.Page",
  // contribution: "Contribution.Page",
  [CREATE_PROJECT_TAB]: "Project.Create",
  // createrequest: "Request.Form",
  // createvendor: "Vendor.Form",
  // createbacker: "Investor.Form",
  // permissions: "Inputs.SetUpPermissions",
  // learn: "Learn.Page",
  // faq: "FAQ.Page",
  // help: "Help.Page",
  // legal: "TNCPage",
  // admin: "Admin.Page",
  projects: "Project.ListPage",
  [PROJECT_DETAIL_TAB]: "Project.Detail",
  // investors: "Investor.ListPage",
  // backers: "Investor.ListPage",
  // vendors: "Vendor.ListPage",
  // contributors: "Vendor.ListPage",
  // requests: "Request.ListPage",
  // partners: "Application.Page",
  // partner: "Application.DetailPage",
  // "my-projects": "Manage.Projects",
  // "my-requests": "Manage.Requests",
  // "my-contracts": "Manage.Contracts",
  // "my-applications": "Manage.Applications",
  // events: "Events.Page",
  // perks: "Perks.Page",
  // profile: "Profile.Page",
};

const successfulRegistration = props.tab == CREATE_PROJECT_TAB && props.transactionHashes;

const getWidget = (props) => {
  if (successfulRegistration) {
    // user just successfully registered their project
    // navigate to the project page
    // get the project ID (do this in getWidgetProps)
    return tabContentWidget[PROJECT_DETAIL_TAB];
  } else if (props.tab in tabContentWidget) {
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

const getWidgetProps = () => {
  const props = {
    ...props,
    urlProps: props,
  };
  if (successfulRegistration) {
    props.successfulRegistration = true;
    // get the project ID
    // get list of all registered projects
    // find the one that matches context.accountId
    // pass this project in props to the project page
  }
  return {
    ...props,
    urlProps: props,
    successfulRegistration,
  };
}; // TODO: IMPLEMENT

console.log("Index props: ", props);

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${
      successfulRegistration ? tabContentWidget.projects : getTabWidget(props.tab)
    }`}
    props={{
      ...props,
      urlProps: props,
      successfulRegistration,
    }}
  />
);

// const Page = styled.div`
//   width: 100%;
//   border-radius: 0.5rem;
//   border: 1px solid #eaeaea;
// `;

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

// const showSidebar = ![
//   "createproject",
//   "createrequest",
//   "createvendor",
//   "createbacker",
//   "permissions",
//   "legal",
// ].includes(props.tab);
const isForm = [
  CREATE_PROJECT_TAB,
  // "createrequest",
  // "createvendor",
  // "createbacker",
].includes(props.tab);

// const showTncDialog = !state.tnc && state.tosAccept && props.tab !== "legal";

return (
  <Theme>
    <Widget src={`${ownerId}/widget/Nav`} />
    {/* <Widget
      src={`${ownerId}/widget/Components.Header`}
      props={{
        title: "Create new project",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
      }}
    /> */}
    {/* <Widget src={`${ownerId}/widget/Project.Form`} /> */}
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
  </Theme>
);
