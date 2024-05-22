const getButtonBackground = () => {
  if (props.type === "primary") {
    if (props.disabled) {
      return "#e5e5e5";
    }
    return "#dd3345";
  } else if (props.type === "secondary") {
    // TODO: handle disabled
    return "#FEF6EE";
  } else if (props.type === "tertiary") {
    return "white";
  }
};

const getButtonTextColor = () => {
  if (props.type === "primary") {
    if (props.disabled) {
      return "darkgrey";
    }
    return "white";
  } else if (props.type === "secondary") {
    return "#2E2E2E";
  }
};

const tag = props.href ? "a" : "button";

const Button = styled[tag]`
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
  color: ${getButtonTextColor()};
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

return (
  <Button
    onClick={(e) => {
      if (props.disabled || !props.onClick) return;
      if (props.stopPropagation) e.stopPropagation();
      e.preventDefault();
      props.onClick(e);
    }}
    href={props.href}
    style={{ ...props.style }}
    target={props.target}
  >
    {props.iconSrc && <Icon src={props.iconSrc} />}
    {props.text}
  </Button>
);
