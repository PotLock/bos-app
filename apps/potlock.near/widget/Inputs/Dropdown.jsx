const { sortList, sortVal, title, handleSortChange, FilterMenuCustomStyle } = props;

const [openFilter, setOpenFilter] = useState(false);

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
  background: #fff;
  top: 140%;
  right: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid rgba(41, 41, 41, 0.36);
  box-shadow: 0px 12px 20px -4px rgba(123, 123, 123, 0.32),
    0px 4px 8px -3px rgba(123, 123, 123, 0.2), 0px 0px 2px 0px rgba(123, 123, 123, 0.36);
  ${FilterMenuCustomStyle || ""}
`;

const FilterItem = styled.div`
  cursor: pointer;
  padding: 8px;
  display: flex;
  gap: 12px;
  white-space: nowrap;
  &:hover {
    color: #fff;
    background: #dd3345;
    border-radius: 6px;
  }
`;

return (
  <div style={{ position: "relative" }} onClick={() => setOpenFilter(!openFilter)}>
    <FilterButton>
      {sortVal || title}
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
        {sortList.map((option) => (
          <FilterItem
            key={option.val}
            onClick={() => {
              setOpenFilter(false);
              handleSortChange(option);
            }}
          >
            {option.label}
          </FilterItem>
        ))}
      </FilterMenu>
    )}
  </div>
);
