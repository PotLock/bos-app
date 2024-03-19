const {
  potDetail,
  setApplicationModalOpen,
  potId,
  handleApplyToPot,
  sybilRequirementMet,
  applicationSuccess,
  registrationApproved,
  registryStatus,
  hrefWithParams,
  nav,
} = props;

const {
  admins,
  chef,
  owner,
  pot_name,
  pot_description,
  matching_pool_balance,
  public_round_end_ms,
  public_round_start_ms,
  application_start_ms,
  application_end_ms,
} = potDetail;

const [isMatchingPoolModalOpen, setIsMatchingPoolModalOpen] = useState(false);

const NADABOT_ICON_URL =
  IPFS_BASE_URL + "bafkreib2iag425b6dktehxlrshchyp2pccg5r6ea2blrnzppqia77kzdbe";

const projectNotRegistered = registryStatus === null;
const userIsAdminOrGreater = admins.includes(context.accountId) || owner === context.accountId;
const userIsChefOrGreater = userIsAdminOrGreater || chef === context.accountId;

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getApplicationByProjectId: () => {},
};

const existingApplication = PotSDK.getApplicationByProjectId(potId, context.accountId);

const applicationExists = existingApplication || applicationSuccess;

const now = Date.now();
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;
console.log(potDetail);

const applicationOpen = now >= application_start_ms && now < application_end_ms;

const canApply = applicationOpen && !applicationExists && !userIsChefOrGreater;

const { ownerId, NADA_BOT_URL } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADA_BOT_URL: "",
};
const { yoctosToNear, yoctosToUsdWithFallback } = VM.require("potlock.near/widget/utils") || {
  yoctosToNear: () => "",
  yoctosToUsdWithFallback: () => "",
};

const potLink = `https://bos.potlock.io/?tab=pot&potId=${potId}${
  context.accountId && `&referrerId=${context.accountId}`
}`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 64px 4rem 80px;
  .pool-table {
    max-width: 514px;
    width: 100%;
  }
  @media only screen and (max-width: 1068px) {
    flex-direction: column;
    .pool-table {
      margin: auto;
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 3rem;

    .pool-table {
      max-width: 100%;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
  font-family: "Lora";
`;
const Description = styled.div`
  max-width: 498px;
  line-height: 1.5em;
  a {
    color: #7b7b7b;
    font-weight: 600;
  }
`;

const Fund = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    display: flex;
    gap: 8px;
    align-items: baseline;
    div {
      font-weight: 600;
    }
  }
  .near-price {
    font-size: 24px;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  a,
  button {
    width: 180px;
    padding: 16px;
  }
`;
const Referral = styled.div`
  font-size: 14px;
  gap: 12px;
  display: flex;
  align-items: center;
`;
return (
  <Container>
    <Header>
      <Title>{pot_name}</Title>
      <Description>
        <Markdown text={pot_description} />
      </Description>
      <Fund>
        <div className="label">Matching Funds Available</div>
        <div>
          <div className="near-price">{yoctosToNear(matching_pool_balance, true)}</div>
          <div lassName="usd-price"> {yoctosToUsdWithFallback(matching_pool_balance, true)}</div>
        </div>
      </Fund>
      <ButtonsWrapper>
        {publicRoundOpen && nav !== "projects" && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: sybilRequirementMet ? "Donate" : "Verify to Donate",
              href: sybilRequirementMet
                ? hrefWithParams(`?tab=pot&potId=${potId}&nav=projects`)
                : NADA_BOT_URL,
              target: sybilRequirementMet ? "_self" : "_blank",
              iconSrc: sybilRequirementMet ? null : NADABOT_ICON_URL,
            }}
          />
        )}
        {now < public_round_end_ms && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              text: "Fund matching pool",
              onClick: () => setIsMatchingPoolModalOpen(true),
            }}
          />
        )}
        {!projectNotRegistered && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              // text: registryRequirementMet ? "Apply to pot" : "Register to Apply",
              text: !registrationApproved
                ? "Apply to pot"
                : `Project Registration ${registryStatus}`,
              // onClick: registryRequirementMet ? handleApplyToPot : null, // TODO: ADD BACK IN
              onClick: handleApplyToPot,
              style: { marginRight: "24px" },
            }}
          />
        )}
      </ButtonsWrapper>
      <Referral>
        <Widget
          src={`${ownerId}/widget/Project.CopyIcon`}
          props={{
            textToCopy: potLink,
          }}
        />
        Earn referral fees
      </Referral>
    </Header>
    <div className="pool-table">
      <Widget src={`${ownerId}/widget/Pots.PoolAllocationTable`} props={props} />
    </div>
    <Widget
      src={`${ownerId}/widget/Pots.FundModal`}
      props={{
        ...props,
        isMatchingPoolModalOpen,
        onClose: () => setIsMatchingPoolModalOpen(false),
      }}
    />
  </Container>
);
