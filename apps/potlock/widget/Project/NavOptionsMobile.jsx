const { navOptions } = props;

const getSelectedNavOption = () => {
  const navOption = navOptions.find((option) => option.id == props.nav);
  return navOption ?? navOptions[0];
};

const NavOptionsContainer = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: none;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; // For momentum scroll on iOS devices
  border-bottom: 1px #dbdbdb solid;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    display: flex;
    max-width: 85vw;
    flex-shrink: 0; // Prevent the container from shrinking
  }
`;

const NavOption = styled.a`
  position: relative;
  font-size: 14px;
  padding: 8px 16px;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  color: ${(props) => (props.selected ? "#DD3345" : props.disabled ? "lightgray" : "#7B7B7B")};

  &:focus,
  &:active {
    text-decoration: none; /* This removes the underline */
  }

  &::after {
    content: "";
    display: ${(props) => (props.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 50%; // Center the underline
    transform: translateX(-50%); // Center the underline
    width: 16px; // Width of the underline
    height: 2px; // Thickness of the underline
    background-color: #dd3345;
  }
`;

return (
  <NavOptionsContainer>
    {navOptions.map((option) => {
      const selected = option.id == getSelectedNavOption().id;
      return option.disabled ? (
        <NavOption selected={selected} disabled={option.disabled}>
          {option.label}
        </NavOption>
      ) : !option.label ? (
        ""
      ) : (
        <NavOption
          selected={selected}
          disabled={option.disabled}
          href={props.hrefWithParams(`?tab=project&projectId=${props.projectId}&nav=${option.id}`)}
        >
          {option.label}
        </NavOption>
      );
    })}
  </NavOptionsContainer>
);
