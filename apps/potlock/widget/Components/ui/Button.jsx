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

  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

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
      case "no-border-primary-tonal":
        return "#fff";
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
      case "no-border-primary-tonal":
        return "hsla(354, 71%, 53%, 1)";
    }
  }};

  box-shadow: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset, 0px -1px 1px 0px rgba(15, 15, 15, 0.15) inset, 0px -1px 4px 0px rgba(5, 5, 5, 0.08) inset;";
      case "tonal":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #FFF inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.84);";
      case "standard":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(166, 166, 166, 0.30) inset, 0px 1px 2px 0px rgba(15, 15, 15, 0.15), 0px 1px 3px -1px rgba(5, 5, 5, 0.08);";
      case "primary":
        return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(246, 118, 122, 0.50) inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.84);";
    }
  }};

  &:hover:not(:disabled) {
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "primary":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #ED464F inset;";
        case "outline":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset;";
        case "standard":
          return " 0px 0px 0px 1px rgba(0, 0, 0, 0.84), 0px 1px 1px 0px rgba(235, 235, 235, 0.15) inset;";
        case "tonal":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px #FFF inset;";
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
      }
    }};
  }

  &:focus:not(:disabled) {
    box-shadow: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.22) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "primary":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "standard":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 1px 1px 1px rgba(166, 166, 166, 0.30) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
        case "tonal":
          return "0px 0px 0px 1px rgba(0, 0, 0, 0.84) inset, 0px 0px 0px 2px #FFF, 0px 0px 0px 4px rgba(0, 0, 0, 0.84);";
      }
    }};
  }

  /* &:disabled {
    color: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset, 0px 2px 4px -1px rgba(0, 0, 0, 0.22) inset;";
      case "standard":
        return "Neutral/400";
    }
  }};

    box-shadow: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset, 0px 2px 4px -1px rgba(0, 0, 0, 0.22) inset;";

      case "standard":
        return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset;";
    }
  }};
    background: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "0px 0px 0px 1px rgba(15, 15, 15, 0.15) inset, 0px 2px 4px -1px rgba(0, 0, 0, 0.22) inset;";

      case "standard":
        return "hsla(0, 0%, 65%, 1)";
    }
  }};
  } */

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

const TipOnPotlock = ({ variant, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <Link href={href}>
        <StyledButton onClick={onClick} {...restProps} variant={variant ?? "primary"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
              fill="#DBDBDB"
            />
            <path
              d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
              fill="#DBDBDB"
            />
          </svg>
          Tip on Potlock
        </StyledButton>
      </Link>
    );
  }
  return (
    <StyledButton onClick={onClick} {...restProps} variant={variant ?? "primary"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
          fill="#DBDBDB"
        />
        <path
          d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
          fill="#DBDBDB"
        />
      </svg>
      Tip on Potlock
    </StyledButton>
  );
};

const Button = ({ disabled, children, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <link to={href}>
        <StyledButton onClick={onClick} disabled={disabled} {...restProps}>
          {children}
        </StyledButton>
      </link>
    );
  }
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...restProps}>
      {children}
    </StyledButton>
  );
};

return { Button, TipOnPotlock };
