const { ownerId } = props;
const navHeightPx = 110;
const navHeightPxMobile = 96;

const Nav = styled.div`
  // commenting out stickiness for now
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  display: flex;
  padding: 0 64px 0 64px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: ${navHeightPx}px;
  background: #ffffff;
  z-index: 1000;
  // background: pink;

  @media screen and (max-width: 768px) {
    // display: none;
    padding: 24px 8px 24px 16px;
    height: ${navHeightPxMobile}px;
  }

  & > a {
    width: 10rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // background: green;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavRightMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding-right: 16px;
  }
`;

const NavLogo = styled.a`
  text-align: center;
  color: #2e2e2e;
  font-size: 23.95px;
  font-weight: 700;
  line-height: 23.95px;
  word-wrap: break-word;
  margin-right: 48px;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavTab = styled.a`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.selected ? "#2E2E2E" : "#7B7B7B")};
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? 500 : 400)};
  line-height: 16px;
  word-wrap: break-word;
  text-decoration: none;
  position: relative;

  :not(:last-child) {
    margin-right: 32px;
  }

  :hover {
    text-decoration: none;
  }
`;

const CartButton = styled.div`
  padding: ${(props) => (props.containsItems ? "8px 8px 8px 16px" : "8px 16px")};
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

// const CartCount = styled.div`
//   position: absolute;
//   top: -5px;
//   right: -10px;
//   // top: 20px;
//   // right: 20px;
//   text-align: center;
//   color: #dd3345;
//   font-size: 12px;
//   font-weight: 500;
//   line-height: 14px;
//   word-wrap: break-word;
// `;

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

const Banner = styled.div`
  width: 100%;
  // max-height: 50px;
  background: #dd3345;
  // background: rgb(6 10 15);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  // border-bottom: 2px rgb(96, 100, 102) solid;
`;

const BannerText = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 4px;
  }
`;
const BannerLinkContainer = styled.a`
  display: flex;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 14px;
  line-height: 21px;
  margin-left: 16px;
  gap: 8px;

  &:hover {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 8px;
    gap: 4px;
`;

const BannerLinkSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(45deg);
  }

  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const BannerAlertSvg = styled.svg`
  width: 18px;

  @media screen and (max-width: 768px) {
    width: 14px;
  }
`;

const NavMenu = styled.div`
  display: none;
  background: white;
  padding: 24px;
  width: 100%;
  gap: 16px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}`;

const NavMenuItem = styled.a`
  color: ${(props) => (props.selected ? "#2E2E2E" : "#7B7B7B")};
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? 500 : 400)};
  line-height: 20px;
  word-wrap: break-word;
  cursor: pointer;
`;

const tabOptions = [
  { text: "Projects", link: "projects", disabled: false },
  { text: "Feed", link: "feed", disabled: false },
  {
    text: "Pots",
    link: "pots",
    disabled: !props.QF_WHITELISTED_ACCOUNTS.includes(context.accountId),
  },
  { text: "Feedback", href: "https://potlock.org/feedback", newTab: true, disabled: false },
];

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <CartModal onClick={onClose}>
      <CartModalContent onClick={(e) => e.stopPropagation()}>{children}</CartModalContent>
    </CartModal>
  );
};

return (
  <>
    {false && <Banner>
      <BannerAlertSvg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        aria-hidden="true"
        // width="18px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        ></path>
      </BannerAlertSvg>
      <BannerText>This app is in beta. It has not been audited.</BannerText>
      <BannerLinkContainer
        href="https://docs.potlock.io/general-information/beta-phase"
        target="_blank"
      >
        <span>Learn more</span>
        <BannerLinkSvg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[18px] group-hover:rotate-[45deg] transition-all"
        >
          <path
            d="M11.6652 6.77894C11.0834 6.78279 10.5015 6.78574 9.91929 6.78777C9.06125 6.78766 8.20376 6.79135 7.34566 6.78145C6.762 6.77478 6.29535 6.33298 6.30266 5.81732C6.31009 5.32123 6.77706 4.88706 7.32973 4.89083C9.53277 4.89897 11.7351 4.91291 13.9368 4.93265C14.6025 4.93925 14.9748 5.32235 14.9826 6.0022C15.0022 8.19227 15.0157 10.3823 15.0231 12.5723C15.0251 13.2043 14.6477 13.6102 14.0912 13.6135C13.5527 13.6152 13.1403 13.1552 13.1372 12.5298C13.1307 11.2364 13.133 9.9431 13.1287 8.64975C13.1284 8.51553 13.113 8.38013 13.0963 8.12137L12.7089 8.50873C10.6829 10.5347 8.64711 12.5508 6.63972 14.5954C6.22161 15.0212 5.62148 14.9861 5.28149 14.6461C4.88466 14.2493 4.90002 13.7158 5.32463 13.2846C7.35705 11.2478 9.39203 9.21284 11.4295 7.17969L11.7105 6.89876L11.6652 6.77894Z"
            fill="currentColor"
          ></path>
        </BannerLinkSvg>
      </BannerLinkContainer>
    </Banner>}
    <Nav>
      <NavLeft>
        <NavLogo href={`?tab=projects`}>🫕 Potlock</NavLogo>
      </NavLeft>
      <NavRight>
        <NavTabs>
          {tabOptions.map((tab) => {
            return (
              <NavTab
                href={tab.href ?? `?tab=${tab.link}`}
                disabled={tab.disabled}
                target={tab.newTab ? "_blank" : ""}
                onClick={(e) => {
                  if (tab.disabled) e.preventDefault();
                }}
                selected={props.tab === tab.link}
              >
                {tab.text}
              </NavTab>
            );
          })}
          {/* <NavTab
            onClick={(e) => {
              props.setIsCartModalOpen(!props.isCartModalOpen);
            }}
            selected={props.tab === "cart"}
          >
            Cart
            <CartCount>{Object.keys(props.cart).length}</CartCount>
          </NavTab> */}
          <CartButton
            onClick={(e) => {
              props.setIsCartModalOpen(!props.isCartModalOpen);
            }}
          >
            <CartText>Cart</CartText>
            {Object.keys(props.cart).length > 0 && (
              <CartCountContainer>
                <CartText style={{ fontSize: "12px" }}>{Object.keys(props.cart).length}</CartText>
              </CartCountContainer>
            )}
          </CartButton>
        </NavTabs>
      </NavRight>
      <NavRightMobile>
        <CartButton
          onClick={(e) => {
            props.setIsCartModalOpen(!props.isCartModalOpen);
          }}
          containsItems={Object.keys(props.cart).length > 0}
        >
          <CartText>Cart</CartText>
          {Object.keys(props.cart).length > 0 && (
            <CartCountContainer>
              <CartText style={{ fontSize: "12px" }}>{Object.keys(props.cart).length}</CartText>
            </CartCountContainer>
          )}
        </CartButton>
        {/* <NavTab
          onClick={(e) => {
            props.setIsCartModalOpen(!props.isCartModalOpen);
          }}
          selected={props.tab === "cart"}
        >
          Cart
          <CartCount>{Object.keys(props.cart).length}</CartCount>
        </NavTab> */}
        <NavTab onClick={() => props.setIsNavMenuOpen(!props.isNavMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#7B7B7B" />
          </svg>
        </NavTab>
      </NavRightMobile>
    </Nav>
    {props.isNavMenuOpen && (
      <NavMenu>
        {tabOptions.map((tab) => {
          return (
            <NavMenuItem
              href={`?tab=${tab.link}`}
              disabled={tab.disabled}
              onClick={(e) => {
                if (tab.disabled) e.preventDefault();
              }}
              selected={props.tab === tab.link}
            >
              {tab.text}
              {tab.disabled && " (Coming Soon)"}
            </NavMenuItem>
          );
        })}
      </NavMenu>
    )}
    <Modal isOpen={props.isCartModalOpen} onClose={() => props.setIsCartModalOpen(false)}>
      {/* <div>hi</div> */}
      <ModalHeader>
        <ModalHeaderText>Donation cart</ModalHeaderText>
        <ModalHeaderText>
          {Object.keys(props.cart).length}{" "}
          <span style={{ fontWeight: 400, color: "#7B7B7B" }}>
            {Object.keys(props.cart).length === 1 ? "project" : "projects"}
          </span>
        </ModalHeaderText>
        {/* <Ear /> */}
      </ModalHeader>
      {Object.keys(props.cart).length === 0 ? (
        <NoProjectsText>Get shopping! 💸</NoProjectsText>
      ) : (
        Object.keys(props.cart).map((projectId) => {
          // return <CartItem projectId={projectId} Object.keys(props.cart).length={Object.keys(props.cart).length} />;
          return (
            <Widget
              src={`${ownerId}/widget/Cart.CartModalItem`}
              props={{
                ...props,
                projectId,
                removeProjectsFromCart: (projectIds) => {
                  props.removeProjectsFromCart(projectIds);
                  if (Object.keys(props.cart).length === 1) {
                    props.setIsCartModalOpen(false);
                  }
                },
              }}
            />
          );
        })
      )}
      <ButtonContainer>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Proceed to donate",
            disabled: Object.keys(props.cart).length === 0,
            href: `?tab=cart`,
            style: {
              width: "100%",
              marginBottom: "16px",
            },
          }}
        />
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: Object.keys(props.cart).length === 0 ? "primary" : "secondary",
            text: "Continue shopping",
            onClick: () => props.setIsCartModalOpen(false),
            style: {
              width: "100%",
            },
          }}
        />
      </ButtonContainer>
      <Ear />
    </Modal>
  </>
);
