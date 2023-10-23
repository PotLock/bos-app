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

const imageHeightPx = 120;
const profileImageTranslateYPx = 220;

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        profile,
        profileImageTranslateYPx,
        containerStyle: {
          paddingLeft: "64px",
        },
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "280px",
        },
        imageStyle: {
          width: `${imageHeightPx}px`,
          height: `${imageHeightPx}px`,
        },
      }}
    />
    <div style={{ padding: `${profileImageTranslateYPx}px 68px` }}>
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
