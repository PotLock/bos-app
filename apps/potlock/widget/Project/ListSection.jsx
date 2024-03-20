const { tab, shouldShuffle } = props;
const responsive = props.responsive || [];

const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};

const items = useMemo(() => {
  if (shouldShuffle) {
    return [...props.items].sort(() => Math.random() - 0.5);
  }
  return props.items;
}, [props.items, shouldShuffle]);

const PAGE_SIZE = 9;

const Grid = styled.div`
  display: grid;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 32px;

  gap: 31px;

  // For mobile devices (1 column)
  @media screen and (max-width: 739px) {
    grid-template-columns: repeat(1, 1fr);
    ${props.tab !== "pot" && "padding-top: 40px;"}
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

return <Feed items={items} Item={props.renderItem} Layout={Grid} perPage={PAGE_SIZE} />;
