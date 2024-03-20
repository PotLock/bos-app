const ownerId = "potlock.near";
const donationContractId = "donate.potlock.near";
// const potFactoryContractId =
//   props.env === "staging" ? "potfactory.staging.potlock.near" : "v1.potfactory.potlock.near";
const nadabotContractId = props.env === "staging" ? "v1.staging.nadabot.near" : "v1.nadabot.near";

const CREATE_PROJECT_TAB = "createproject";
const EDIT_PROJECT_TAB = "editproject";
const PROJECTS_LIST_TAB = "projects";
const PROJECT_DETAIL_TAB = "project";
const CART_TAB = "cart";
const FEED_TAB = "feed";
const POTS_TAB = "pots";
const DEPLOY_POT_TAB = "deploypot";
const POT_DETAIL_TAB = "pot";
const DONORS_TAB = "donors";
const PROFILE_TAB = "profile";
const EDIT_PROFILE_TAB = "editprofile";

const loraCss = fetch(
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
).body;

const Theme = styled.div`
  position: relative;
  * {
    font-family: "Mona-Sans";
    font-feature-settings: "ss01" on, "salt" on;
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
  ${loraCss}
`;

State.init({
  successModal: {
    isOpen:
      (!props.tab ||
        props.tab === PROJECTS_LIST_TAB ||
        props.tab === PROJECT_DETAIL_TAB ||
        props.tab === POT_DETAIL_TAB) &&
      props.transactionHashes,
    successfulDonation: null,
  },
});

const tabContentWidget = {
  [CREATE_PROJECT_TAB]: "Project.Create",
  [EDIT_PROJECT_TAB]: "Project.Create",
  [PROJECTS_LIST_TAB]: "Project.ListPage",
  [PROJECT_DETAIL_TAB]: "Project.Detail",
  [CART_TAB]: "Cart.Checkout",
  [FEED_TAB]: "Components.Feed",
  [POTS_TAB]: "Pots.Home",
  [DEPLOY_POT_TAB]: "Pots.Deploy",
  [POT_DETAIL_TAB]: "Pots.Detail",
  [DONORS_TAB]: "Components.Donors",
  [PROFILE_TAB]: "Profile.Detail",
  [EDIT_PROFILE_TAB]: "Profile.Edit",
};

const getTabWidget = (tab) => {
  const defaultTabWidget = tabContentWidget[PROJECTS_LIST_TAB];
  if (tab in tabContentWidget) {
    return tabContentWidget[props.tab];
  }
  return defaultTabWidget;
};

const props = {
  ...(props ?? {}),
  ...(state ?? {}),
  ownerId: "potlock.near",
  NADABOT_CONTRACT_ID: nadabotContractId,
  referrerId: props.referrerId,
  hrefWithParams: (href) => {
    // pass env & referrerId to all links
    if (props.env) {
      href = `${href}${href.includes("?") ? "&" : "?"}env=${props.env}`;
    }
    if (props.referrerId) {
      href = `${href}${href.includes("?") ? "&" : "?"}referrerId=${props.referrerId}`;
    }
    return href;
  },
  openDonationSuccessModal: (donation) => {
    State.update({ successModal: { isOpen: true, successfulDonation: donation } });
  },
};

if (props.transactionHashes) {
  switch (props.tab) {
    case CART_TAB:
      const { clearCart } = VM.require("potlock.near/widget/SDK.cart") ?? {
        clearCart: () => {},
      };
      // if checkout was successful after wallet redirect, clear cart
      clearCart();
      break;
    default:
      console.log("transactionHash callback case not handled, tab: ", props.tab);
  }
}

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

// console.log("props in Index: ", props);

return (
  <Theme>
    <Widget
      src={`${ownerId}/widget/Components.Nav`}
      props={{
        active: props.tab,
        referrerId: props.referrerId,
      }}
    />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
    <Widget src={`${ownerId}/widget/Components.Attribution`} />
    {props.tab !== POT_DETAIL_TAB && props.tab !== POTS_TAB && (
      <Widget src={`${ownerId}/widget/Components.Banner`} props={props} />
    )}
    <Widget
      src={`${ownerId}/widget/Project.ModalSuccess`}
      props={{
        ...props,
        isModalOpen: state.successModal.isOpen,
        successfulDonation: state.successModal.successfulDonation,
        onClose: () => State.update({ successModal: { isOpen: false, successfulDonation: null } }),
      }}
    />
  </Theme>
);
