const { items, shouldShuffle } = props;

const { Feed } = VM.require("devs.near/widget/Feed") ?? {
  Feed: () => <></>,
};

if (shouldShuffle) {
  items = [...items].sort(() => Math.random() - 0.5);
}

const PAGE_SIZE = 9;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  padding-top: 20px;
`;

const Layout = styled.div`
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
    grid-template-columns: repeat(
      ${!props.maxCols || props.maxCols > 2 ? "3" : "2"},
      1fr
    );
  }
`;

return (
  <Container style={{ paddingBottom: "32px" }}>
    <Feed
      items={items}
      Item={(p) => props.renderItem(p)}
      Layout={Layout}
      perPage={PAGE_SIZE}
    />
  </Container>
);
