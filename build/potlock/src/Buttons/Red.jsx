const Button = styled.button`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  background: #dd3345;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 600;

  &:disabled {
    background: #e5e5e5;
    color: darkgrey;
  }
`;

return (
  <Button onClick={props.onClick} disabled={props.disabled}>
    {props.text}
  </Button>
);
