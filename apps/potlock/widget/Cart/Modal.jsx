const { getCartItemCount, getCart, removeItemsFromCart } = VM.require(
  "potlock.near/widget/SDK.cart"
) ?? {
  getCartItemCount: () => 0,
  getCart: () => {},
  removeItemsFromCart: () => {},
};

const { href } = VM.require("devs.near/widget/lib.url") || {
  href: () => {},
};

const navHeightPx = 110;
const navHeightPxMobile = 96;

const cart = getCart();
const numCartItems = getCartItemCount();

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: ${navHeightPx * 0.8 + 50}px;
  padding-right: 32px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding-right: 8px;
  }
`;

const ModalContainer = styled.div`
  width: 383px;
  border-radius: 12px;
  box-shadow: 0px 0px 0px 1px rgba(41, 41, 41, 0.1), 0px 8px 12px -4px rgba(41, 41, 41, 0.1),
    0px 20px 32px -10px rgba(41, 41, 41, 0.1), 0px 32px 44px -16px rgba(41, 41, 41, 0.1);
  padding: 24px 0px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  max-height: 80vh;
  max-width: 90vw;
  overflow-y: scroll;
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
  font-family: "Mona Sans", sans-serif;
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

const CartModal = ({ Trigger }) => {
  Trigger = Trigger ?? (() => <></>);

  return (
    <Widget
      src={"devs.near/widget/Modal"}
      props={{
        Trigger: Trigger,
        ModalOverlay: ModalOverlay,
        ModalContainer: ModalContainer,
        Content: () => (
          <>
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
                  href: href({
                    widgetSrc: "potlock.near/widget/Index",
                    params: { tab: "cart", referrerId: props.referrerId },
                  }),
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
          </>
        ),
      }}
    />
  );
};

return { CartModal };
