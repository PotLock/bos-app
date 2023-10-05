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

const Wrapper = styled.div`
  --section-gap: 82px;
  padding-top: 100px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #00ec97;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: var(--section-gap);
    }
  `}
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  padding: var(--section-gap) 24px;
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

const Line = styled.div`
  --size: 10px;
  --radius: 80px;
  --color: #fff;
  --left: -45px;
  border: var(--size) solid var(--color);
  position: absolute;
  z-index: 10;
  pointer-events: none;

  ${(p) =>
    p.straightVertical &&
    `
    border: none;
    width: var(--size);
    background: var(--color);
  `}

  ${(p) =>
    p.straightHorizontal &&
    `
    border: none;
    height: var(--size);
    background: var(--color);
  `}

  @media (max-width: 1160px) {
    display: none !important;
  }
`;

const LineSpacer = styled.div`
  @media (max-width: 1160px) {
    display: none;
  }
`;

const TryItNow = styled.span`
  & > :nth-child(1) {
    display: inline-flex;
  }
  & > :nth-child(2) {
    display: none;
  }

  @media (max-width: 900px) {
    & > :nth-child(1) {
      display: none;
    }
    & > :nth-child(2) {
      display: inline-flex;
    }
  }
`;

return (
  <Wrapper>
    <Container center>
      <Flex gap="32px" direction="column" alignItems="center">
        <H1>🫕 PotLock</H1>

        <Text style={{ maxWidth: "670px" }}>
          Potlock is bringing public goods funding to the table in the NEAR
          Ecosystem. Quadratic funding on NEAR, find a funding round (a pot),
          KYC to support (I-Am-Human), & sign up your Horizon profile to be
          ellgible for funding.
        </Text>

        <TryItNow>
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "https://potlock.io",
              label: "Launch App",
              variant: "affirmative",
              size: "large",
            }}
          />
        </TryItNow>
      </Flex>

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
    </Container>

    <Widget src="potlock.near/widget/potlock.home.stats" />
    <Widget src="potlock.near/widget/potlock.projects.featured" />
    <Widget src="potlock.near/widget/potlock.footer.main" />
  </Wrapper>
);
