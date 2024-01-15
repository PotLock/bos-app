const { projectLength, handleFilterChange, setSearchTerm } = props;

const filterList = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Most to Least Donations",
  "Least to Most Donations",
];

const [openFilter, setOpenFilter] = useState(false);

const onSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: #f0f0f0;
  padding: 12px 24px;
`;

const SearchBar = styled.input`
  background: none;
  width: 100%;
  border-radius: 
  outline: none;
  border: none;
  color: #525252;
  &:focus {
      outline: none;
      border: none;
  }
`;

const FilterButton = styled.div`
  white-space: nowrap;
  display: flex;
  cursor: pointer;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #525252;
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
  background: #FFF;
  top: 100%;
  right: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid rgba(41, 41, 41, 0.36); 
  box-shadow: 0px 12px 20px -4px rgba(123, 123, 123, 0.32), 0px 4px 8px -3px rgba(123, 123, 123, 0.20), 0px 0px 2px 0px rgba(123, 123, 123, 0.36); 
`;

const FilterItem = styled.div`
  cursor: pointer;
  padding: 8px;
  display: flex;
  gap: 12px;
  white-space: nowrap;
  &:hover {
      background: #dd3345;
      color: #FFF;
      border-radius: 6px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

return (
  <SearchBarContainer>
    <SearchIcon>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.7549 14.2549H14.9649L14.6849 13.9849C15.6649 12.8449 16.2549 11.3649 16.2549 9.75488C16.2549 6.16488 13.3449 3.25488 9.75488 3.25488C6.16488 3.25488 3.25488 6.16488 3.25488 9.75488C3.25488 13.3449 6.16488 16.2549 9.75488 16.2549C11.3649 16.2549 12.8449 15.6649 13.9849 14.6849L14.2549 14.9649V15.7549L19.2549 20.7449L20.7449 19.2549L15.7549 14.2549ZM9.75488 14.2549C7.26488 14.2549 5.25488 12.2449 5.25488 9.75488C5.25488 7.26488 7.26488 5.25488 9.75488 5.25488C12.2449 5.25488 14.2549 7.26488 14.2549 9.75488C14.2549 12.2449 12.2449 14.2549 9.75488 14.2549Z"
          fill="#C7C7C7"
        />
      </svg>
    </SearchIcon>
    <SearchBar
      placeholder={`Search (${projectLength}) projects`}
      onChange={onSearchChange}
    />
    <div
      style={{ position: "relative" }}
      onClick={() => setOpenFilter(!openFilter)}
    >
      <FilterButton>
        Sort
        <FilterIcon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3.88667L10.1133 6L11.0533 5.06L8 2L4.94 5.06L5.88667 6L8 3.88667ZM8 12.1133L5.88667 10L4.94667 10.94L8 14L11.06 10.94L10.1133 10L8 12.1133Z"
              fill="#7B7B7B"
            />
          </svg>
        </FilterIcon>
      </FilterButton>
      {openFilter && (
        <FilterMenu onClick={(e) => e.stopPropagation()}>
          {filterList.map((filter, key) => (
            <FilterItem key={key} onClick={() => handleFilterChange(filter)}>
              {filter}
            </FilterItem>
          ))}
        </FilterMenu>
      )}
    </div>
  </SearchBarContainer>
);
