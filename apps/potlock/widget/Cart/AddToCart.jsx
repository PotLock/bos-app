const { ownerId } = props;

// const PREVIOUS_CART_KEY = "previousCart";
const storageCart = Storage.get(CART_KEY);
const StorageCurrency = Storage.get("currency");
const StorageNote = Storage.get("note");
const StorageAmount = Storage.get("amount");
const StorageProjectId = Storage.get("projectId");
const StorageReferrerId = Storage.get("referrerId");

const CART_KEY = "cart";
const DEFAULT_CART = {};
const cart = JSON.parse(Storage.get(CART_KEY) || `${DEFAULT_CART}`, `${ownerId}/widget/AddToCart`);

const addProjectsToCart = (projects) => {
  const newCart = { ...cart };
  projects.forEach((project) => {
    newCart[project.id] = project;
  });
  Storage.set(CART_KEY, JSON.stringify(newCart), `${ownerId}/widget/AddToCart`);
};

const removeProjectsFromCart = (projectIds) => {
  const newCart = { ...cart };
  projectIds.forEach((projectId) => {
    delete newCart[projectId];
  });
  Storage.set(CART_KEY, JSON.stringify(newCart), `${ownerId}/widget/AddToCart`);
};

return (
  <>
    {JSON.stringify(cart.length)}
    <Widget
      src={`${ownerId}/widget/Components.Button`}
      props={{
        type: "tertiary",
        text: existsInCart ? "Remove from cart" : "Add to cart",
        style: {
          padding: "12px 16px",
        },
        onClick: () => {
          const existsInCart = cart[props.projectId];
          if (existsInCart) {
            removeProjectsFromCart([props.projectId]);
          } else {
            addProjectsToCart([
              {
                id: props.projectId,
                amount: "1",
                ft: "NEAR",
                referrerId: props.referrerId,
                potId: props.potId,
                potDetail: props.potDetail,
              },
            ]);
            if (props.showModal) {
              props.setIsCartModalOpen(true);
            }
          }
        },
      }}
    />
  </>
);
