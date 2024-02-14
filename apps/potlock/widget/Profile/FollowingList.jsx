const accountId = props.accountId;

if (!accountId) {
  return "";
}

let following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (following === null) {
  return "Loading";
}

following = Object.entries(following[accountId].graph.follow || {});
following.sort((a, b) => b[1] - a[1]);

return (
  <>
    {following.map(([accountId], i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />
        </div>
        <div>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId, tab: nav }} />
        </div>
      </div>
    ))}
  </>
);
