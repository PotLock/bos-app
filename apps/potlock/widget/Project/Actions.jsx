const ownerId = "potlock.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between';
  width: 100%;
`;

const SubRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

return (
  <Container className="gx-0">
    <SubRow className="col-4"></SubRow>
    <SubRow className="col-8" style={{ justifyContent: "flex-end" }}>
      <Widget
        src={`${ownerId}/widget/Project.FollowStats`}
        props={{ accountId: props.projectId }}
      />
      <Widget
        src={`${ownerId}/widget/Project.FollowButton`}
        props={{ accountId: props.projectId }}
      />
    </SubRow>
  </Container>
);
