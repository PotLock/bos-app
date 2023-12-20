const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props.colorOuter};
`;

const Inner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props.colorInner};
`;

return (
  <Outer>
    <Inner />
  </Outer>
);
