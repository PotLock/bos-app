const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { profile } = props;
const { name, description, plPublicGoodReason } = profile;
const { getTeamMembersFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTeamMembersFromSocialProfileData: () => [],
};

const Container = styled.div`
  max-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Header = styled.div`
  color: #2e2e2e;
  font-size: 40px;
  font-weight: 500;
  font-family: "Lora";
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;

const GithubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  a {
    transition: all 300ms;
    display: flex;
    align-items: center;
    gap: 1rem;
    svg {
      transition: all 300ms;
    }
    .url {
      color: #292929;
      width: fit-content;
    }
    :hover {
      text-decoration: none;
      transform: translateX(4px);
      svg {
        rotate: 45deg;
      }
    }
  }
`;

const SmartContractWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .contract {
    display: flex;
    align-items: center;
    gap: 1rem;
    .text {
      display: flex;
      flex-direction: column;
      .chain {
        font-size: 14px;
        color: #7b7b7b;
      }
    }
    svg {
      cursor: pointer;
      height: 20px;
      transition: scale 200ms ease-in-out;
      :hover {
        scale: 1.1;
      }
      :focus {
        background: red;
      }
    }
  }
`;
const smartContracts = [
  ["0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82", "Ethereum (ETH)"],
  ["0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82", "Ethereum (ETH)"],
];
// profile.plSmartContracts
//   ? Object.entries(JSON.parse(profile.plSmartContracts)).reduce(
//       (accumulator, [chain, contracts]) => {
//         // Iterate over each contract address in the current chain
//         const contractsForChain = Object.keys(contracts).map((contractAddress) => {
//           return [chain, contractAddress]; // Create an array with the chain and contract address
//         });

//         return accumulator.concat(contractsForChain); // Add the arrays for this chain to the accumulator
//       },
//       []
//     )
//   : [];

const githubRepos = ["github.com/CCCLebanon", "github.com/CCCLebanon", "github.com/CCCLebanon"];
// profile.plGithubRepos ? JSON.parse(profile.plGithubRepos) : [];

const Github = () => (
  <GithubWrapper>
    {githubRepos.map((url) => (
      <a href={url} target="_blank">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 0.5V2.5H10.09L0.5 12.09L1.91 13.5L11.5 3.91V12.5H13.5V0.5H1.5Z"
            fill="#7B7B7B"
          />
        </svg>
        <div className="url">{url}</div>
      </a>
    ))}
  </GithubWrapper>
);

const SmartContracts = () => (
  <SmartContractWrapper>
    {smartContracts.map(([contract, chain]) => {
      return (
        <div className="contract">
          <Widget src={`${ownerId}/widget/Project.CopyIcon`} props={{ textToCopy: contract }} />
          <div className="text">
            <div className="address">{contract}</div>
            <div className="chain">{chain}</div>
          </div>
        </div>
      );
    })}
  </SmartContractWrapper>
);

const AboutItem = ({ title, text }) => (
  <Widget
    src={`${ownerId}/widget/Project.AboutItem`}
    props={{
      ...props,
      title,
      text,
    }}
  />
);

const Team = () => (
  <Widget
    src={`${ownerId}/widget/Project.Team`}
    props={{
      ...props,
      team: getTeamMembersFromSocialProfileData(props.profile),
    }}
  />
);

return (
  <Container>
    <HeaderContainer>
      <Header>About {name}</Header>
    </HeaderContainer>
    <AboutItem title="Overview" text={<Markdown text={description} />} />
    <AboutItem title="Why we are a public good" text={plPublicGoodReason || "None provided"} />
    <Team />
    <AboutItem title="Smart contracts" text={<Github />} />
    <AboutItem title="Github repo(s)" text={<SmartContracts />} />
  </Container>
);
