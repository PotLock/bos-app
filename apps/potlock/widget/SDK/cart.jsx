/**
 * Items must have "id" and "price" properties
 */

const CART_KEY = "cart";
const DEFAULT_CART = {};

const cart = JSON.parse(Storage.get(CART_KEY) ?? JSON.stringify(DEFAULT_CART));

return {
  getCart: () => {
    return cart;
  },
  getCartItemCount: () => {
    return Object.keys(cart).length;
  },
  getCartTotal: () => {
    let total = 0;

    Object.values(cart).forEach((item) => {
      total += item.price;
    });

    return total;
  },
  addItemsToCart: (items) => {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        cart[item.id] = item;
      });
    } else if (typeof items === "object") {
      cart[items.id] = items;
    } else {
      console.log("Attempted to add invalid item to cart, item: ", items);
      return;
    }

    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  removeItemsFromCart: (items) => {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        delete cart[item.id];
      });
    } else if (typeof items === "object") {
      delete cart[items.id];
    } else {
      console.log("Attempted to remove invalid item from cart, item: ", items);
      return;
    }

    Storage.set(CART_KEY, JSON.stringify(cart));
  },
  clearCart: () => {
    Storage.set(CART_KEY, JSON.stringify(DEFAULT_CART));
  },
  updateItemInCart: (item) => {
    if (cart[item.id]) {
      cart[item.id] = item; // Update the item in the cart directly
      Storage.set(CART_KEY, JSON.stringify(cart));
    } else {
      console.log("Item not found in cart:", item);
    }
    console.log("cart", cart);
  },
  itemExistsInCart: (item) => {
    return cart[item.id] !== undefined;
  },
};
