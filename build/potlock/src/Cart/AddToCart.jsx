const ownerId = "potlock.near";

const existsInCart = props.cart && !!props.cart[props.projectId];

return (
  <Widget
    src={`${ownerId}/widget/Components.Button`}
    props={{
      type: "primary",
      text: existsInCart ? "Remove from cart" : "Add to cart",
      style: props.style || {},
      onClick: () => {
        if (existsInCart) {
          props.removeProjectsFromCart([props.projectId]);
        } else {
          props.addProjectsToCart([
            { id: props.projectId, amount: "1", ft: "NEAR", referrerId: props.referrerId },
          ]);
          if (props.showModal) {
            props.setIsCartModalOpen(true);
          }
        }
      },
    }}
  />
);
