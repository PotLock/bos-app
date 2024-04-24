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

  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

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
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px #FFF inset, 0px -2px 0px 0px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 0px rgba(15, 15, 15, 0.15), 0px 1px 4px -1px rgba(5, 5, 5, 0.08);";
      case "standard":
        return "0px 1px 1px 0px rgba(235, 235, 235, 0.15) inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 4px -1px rgba(15, 15, 15, 0.15);";
      case "primary":
        return "0px 2px 4px -1px #F6767A inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px rgba(15, 15, 15, 0.15), 0px 2px 4px -1px rgba(15, 15, 15, 0.15), 0px -2px 0px 0px rgba(0, 0, 0, 0.84) inset;";
    }
  }};

  &:hover:not(:disabled) {
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "primary":
          return " 0px 2px 4px -1px #ED464F inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px rgba(15, 15, 15, 0.15), 0px 2px 4px -1px rgba(15, 15, 15, 0.15);";
        case "outline":
          return " 0px 1px 4px -1px #0F0F0F26, 0px 1px 2px 0px #0F0F0F26, 0px 0px 0px 1px #0F0F0F26,";
        case "standard":
          return " 0px 1px 1px 0px #01010185,0px 0px 0px 1px #000000D6,0px 1px 1px 0px #EBEBEB26 inset;";
        case "tonal":
          return "0px 2px 4px -1px #0F0F0F26, 0px 1px 1px 0px #0F0F0F26, 0px 0px 0px 1px #000000D6, 0px 2px 4px -1px #FFFFFF inset;";
      }
    }};
  }

  &:active:not(:disabled) {
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "0px 2px 4px -1px #0F0F0F26, 0px 1px 1px 0px #0F0F0F26, 0px 0px 0px 1px #000000D6, 0px 2px 4px -1px #FFFFFF inset;";
        case "primary":
          return "0px 2px 4px -1px #0F0F0F26, 0px 1px 1px 0px #0F0F0F26, 0px 0px 0px 1px #000000D6, 0px 2px 4px -1px #FFFFFF inset;";
        case "standard":
          return "0px 2px 4px -1px #0F0F0F26, 0px 1px 1px 0px #0F0F0F26, 0px 0px 0px 1px #000000D6, 0px 2px 4px -1px #FFFFFF inset;";
        case "tonal":
          return "0px 2px 4px -1px rgba(1, 1, 1, 0.35) inset, 0px 1px 1px -1px #FFF, 0px 0px 0px 1px rgba(2, 2, 2, 0.73);";
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
