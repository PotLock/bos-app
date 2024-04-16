const Row = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  padding: 0.5rem;
  padding-left: 2.5rem;
  font-size: 14px;
`;

const SearchIcon = styled.div`
  display: flex;
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
  svg {
    height: 100%;
  }
`;

const SearchBarInput = styled.input`
  background: none;
  width: 100%;
  outline: none;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const FilterButton = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
  padding: 0.54rem 1rem;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  transition: all 200ms ease-in-out;
  &.active {
    color: #fff;
    background: #292929;
  }
`;

const FilterIcon = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
`;

const FilterMenu = styled.div`
  position: absolute;
  background: #fff;
  font-size: 14px;
  top: 110%;
  right: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid rgba(41, 41, 41, 0.36);
  box-shadow: 0px 12px 20px -4px rgba(123, 123, 123, 0.32),
    0px 4px 8px -3px rgba(123, 123, 123, 0.2), 0px 0px 2px 0px rgba(123, 123, 123, 0.36);
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transform: translateY(100px);
  transition: all 200ms ease-in-out;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  @media screen and (max-width: 768px) {
    left: 0;
    background: #fff;
  }
`;

const FilterItem = styled.div`
  cursor: pointer;
  padding: 8px;
  display: flex;
  gap: 12px;
  white-space: nowrap;
  &:hover {
    background: #292929;
    color: #fff;
    border-radius: 6px;
  }
`;

const {
  title,
  numItems,
  itemName,
  sortList,
  sortVal,
  handleSortChange,
  setSearchTerm,
  FilterMenuClass,
} = props;

const onSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const [openFilter, setOpenFilter] = useState(false);

return (
  <>
    <Row>
      <SearchIcon>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7549 11.2559H11.9649L11.6849 10.9859C12.6649 9.8459 13.2549 8.3659 13.2549 6.75586C13.2549 3.16586 10.3449 0.255859 6.75488 0.255859C3.16488 0.255859 0.254883 3.16586 0.254883 6.75586C0.254883 10.3459 3.16488 13.2559 6.75488 13.2559C8.3649 13.2559 9.8449 12.6659 10.9849 11.6859L11.2549 11.9659V12.7559L16.2549 17.7459L17.7449 16.2559L12.7549 11.2559ZM6.75488 11.2559C4.26488 11.2559 2.25488 9.2459 2.25488 6.75586C2.25488 4.26586 4.26488 2.25586 6.75488 2.25586C9.2449 2.25586 11.2549 4.26586 11.2549 6.75586C11.2549 9.2459 9.2449 11.2559 6.75488 11.2559Z"
            fill="#7B7B7B"
          />
        </svg>
      </SearchIcon>
      <SearchBarInput
        placeholder={`Search (${numItems}) ${numItems === 1 ? itemName : itemName + "s"}`}
        onChange={onSearchChange}
        type="text"
        autocomplete="search"
      />
    </Row>
    <div style={{ position: "relative" }} onClick={() => setOpenFilter(!openFilter)}>
      <FilterButton className={openFilter ? "active" : ""}>
        {sortVal || title}
        <FilterIcon>
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 12H6V10H0V12ZM0 0V2H18V0H0ZM0 7H12V5H0V7Z" fill="#7B7B7B" />
          </svg>
        </FilterIcon>
      </FilterButton>
      <FilterMenu
        onClick={(e) => e.stopPropagation()}
        className={`${FilterMenuClass || ""} ${openFilter ? "active" : ""} `}
      >
        {(sortList || []).map((filter, key) => (
          <FilterItem
            key={key}
            onClick={() => {
              setOpenFilter(false);
              handleSortChange(filter);
            }}
          >
            {filter}
          </FilterItem>
        ))}
      </FilterMenu>
    </div>
  </>
);
