const profile = Social.getr(`${props.projectId}/profile`);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const TRASH_ICON_URL =
//   IPFS_BASE_URL + "bafkreifuvrxly3wuy4xdmavmdeb2o47nv6pzxwz3xmy6zvkxv76e55lj3y";

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
  cursor: pointer;
`;

const TrashIcon = styled.svg`
  width: 20px;
  height: 20px;
  path {
    transition: 300ms;
  }
  :hover path {
    fill: #dd3345;
  }
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
        <TrashIcon viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 14C2.0875 14 1.73437 13.8531 1.44062 13.5594C1.14687 13.2656 1 12.9125 1 12.5V2.5H0V1H4V0H8V1H12V2.5H11V12.491C11 12.9137 10.8531 13.2708 10.5594 13.5625C10.2656 13.8542 9.9125 14 9.5 14H2.5ZM9.5 2.5H2.5V12.5H9.5V2.5ZM4 11H5.5V4H4V11ZM6.5 11H8V4H6.5V11Z"
            fill="#7B7B7B"
          />
        </TrashIcon>
      </TrashContainer>
    </ProjectDetails>
  </ItemContainer>
);
