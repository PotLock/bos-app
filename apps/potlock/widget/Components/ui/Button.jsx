const StyledButton = styled.button`
  all: unset;
  width: 120px;
  height: 22px;
  border-radius: 6px;
  padding: 10px 16px 10px 12px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  // font-family: "Mona Sans", sans-serif;
  line-height: 22px;

  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;
  /* Mona sans/Text sm/14px:Medium */

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */

  transition: all 300ms;

  svg path {
    fill: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "#656565";
        case "tonal":
          return "#656565";
        case "standard":
          return "#FFFFFF";
        case "primary":
          return "#FFFFFF";
        default:
          return "#656565";
      }
    }};
  }

  background: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "var(--button-outline-bg, Neutral/White)";
      case "tonal":
        return "var(--button-tonal-bg,#FEF6EE) ";
      case "standard":
        return "var(--button-standard-bg, #3D3D3D)";
      case "primary":
        return "var(--button-primary-bg, #DD3345)";
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "var(--button-outline-color, #292929)";
      case "tonal":
        return "var(--button-tonal-color,#292929) ";
      case "standard":
        return "var(--button-standard-color, #FFFFFF)";
      case "primary":
        return "var(--button-primary-color, #FFFFFF)";
    }
  }};

  box-shadow: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(15, 15, 15, 0.15), 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 4px -1px rgba(15, 15, 15, 0.15);";
      case "tonal":
        return "0px 2px 4px -1px #FFF inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px rgba(15, 15, 15, 0.15), 0px 2px 4px -1px rgba(15, 15, 15, 0.15), 0px -2px 0px 0px rgba(0, 0, 0, 0.84) inset;";
      case "standard":
        return "0px 1px 1px 0px rgba(235, 235, 235, 0.15) inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 4px -1px rgba(15, 15, 15, 0.15);";
      case "primary":
        return "0px 2px 4px -1px #F6767A inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px rgba(15, 15, 15, 0.15), 0px 2px 4px -1px rgba(15, 15, 15, 0.15), 0px -2px 0px 0px rgba(0, 0, 0, 0.84) inset;";
    }
  }};

  &:hover:not(:disabled) {
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "var(--button-primary-hover-bg, #F6767A)";
        case "outline":
          return "var(--button-outline-hover-bg, rgba(15, 15, 15, 0.15))";
        case "standard":
          return "var(--button-outline-hover-bg, #b0b0b0)";
        case "tonal":
          return "var(--button-standard-hover-bg, $fff)";
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;

const Button = ({ children, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <link to={href}>
        <StyledButton onClick={onClick} {...restProps}>
          {children}
        </StyledButton>
      </link>
    );
  }
  return (
    <StyledButton onClick={onClick} {...restProps}>
      {children}
    </StyledButton>
  );
};

return { Button };
