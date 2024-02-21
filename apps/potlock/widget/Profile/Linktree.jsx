const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";

const linktree = props.profile?.linktree;

if (!linktree) return "";

const LinktreeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding-right: 2rem;
`;

const LinktreeItemContainer = styled.a`
  display: flex;
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
  twitter: (handle) => `https://twitter.com/${handle.trim()}`,
  github: (username) => `https://github.com/${username.trim()}`,
  website: (url) => (url.includes("http") ? url : `https://${url.trim()}`),
};
return (
  <LinktreeContainer>
    {Object.entries(linktree).map(([k, v], idx) => {
      return k in itemIconUrls ? (
        <LinktreeItemContainer
          href={fullUrls[k](v)}
          disabled={!v}
          onClick={(e) => {
            if (!v) {
              e.preventDefault();
            }
          }}
          target="_blank"
        >
          <Icon src={itemIconUrls[k]} />
        </LinktreeItemContainer>
      ) : null;
    })}
    <LinktreeItemContainer
      target="_blank"
      href={`https://near.social/mob.near/widget/ProfilePage?accountId=${
        props.projectId || props.accountId
      }`}
    >
      <Icon src={itemIconUrls.NEAR} />
    </LinktreeItemContainer>
  </LinktreeContainer>
);
