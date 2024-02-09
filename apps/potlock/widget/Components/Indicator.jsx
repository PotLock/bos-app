const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props.colorOuter};

  @keyframes beacon {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  animation: beacon 1.5s infinite;
`;

const Inner = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${props.colorInner};
`;

return (
  <Outer>
    <Inner />
  </Outer>
);
