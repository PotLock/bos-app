const navOptions = [
  {
    label: "Home",
    disabled: false,
  },
  {
    label: "Social Feed",
    disabled: true,
  },
  {
    label: "Pots",
    disabled: true,
  },
  {
    label: "Attestations",
    disabled: true,
  },
  {
    label: "Funding Raised",
    disabled: true,
  },
];

const getSelectedNavOption = () => {
  const navOption = navOptions.find((option) => option.label == props.nav);
  return navOption ?? navOptions[0];
};

const NavOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 32px;
`;

const NavOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavOption = styled.a`
  font-size: 14px;
  padding: 8px 16px;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  color: ${(props) => (props.selected ? "#DD3345" : "#7B7B7B")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : props.selected ? "pointer" : "default")};

  &:hover {
    text-decoration: none;
  }
`;

return (
  <NavOptionsContainer>
    {navOptions.map((option) => {
      return option.disabled ? (
        <NavOption
          selected={option.label == getSelectedNavOption().label}
          disabled={option.disabled}
        >
          {option.label}
        </NavOption>
      ) : (
        <NavOptionContainer>
          {option.label == getSelectedNavOption().label && (
            <div style={{ width: 2, height: 16, background: "#DD3345", borderRadius: 2 }} />
          )}
          <NavOption
            selected={option.label == getSelectedNavOption().label}
            disabled={option.disabled}
            href={`?tab=project&projectId=${props.projectId}&nav=${option.label}`}
          >
            {option.label}
          </NavOption>
        </NavOptionContainer>
      );
    })}
  </NavOptionsContainer>
);
