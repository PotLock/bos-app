const ownerId = "potlock.near";

const HeaderContainer = styled.div`
  width: 100%;
  background: #fffaf4;
  padding: 80px 64px 80px 64px;
`;

const HeaderContent = styled.div``;

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
`;

return (
  <HeaderContainer>
    <HeaderContent>
      <HeaderTitle>{props.title}</HeaderTitle>
      <HeaderDescription>{props.description}</HeaderDescription>
    </HeaderContent>
  </HeaderContainer>
);
