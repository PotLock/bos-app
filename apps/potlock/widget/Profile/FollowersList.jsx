const { accountId, nav, ownerId } = props;
if (!accountId) {
  return "";
}

const url = nav === "followers" ? `*/graph/follow/${accountId}` : `${accountId}/graph/follow/*`;

let followers = Social.keys(url, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading";
}
if (nav === "followers") {
  followers = Object.entries(followers || {});
  followers.sort((a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]);
} else {
  followers = Object.entries(followers[accountId].graph.follow || {});
  followers.sort((a, b) => b[1] - a[1]);
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .profile-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .btn-primary {
    background-color: #dd3345;
    border: none;
    transition: all 300ms;
    :hover {
      opacity: 0.8;
    }
  }
`;

return (
  <Container>
    {followers.map(([accountId], i) => (
      <div className="profile-row" key={i}>
        <div className="me-4">
          <Widget src={`${ownerId}/widget/Profile.Preview`} props={{ ...props, accountId }} />
        </div>
        <div>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </Container>
);
