const ownerId = "${config_account}";
const donationContractId = "donate.potlock.near";
// const potFactoryContractId =
//   props.env === "staging" ? "potfactory.staging.potlock.near" : "v1.potfactory.potlock.near";
const nadabotContractId = props.env === "staging" ? "v1.staging.nadabot.near" : "v1.nadabot.near";

const { getCartItemCount, clearCart } = VM.require("${config_account}/widget/SDK.cart") || {
  getCartItemCount: () => 0,
  clearCart: () => {},
};

const numCartItems = getCartItemCount();

State.init({
  checkoutSuccess: false,
  checkoutSuccessTxHash: null,
  referrerId: null,
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

const passProps = {
  ...props,
  ...state,
  ownerId: "${config_account}",
  NADABOT_CONTRACT_ID: nadabotContractId,
  referrerId: props.referrerId,
  setCheckoutSuccess: (checkoutSuccess) => {
    State.update({ checkoutSuccess });
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

if (props.checkoutSuccessTxHash && numCartItems > 0) {
  // if checkout was successful after wallet redirect, clear cart
  // store previous cart in local storage to show success message
  // console.log("previous cart: ", state.cart);
  clearCart();
}

const config = {
  theme: {},
  layout: {
    src: "${config_account}/widget/Template.AppLayout",
  },
  blocks: {
    Header: () => (
      <Widget src="${config_account}/widget/Components.Nav" props={{ tab: props.tab }} />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      home: {
        path: "${config_account}/widget/Project.ListPage",
        blockHeight: "final",
        init: {
          ...passProps,
        },
        default: true,
      },
      createproject: {
        path: "${config_account}/widget/Project.Create",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      editproject: {
        path: "${config_account}/widget/Project.Create",
        blockHeight: "final",
        init: {
          edit: true,
          ...passProps,
        },
      },
      project: {
        path: "${config_account}/widget/Project.Detail",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      projects: {
        path: "${config_account}/widget/Project.ListPage",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      cart: {
        path: "${config_account}/widget/Cart.Checkout",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      feed: {
        path: "${config_account}/widget/Components.Feed",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      pots: {
        path: "${config_account}/widget/Pots.Home",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      deploypot: {
        path: "${config_account}/widget/Pots.Deploy",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      pot: {
        path: "${config_account}/widget/Pots.Detail",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      donors: {
        path: "${config_account}/widget/Components.Donors",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
      profile: {
        path: "${config_account}/widget/Profile.Detail",
        blockHeight: "final",
        init: {
          ...passProps,
        },
      },
    },
  },
};

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
    {props.tab !== POT_DETAIL_TAB && props.tab !== POTS_TAB && (
      <Widget src={"${config_account}/widget/Components.Banner"} props={passProps} />
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
  </Root>
);
