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

const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};

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

const Grid = styled.div`
  display: grid;
  gap: 31px;
  align-items: stretch;

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

return (
  <>
    <Container style={{ paddingBottom: "32px" }}>
      <Feed items={items} Item={props.renderItem} Layout={Grid} perPage={9} />
    </Container>
  </>
);
