console.log("props in Socials: ", props);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";

const linktree = props.linktree;

if (!linktree) return "Loading...";

const LinktreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
`;

const LinktreeItemContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  // background-color: yellow;
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

  &:hover {
    text-decoration: none;
  }
`;

const itemIconUrls = {
  github: IPFS_BASE_URL + "bafkreiankcn5awmw3b5ghhhebrmxahf2bdvrsd4i74rw7s4x4ye5djpyxu",
  // "telegram": IPFS_BASE_URL +
  twitter: IPFS_BASE_URL + "bafkreiabmokq5rsnb2nehzdktmiw57esvwz7i4baggpxyg2kg3x5quachu",
  website: IPFS_BASE_URL + "bafkreibr5xstjlyyjicgz3epxv5soa7fzhu72qvukp7dpld75uwnvtbveq",
  NEAR: IPFS_BASE_URL + "bafkreigogi7iyonbdjsxi3n6seplll7at6e4jsrxwpgke5b5uk5obxkdpe",
};

return (
  <LinktreeContainer>
    {Object.entries(linktree).map(([k, v], idx) => {
      return k in itemIconUrls ? (
        <LinktreeItemContainer>
          <Icon src={itemIconUrls[k]} />
          <LinkText
            target="_blank"
            href={`https://www.google.com`} // TODO: UPDATE THIS
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
        href={`https://www.google.com`} // TODO: UPDATE THIS
      >
        NEAR
      </LinkText>
    </LinktreeItemContainer>
  </LinktreeContainer>
);
