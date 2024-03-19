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
  cart: null,
  checkoutSuccess: false,
  checkoutSuccessTxHash: null,
  // previousCart: null,
  isCartModalOpen: false,
  isNavMenuOpen: false,
  donnorProjectId: null,
  amount: null,
  note: null,
  referrerId: null,
  currency: null,
  // isSybilModalOpen: false,
  donateToProjectModal: {
    isOpen: false,
    recipientId: null,
    referrerId: null,
    potId: null,
    potDetail: null,
  },
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

const CART_KEY = "cart";

// const PREVIOUS_CART_KEY = "previousCart";
const storageCart = Storage.get(CART_KEY);
const StorageCurrency = Storage.get("currency");
const StorageNote = Storage.get("note");
const StorageAmount = Storage.get("amount");
const StorageProjectId = Storage.get("projectId");
const StorageReferrerId = Storage.get("referrerId");
// const storagePreviousCart = Storage.get(PREVIOUS_CART_KEY);
const DEFAULT_CART = {};

const props = {
  ...props,
  ...state,
  ownerId: "potlock.near",
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
  addProjectsToCart: (projects) => {
    const cart = state.cart ?? {};
    projects.forEach((item) => {
      if (!item.ft) item.ft = "NEAR"; // default to NEAR
      cart[item.id] = item; // default to NEAR
    });
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  removeProjectsFromCart: (projectIds) => {
    const cart = state.cart ?? {};
    projectIds.forEach((projectId) => {
      delete cart[projectId];
    });
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  updateCartItem: ({ projectId, amount, ft, price, referrerId, potId, potDetail, note }) => {
    const cart = state.cart ?? {};
    const updated = {};
    // if (amount === "") updated.amount = "0";
    if (amount || amount === "") updated.amount = amount;
    if (ft) updated.ft = ft;
    if (price) updated.price = price;
    if (referrerId) updated.referrerId = referrerId;
    if (potId) updated.potId = potId;
    if (potDetail) updated.potDetail = potDetail;
    if (note) updated.note = note;
    cart[projectId] = updated;
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  clearCart: () => {
    State.update({ cart: {} });
    Storage.set(CART_KEY, JSON.stringify(DEFAULT_CART));
  },
  setCheckoutSuccess: (checkoutSuccess) => {
    State.update({ checkoutSuccess });
  },
  setIsCartModalOpen: (isOpen) => {
    State.update({ isCartModalOpen: isOpen });
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
  openDonateToProjectModal: (recipientId, referrerId, potId, potDetail) => {
    State.update({
      donateToProjectModal: { isOpen: true, recipientId, referrerId, potId, potDetail },
    });
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

if (state.cart === null && storageCart !== null) {
  // cart hasn't been set on state yet, and storageCart has been fetched
  // if storageCart isn't undefined, set it on state
  // otherwise, set default cart on state
  let cart = DEFAULT_CART;
  if (storageCart) {
    cart = JSON.parse(storageCart);
  }
  State.update({ cart });
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

// if (state.previousCart === null && storagePreviousCart !== null) {
//   // previousCart hasn't been set on state yet, and storagePreviousCart has been fetched
//   // if storagePreviousCart isn't undefined, set it on state
//   if (storagePreviousCart && Object.keys(JSON.parse(storagePreviousCart)).length > 0) {
//     console.log("updating previous cart");
//     State.update({ previousCart: JSON.parse(storagePreviousCart) });
//   }
// }

// console.log("state in Index: ", state);

if (props.checkoutSuccessTxHash && state.cart && Object.keys(state.cart).length > 0) {
  // if checkout was successful after wallet redirect, clear cart
  // store previous cart in local storage to show success message
  // console.log("previous cart: ", state.cart);
  props.clearCart();
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

if (!state.cart) {
  return "";
}

return (
  <Theme>
    <Widget src={`${ownerId}/widget/Components.Nav`} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
    <Widget src={`${ownerId}/widget/Components.Attribution`} />
    {props.tab !== POT_DETAIL_TAB && props.tab !== POTS_TAB && (
      <Widget src={`${ownerId}/widget/Components.Banner`} props={props} />
    )}

    {state.donateToProjectModal.isOpen && (
      <Widget
        src={`${ownerId}/widget/Project.ModalDonation`}
        props={{
          ...props,
          isModalOpen: state.donateToProjectModal.isOpen,
          onClose: () =>
            State.update({
              donateToProjectModal: {
                isOpen: false,
                recipientId: null,
                referrerId: null,
                potId: null,
                potDetail: null,
              },
            }),
          recipientId: state.donateToProjectModal.recipientId,
          referrerId: state.donateToProjectModal.referrerId,
          potId: state.donateToProjectModal.potId,
        }}
      />
    )}
    <Widget
      src={`${ownerId}/widget/Project.ModalSuccess`}
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
