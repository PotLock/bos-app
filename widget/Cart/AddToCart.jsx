const { handleCallback, item, text } = props;

const { addItemsToCart, removeItemsFromCart, itemExistsInCart } = VM.require(
  "potlock.near/widget/SDK.cart"
) ?? {
  addItemsToCart: () => {},
  removeItemsFromCart: () => {},
  itemExistsInCart: () => false,
};

const existsInCart = itemExistsInCart(item);

return (
  <Widget
    src={"potlock.near/widget/Components.Button"}
    props={{
      type: "tertiary",
      text: text || (existsInCart ? "Remove from cart" : "Add to cart"),
      style: { padding: "12px 16px" },
      disabled: props.disabled ?? false,
      onClick: () => {
        if (existsInCart) {
          removeItemsFromCart([item]);
        } else {
          // item.ft = "NEAR";
          addItemsToCart([item]);
        }
        if (handleCallback) {
          handleCallback();
        }
      },
    }}
  />
);
