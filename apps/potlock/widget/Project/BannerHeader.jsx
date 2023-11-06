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
const imageStyle = props.imageStyle ?? {};
const backgroundStyle = props.backgroundStyle ?? {};
const containerStyle = props.containerStyle ?? {};

// const Wrapper = styled.div`
//   overflow: hidden;
//   margin: 0 -12px;
// `;

const Container = styled.div`
  padding-left: 64px;
  @media screen and (max-width: 768px) {
    padding-left: 16px;
  }
`;

const ImageContainer = styled.div`
  transform: ${(props) => `translateY(${props.profileImageTranslateYPx || 240}px);`}
    // translateY(240px);
  width: 80px;
  height: 80px;

  @media screen and (max-width: 768px) {
    // transform: translateY(248px);
    transform: ${(props) => `translateY(${props.profileImageTranslateYPx || 248}px);`}

    width: 64px;
    height: 64px;
  }
`;

return (
  <Container className="pt-0 position-relative" style={{ ...containerStyle }}>
    {backgroundImage && (
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: backgroundImage,
          alt: "profile background",
          className: "position-absolute w-100",
          style: { ...backgroundStyle },
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
    )}
    <ImageContainer
      className="profile-picture d-inline-block"
      profileImageTranslateYPx={props.profileImageTranslateYPx}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          style: { ...imageStyle },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
    </ImageContainer>
    {props.children && props.children}
  </Container>
);
