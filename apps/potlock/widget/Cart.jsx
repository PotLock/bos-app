const CART_KEY = "cart";
const DEFAULT_CART = {};

return () => {
  const cart = Storage.privateGet(CART_KEY);
  return {
    get: () => {
      return cart ? JSON.parse(cart) : DEFAULT_CART;
    },
    set: (cart) => {
      Storage.privateSet(CART_KEY, JSON.stringify(cart));
    },
    addItem: (item) => {
      cart[item.id] = item;
      Storage.privateSet(CART_KEY, JSON.stringify(cart));
    },
    addItems: (items) => {
      items.forEach((item) => {
        cart[item.id] = item;
      });
      Storage.privateSet(CART_KEY, JSON.stringify(cart));
    },
    removeItem: (itemId) => {
      delete cart[itemId];
      Storage.privateSet(CART_KEY, JSON.stringify(cart));
    },
    clear: () => {
      Storage.privateSet(CART_KEY, JSON.stringify(DEFAULT_CART));
    },
  };
};
