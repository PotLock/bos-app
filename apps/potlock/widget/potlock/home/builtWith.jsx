const ipfsImages = {
  logos: {
    keypom: "bafkreidgfoxkyyszckuomnuvhiag3gruk7lhzzdkaimcht3n3jac4miknm ",
    human: "bafybeiblrwahdl6jwttddbidgtei6x35gcroqhafatlwiebq7e6sgmvrf4",
    horizon: "bafkreie6xou57yvzsuocvhxnfwkvivmfhcvmszdb7emf73yh4phpt2ousm",
    bos: "bafkreiepj2hdjywpjlo7zlbc6s2fadddipil3urkbqxwls6ejb4bbov254",
  },
};

const web3Teams = [
  {
    url: "https://keypom.xyz",
    name: "Keypom",
    ipfsImage: ipfsImages.logos.keypom,
  },
  {
    url: "https://i-am-human.app",
    name: "I Am Human",
    ipfsImage: ipfsImages.logos.human,
  },
  {
    url: "https://near.org/horizon",
    name: "Sweatcoin",
    ipfsImage: ipfsImages.logos.horizon,
  },
  {
    url: "https://near.org",
    name: "BOS",
    ipfsImage: ipfsImages.logos.bos,
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}
const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;
const LogoLinks = styled.div`
  display: flex;
  gap: 72px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  a {
    display: block;
    height: 24px;
    color: var(--sand10);

    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    a {
      height: 20px;
    }
  }
`;
return (
  <div>
    <Text
      size="14px"
      weight="600"
      style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
    >
      Built with NEAR's Best Tooling
    </Text>

    <LogoLinks>
      {web3Teams.map((team) => {
        return (
          <a href={team.url} target="_blank" title={team.name}>
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: returnIpfsImage(team.ipfsImage),
                alt: team.name,
              }}
            />
          </a>
        );
      })}
    </LogoLinks>
  </div>
);
