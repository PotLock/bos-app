const ownerId = "potlock.near";
const registryContractId = "registry.potlock.near";

const CREATE_PROJECT_TAB = "createproject";
const EDIT_PROJECT_TAB = "editproject";
const PROJECTS_LIST_TAB = "projects";
const PROJECT_DETAIL_TAB = "project";
const CART_TAB = "cart";

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
  cart: null,
  nearToUsd: null,
  isCartModalOpen: false,
  registryAdmins: null,
});

if (state.nearToUsd === null) {
  const res = fetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd");
  console.log("coingecko res: ", res);
  State.update({ nearToUsd: res.body.near.usd });
}

if (state.registryAdmins === null) {
  const registryAdmins = Near.view(registryContractId, "get_admins", {});
  State.update({ registryAdmins });
}

const tabContentWidget = {
  [CREATE_PROJECT_TAB]: "Project.Create",
  [EDIT_PROJECT_TAB]: "Project.Create",
  [PROJECTS_LIST_TAB]: "Project.ListPage",
  [PROJECT_DETAIL_TAB]: "Project.Detail",
  [CART_TAB]: "Cart.Checkout",
};

const getWidget = (props) => {
  if (props.tab in tabContentWidget) {
    return tabContentWidget[props.tab];
  }
  // backup (TODO: review)
  return tabContentWidget[PROJECTS_LIST_TAB];
};

const getTabWidget = (tab) => {
  if (tab in tabContentWidget) {
    return tabContentWidget[tab];
  }

  return tabContentWidget[PROJECTS_LIST_TAB];
};

const props = {
  ...props,
  ...state,
  addProjectsToCart: (projects) => {
    const cart = state.cart ?? {};
    projects.forEach(({ id, amount, ft, referrerId }) => {
      cart[id] = { amount, ft: ft ?? "NEAR", referrerId }; // default to NEAR
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
  updateCartItem: (projectId, amount, ft, referrerId) => {
    const cart = state.cart ?? {};
    const updated = {};
    // if (amount === "") updated.amount = "0";
    if (amount || amount === "") updated.amount = amount;
    if (ft) updated.ft = ft;
    if (referrerId) updated.referrerId = referrerId;
    cart[projectId] = updated;
    State.update({ cart });
    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  checkoutSuccess: props.tab === CART_TAB && props.transactionHashes,
  checkoutSuccessTxHash: props.tab === CART_TAB ? props.transactionHashes : "",
  setIsCartModalOpen: (isOpen) => {
    State.update({ isCartModalOpen: isOpen });
  },
};

const CART_KEY = "cart";
const storageCart = Storage.get(CART_KEY);
const DEFAULT_CART = {};

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

if (props.checkoutSuccess && state.cart && Object.keys(state.cart).length > 0) {
  // if checkout was successful, clear cart
  State.update({ cart: {} });
  Storage.set(CART_KEY, JSON.stringify(DEFAULT_CART));
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
    <Widget src={`${ownerId}/widget/Nav`} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
  </Theme>
);
