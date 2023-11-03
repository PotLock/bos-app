const getButtonBackground = () => {
  if (props.type === "primary") {
    if (props.disabled) {
      return "#e5e5e5";
    }
    return "#dd3345";
  } else if (props.type === "secondary") {
    // TODO: handle disabled
    return "#FCE9D5";
  }
};

const getButtonColor = () => {
  if (props.type === "primary") {
    if (props.disabled) {
      return "darkgrey";
    }
    return "white";
  }
  return "#2E2E2E";
};

const Button = styled.a`
  // width: 100%;
  // height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: ${getButtonBackground()};
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: ${getButtonColor()};
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
  }
`;

return (
  <Button
    target={props.target}
    href={props.href}
    onClick={(e) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        props.onClick(e);
      }
    }}
    disabled={props.disabled}
    style={{ ...props.style }}
  >
    {props.text}
  </Button>
);
