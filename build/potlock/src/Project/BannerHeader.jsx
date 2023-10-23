const accountId = props.projectId;
if (!accountId) {
  return "No account ID";
}

const link =
  props.link &&
  (props.link === true
    ? `https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`
    : props.link);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 -12px;
`;

console.log("props.backgroundStyle: ", props.backgroundStyle);
return (
  <div className="px-4 pt-0 position-relative">
    {backgroundImage && (
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: backgroundImage,
          alt: "profile background",
          className: "position-absolute w-100",
          style: { ...(props.backgroundStyle ?? {}) },
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
    )}
    <div className="profile-picture d-inline-block" style={{ transform: "translateY(168px)" }}>
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          style: { ...(props.imageStyle ?? {}) },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
    </div>
  </div>
);
