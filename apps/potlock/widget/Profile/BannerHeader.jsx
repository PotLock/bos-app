const { ShowFollowers, project, projectId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "No account ID";
}

const editable = props.bgImageOnChange && props.profileImageOnChange;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

// Loading Skeleton
const loadingSkeleton = styled.keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  animation-name: ${loadingSkeleton};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const LoadingBackground = styled.div`
  position: relative;
  background: #eee;
  width: 100%;
  height: 318px;
  @media screen and (max-width: 768px) {
    height: 264px;
  }
`;
const LoadingProfileImg = styled.div`
  width: ${props.imageStyle?.width ?? "128px"};
  height: ${props.imageStyle?.height ?? "128px"};
  z-index: 1;
  padding: 6px;
  transform: translateY(-50%);
  position: relative;
  margin-left: 4rem;
  background: white;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    margin-left: 1rem;
  }
  div {
    background: #eee;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const BannerSkeleton = () => (
  <SkeletonContainer>
    <LoadingBackground />
    <LoadingProfileImg>
      <div />
    </LoadingProfileImg>
  </SkeletonContainer>
);
if (profile === null) {
  return <Widget src={`${ownerId}/widget/Profile.BannerSkeleton`} />;
}

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = props.backgroundImage || profile.backgroundImage;
const profileImage = props.profileImage || image;
const imageStyle = props.imageStyle ?? {};
const backgroundStyle = props.backgroundStyle ?? {};
const containerStyle = props.containerStyle ?? {};

const isVerified = projectId
  ? project.status === "Approved"
  : Near.view("v1.nadabot.near", "is_human", {
      account_id: accountId,
    });

const Container = styled.div``;

const ProfileWraper = styled.div`
  display: flex;
  padding-left: 4rem;
  align-items: end;
  transform: translateY(-50%);
  position: relative;
  z-index: 6;
  @media screen and (max-width: 768px) {
    padding-left: 1rem;
  }
`;

const ProfileStats = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transform: translate(-25px, -20px);
  @media screen and (max-width: 768px) {
    transform: translate(-25px, 0px);
    gap: 10px;
  }
`;
const Verified = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: 11px;
  letter-spacing: 0.88px;
  gap: 4px;
  overflow: hidden;
  ${!isVerified
    ? `
    width: 10px;
    opacity: 0;
    `
    : ""}
  div {
    font-weight: 600;
    color: #0e615e;
  }
  svg {
    background: white;
    border-radius: 50%;
  }
  @media screen and (max-width: 768px) {
    div {
      display: none;
    }
  }
`;

const ProfileImageContainer = styled.div`
  width: ${props.imageStyle?.width ?? "128px"};
  height: ${props.imageStyle?.height ?? "128px"};
  background: white;
  border-radius: 50%;
  padding: 6px;
  position: relative;
  .profile-image {
    height: 100%;
    width: 100%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  > svg {
    position: absolute;
    top: 50%;
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
    height: 100%;
    width:100%;
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
  `}
  @media screen and (max-width: 768px) {
    width: 72px;
    height: 72px;
  }
`;

const BackgroundImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 318px;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 264px;
  }
  svg {
    position: absolute;
    top: 50%;
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
    <BackgroundImageContainer>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: backgroundImage,
          alt: "profile background",
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
            top: 0,
            width: "100%",
            height: backgroundStyle.height ?? "100%",
            position: "absolute",
          }}
          clickable
          onChange={props.bgImageOnChange}
        />
      )}
    </BackgroundImageContainer>
    <ProfileWraper>
      <ProfileImageContainer>
        <CameraSvg height={24} />
        <Widget
          src={`${ownerId}/widget/Project.ProfileImage`}
          props={{
            profile,
            accountId,
            style: { ...imageStyle },
            imageClassName: "rounded-circle",
            thumbnail: false,
            image: profileImage,
          }}
        />

        {editable && (
          <Files
            multiple={false}
            accepts={["image/*"]}
            minFileSize={1}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
            clickable
            onChange={props.profileImageOnChange}
          ></Files>
        )}
      </ProfileImageContainer>
      {ShowFollowers && (
        <ProfileStats>
          <Verified>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9354 2.94366C12.5353 2.45498 11.788 2.45498 11.3879 2.94366L10.598 3.90853C10.326 4.24068 9.87244 4.36222 9.47086 4.21054L8.3043 3.76991C7.71347 3.54675 7.06627 3.92041 6.96412 4.54367L6.76243 5.77425C6.693 6.19787 6.36095 6.52991 5.93734 6.59934L4.70675 6.80103C4.08349 6.90319 3.70984 7.55038 3.933 8.14121L4.37362 9.30778C4.5253 9.70935 4.40377 10.1629 4.07162 10.4349L3.10675 11.2248C2.61806 11.6249 2.61806 12.3722 3.10675 12.7723L4.07162 13.5623C4.40377 13.8342 4.5253 14.2878 4.37362 14.6894L3.933 15.856C3.70984 16.4468 4.08349 17.094 4.70675 17.1961L5.93734 17.3978C6.36095 17.4673 6.693 17.7993 6.76243 18.2229L6.96412 19.4535C7.06627 20.0768 7.71346 20.4504 8.3043 20.2273L9.47086 19.7866C9.87244 19.635 10.326 19.7565 10.598 20.0886L11.3879 21.0535C11.788 21.5422 12.5353 21.5422 12.9354 21.0535L13.7254 20.0886C13.9973 19.7565 14.4509 19.635 14.8525 19.7866L16.019 20.2273C16.6099 20.4504 17.2571 20.0768 17.3592 19.4535L17.5609 18.2229C17.6303 17.7993 17.9624 17.4673 18.386 17.3978L19.6166 17.1961C20.2399 17.094 20.6135 16.4468 20.3903 15.856L19.9497 14.6894C19.798 14.2878 19.9196 13.8342 20.2517 13.5623L21.2166 12.7723C21.7053 12.3722 21.7053 11.6249 21.2166 11.2248L20.2517 10.4349C19.9196 10.1629 19.798 9.70935 19.9497 9.30778L20.3903 8.14121C20.6135 7.55038 20.2399 6.90319 19.6166 6.80103L18.386 6.59934C17.9624 6.52991 17.6303 6.19787 17.5609 5.77425L17.3592 4.54367C17.2571 3.92041 16.6099 3.54675 16.019 3.76991L14.8525 4.21054C14.4509 4.36222 13.9973 4.24068 13.7254 3.90853L12.9354 2.94366ZM15.6549 9.49597C15.4584 9.30185 15.1418 9.30366 14.9476 9.50002L11.0784 13.412L9.41138 11.5375C9.22787 11.3311 8.91183 11.3126 8.70548 11.4961C8.49913 11.6796 8.48062 11.9957 8.66413 12.202L11.0377 14.871L12.059 13.8497L15.6592 10.2032C15.8533 10.0067 15.8513 9.6901 15.6549 9.49597Z"
                fill="#0DBFAF"
              />
            </svg>
            <div> VERIFIED</div>
          </Verified>
          <Widget
            src={`${ownerId}/widget/Profile.FollowStats`}
            props={{ ...props, accountId: projectId || accountId }}
          />
        </ProfileStats>
      )}
    </ProfileWraper>
    {props.children && props.children}
  </Container>
);
