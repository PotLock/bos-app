const { title, text } = props;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Col1 = styled.div`
  display: flex;
  width: 30%;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  p {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
`;

return (
  <Container>
    <Col1>
      <Title>{title}</Title>
    </Col1>
    <Col2>{text}</Col2>
  </Container>
);
