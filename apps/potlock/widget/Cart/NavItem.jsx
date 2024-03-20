const { getCartItemCount, getCart, removeItemsFromCart } = VM.require(
  "potlock.near/widget/SDK.cart"
) ?? {
  getCartItemCount: () => 0,
  getCart: () => {},
  removeItemsFromCart: () => {},
};

const navHeightPx = 110;
const navHeightPxMobile = 96;

const cart = getCart();
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

const CartModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: ${navHeightPx * 0.8 + 50}px;
  padding-right: 32px;
  // padding-right: 500px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding-right: 8px;
  }
`;

const CartModalContent = styled.div`
  width: 383px;
  padding: 24px 0px;
  background: white;
  border-radius: 10px;
  box-shadow: 20px 20px 32px -4px rgba(93, 93, 93, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  max-height: 80vh;
  max-width: 90vw;
  overflow-y: scroll;
  // z-index: 1000;
`;

const ModalHeader = styled.div`
  width: 100%;
  // height: 100%;
  padding: 24px 24px 8px 24px;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
  // background: pink;
  border-bottom: 1px #dbdbdb solid;
  position: relative;
`;

const ModalHeaderText = styled.div`
  text-align: center;
  color: #2e2e2e;
  font-size: 14px;
  font-family: Mona-Sans;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
`;

const NoProjectsText = styled.div`
  text-align: center;
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 500;
  margin-top: 24px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 24px 0 24px;
`;

const Ear = styled.div`
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  transform-origin: 0 0;
  background: white;
  position: absolute;
  top: -11px;
  right: 32px;
  z-index: 1000;
`;

const [isModalOpen, setIsModalOpen] = useState(false);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <CartModal onClick={onClose}>
      <CartModalContent onClick={(e) => e.stopPropagation()}>{children}</CartModalContent>
    </CartModal>
  );
};

return (
  <div style={{ position: "relative" }}>
    <CartButton
      onClick={(e) => {
        setIsModalOpen(!isModalOpen);
      }}
      containsItems={numCartItems > 0}
    >
      <CartText>Cart</CartText>
      {numCartItems > 0 && (
        <CartCountContainer>
          <CartText style={{ fontSize: "12px" }}>{numCartItems}</CartText>
        </CartCountContainer>
      )}
    </CartButton>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalHeader>
        <ModalHeaderText>Donation cart</ModalHeaderText>
        <ModalHeaderText>
          {numCartItems}{" "}
          <span style={{ fontWeight: 400, color: "#7B7B7B" }}>
            {numCartItems === 1 ? "project" : "projects"}
          </span>
        </ModalHeaderText>
      </ModalHeader>
      {numCartItems === 0 ? (
        <NoProjectsText>Your cart is empty! 💸</NoProjectsText>
      ) : (
        (Object.keys(cart) ?? []).map((projectId) => {
          return (
            <Widget
              src={"potlock.near/widget/Cart.CartModalItem"}
              props={{
                ...props,
                projectId,
                removeProjectsFromCart: (projectIds) => {
                  removeItemsFromCart({ id: projectIds });
                  if (numCartItems === 1) {
                    setIsModalOpen(false);
                  }
                },
              }}
            />
          );
        })
      )}
      <ButtonContainer>
        <Widget
          src={"potlock.near/widget/Components.Button"}
          props={{
            type: "primary",
            text: "Proceed to donate",
            disabled: numCartItems === 0,
            href: props.hrefWithParams(`?tab=cart`),
            style: {
              width: "100%",
              marginBottom: "16px",
            },
          }}
        />
        <Widget
          src={"potlock.near/widget/Components.Button"}
          props={{
            type: numCartItems === 0 ? "primary" : "secondary",
            text: "Continue shopping",
            onClick: () => setIsModalOpen(false),
            style: {
              width: "100%",
            },
          }}
        />
      </ButtonContainer>
      <Ear />
    </Modal>
  </div>
);
