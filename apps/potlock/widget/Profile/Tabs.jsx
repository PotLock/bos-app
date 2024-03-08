const { navOptions } = props;

const getSelectedNavOption = () => {
  const navOption = navOptions.find((option) => option.id == props.nav);
  return navOption ?? navOptions[0];
};

const NavOptionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
  border-bottom: 1px solid #c7c7c7;
  padding: 0 4rem;
  .nav-option {
    font-size: 14px;
    color: #7b7b7b;
    padding: 10px 16px;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: 300ms ease;
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
    &.selected {
      color: #292929;
      border-bottom-color: #292929;
    }
    :hover {
      border-bottom-color: #292929;
      text-decoration: none;
    }
  }
`;

return (
  <NavOptionsContainer>
    {navOptions.map((option) => {
      const selected = option.id == getSelectedNavOption().id;
      return option.label ? (
        <a
          className={`nav-option ${selected && "selected"} ${option.disabled && "disabled"}`}
          href={option.href}
        >
          {option.label}
        </a>
      ) : (
        ""
      );
    })}
  </NavOptionsContainer>
);
