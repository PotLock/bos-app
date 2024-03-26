const { onPageChange, data, currentPage, perPage, customSyle, bgColor } = props;
const siblingCount = props.siblingCount ?? 1;
const showArrows = props.showArrows ?? false;
const totalCount = data?.length;

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalCount, perPage, siblingCount, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / perPage);

    const totalPageNumbers = siblingCount + 3;

    if (totalPageNumbers >= totalPageCount || totalPageCount < 6) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 3;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      return range(1, totalPageCount);
    }
  }, [totalCount, perPage, siblingCount, currentPage]);

  return paginationRange;
};

const paginationRange = usePagination({
  currentPage,
  totalCount,
  siblingCount,
  perPage,
});

if (currentPage === 0 || paginationRange.length < 2) {
  return "";
}

const onNext = () => {
  onPageChange(currentPage + 1);
};

const onPrevious = () => {
  onPageChange(currentPage - 1);
};

let lastPage = paginationRange[paginationRange.length - 1];

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  list-style-type: none;
  ${customSyle || ""}
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    &.disabled {
      pointer-events: none;

      .arrow::before {
        border-right: 0.12em solid rgba(0, 0, 0, 0.43);
        border-top: 0.12em solid rgba(0, 0, 0, 0.43);
      }

      &:hover {
        cursor: default;
      }
    }
  }
  .pagination-item {
    border: 1px solid transparent;
    background: ${bgColor};
    border-radius: 2px;
    padding: 10px;
    font-size: 12px;
    color: white;
    cursor: pointer;
    transition: all 300ms;

    &.dots:hover {
      cursor: default;
      opacity: 1;
    }
    &:hover {
      opacity: 0.75;
    }

    &.selected {
      background: white;
      cursor: default;
      color: ${bgColor};
      border-color: ${bgColor};
    }
  }
  .arrow {
    cursor: pointer;
    &::before {
      position: relative;
      content: "";
      display: inline-block;
      width: 0.4em;
      height: 0.4em;
      border-right: 0.12em solid rgba(0, 0, 0, 0.87);
      border-top: 0.12em solid rgba(0, 0, 0, 0.87);
    }

    &.left {
      transform: rotate(-135deg) translate(-50%);
    }

    &.right {
      transform: rotate(45deg);
    }
  }
`;
return (
  <Container>
    {showArrows && (
      <li className={`${currentPage === 1 ? "disabled" : ""}`} onClick={onPrevious}>
        <div className="arrow left" />
      </li>
    )}
    {paginationRange?.length > 0 &&
      paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={`pagination-item ${pageNumber === currentPage ? "selected" : ""}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    {showArrows && (
      <li className={`${currentPage === lastPage ? "disabled" : ""}`} onClick={onNext}>
        <div className="arrow right" />
      </li>
    )}
  </Container>
);
