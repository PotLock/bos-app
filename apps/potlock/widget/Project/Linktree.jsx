const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";

const linktree = props.linktree;

if (!linktree) return "Loading...";

const LinktreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 0px 14px;
`;

const LinktreeItemContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const LinkText = styled.a`
  font-size: 14px;
  color: gray;
  font-weight: 400;
  margin-left: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    text-decoration: none;
  }
`;

const itemIconUrls = {
  github: IPFS_BASE_URL + "bafkreidyvuxajjhzfoqfl6jiyh43fusddutno5pntutugahfoimeqthy34",
  // "telegram": IPFS_BASE_URL +
  twitter: IPFS_BASE_URL + "bafkreiav6yefs6rk55hionalntoi6dea7dhser7qclwk7ld3ionh4hlecq",
  website: IPFS_BASE_URL + "bafkreihhrc7sylatspibzueuuxkooamw7zg4fhdpsubwokj63dwn2m46ba",
  NEAR: IPFS_BASE_URL + "bafkreigwnndzmhu3svhacqk3mvnqn7krghrix5wobbwzng5qdw5csy47bq",
};

const fullUrls = {
  twitter: (handle) => `https://twitter.com/${handle}`,
  github: (username) => `https://github.com/${username}`,
  website: (url) => url,
};

return (
  <LinktreeContainer>
    {Object.entries(linktree).map(([k, v], idx) => {
      return k in itemIconUrls ? (
        <LinktreeItemContainer>
          <Icon src={itemIconUrls[k]} />
          <LinkText
            disabled={!v}
            target="_blank"
            href={fullUrls[k](v)}
            onClick={(e) => {
              if (!v) {
                e.preventDefault();
              }
            }}
          >
            {k[0].toUpperCase() + k.slice(1)}
          </LinkText>
        </LinktreeItemContainer>
      ) : null;
    })}
    <LinktreeItemContainer>
      <Icon src={itemIconUrls.NEAR} />
      <LinkText
        target="_blank"
        href={`https://near.social/mob.near/widget/ProfilePage?accountId=${props.projectId}`}
      >
        NEAR
      </LinkText>
    </LinktreeItemContainer>
  </LinktreeContainer>
);
