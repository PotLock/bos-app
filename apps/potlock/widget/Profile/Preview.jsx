const accountId = props.accountId ?? context.accountId;
const ownerId = props.ownerId;
const profile = Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

return (
  <div className="profile d-inline-block">
    <a
      href={props.hrefWithParams(`?tab=profile&accountId=${accountId}`)}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="profile-name text-truncate">{name || "No-name profile"}</div>
        <div className="profile-links d-flex">
          <div className="d-inline-block profile-account text-secondary text-truncate">
            @{accountId}
          </div>
        </div>
      </div>
    </a>
  </div>
);
