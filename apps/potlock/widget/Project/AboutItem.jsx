const Container = styled.div`
  margin-top: 48px;
`;

const Column = styled.div`
  padding-top: 16px;
  border-top: 1px #c7c7c7 solid;
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
  // font-family: Mona-Sans;
`;

return (
  <Container className="row gx-0 align-items-start w-100">
    <Column className="col-3">
      <Title>{props.title}</Title>
    </Column>
    <Column className="col-9">{props.text}</Column>
  </Container>
);
