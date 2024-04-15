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
  border: 1px solid #7b7b7b;
  &.active {
    color: #fff;
    background: #292929;
  }
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
  z-index: 1;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .title {
    width: 100%;
    &:not(:first-of-type) {
      margin-top: 2rem;
    }
  }
  .option {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    svg {
      display: none;
      width: 14px;
    }
    :hover {
      border: 1px solid #f4b37d;
      background: #fef6ee;
      color: #ea6a25;
    }
    &.selected {
      border: 1px solid #f4b37d;
      background: #fef6ee;
      color: #ea6a25;
      svg {
        display: block;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    width: 200px !important;
    left: 0;
    right: auto;
  }
`;

const Count = styled.div`
  font-weight: 600;
  font-size: 12px;
  display: flex;
  line-height: 1;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ebebeb;
  &.active {
    background: #464646;
    color: #f6f5f3;
  }
`;

const Screen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const { onClick, menuClass, label, multipleOptions, defaultSelected } = props;
const labelIcon = props.labelIcon ?? "center";
const options = props.options ?? {};

const [toggleMenu, setToggleMenu] = useState(false);
const [selected, setSelected] = useState(defaultSelected || {});

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

function findIndexWithAll(listOfLists, target) {
  for (let i = 0; i < listOfLists.length; i++) {
    const indexInList = listOfLists[i].indexOf(target);
    if (indexInList !== -1) {
      return { listIndex: i, itemIndex: indexInList };
    }
  }
  return { listIndex: -1, itemIndex: -1 }; // Not found
}

const handleSelect = ({ val, type, label }) => {
  let selectedUpdated = { ...selected };
  const selectedList = selected[type] || [];

  if (!multipleOptions) {
    selectedUpdated = { val, label };
  } else if (selectedList.includes(val)) {
    selectedUpdated[type] = selectedList.filter((item) => item !== val);
  } else {
    selectedUpdated[type] = [...selectedList, val];
  }

  const { listIndex, itemIndex } = findIndexWithAll(Object.values(selectedUpdated), "all");

  const types = Object.keys(selectedUpdated);

  // remove filters if all is selected
  if (val === "all") {
    selectedUpdated = {
      [type]: [val],
    };
  }
  // remove all if another filter is selected
  else if (listIndex !== -1) {
    selectedUpdated[types[listIndex]].splice(itemIndex, 1);
  }

  setSelected(selectedUpdated);

  onClick(selectedUpdated);
  setToggleMenu(false);
};

const count = Object.values(selected).reduce((total, list) => total + list.length, 0);
return (
  <Container>
    {toggleMenu && <Screen onClick={() => setToggleMenu(false)} />}

    <Label className={toggleMenu ? "active" : ""} onClick={() => setToggleMenu(!toggleMenu)}>
      {label || "Filter"}
      {multipleOptions && <Count className={toggleMenu ? "active" : ""}>{count}</Count>}
      {icons[labelIcon]}
    </Label>
    <Menu className={`${toggleMenu ? "active" : ""} ${menuClass ?? ""}`}>
      {Object.keys(options)?.map((menuLabel) => (
        <>
          <div className="title">Filter by {menuLabel.includes("no label") ? "" : menuLabel}</div>
          {(options[menuLabel] || [])?.map(({ label, val }) => (
            <div
              className={`option ${
                multipleOptions && (selected[menuLabel] || [])?.includes(val) && "selected"
              }`}
              key={val}
              onClick={() => handleSelect({ label, val, type: menuLabel })}
            >
              <svg viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.59625 8.90631L1.46875 5.77881L0.403748 6.83631L4.59625 11.0288L13.5962 2.02881L12.5387 0.971313L4.59625 8.90631Z"
                  fill="#F4B37D"
                />
              </svg>

              {label}
            </div>
          ))}
        </>
      ))}
    </Menu>
  </Container>
);
