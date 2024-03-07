const {
  ownerId,
  // removeProjectsFromCart,
  // addProjectsToCart,
  // setIsCartModalOpen,
  tab,
  shouldShuffle,
  // setAmount,
  // setProjectId,
  // setNote,
  // setReferrerId,
  // setCurrency,
  // donnorProjectId,
  // amount,
  // referrerId,
  // currency,
  // note,
} = props;
const responsive = props.responsive || [];
// console.log("props in list section: ", props);

const items = useMemo(() => {
  if (shouldShuffle) {
    return [...props.items].sort(() => Math.random() - 0.5);
  }
  return props.items;
}, [props.items, shouldShuffle]);

const sortList = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Most to Least Donations",
  "Least to Most Donations",
];

const SORT_FILTERS = {
  ALL: "All",
  NEW_TO_OLD: "Newest to Oldest",
  OLD_TO_NEW: "Oldest to Newest",
  MOST_TO_LEAST_DONATIONS: "Most to Least Donations",
  LEAST_TO_MOST_DONATIONS: "Least to Most Donations",
};

const PAGE_SIZE = 9;

const featuredProjectIds = ["magicbuild.near", "potlock.near", "yearofchef.near"];
const featuredProjects = useMemo(
  () => props.items.filter((project) => featuredProjectIds.includes(project.id)),
  props.items
);

const [allProjects, setAllProjects] = useState(items);
const [filteredProjects, setFilteredProjects] = useState(items);
const [searchTerm, setSearchTerm] = useState("");

// const [elements, setElements] = useState(
//   props.items.slice(0, PAGE_SIZE).map((item) => props.renderItem(item))
// );

// const loadMore = () => {
//   const newElements = props.items
//     .slice(elements.length, elements.length + PAGE_SIZE)
//     .map(props.renderItem);
//   setElements([...elements, ...newElements]);
// };

// const [page, setPage] = useState(1);
// const [lastNumberOfProject, setLastNumberOfProject] = useState(PAGE_SIZE);
// const donationContractId = "donate.potlock.near";
// const [totalProjects, setTotalProjects] = useState(props.items);
// const [displayProject, setDisplayProject] = useState([]);
// const [lastNumberOfProject, setLastNumberOfProject] = useState(0);
// console.log("lastNumberOfProject", lastNumberOfProject);
// const [searchTerm, setSearchTerm] = useState(null);
// const [tagSelected, setTagSelected] = useState([]);
// const [featuredProjects, setFeaturedProjects] = useState([
//   {
//     id: "magicbuild.near",
//     status: "Approved",
//     submitted_ms: 1698226284754,
//     updated_ms: 1698226284754,
//     review_notes: null,
//   },
//   {
//     id: "potlock.near",
//     status: "Approved",
//     submitted_ms: 1698437495305,
//     updated_ms: 1698437495305,
//     review_notes: null,
//   },
//   {
//     id: "yearofchef.near",
//     status: "Approved",
//     submitted_ms: 1703055390614,
//     updated_ms: 1703055390614,
//     review_notes: null,
//   },
// ]);
// const [tagsList, setTagsList] = useState([
//   {
//     label: "Desci",
//     value: "de-sci",
//     selected: false,
//   },
//   {
//     label: "Open Source",
//     value: "open-source",
//     selected: false,
//   },
//   {
//     label: "Non Profit",
//     value: "non-profit",
//     selected: false,
//   },
//   {
//     label: "Social Impact",
//     value: "social-impact",
//     selected: false,
//   },
//   {
//     label: "Climate",
//     value: "climate",
//     selected: false,
//   },
//   {
//     label: "Public Good",
//     value: "public-good",
//     selected: false,
//   },
//   {
//     label: "Community",
//     value: "community",
//     selected: false,
//   },
//   {
//     label: "Education",
//     value: "education",
//     selected: false,
//   },
// ]);
// const handleTag = (key) => {
//   // console.log(tagsList[key].value);
//   const tags = tagsList;
//   tags[key].selected = !tagsList[key].selected;
//   const dataArr = props.items;
//   let tagSelected = [];
//   tagsList.forEach((tag) => {
//     if (tag.selected) {
//       tagSelected.push(tag.value);
//     }
//   });
//   let projectFilterBySearch = [];
//   dataArr.forEach((item) => {
//     const data = Social.getr(`${item.id}/profile`);
//     tagSelected.forEach((tag) => {
//       if (data.category == tag) {
//         projectFilterBySearch.push(item);
//       }
//     });
//   });
//   if (tagSelected.length == 0) {
//     setTotalProjects(dataArr);
//   } else {
//     setTotalProjects(projectFilterBySearch);
//   }
//   // console.log("tagsList", tagSelected);
//   setTagSelected(tagSelected);

//   setDisplayProject([]);
//   setLastNumberOfProject(0);

//   setTagsList(tags);
// };
// if (!totalProjects) return "loading";

// const loadPotProjects = () => {
//   setDisplayProject(totalProjects.map((item) => props.renderItem(item)));
// };

// const loadProjects = () => {
//   setLastNumberOfProject(lastNumberOfProject + 9);
//   setDisplayProject(
//     totalProjects.slice(0, lastNumberOfProject + 9).map((item) => (
//       <Widget
//         src={`${ownerId}/widget/Components.ProjectCard`}
//         props={{
//           ...props,
//           ...item,
//           ownerId: ownerId,
//           showModal: true,
//           isExistedInCart: props.cart && !!props.cart[item.id],
//           donnorProjectId: donnorProjectId,
//           amount: amount,
//           referrerId: referrerId,
//           currency: currency,
//           note: note,
//           removeProjectsFromCart: (projectId) => {
//             removeProjectsFromCart(projectId);
//           },
//           addProjectsToCart: (project) => {
//             addProjectsToCart(project);
//           },
//           setIsCartModalOpen: (isOpen) => {
//             setIsCartModalOpen(isOpen);
//           },
//           setAmount: (value) => {
//             setAmount(value);
//           },
//           setProjectId: (id) => {
//             setProjectId(id);
//           },
//           setNote: (note) => {
//             setNote(note);
//           },
//           setReferrerId: (ref) => {
//             setReferrerId(ref);
//           },
//           setCurrency: (cur) => {
//             setCurrency(cur);
//           },
//           totalAmount: (donations) => totalAmount(donations),
//         }}
//         key={key}
//       />
//     ))
//   );
// };

// const totalAmount = (donations) => {
//   if (!donations) return 0;
//   let totalDonationAmount = new Big(0);
//   for (const donation of donations) {
//     totalDonationAmount = totalDonationAmount.plus(new Big(donation.total_amount));
//   }
//   return props.nearToUsd
//     ? (props.nearToUsd * totalDonationAmount.div(1e24).toNumber()).toFixed(2)
//     : totalDonationAmount.div(1e24).toNumber().toFixed(2);
// };

// const sortHighestToLowest = (projects) => {
//   const sort = (a, b) => {
//     return parseFloat(b.total) - parseFloat(a.total);
//   };
//   const projectLength = projects.length;

//   for (let i = 0; i < projectLength - 1; i++) {
//     for (let j = 0; j < projectLength - 1 - i; j++) {
//       if (sort(projects[j], projects[j + 1]) > 0) {
//         const temp = projects[j];
//         projects[j] = projects[j + 1];
//         projects[j + 1] = temp;
//       }
//     }
//   }

//   setTotalProjects(projects);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };

// const sortLowestToHighest = (projects) => {
//   const sort = (a, b) => {
//     return parseFloat(b.total) - parseFloat(a.total);
//   };
//   const projectLength = projects.length;

//   for (let i = 0; i < projectLength - 1; i++) {
//     for (let j = 0; j < projectLength - 1 - i; j++) {
//       if (sort(projects[j], projects[j + 1]) < 0) {
//         const temp = projects[j];
//         projects[j] = projects[j + 1];
//         projects[j + 1] = temp;
//       }
//     }
//   }

//   setTotalProjects(projects);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };

// const sortNewToOld = (projects) => {
//   const projectLength = projects.length;

//   for (let i = 0; i < projectLength - 1; i++) {
//     for (let j = 0; j < projectLength - i - 1; j++) {
//       if (projects[j].submitted_ms < projects[j + 1].submitted_ms) {
//         const temp = projects[j];
//         projects[j] = projects[j + 1];
//         projects[j + 1] = temp;
//       }
//     }
//   }
//   setTotalProjects(projects);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };

// const sortOldToNew = (projects) => {
//   const projectLength = projects.length;

//   for (let i = 0; i < projectLength - 1; i++) {
//     for (let j = 0; j < projectLength - i - 1; j++) {
//       if (projects[j].submitted_ms > projects[j + 1].submitted_ms) {
//         const temp = projects[j];
//         projects[j] = projects[j + 1];
//         projects[j + 1] = temp;
//       }
//     }
//   }
//   setTotalProjects(projects);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };

// const searchByWordsPots = (projects, searchTerm) => {
//   let findId = [];
//   const dataArr = props.items;
//   const allData = [];
//   dataArr.forEach((item) => {
//     const data = props.itemsAll[item.id];
//     allData.push(data);
//     if (data) {
//       if (
//         data.pot_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         data.pot_name.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         findId.push(item.id);
//       }
//     }
//   });
//   let projectFilterBySearch = [];
//   dataArr.forEach((project) => {
//     findId.forEach((id) => {
//       if (project.id == id) {
//         projectFilterBySearch.push(project);
//       }
//     });
//   });
//   setTotalProjects(projectFilterBySearch);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };
// const searchByWordsPot = (projects, searchTerm) => {
//   let findId = [];
//   const dataArr = props.items;
//   let alldata = [];
//   dataArr.forEach((item) => {
//     const data = Social.getr(`${item.project_id}/profile`);
//     alldata.push(data);
//     if (data) {
//       if (
//         data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         data.name.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         findId.push(item.project_id);
//       }
//     }
//   });
//   let projectFilterBySearch = [];
//   dataArr.forEach((project) => {
//     const data = Social.getr(`${project.project_id}/profile`);
//     findId.forEach((id) => {
//       if (tagSelected.length > 0) {
//         if (data.category == tagSelected[0]) {
//           if (project.project_id == id) {
//             projectFilterBySearch.push(project);
//           }
//         }
//       } else {
//         if (project.project_id == id) {
//           projectFilterBySearch.push(project);
//         }
//       }
//     });
//   });

//   setTotalProjects(projectFilterBySearch);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };
// const searchByWords = (projects, searchTerm) => {
//   let findId = [];
//   const dataArr = props.items;
//   let alldata = [];
//   dataArr.forEach((item) => {
//     const data = Social.getr(`${item.id}/profile`);
//     alldata.push(data);
//     if (data) {
//       if (
//         data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         data.name.toLowerCase().includes(searchTerm.toLowerCase())
//       ) {
//         findId.push(item.id);
//       }
//     }
//   });
//   let projectFilterBySearch = [];
//   dataArr.forEach((project) => {
//     const data = Social.getr(`${project.id}/profile`);
//     findId.forEach((id) => {
//       if (tagSelected.length > 0) {
//         if (data.category == tagSelected[0]) {
//           if (project.id == id) {
//             projectFilterBySearch.push(project);
//           }
//         }
//       } else {
//         if (project.id == id) {
//           projectFilterBySearch.push(project);
//         }
//       }
//     });
//   });

//   setTotalProjects(projectFilterBySearch);
//   setDisplayProject([]);
//   setLastNumberOfProject(0);
// };

// useEffect(() => {
//   const newTotalProjects = [];
//   const promises = totalProjects.map((project) => {
//     return Near.asyncView(donationContractId, "get_donations_for_recipient", {
//       recipient_id: project.id,
//     }).then((res) => {
//       const total = totalAmount(res);
//       newTotalProjects.push({ ...project, total });
//     });
//   });
//   Promise.all(promises).then(() => {
//     setTotalProjects(newTotalProjects);
//   });
// }, []);

// const handleSortChange = (sortType) => {
//   switch (sortType) {
//     case "Newest to Oldest":
//       sortNewToOld(totalProjects);
//       break;
//     case "Oldest to Newest":
//       sortOldToNew(totalProjects);
//       break;
//     case "Most to Least Donations":
//       sortHighestToLowest(totalProjects);
//       break;
//     case "Least to Most Donations":
//       sortLowestToHighest(totalProjects);
//       break;
//   }
// };

const searchProjects = (searchTerm) => {
  // filter projects that match the search term (just id for now)
  const filteredProjects = allProjects.filter((project) => {
    const { id, status } = project;
    const searchFields = [id, status];
    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  return filteredProjects;
};

const sortProjects = (sortVal) => {
  if (sortVal === SORT_FILTERS.ALL) {
    return searchApplications(searchTerm);
  } else if (sortVal === SORT_FILTERS.NEW_TO_OLD) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => b.submitted_ms - a.submitted_ms);
    return sorted;
  } else if (sortVal === SORT_FILTERS.OLD_TO_NEW) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => a.submitted_ms - b.submitted_ms);
    return sorted;
  } else if (sortVal === SORT_FILTERS.MOST_TO_LEAST_DONATIONS) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => b.total - a.total);
    return sorted;
  } else if (sortVal === SORT_FILTERS.LEAST_TO_MOST_DONATIONS) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => a.total - b.total);
    return sorted;
  }
  return filtered;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  padding-top: 20px;
  // @media screen and (min-width: 740px) and (max-width: 1400px) {
  //   ${props.tab !== "pot" && "padding-top: 120px;"}
  // }
  @media screen and (max-width: 739px) {
    ${props.tab !== "pot" && "padding-top: 40px;"}
  }
`;

const ProjectList = styled.div`
  display: grid;
  gap: 31px;
  // For mobile devices (1 column)
  @media screen and (max-width: 739px) {
    grid-template-columns: repeat(1, 1fr);
  }

  // For tablet devices (2 columns)
  @media screen and (min-width: 740px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // For desktop devices (3 columns)
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(${!props.maxCols || props.maxCols > 2 ? "3" : "2"}, 1fr);
  }
  ${responsive.map(
    (view) =>
      `
    @media screen and (max-width: ${view.breakpoint}px) {
      grid-template-columns: repeat(${view.items}, 1fr);
    }
    `
  )}
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 1.12px;
  text-transform: uppercase;
`;

const TagsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: #292929;
`;

const Tag = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px -1px 0px 0px #c7c7c7 inset, 0px 0px 0px 0.5px #c7c7c7;
  border: 1px solid #c7c7c7;
  &:hover {
    background: #fef6ee;
  }
`;

const OnBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

// const elements = props.items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(props.renderItem);

return (
  <>
    {/* {tab != "pots" && tab != "pot" && (
      <Container>
        <Header>
          <Title>Featured projects</Title>
        </Header>

        <ProjectList>{featuredProjects.map(props.renderItem)}</ProjectList>
        <OnBottom></OnBottom>
      </Container>
    )} */}
    <Container style={{ paddingBottom: "32px" }}>
      {/* <Header>
        <Title>
          all {tab == "pots" ? "pots" : "projects"}
          <span style={{ color: "#DD3345", marginLeft: "8px", fontWeight: 600 }}>
            {props.items.length}
          </span>
        </Title>
        <Widget
          src={`${ownerId}/widget/Project.SearchBar`}
          props={{
            title: "Sort",
            tab: tab,
            numItems: filteredProjects.length,
            itemName: tab == "pots" ? "pot" : "project",
            sortList: Object.values(SORT_FILTERS),
            setSearchTerm: (value) => {
              const results = searchProjects(value);
              setFilteredProjects(results);
            },
            handleSortChange: (filter) => {
              const sorted = sortProjects(filter);
              handleSortChange(filter);
            },
          }}
        />
        {tab != "pots" && tab != "pot" && (
          <TagsWrapper>
            Tags:
            {tagsList.map((tag, key) => (
              <Tag
                key={key}
                onClick={() => handleTag(key)}
                className={`${
                  tag.selected && "gap-2 bg-[#FEF6EE]"
                } p-2 rounded border text-sm flex items-center  cursor-pointer`}
              >
                {tag.selected && (
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.86204 7.58116L1.08204 4.80117L0.135376 5.74116L3.86204 9.46783L11.862 1.46783L10.922 0.527832L3.86204 7.58116Z"
                      fill="#F4B37D"
                    ></path>
                  </svg>
                )}
                {tag.label}
              </Tag>
            ))}
          </TagsWrapper>
        )}
      </Header> */}
      <ProjectList>{items.map(props.renderItem)}</ProjectList>
      {/* <InfiniteScroll
        // loadMore={tab == "pots" || tab == "pot" ? loadPotProjects : loadProjects}
        loadMore={loadMore}
        hasMore={props.items.length > elements.length}
        // useWindow={false}
      >
        <ProjectList>{elements}</ProjectList>
      </InfiniteScroll> */}
    </Container>
  </>
);
