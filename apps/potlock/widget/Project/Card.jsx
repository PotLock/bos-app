const ownerId = "potlock.near";

const Card = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30%;
  border-radius: 7px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

// const Banner = styled.div`
//   position: relative;
//   width: 100%;
//   height: 168;
//   margin-bottom: 30px;
// `;

// const BannerImage = styled.img`
//   width: 100%;
//   height: 100%;
//   //   border-radius: 6px;
// `;

// const ProfileImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   border: 3px solid white;
//   position: absolute;
//   bottom: -20px;
//   left: 60px;
// `;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  padding: 16px 24px;
  gap: 16px;
`;

const ProjectName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  font-family: mona-sans;
  color: #2e2e2e;
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
  color: #2e2e2e;
`;

const { id, bannerImageUrl, profileImageUrl, name, description, tags } = props.project;

return (
  <Card href={`?tab=project&projectId=${id}`} key={id}>
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        projectId: id,
        profile,
        profileImageTranslateYPx: 168,
        containerStyle: {
          paddingLeft: "16px",
        },
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "168px",
          borderRadius: "6px 6px 0px 0px",
        },
        imageStyle: {
          width: "40px",
          height: "40px",
          position: "absolute",
          bottom: "-10px",
          left: "14px",
        },
      }}
    />
    <Info>
      <ProjectName>{name}</ProjectName>
      <ProjectDescription>{description}</ProjectDescription>
      <Widget
        src={`${ownerId}/widget/Project.Tags`}
        props={{
          ...props,
          tags,
        }}
      />
    </Info>
  </Card>
);
