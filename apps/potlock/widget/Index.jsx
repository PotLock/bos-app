const ownerId = "${config_account}";
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

const { getCartItemCount, clearCart } = VM.require("${config_account}/widget/SDK.cart") || {
  getCartItemCount: () => {},
  clearCart: () => {},
};

const numCartItems = getCartItemCount();

const loraCss = fetch(
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
).body;

const Theme = styled.div`
  position: relative;
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
  ${loraCss}
`;

State.init({
  checkoutSuccess: false,
  checkoutSuccessTxHash: null,
  isNavMenuOpen: false,
  donnorProjectId: null,
  amount: null,
  note: null,
  referrerId: null,
  currency: null,
  // isSybilModalOpen: false,
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

// console.log("state in Index: ", state);

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
  ...props,
  ...state,
  ownerId: "${config_account}",
  NADABOT_CONTRACT_ID: nadabotContractId,
  referrerId: props.referrerId,
  setCurrency: (cur) => {
    const currency = state.currency ?? cur;
    State.update({ currency: currency });
    Storage.set("currency", currency);
  },
  setNote: (n) => {
    const note = state.note ?? n;
    State.update({ note: note });
    Storage.set("note", note);
  },
  setAmount: (value) => {
    const amount = state.amount ?? value;
    State.update({ amount: amount });
    Storage.set("amount", amount);
  },
  setProjectId: (id) => {
    const donnorProjectId = state.donnorProjectId ?? id;
    State.update({ donnorProjectId: donnorProjectId });
    Storage.set("projectId", donnorProjectId);
  },
  setReferrerId: (ref) => {
    const referrerId = state.referrerId ?? ref;
    State.update({ referrerId: referrerId });
    Storage.set("referrerId", referrerId);
  },
  setCheckoutSuccess: (checkoutSuccess) => {
    State.update({ checkoutSuccess });
  },
  setIsNavMenuOpen: (isOpen) => {
    State.update({ isNavMenuOpen: isOpen });
  },
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
};

if (props.transactionHashes && props.tab === CART_TAB) {
  // if transaction hashes are in URL but haven't been added to props, override state:
  props.checkoutSuccessTxHash = props.transactionHashes;
  props.checkoutSuccess = true;
}

if (props.transactionHashes && props.tab === DEPLOY_POT_TAB) {
  // if transaction hashes are in URL but haven't been added to props, override state:
  props.deploymentSuccessTxHash = props.transactionHashes;
  props.deploymentSuccess = true;
}

if (
  state.currency === null &&
  state.donnorProjectId === null &&
  state.amount === null &&
  StorageCurrency !== null &&
  StorageAmount !== null &&
  StorageProjectId !== null
) {
  State.update({ currency: StorageCurrency });
  State.update({ amount: StorageAmount });
  State.update({ donnorProjectId: StorageProjectId });
  State.update({ note: StorageNote });
  State.update({ referrerId: StorageReferrerId });
}

if (props.checkoutSuccessTxHash && numCartItems > 0) {
  // if checkout was successful after wallet redirect, clear cart
  // store previous cart in local storage to show success message
  // console.log("previous cart: ", state.cart);
  clearCart();
}

if (props.tab === EDIT_PROJECT_TAB) {
  props.edit = true;
}

const tabContent = (
  <Widget src={`${config_account}/widget/${getTabWidget(props.tab)}`} props={props} />
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
    <Widget src={"${config_account}/widget/Components.Nav"} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
    {props.tab !== POT_DETAIL_TAB && props.tab !== POTS_TAB && (
      <Widget src={"${config_account}/widget/Components.Banner"} props={props} />
    )}
    <Widget
      src={"${config_account}/widget/Project.ModalSuccess"}
      props={{
        ...props,
        successfulDonation: state.successModal.successfulDonation,
        isModalOpen: state.successModal.isOpen,
        onClose: () =>
          State.update({
            successModal: {
              isOpen: false,
              successfulDonation: null,
            },
          }),
      }}
    />
  </Theme>
);
