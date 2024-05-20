const { Volunteer } = VM.require("${config_account}/widget/Components.Icons") || {
  Volunteer: () => <></>,
};

const StyledButton = styled.button`
  all: unset;
  width: 120px;
  height: 22px;
  border-radius: 6px;
  padding: 9px 16px 9px 12px;
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
  flex-shrink: 0;
  transition: all 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);

  flex-direction: ${(props) => {
    if (props.direction === "right") {
      return "row";
    } else if (props.direction === "left") {
      return "row-reverse";
    }
  }};

  svg path {
    fill: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "rgba(123, 123, 123, 1)";
        case "tonal":
          return "#656565";
        case "standard":
          return "#FFFFFF";
        case "primary":
          return "#FFFFFF";
        case "brand-outline":
          return "hsla(358, 88%, 71%, 1)";
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
      case "brand-outline":
        return "hsla(0, 0%, 100%, 0.01)";
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
      case "brand-outline":
        return "hsla(354, 71%, 53%, 1)";
    }
  }};

  box-shadow: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset, 0px -1px 0px 0px rgba(15, 15, 15, 0.15) inset, 0px 1px 2px -0.5px rgba(5, 5, 5, 0.08);";
      case "tonal":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #FFF inset, 0px 0px 0px 2px #FFF inset, 0px 1.5px 0px 0px rgba(0, 0, 0, 0.84);";
      case "standard":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(166, 166, 166, 0.40) inset, 0px 0px 0px 2px rgba(166, 166, 166, 0.40) inset, 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 3px -1px rgba(5, 5, 5, 0.08);";
      case "primary":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(246, 118, 122, 0.50) inset, 0px 0px 0px 2px rgba(246, 118, 122, 0.50) inset, 0px 1.5px 0px 0px rgba(0, 0, 0, 0.84);";
      case "brand-outline":
        return "0px 0px 0px 1px rgba(243, 78, 95, 0.78) inset, 0px -1px 0px 0px rgba(73, 8, 19, 0.50) inset, 0px 1px 2px -0.5px rgba(73, 8, 19, 0.20);";
    }
  }};

  &:hover:not(:disabled) {
    transform: ${(props) => {
      switch (props.variant) {
        case "primary":
        case "tonal":
          return "translateY(1px)";
      }
    }};
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "primary":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #ED464F inset;";
        case "outline":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset, 0px -1px 0px 0px rgba(15, 15, 15, 0.15) inset, 0px 1px 2px -0.5px rgba(5, 5, 5, 0.08);";
        case "standard":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(166, 166, 166, 0.40) inset, 0px 0px 0px 2px rgba(166, 166, 166, 0.40) inset, 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 3px -1px rgba(5, 5, 5, 0.08);";
        case "tonal":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #FFF inset;";
        case "brand-outline":
          return "0px 0px 0px 1px rgba(243, 78, 95, 0.78) inset, 0px -1px 0px 0px rgba(73, 8, 19, 0.50) inset, 0px 1px 2px -0.5px rgba(73, 8, 19, 0.20);";
      }
    }};
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return " #DD3345";
        case "outline":
          return "Neutral/50";
        case "standard":
          return " #525252";
        case "tonal":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #FFF inset;";
        case "brand-outline":
          return "#FEF3F2";
      }
    }};
  }

  &:focus:not(:disabled) {
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset, 0px -1px 0px 0px rgba(15, 15, 15, 0.15) inset, 0px 1px 2px -0.5px rgba(5, 5, 5, 0.08), 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "primary":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "standard":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(166, 166, 166, 0.30) inset, 0px 0px 0px 2px rgba(166, 166, 166, 0.30) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "tonal":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "brand-outline":
          return "0px 0px 0px 1px rgba(243, 78, 95, 0.78) inset, 0px -1px 0px 0px rgba(73, 8, 19, 0.50) inset, 0px 1px 2px -0.5px rgba(5, 5, 5, 0.08), 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
      }
    }};
  }

  &:disabled {
    color: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "hsla(0, 0%, 78%, 1)"; // Adjust color value
        case "standard":
          return "hsla(0, 0%, 65%, 1)"; // Use CSS variable for color or specify a fallback
        default:
          return "inherit"; // Fallback to default color
      }
    }};

    box-shadow: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset;"; // Adjust box-shadow value
        case "standard":
          return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset;"; // Adjust box-shadow value
        default:
          return "none"; // No box-shadow for other variants
      }
    }};
    background: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "var(--button-outline-bg-disabled, #fff)"; // Use CSS variable for background or specify a fallback
        case "standard":
          return "var(--button-standard-bg-disabled, #EBEBEB)"; // Use CSS variable for background or specify a fallback
        default:
          return "inherit"; // Fallback to default background
      }
    }};
  }
`;

const TipOnPotlock = ({ direction, variant, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <Link href={href}>
        <StyledButton
          direction={direction ?? "right"}
          onClick={onClick}
          {...restProps}
          variant={variant ?? "primary"}
        >
          <Volunteer />
          Tip on Potlock
        </StyledButton>
      </Link>
    );
  }
  return (
    <StyledButton
      direction={direction ?? "right"}
      onClick={onClick}
      {...restProps}
      variant={variant ?? "primary"}
    >
      <Volunteer />
      Tip on Potlock
    </StyledButton>
  );
};

const Button = ({ direction, disabled, children, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <link to={href}>
        <StyledButton
          direction={direction ?? "right"}
          onClick={onClick}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </StyledButton>
      </link>
    );
  }
  return (
    <StyledButton
      direction={direction ?? "right"}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};

return { Button, TipOnPotlock };
