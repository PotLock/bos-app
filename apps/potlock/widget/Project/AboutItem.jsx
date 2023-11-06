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

const Col1 = styled.div`
  display: flex;
  width: 25%;
  padding-top: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Col2 = styled.div`
  display: flex;
  width: 75%;
  padding-top: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
  // font-family: Mona-Sans;
`;

return (
  <Container>
    {/* <Column className="col-3"> */}
    <Col1>
      <Title>{props.title}</Title>
      {/* </Column> */}
    </Col1>
    {/* <Column className="col-9">{props.text}</Column> */}
    <Col2>{props.text}</Col2>
  </Container>
);
