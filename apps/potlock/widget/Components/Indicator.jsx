const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
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

  ${props.animate &&
  `
  animation: beacon 1.5s infinite;
  `}
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
