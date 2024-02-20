const ownerId = "potlock.near";
const registryContractId =
  props.env === "staging" ? "registry.staging.potlock.near" : "registry.potlock.near";
const donationContractId = "donate.potlock.near";

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
`;

const NEAR_ACCOUNT_ID_REGEX = /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;

State.init({
  cart: null,
  checkoutSuccess: false,
  checkoutSuccessTxHash: null,
  donations: null,
  // previousCart: null,
  nearToUsd: null,
  isCartModalOpen: false,
  isNavMenuOpen: false,
  registryConfig: null,
  userIsRegistryAdmin: null,
  registeredProjects: null,
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
  donationSuccessModal: {
    isOpen:
      (!props.tab || props.tab === PROJECTS_LIST_TAB || props.tab === PROJECT_DETAIL_TAB) &&
      props.transactionHashes,
    successfulDonation: null,
  },
});

const NEAR_USD_CACHE_KEY = "NEAR_USD";
const nearUsdCache = Storage.get(NEAR_USD_CACHE_KEY);
const EXCHANGE_RATE_VALIDITY_MS = 1000 * 60 * 60; // 1 hour

if (!state.nearToUsd) {
  if (
    nearUsdCache === undefined ||
    (nearUsdCache && nearUsdCache.ts < Date.now() - EXCHANGE_RATE_VALIDITY_MS)
  ) {
    // undefined means it's not in the cache
    // this case handles the first time fetching the rate, and also if the rate is expired
    console.log("fetching near to usd rate");
    asyncFetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(
      (res) => {
        if (res.ok) {
          State.update({ nearToUsd: res.body.near.usd });
          Storage.set(NEAR_USD_CACHE_KEY, { rate: res.body.near.usd, ts: Date.now() });
        }
      }
    );
  } else if (nearUsdCache) {
    // valid cache value
    console.log("using cached near to usd rate");
    State.update({ nearToUsd: nearUsdCache.rate });
  }
}

// console.log("state in Index: ", state);

if (!state.registeredProjects) {
  State.update({ registeredProjects: Near.view(registryContractId, "get_projects", {}) });
}

if (!state.registeredProjects) return "";

if (!state.donations) {
  State.update({
    donations: Near.view(donationContractId, "get_donations", {}), // TODO: ADD PAGINATION
  });
}

const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

if (!state.registeredProjects) {
  Near.asyncView(registryContractId, "get_projects", {})
    .then((projects) => {
      // get social data for each project
      Near.asyncView("social.near", "get", {
        keys: projects.map((project) => `${project.id}/profile/**`),
      }).then((socialData) => {
        const formattedProjects = projects.map((project) => {
          const profileData = socialData[project.id]?.profile;
          let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
          if (profileData.image) {
            const imageUrl = getImageUrlFromSocialImage(profileData.image);
            if (imageUrl) profileImageUrl = imageUrl;
          }
          // get banner image URL
          let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
          if (profileData.backgroundImage) {
            const imageUrl = getImageUrlFromSocialImage(profileData.backgroundImage);
            if (imageUrl) bannerImageUrl = imageUrl;
          }
          const formatted = {
            id: project.id,
            name: profileData.name ?? "",
            description: profileData.description ?? "",
            bannerImageUrl,
            profileImageUrl,
            status: project.status,
            tags: [profileData.category.text ?? CATEGORY_MAPPINGS[profileData.category] ?? ""],
          };
          return formatted;
        });
        State.update({
          registeredProjects: formattedProjects,
        });
      });
    })
    .catch((e) => {
      console.log("error getting projects: ", e);
      State.update({ getRegisteredProjectsError: e });
    });
}

if (state.registryConfig === null) {
  const registryConfig = Near.view(registryContractId, "get_config", {});
  if (registryConfig) {
    State.update({
      registryConfig,
      userIsRegistryAdmin: registryConfig.admins.includes(context.accountId),
    });
  }
}

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
  validateNearAddress: (address) => {
    let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
    // Additional ".near" check for IDs less than 64 characters
    if (address.length < 64 && !address.endsWith(".near")) {
      isValid = false;
    }
    return isValid;
  },
  validateEVMAddress: (address) => {
    // Check if the address is defined and the length is correct (42 characters, including '0x')
    if (!address || address.length !== 42) {
      return false;
    }
    // Check if the address starts with '0x' and contains only valid hexadecimal characters after '0x'
    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(address);
  },
  validateGithubRepoUrl: (url) => {
    // Regular expression to match the GitHub repository URL pattern
    // This regex checks for optional "www.", a required "github.com/", and then captures the username and repo name segments
    const githubRepoUrlPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubRepoUrlPattern.test(url);
  },
  PROJECT_STATUSES: ["Pending", "Approved", "Rejected", "Graylisted", "Blacklisted"],
  SUPPORTED_FTS: {
    // TODO: move this to state to handle selected FT once we support multiple FTs
    NEAR: {
      iconUrl:
        "https://nftstorage.link/ipfs/bafkreidnqlap4cp5o334lzbhgbabwr6yzkj6albia62l6ipjsasokjm6mi",
      toIndivisible: (amount) => new Big(amount).mul(new Big(10).pow(24)),
      fromIndivisible: (amount, decimals) =>
        Big(amount)
          .div(Big(10).pow(24))
          .toFixed(decimals || 2),
    },
    USD: {
      iconUrl: "$",
      toIndivisible: (amount) => new Big(amount).mul(new Big(10).pow(24)),
      fromIndivisible: (amount, decimals) =>
        Big(amount)
          .div(Big(10).pow(24))
          .toFixed(decimals || 2),
    },
  },
  DONATION_CONTRACT_ID: donationContractId,
  REGISTRY_CONTRACT_ID: registryContractId,
  POT_FACTORY_CONTRACT_ID:
    props.env === "staging" ? "potfactory.staging.potlock.near" : "v1.potfactory.potlock.near",
  NADABOT_CONTRACT_ID: props.env === "staging" ? "v1.staging.nadabot.near" : "v1.nadabot.near",
  ToDo: styled.div`
    position: relative;

    &::before {
      content: "TODO: ";
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-110%, 0);
      background-color: yellow;
    }
  `,
  ONE_TGAS: Big(1_000_000_000_000),
  MAX_DONATION_MESSAGE_LENGTH: 100,
  hrefWithEnv: (href) => {
    // add env=staging to params
    if (props.env === "staging") {
      return `${href}${href.includes("?") ? "&" : "?"}env=staging`;
    }
    return href;
  },
  nearToUsdWithFallback: (amountNear) => {
    return state.nearToUsd
      ? "~$" + (amountNear * state.nearToUsd).toFixed(2)
      : amountNear + " NEAR";
  },
  yoctosToUsdWithFallback: (amountYoctos) => {
    return state.nearToUsd
      ? "~$" + new Big(amountYoctos).mul(state.nearToUsd).div(1e24).toNumber().toFixed(2)
      : new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + " NEAR";
  },
  yoctosToUsd: (amountYoctos) => {
    return state.nearToUsd
      ? "~$" + new Big(amountYoctos).mul(state.nearToUsd).div(1e24).toNumber().toFixed(2)
      : null;
  },
  yoctosToNear: (amountYoctos, abbreviate) => {
    return new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + (abbreviate ? " N" : " NEAR");
  },
  formatDate: (timestamp) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";

    // Convert hour to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Minutes should be two digits
    const minuteFormatted = minute < 10 ? "0" + minute : minute;

    return `${month} ${day}, ${year} ${hour}:${minuteFormatted}${ampm}`;
  },
  daysAgo: (timestamp) => {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const differenceInTime = now - pastDate;

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays === 0
      ? "< 1 day ago"
      : `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
  },
  daysUntil: (timestamp) => {
    const now = new Date();
    const futureDate = new Date(timestamp);
    const differenceInTime = futureDate - now;

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}`;
  },
  NADA_BOT_URL: "https://app.nada.bot",
  // openSybilModal: () => {
  //   State.update({ isSybilModalOpen: true });
  // },
  getTagsFromSocialProfileData: (profileData) => {
    // first try to get tags from plCategories, then category (deprecated/old format), then default to empty array
    if (!profileData) return [];
    const DEPRECATED_CATEGORY_MAPPINGS = {
      "social-impact": "Social Impact",
      "non-profit": "NonProfit",
      climate: "Climate",
      "public-good": "Public Good",
      "de-sci": "DeSci",
      "open-source": "Open Source",
      community: "Community",
      education: "Education",
    };
    const tags = profileData.plCategories
      ? JSON.parse(profileData.plCategories)
      : profileData.category
      ? [profileData.category.text ?? DEPRECATED_CATEGORY_MAPPINGS[profileData.category] ?? ""]
      : [];
    return tags;
  },
  getTeamMembersFromSocialProfileData: (profileData) => {
    if (!profileData) return [];
    const team = profileData.plTeam
      ? JSON.parse(profileData.plTeam)
      : profileData.team
      ? Object.entries(profileData.team)
          .filter(([_, v]) => v !== null)
          .map(([k, _]) => k)
      : [];
    return team;
  },
  doesUserHaveDaoFunctionCallProposalPermissions: (policy) => {
    // TODO: break this out (NB: duplicated in Project.CreateForm)
    const userRoles = policy.roles.filter((role) => {
      if (role.kind === "Everyone") return true;
      return role.kind.Group && role.kind.Group.includes(context.accountId);
    });
    const kind = "call";
    const action = "AddProposal";
    // Check if the user is allowed to perform the action
    const allowed = userRoles.some(({ permissions }) => {
      return (
        permissions.includes(`${kind}:${action}`) ||
        permissions.includes(`${kind}:*`) ||
        permissions.includes(`*:${action}`) ||
        permissions.includes("*:*")
      );
    });
    return allowed;
  },
  openDonateToProjectModal: (recipientId, referrerId, potId, potDetail) => {
    State.update({
      donateToProjectModal: { isOpen: true, recipientId, referrerId, potId, potDetail },
    });
  },
  // openDonationSuccessModal: (successfulDonation) => {
  //   console.log("opening success modal with donation data: ", successfulDonation);
  //   State.update({
  //     donationSuccessModal: {
  //       isOpen: true,
  //       successfulDonation,
  //     },
  //   });
  // },
  basisPointsToPercent: (basisPoints) => {
    return basisPoints / 100;
  },
  IPFS_BASE_URL,
  ipfsUrlFromCid: (cid) => {
    return `${IPFS_BASE_URL}${cid}`;
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

if (state.checkoutSuccessTxHash && state.cart && Object.keys(state.cart).length > 0) {
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

if (!state.cart || !state.registeredProjects) {
  return "";
}

return (
  <Theme>
    <Widget src={`${ownerId}/widget/Components.Nav`} props={props} />
    <Content className={isForm ? "form" : ""}>{tabContent}</Content>
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
      src={`${ownerId}/widget/Project.ModalDonationSuccess`}
      props={{
        ...props,
        successfulDonation: state.donationSuccessModal.successfulDonation,
        isModalOpen: state.donationSuccessModal.isOpen,
        onClose: () =>
          State.update({
            donationSuccessModal: {
              isOpen: false,
              successfulDonation: null,
            },
          }),
      }}
    />
  </Theme>
);
