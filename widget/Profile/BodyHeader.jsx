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
  flex-wrap: wrap;
  gap: 2rem;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

const NameContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: end;
  gap: 1rem;
`;

const Name = styled.div`
  font-size: 40px;
  font-weight: 500;
  color: #2e2e2e;
  line-height: 1;
  font-family: "Lora";

  @media screen and (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

const AccountInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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

return (
  <Header>
    <Container>
      <Info>
        <NameContainer>
          <Name>{name.length > 25 ? name.slice(0, 25).trim() + "..." : name}</Name>
          <AccountInfoContainer>
            <AccountId>
              @{" "}
              {(projectId || accountId).length > 15
                ? (projectId || accountId).slice(0, 15).trim() + "..."
                : projectId || accountId}
            </AccountId>
            <Widget
              src={`${ownerId}/widget/Project.CopyIcon`}
              props={{
                textToCopy: projectId ? projectId : accountId,
                customStyle: `height: 18px;`,
              }}
            />
          </AccountInfoContainer>
          {canEdit && (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                text: "Edit profile",
                style: { marginLeft: "auto" },
                disabled: false,
                href: props.hrefWithParams(`?tab=editproject&projectId=${projectId}`),
              }}
            />
          )}
          {accountId === context.accountId && !projectId && (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                style: { marginLeft: "auto" },
                text: "Edit profile",
                disabled: false,
                href: props.hrefWithParams(`?tab=editprofile`),
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
