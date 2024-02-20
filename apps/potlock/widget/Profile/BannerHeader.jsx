const { ownerId, accountId } = props;

if (!accountId) {
  return "No account ID";
}

const editable = props.bgImageOnChange && props.profileImageOnChange;

// console.log(props);

// const link =
//   props.link &&
//   (props.link === true
//     ? `https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`
//     : props.link);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = props.backgroundImage || profile.backgroundImage;
const profileImage = props.profileImage || image;
const imageStyle = props.imageStyle ?? {};
const backgroundStyle = props.backgroundStyle ?? {};
const containerStyle = props.containerStyle ?? {};

const Container = styled.div`
  padding-left: 64px;
  @media screen and (max-width: 768px) {
    padding-left: 16px;
    border-radius: 0;
  }
`;

const ProfileImageContainer = styled.div`
  transform: ${(props) => `translateY(${props.profileImageTranslateYPx || 240}px);`}
  width: ${props.imageStyle?.width ?? "80px"};
  height: ${props.imageStyle?.height ?? "80px"};

  img {
    width: ${props.imageStyle?.width ?? "80px"};
    height: ${props.imageStyle?.height ?? "80px"};

    @media screen and (max-width: 768px) {
      // width: 64px;
      // height: 64px;
      width: ${props.imageStyle?.width ?? "64px"};
      height: ${props.imageStyle?.height ?? "64px"};
    }
  }

  @media screen and (max-width: 768px) {
    // transform: translateY(248px);
    transform: ${(props) => `translateY(${props.profileImageTranslateYPxMobile || 248}px);`}

    width: 64px;
    height: 64px;
  }

  svg {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0; // Start with the image invisible
    transition: opacity 0.3s;
    z-index: 2; // Ensure the image is on top
    pointer-events: none;
  }

  ${
    editable &&
    `
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    border-radius: 50%;
    background-color: rgba(45.9, 45.9, 45.9, 0); // Start with transparent overlay
    transition: background-color 0.3s; // Smooth transition for the overlay
    pointer-events: none;

    @media screen and (max-width: 768px) {
      height: 64px;
    }

  }

  &:hover {
    cursor: pointer;

    &:after {
      background-color: rgba(45.9, 45.9, 45.9, 0.4); // Dark overlay with 40% opacity on hover
    }

    svg {
      opacity: 1; // Make the image visible on hover
    }
  }
  `
  }
`;

const backgroundStyleHeightPx = parseInt(backgroundStyle?.height?.replace("px", ""));

const BackgroundImageContainer = styled.div`
  svg {
    position: absolute;
    top: ${backgroundStyleHeightPx / 2}px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0; // Start with the image invisible
    transition: opacity 0.3s;
    z-index: 2; // Ensure the image is on top
    pointer-events: none;
  }

  ${editable &&
  `
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${backgroundStyle.height ?? "100%"};
    background-color: rgba(45.9, 45.9, 45.9, 0); // Start with transparent overlay
    transition: background-color 0.3s; // Smooth transition for the overlay
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;

    &:after {
      background-color: rgba(45.9, 45.9, 45.9, 0.4); // Dark overlay with 40% opacity on hover
    }

    svg {
      opacity: 1; // Make the image visible on hover
    }
  }
  `}
`;

const CameraSvg = ({ height }) => (
  <svg
    width={height}
    height={height}
    viewBox={`0 0 48 48`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_3178_2528"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={height}
      height={height}
    >
      <rect width={height} height={height} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3178_2528)">
      <path
        d="M5 40.35C4.2 40.35 3.5 40.05 2.9 39.45C2.3 38.85 2 38.15 2 37.35V11.7C2 10.9333 2.3 10.2417 2.9 9.625C3.5 9.00833 4.2 8.7 5 8.7H12.35L16 4.35H29.7V7.35H17.4L13.75 11.7H5V37.35H39V16.65H42V37.35C42 38.15 41.6917 38.85 41.075 39.45C40.4583 40.05 39.7667 40.35 39 40.35H5ZM39 11.65V7.35H34.7V4.35H39V0H42V4.35H46.35V7.35H42V11.65H39ZM21.975 33C24.3917 33 26.4167 32.1833 28.05 30.55C29.6833 28.9167 30.5 26.8917 30.5 24.475C30.5 22.0583 29.6833 20.0417 28.05 18.425C26.4167 16.8083 24.3917 16 21.975 16C19.5583 16 17.5417 16.8083 15.925 18.425C14.3083 20.0417 13.5 22.0583 13.5 24.475C13.5 26.8917 14.3083 28.9167 15.925 30.55C17.5417 32.1833 19.5583 33 21.975 33ZM21.975 30C20.3917 30 19.0833 29.475 18.05 28.425C17.0167 27.375 16.5 26.0583 16.5 24.475C16.5 22.8917 17.0167 21.5833 18.05 20.55C19.0833 19.5167 20.3917 19 21.975 19C23.5583 19 24.875 19.5167 25.925 20.55C26.975 21.5833 27.5 22.8917 27.5 24.475C27.5 26.0583 26.975 27.375 25.925 28.425C24.875 29.475 23.5583 30 21.975 30Z"
        fill="white"
      />
    </g>
  </svg>
);

return (
  <Container className="pt-0 position-relative" style={{ ...containerStyle }}>
    {backgroundImage && (
      <BackgroundImageContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: backgroundImage,
            alt: "profile background",
            className: "position-absolute w-100",
            style: { ...backgroundStyle, pointerEvents: "none" },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
          }}
        />
        <CameraSvg height={48} />
        {editable && (
          <Files
            multiple={false}
            accepts={["image/*"]}
            minFileSize={1}
            style={{
              zIndex: 4,
              width: "100%",
              height: backgroundStyle.height ?? "100%",
              position: "absolute",
            }}
            clickable
            onChange={props.bgImageOnChange}
          />
        )}
      </BackgroundImageContainer>
    )}
    <ProfileImageContainer
      class="profile-picture d-inline-block"
      profileImageTranslateYPx={props.profileImageTranslateYPx}
      profileImageTranslateYPxMobile={props.profileImageTranslateYPxMobile}
    >
      <CameraSvg height={24} />
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "100%",
          overflow: "hidden",
        }}
        clickable
        onChange={props.profileImageOnChange}
      >
        <Widget
          src={`${ownerId}/widget/Project.ProfileImage`}
          props={{
            profile,
            accountId,
            style: { ...imageStyle },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 img-thumbnail d-block",
            thumbnail: false,
            image: profileImage,
          }}
        />
      </Files>
    </ProfileImageContainer>
    {props.children && props.children}
  </Container>
);
