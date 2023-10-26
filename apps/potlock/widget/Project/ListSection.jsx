const ownerId = "potlock.near";
const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px 64px;
  gap: 40px;
  width: 100%;
  border-top: 2px #dbdbdb solid;
  background: #fafafa;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 40px;
  margin: -12px; /* Half of the margin you're giving to the children */

  & > div {
    margin: 12px; /* Add horizontal and vertical margins */

    @media screen and (max-width: 768px) {
      width: calc(100% - 24px); /* Subtract double the margin */
    }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      width: calc(49% - 24px); /* Subtract double the margin */
    }

    @media screen and (min-width: 1424px) {
      width: calc(32% - 24px); /* Subtract double the margin */
    }
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

return (
  <Container>
    <List>{props.projects.map((project) => renderItem(project))}</List>
  </Container>
);
