const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border-top: 1px #c7c7c7 solid;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Column = styled.div`
  padding-top: 16px;
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
  // font-family: Mona-Sans;
`;

return (
  <Container>
    <Column className="col-3">
      <Title>{props.title}</Title>
    </Column>
    <Column className="col-9">{props.text}</Column>
  </Container>
);
