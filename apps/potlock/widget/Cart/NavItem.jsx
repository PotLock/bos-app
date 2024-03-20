const { getCartItemCount } = VM.require("potlock.near/widget/SDK.cart") ?? {
  getCartItemCount: () => 0,
};

const { CartModal } = VM.require("potlock.near/widget/Cart.Modal") ?? {
  CartModal: () => <></>,
};

const navHeightPx = 110;
const navHeightPxMobile = 96;

const numCartItems = getCartItemCount();

const CartButton = styled.div`
  padding: ${numCartItems > 0 ? "8px 8px 8px 16px" : "8px 16px"};
  background: #2e2e2e;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CartText = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
  text-align: center;
`;

const CartCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f86b3f;
  border-radius: 50%;
  // padding: 0 4px;
  width: 18px;
  height: 18px;
  margin-left: 8px;
`;

return (
  <CartModal
    Trigger={({ openModal }) => (
      <CartButton onClick={() => openModal()}>
        <CartText>Cart</CartText>
        {numCartItems > 0 && (
          <CartCountContainer>
            <CartText style={{ fontSize: "12px" }}>{numCartItems}</CartText>
          </CartCountContainer>
        )}
      </CartButton>
    )}
  />
);
