const ownerId = "potlock.near";

const profile = props.profile ?? Social.getr(`${props.projectId}/profile`);

if (profile === null) {
  return "Loading";
}

console.log("profile in detail: ", profile);

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        profile,
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
        },
        imageStyle: {
          width: "10rem",
          height: "10rem",
        },
      }}
    />
    <div style={{ padding: "68px" }}>
      <div class="row align-items-start">
        <div class="col-3">
          <Widget
            src={`${ownerId}/widget/Project.NavOptions`}
            props={{
              ...props,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Project.Linktree`}
            props={{
              ...props,
              linktree: profile.linktree,
            }}
          />
        </div>
        <div class="col-9">
          <Widget
            src={`${ownerId}/widget/Project.Body`}
            props={{
              ...props,
              profile,
            }}
          />
        </div>
      </div>
    </div>
  </Wrapper>
);
