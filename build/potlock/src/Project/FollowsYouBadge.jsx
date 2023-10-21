// forked from mob.near/widget/FollowsYouBadge

if (!props.accountId || !context.accountId) {
  return "";
}

const o = Social.keys(`${props.accountId}/graph/follow/${context.accountId}`, undefined, {
  values_only: true,
});

return o && Object.keys(o).length ? (
  <span className="badge bg-secondary fw-light">Follows you</span>
) : (
  ""
);
