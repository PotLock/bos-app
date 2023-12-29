const { ownerId } = props;
const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 2px #dbdbdb solid;

  background: #fafafa;

  // For mobile devices and tablets
  @media screen and (max-width: 1023px) {
    padding: 48px 16px;
  }

  // For desktop devices
  @media screen and (min-width: 1024px) {
    padding: 48px 64px;
  }
`;

const List = styled.div`
  display: grid;
  gap: 20px;

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
    grid-template-columns: repeat(3, 1fr);
  }
`;

return (
  <Container style={props.containerStyle || {}}>
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: props.items, perPage: 9, renderItem, renderLayout: (p) => <List>{p}</List> }}
    />
    {/* <List style={props.listStyle || {}}>{props.items.map((item) => renderItem(item))}</List> */}
  </Container>
);
