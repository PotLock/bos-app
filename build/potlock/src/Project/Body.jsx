const ownerId = "potlock.near";
const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";

const profile = props.profile;

if (!profile) return "Loading...";

const loraCss = fetch("https://fonts.cdnfonts.com/css/lora").body;

const tags = Object.keys(profile.tags ?? {});

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 48px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: #2e2e2e;
  line-height: 56px;
  font-family: "Lora";
  ${loraCss}
`;

const AccountId = styled.div`
  color: #7b7b7b;
  font-size: 16px;
  // font-family: Mona-Sans;
  font-weight: 400;
  margin-bottom: 32px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const Actions = () => (
  <Widget
    src={`${ownerId}/widget/Project.Actions`}
    props={{
      ...props,
    }}
  />
);

return (
  <BodyContainer>
    <div>
      <NameContainer>
        <Name>{profile.name}</Name>
        {props.projectId === context.accountId && (
          <Widget
            src={`${ownerId}/widget/Buttons.NavigationButton`}
            props={{
              type: "secondary",
              text: "Edit profile",
              disabled: false,
              href: `?tab=editproject&projectId=${props.projectId}`,
            }}
          />
        )}
      </NameContainer>
      <AccountId>@{props.projectId}</AccountId>
      <Widget
        src={`${ownerId}/widget/Project.Tags`}
        props={{
          ...props,
          tags,
        }}
      />
    </div>
    <Actions />
    <Widget
      src={`${ownerId}/widget/Project.About`}
      props={{
        ...props,
      }}
    />
  </BodyContainer>
);
