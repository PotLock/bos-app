const {
  profile: { name },
  ownerId,
  accountId,
  projectId,
} = props;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  margin-bottom: 66px;
  width: 100%;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 1rem;
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
`;

const AccountId = styled.div`
  font-size: 16px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 14px;
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

const projectLink = `https://near.social/potlock.near/widget/Index?tab=project&projectId=${projectId}${
  context.accountId && `&referrerId=${context.accountId}`
}`;
const profileLink = `https://near.social/potlock.near/widget/Index?tab=profile&accountId=${accountId}`;

return (
  <Header>
    <Container>
      <Info>
        <NameContainer>
          <Name>{name.length > 25 ? name.length.slice(0, 25).trim() + "..." : name}</Name>
          <AccountInfoContainer>
            <AccountId>
              @{" "}
              {(projectId || accountId).length > 15
                ? (projectId || accountId).length.slice(0, 15).trim() + "..."
                : projectId || accountId}
            </AccountId>
            <Widget
              src={`${ownerId}/widget/Project.Share`}
              props={{
                text: projectId ? projectLink : profileLink,
                clipboardIcon: ShareIcon,
              }}
            />
          </AccountInfoContainer>
          {canEdit && (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                text: "Edit profile",
                disabled: false,
                href: props.hrefWithParams(`?tab=editproject&projectId=${projectId}`),
              }}
            />
          )}
        </NameContainer>
        <Widget
          src={`${ownerId}/widget/Profile.Tags`}
          props={{
            ...props,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Profile.Linktree`}
          props={{
            ...props,
          }}
        />
      </Info>
      {projectId && (
        <Widget
          src={`${ownerId}/widget/Project.DonationsInfo`}
          props={{
            ...props,
            accountId: projectId || accountId,
          }}
        />
      )}
    </Container>
  </Header>
);
