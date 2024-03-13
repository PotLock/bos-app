const projectId = props.projectId;
const accountId = projectId || props.accountId;

if (!accountId) {
  return "";
}

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following ? Object.keys(following[accountId].graph.follow || {}).length : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

const profileLink = props.hrefWithParams(
  `?tab=${projectId ? "project" : "profile"}&${projectId ? "projectId" : "accountId"}=${
    projectId || accountId
  }`
);

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 2rem;
  a {
    gap: 8px;
    display: flex;
  }
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

return (
  <Container>
    <div>
      <a href={`${profileLink}&nav=followers`} className="text-dark">
        {numFollowers !== null ? <span style={{ fontWeight: 600 }}>{numFollowers}</span> : "-"}

        <span>Follower{numFollowers !== 1 && "s"}</span>
      </a>
    </div>
    <div className="me-4">
      <a href={`${profileLink}&nav=following`} className="text-dark">
        {numFollowing !== null ? <span style={{ fontWeight: 600 }}>{numFollowing}</span> : "-"}

        <span>Following</span>
      </a>
    </div>
  </Container>
);
