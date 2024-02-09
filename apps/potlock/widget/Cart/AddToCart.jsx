const { ownerId } = props;
const existsInCart = props.cart && !!props.cart[props.projectId];

console.log("props in AddToCart: ", props);
// console.log("existsInCart: ", props);
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
);
