const perPage = props.perPage || 50;
const data = props.data || [];
const bgColor = props.bgColor || "#dd3345";
const customStyle = props.customStyle || {};
const page = props.page;
const MAX_PAGE_DISPLAY_COUNT = props.maxPageDisplayCount || 5;

// Calculate the total number of pages
const totalPages = Math.ceil(data?.length / perPage) - 1;
// console.log("totalPages: ", totalPages);

// Generate an array of page numbers starting from 1
const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
// console.log("pageNumbers: ", pageNumbers);
let lastPageNumber = pageNumbers[pageNumbers.length - 1];

const handlePaginate = (to) => {
  if (to !== "...") {
    const toPage = parseInt(to);
    props.setPage(toPage);
  }
};

const Page = ({ children }) => {
  return (
    <div
      onClick={() => handlePaginate(children[0])}
      className={`${children[0] + "" == page + "" ? "active" : ""}`}
    >
      {children[0]}
    </div>
  );
};

const Pagination = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  div {
    border: 1px solid transparent;
    background: ${bgColor};
    border-radius: 2px;
    padding: 10px;
    font-size: 12px;
    color: white;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
    &.active {
      background: white;
      color: ${bgColor};
      border-color: ${bgColor};
    }
  }
`;

// const PaginationNumber = () => {
//   console.log("page: ", page);
//   if (pageNumbers.length < MAX_PAGE_DISPLAY_COUNT) {
//     console.log("line 61");
//     return (
//       <Pagination>
//         {pageNumbers?.map((num) => (
//           <Page>{num}</Page>
//         ))}
//       </Pagination>
//     );
//   } else if (page === pageNumbers[0]) {
//     // first page
//     return (
//       <Pagination>
//         {/* <Page>{page}</Page> e.g. 1 2 3 ... 5
//         <Page>{page + 1}</Page>
//         <Page>...</Page>
//         <Page>{lastElement}</Page> */}
//         {Array(MAX_PAGE_DISPLAY_COUNT)
//           .fill("")
//           .map((_, index) => {
//             if (index + 1 === MAX_PAGE_DISPLAY_COUNT) {
//               return <Page>{lastPageNumber}</Page>;
//             } else if (index + 1 === MAX_PAGE_DISPLAY_COUNT - 1) {
//               return <Page>...</Page>;
//             } else {
//               return <Page>{index + 1}</Page>;
//             }
//           })}
//       </Pagination>
//     );
//   } else if (page === pageNumbers[1]) {
//     console.log("line 91");
//     // second page
//     return (
//       <Pagination>
//         {/* <Page>{page}</Page> e.g. 1 2 3 ... 5
//         <Page>{page + 1}</Page>
//         <Page>...</Page>
//         <Page>{lastElement}</Page> */}
//         {Array(MAX_PAGE_DISPLAY_COUNT)
//           .fill("")
//           .map((_, index) => {
//             if (index + 1 === MAX_PAGE_DISPLAY_COUNT) {
//               return <Page>{lastPageNumber}</Page>;
//             } else if (index + 1 === MAX_PAGE_DISPLAY_COUNT - 1) {
//               return <Page>...</Page>;
//             } else {
//               return <Page>{index + 1}</Page>;
//             }
//           })}
//       </Pagination>
//     );
//   } else if (page === lastPageNumber) {
//     console.log("line 90");
//     // last page
//     return (
//       <Pagination>
//         {/* <Page>0</Page> e.g. 1 ... 3 4 5
//         <Page>...</Page>
//         <Page>{page - 1}</Page>
//         <Page>{page}</Page> */}
//         {Array(MAX_PAGE_DISPLAY_COUNT)
//           .fill("")
//           .map((_, index) => {
//             if (index === 0) {
//               return <Page>{index + 1}</Page>;
//             } else if (index === 1) {
//               return <Page>...</Page>;
//             } else {
//               return <Page>{page}</Page>;
//             }
//           })}
//       </Pagination>
//     );
//   } else if (page + 1 === lastElement) {
//     console.log("line 110");
//     // second last page
//     return (
//       <Pagination>
//         {/* <Page>0</Page> e.g. 1 ... 3 4 5
//         <Page>...</Page>
//         <Page>{page - 1}</Page>
//         <Page>{page}</Page>
//         <Page>{lastElement}</Page> */}
//         {Array(MAX_PAGE_DISPLAY_COUNT)
//           .fill("")
//           .map((_, index) => {
//             if (index === 0) {
//               return <Page>{index + 1}</Page>;
//             } else if (index === 1) {
//               return <Page>...</Page>;
//             } else if (index === 2) {
//               return <Page>{page - 1}</Page>;
//             } else if (index === 3) {
//               return <Page>{page}</Page>;
//             } else {
//               return <Page>{lastPageNumber}</Page>;
//             }
//           })}
//       </Pagination>
//     );
//   } else if (page + 1 < lastPageNumber && page > MAX_PAGE_DISPLAY_COUNT - 2) {
//     console.log("line 135");
//     // middle pages
//     return (
//       <Pagination>
//         {/* <Page>0</Page> e.g. on page 5 of 10 this would look like: 1 ... 4 5 6 ... 10
//         <Page>...</Page>
//         <Page>{page - 1}</Page>
//         <Page>{page}</Page>
//         <Page>{page + 1}</Page>
//         <Page>...</Page>
//         <Page>{lastElement}</Page> */}
//         {Array(MAX_PAGE_DISPLAY_COUNT + 2)
//           .fill("")
//           .map((_, index) => {
//             if (index === 0) {
//               // page 1
//               return <Page>{index + 1}</Page>;
//             } else if ([page - 1, page, page + 1].includes(index + 1)) {
//               // middle pages
//               return <Page>{page}</Page>;
//             } else if (index === MAX_PAGE_DISPLAY_COUNT - 1) {
//               // last page
//               return <Page>{lastPageNumber}</Page>;
//             } else {
//               // ellipsis
//               return <Page>...</Page>;
//             }
//           })}
//       </Pagination>
//     );
//   }
//   //   else if (page < lastElement) {
//   //     return (
//   //       <Pagination>
//   //         <Page>0</Page>
//   //         <Page>{page}</Page>
//   //         <Page>{page + 1}</Page>
//   //         <Page>...</Page>
//   //         <Page>{lastElement}</Page>
//   //       </Pagination>
//   //     );
//   //   }
// };

const PaginationNumber = () => {
  if (pageNumbers.length < 4) {
    return (
      <Pagination>
        {pageNumbers?.map((num) => (
          <Page>{num}</Page>
        ))}
      </Pagination>
    );
  } else if (page === 1) {
    return (
      <Pagination>
        <Page>1</Page>
        <Page>{page + 1}</Page>
        <Page>...</Page>
        <Page>{lastPageNumber}</Page>
      </Pagination>
    );
  } else if (page === lastPageNumber) {
    return (
      <Pagination>
        <Page>1</Page>
        <Page>...</Page>
        <Page>{page - 1}</Page>
        <Page>{page}</Page>
      </Pagination>
    );
  } else if (page + 1 === lastPageNumber) {
    return (
      <Pagination>
        <Page>1</Page>
        <Page>...</Page>
        <Page>{page - 1}</Page>
        <Page>{page}</Page>
        <Page>{lastPageNumber}</Page>
      </Pagination>
    );
  } else if (page + 1 < lastPageNumber && page > 3) {
    return (
      <Pagination>
        <Page>1</Page>
        <Page>...</Page>
        <Page>{page - 1}</Page>
        <Page>{page}</Page>
        <Page>{page + 1}</Page>
        <Page>...</Page>
        <Page>{lastPageNumber}</Page>
      </Pagination>
    );
  } else if (page < lastPageNumber) {
    return (
      <Pagination>
        <Page>1</Page>
        <Page>{page}</Page>
        <Page>{page + 1}</Page>
        <Page>...</Page>
        <Page>{lastPageNumber}</Page>
      </Pagination>
    );
  }
};

return <PaginationNumber style={customStyle} />;
