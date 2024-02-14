const { accountId, tab, ownerId } = props;
if (!accountId) {
  return "";
}

const url = tab === "followers" ? `*/graph/follow/${accountId}` : `${accountId}/graph/follow/*`;

console.log(tab);

let followers = Social.keys(url, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading";
}
if (tab === "followers") {
  followers = Object.entries(followers || {});
  followers.sort((a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]);
} else {
  followers = Object.entries(followers[accountId].graph.follow || {});
  followers.sort((a, b) => b[1] - a[1]);
}

return (
  <>
    {followers.map(([accountId], i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src={`${ownerId}/widget/Profile.Preview`} props={{ ...props, accountId }} />
        </div>
        <div>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
