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
  > div {
    display: flex;
  }
  > div.disabled {
    cursor: not-allowed;
    a {
      pointer-events: none;
    }
  }
  .nav-option {
    font-size: 14px;
    color: #7b7b7b;
    padding: 10px 16px;
    font-weight: 500;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    transition: 300ms ease;

    :hover {
      border-bottom-color: #292929;
      text-decoration: none;
    }
  }
  .selected .nav-option {
    color: #292929;
    border-bottom-color: #292929;
  }
  @media screen and (max-width: 992px) {
    padding: 0px 1rem;
    overflow-x: scroll;
    .selected {
      order: -1;
    }
  }
`;

return (
  <NavOptionsContainer>
    {navOptions.map((option) => {
      const selected = option.id == getSelectedNavOption().id;
      return option.label ? (
        <div
          key={option.label}
          className={`${option.disabled ? "disabled" : ""} ${selected ? "selected" : ""}`}
        >
          <a className={`nav-option `} href={option.href}>
            {option.label}
          </a>
        </div>
      ) : (
        ""
      );
    })}
  </NavOptionsContainer>
);
