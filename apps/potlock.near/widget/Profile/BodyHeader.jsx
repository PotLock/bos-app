const { profile, accountId, projectId } = props;

const { href } = VM.require("${config/account}/widget/utils") || {
  href: () => {},
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  width: 100%;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const AccountId = styled.div`
  color: #7b7b7b;
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const ShareIconContainer = styled.img`
  width: 24px;
  height: 24px;

  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const ShareIcon = (
  <ShareIconContainer
    src="https://ipfs.near.social/ipfs/bafkreia3xywhwwxloqjo7622r623u32vmhdxa2at6ecvd2ityga6c2rcgm"
    alt="share-icon"
  />
);

const policy = Near.view(props.projectId, "get_policy", {});
const isDao = !!policy;

const userHasPermissions = useMemo(() => {
  if (!policy) return false;
  // TODO: break this out (NB: duplicated in Project.CreateForm)
  const userRoles = policy.roles.filter((role) => {
    if (role.kind === "Everyone") return true;
    return role.kind.Group && role.kind.Group.includes(context.accountId);
  });
  const kind = "call";
  const action = "AddProposal";
  // Check if the user is allowed to perform the action
  const allowed = userRoles.some(({ permissions }) => {
    return (
      permissions.includes(`${kind}:${action}`) ||
      permissions.includes(`${kind}:*`) ||
      permissions.includes(`*:${action}`) ||
      permissions.includes("*:*")
    );
  });
  return allowed;
}, [policy]);

const isOwner = projectId === context.accountId;
const isPermissionedMember = isDao && userHasPermissions;
const canEdit = isOwner || isPermissionedMember;

const projectLink = `https://near.social/${config/account}/widget/Index?tab=project&projectId=${projectId}${
  context.accountId && `&referrerId=${context.accountId}`
}`;
const profileLink = `https://near.social/${config/account}/widget/Index?tab=profile&accountId=${accountId}`;

return (
  <Header>
    <NameContainer>
      <Name>{profile.name}</Name>
      {canEdit && (
        <Widget
          src={"${config/account}/widget/Components.Button"}
          props={{
            type: "secondary",
            text: "Edit profile",
            disabled: false,
            href: href({ params: { tab: "editproject", projectId: projectId, referralId: props.referralId, env: props.env}})
          }}
        />
      )}
    </NameContainer>
    <AccountInfoContainer>
      <AccountId>@{projectId || accountId}</AccountId>
      <Widget
        src={"${config/account}/widget/Project.Share"}
        props={{
          text: projectId ? projectLink : profileLink,
          clipboardIcon: ShareIcon,
        }}
      />
    </AccountInfoContainer>
    <Widget
      src={"${config/account}/widget/Profile.Tags"}
      props={{
        ...props,
      }}
    />
    <Widget
      src={"${config/account}/widget/Project.Actions"}
      props={{
        ...props,
      }}
    />
  </Header>
);
