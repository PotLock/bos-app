const ownerId = "potlock.near";

const headerTitleFontSizePx = 88;

const HeaderContainer = styled.div`
  width: 100%;
  // background: #fffaf4;
  background: white;
  padding: 80px 64px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props.centered ? "center" : "flex-start"};
`;

const HeaderTitle = styled.div`
  color: #2e2e2e;
  font-size: ${headerTitleFontSizePx}px;
  font-weight: 600;
  word-wrap: break-word;
  position: relative;
`;

const HeaderDescription = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-family: Mona-Sans;
  font-weight: 400;
  word-wrap: break-word;
  max-width: 866px;
  text-align: ${props.centered ? "center" : "flex-start"};
  margin-top: 32px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
`;

return (
  <HeaderContainer>
    <HeaderContent>
      <HeaderTitle>
        {props.title1}
        <div style={{ position: "absolute", top: headerTitleFontSizePx - 40, left: -40 }}>
          <svg
            width="340"
            height="42"
            viewBox="0 0 340 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.29967 39C-14.0566 35.9491 49.9788 32.436 71.4774 30.6444C151.734 23.9564 232.915 20.5161 312.9 15"
              stroke="#DD3345"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              d="M31.2997 27C9.94337 23.9491 73.9788 20.436 95.4774 18.6444C175.734 11.9564 256.915 8.51608 336.9 3"
              stroke="#DD3345"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </HeaderTitle>
      {props.title2 && <HeaderTitle>{props.title2}</HeaderTitle>}
      <HeaderDescription>{props.description}</HeaderDescription>
    </HeaderContent>
    <ButtonsContainer>
      {props.buttonPrimary && props.buttonPrimary}
      {props.buttonSecondary && props.buttonSecondary}
    </ButtonsContainer>
  </HeaderContainer>
);
