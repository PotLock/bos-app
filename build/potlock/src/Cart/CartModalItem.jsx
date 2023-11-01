const profile = Social.getr(`${props.projectId}/profile`);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const TRASH_ICON_URL =
  IPFS_BASE_URL + "bafkreicwtubzlywmtvoxc4tqjfturyi5oqxtbpezceosiw3juv2d4uf7om";

const TrashContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;

const TrashIcon = styled.img`
  //   width: 100%;
  //   height: 100%;
  width: 20px;
  height: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  border-bottom: 1px #dbdbdb solid;

  &:hover ${TrashContainer} {
    opacity: 1;
  }
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Text = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  max-width: 270px;
`;

const MAX_DESCRIPTION_LENGTH = 120;

if (!profile) return "";

return (
  <ItemContainer>
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        accountId: props.projectId,
        style: {
          width: "40px",
          height: "40px",
          border: "none",
          marginRight: "24px",
        },
        className: "mb-2",
        imageClassName: "rounded-circle w-100 h-100 d-block",
        thumbnail: false,
      }}
    />
    <ProjectDetails>
      <Text style={{ fontWeight: 600 }}>{profile.name}</Text>
      <Text>
        {profile.description.length > MAX_DESCRIPTION_LENGTH
          ? profile.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          : profile.description}
      </Text>
      <TrashContainer onClick={() => props.removeProjectsFromCart([props.projectId])}>
        <TrashIcon src={TRASH_ICON_URL} />
      </TrashContainer>
    </ProjectDetails>
  </ItemContainer>
);
