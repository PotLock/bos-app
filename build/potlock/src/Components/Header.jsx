const ownerId = "potlock.near";

const HeaderContainer = styled.div`
  width: 100%;
  // background: #fffaf4;
  padding: 80px 64px 80px 64px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props.centered ? "center" : "flex-start"};
`;

const HeaderTitle = styled.div`
  color: #2e2e2e;
  font-size: 88px;
  font-weight: 600;
  word-wrap: break-word;
`;

const HeaderDescription = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-family: Mona-Sans;
  font-weight: 400;
  word-wrap: break-word;
  max-width: 866px;
  text-align: ${props.centered ? "center" : "flex-start"};
  margin: 32px 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

return (
  <HeaderContainer>
    <HeaderContent>
      <HeaderTitle>{props.title1}</HeaderTitle>
      {props.title2 && <HeaderTitle>{props.title2}</HeaderTitle>}
      <HeaderDescription>{props.description}</HeaderDescription>
    </HeaderContent>
    <ButtonsContainer>
      {props.buttonPrimary && props.buttonPrimary}
      {props.buttonSecondary && props.buttonSecondary}
    </ButtonsContainer>
  </HeaderContainer>
);
