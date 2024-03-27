const { onClick, menuClass, label, multipleOptions, selected } = props;
const labelIcon = props.labelIcon ?? "center";

const filterBy = [
  {
    label: "Application open",
    val: "application_open",
  },
  {
    label: "Matching round open",
    val: "round_open",
  },
  {
    label: "Application closed",
    val: "application_closed",
  },
  // {
  //   label: "Matching round ended",
  //   val: "round_end",
  // },
  {
    label: "Challenge period",
    val: "cooldown",
  },
];

const icons = {
  center: (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#7B7B7B" />
    </svg>
  ),
  right: (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12H6V10H0V12ZM0 0V2H18V0H0ZM0 7H12V5H0V7Z" fill="#7B7B7B" />
    </svg>
  ),
};

const options = props.options ?? filterBy;

const [toggleMenu, setToggleMenu] = useState(false);

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
`;

const Label = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #292929;
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  transition: all 300ms ease-in-out;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
  width: 500px;
  box-shadow: 0px 0px 0px 1px rgba(123, 123, 123, 0.09), 0px 3px 3px -1px rgba(123, 123, 123, 0.16),
    0px 9px 9px -3px rgba(123, 123, 123, 0.1), 0px 17px 14px -5px rgba(123, 123, 123, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(100px);
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .title {
    width: 100%;
  }
  .option {
    display: flex;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    :hover {
      background: #292929;
      color: #ffffff;
    }
    &.selected {
      background: #292929;
      color: #ffffff;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 200px !important;
    left: 0;
    right: auto;
  }
`;

const Screen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const handleSelect = ({ label, val }) => {
  onClick({ label, val });
  setToggleMenu(false);
};

return (
  <Container>
    {toggleMenu && <Screen onClick={() => setToggleMenu(false)} />}

    <Label onClick={() => setToggleMenu(!toggleMenu)}>
      {label || "Filter"} {icons[labelIcon]}
    </Label>
    <Menu
      className={`${toggleMenu ? "active" : ""} ${menuClass ?? ""}
`}
    >
      <div className="title">Filter by</div>
      {options?.map(({ label, val }) => (
        <div
          className={`option ${
            (selected === val || (multipleOptions && selected?.includes(val))) && "selected"
          }`}
          key={val}
          onClick={() => handleSelect({ label, val })}
        >
          {label}
        </div>
      ))}
    </Menu>
  </Container>
);
