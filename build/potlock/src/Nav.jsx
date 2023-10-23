const ownerId = "potlock.near";

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
  height: 110px;
  background: #ffffff;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    display: none;
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
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
`;

const NavTab = styled.a`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: #7b7b7b;
  fontsize: 14;
  fontfamily: Mona-Sans;
  fontweight: 500;
  lineheight: 16;
  wordwrap: break-word;
  text-decoration: none;

  :not(:last-child) {
    margin-right: 32px;
  }

  :hover {
    text-decoration: none;
  }
`;

const tabOptions = [
  { text: "Projects", link: "projects", disabled: false },
  { text: "Pot", link: "pot", disabled: true },
  { text: "Feed", link: "feed", disabled: true },
];

return (
  <Nav>
    <NavLeft>
      <NavLogo href={`?tab=projects`}>🫕 Potlock</NavLogo>
    </NavLeft>
    <NavRight>
      <NavTabs>
        {tabOptions.map((tab) => {
          return (
            <NavTab
              href={`?tab=${tab.link}`}
              disabled={tab.disabled}
              onClick={(e) => {
                if (tab.disabled) e.preventDefault();
              }}
            >
              {tab.text}
            </NavTab>
          );
        })}
      </NavTabs>
    </NavRight>
  </Nav>
);
