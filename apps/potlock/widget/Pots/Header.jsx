const {
  potDetail,
  setApplicationModalOpen,
  potId,
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
  registry_provider,
  matching_pool_balance,
  public_round_end_ms,
  public_round_start_ms,
  application_start_ms,
  application_end_ms,
  cooldown_end_ms,
} = potDetail;

const [isMatchingPoolModalOpen, setIsMatchingPoolModalOpen] = useState(false);
const [showChallengePayoutsModal, setShowChallengePayoutsModal] = useState(false);

const { IPFS_BASE_URL } = VM.require("potlock.near/widget/constants") || {
  IPFS_BASE_URL: "",
};

const NADABOT_ICON_URL =
  IPFS_BASE_URL + "bafkreiecgkoybmplo4o542fphclxrhh4nlof5uit3lkzyv4eo2qymrpsru";

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
const { yoctosToNear, yoctosToUsdWithFallback, nearToUsd } = VM.require(
  "potlock.near/widget/utils"
) || {
  yoctosToNear: () => "",
  nearToUsd: 1,
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
  @media only screen and (max-width: 768px) {
    padding: 3rem 0;

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
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    a,
    button {
      width: 100%;
    }
  }
`;
const Referral = styled.div`
  font-size: 14px;
  gap: 12px;
  display: flex;
  align-items: center;
`;

const payoutsChallenges = PotSDK.getPayoutsChallenges(potId);

const existingChallengeForUser = (payoutsChallenges || []).find(
  (challenge) => challenge.challenger_id === context.accountId
);

return (
  <Container>
    <Header>
      <Title>{pot_name}</Title>
      <Description>
        <Markdown text={pot_description} />
      </Description>
      <Fund>
        <div className="label">Matching Funds Available:</div>
        <div>
          <div className="near-price">{yoctosToNear(matching_pool_balance, true)}</div>
          {nearToUsd && (
            <div lassName="usd-price"> {yoctosToUsdWithFallback(matching_pool_balance, true)}</div>
          )}
        </div>
      </Fund>
      <ButtonsWrapper>
        {publicRoundOpen && (nav !== "projects" || !sybilRequirementMet) && context.accountId && (
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
        {applicationOpen && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: registrationApproved || projectNotRegistered ? "primary" : "tertiary",
              text:
                projectNotRegistered && registry_provider
                  ? "Register to Apply"
                  : registrationApproved || !registry_provider
                  ? "Apply to pot"
                  : `Project Registration ${registryStatus}`,

              style: { marginRight: "24px" },
              onClick:
                projectNotRegistered && registry_provider
                  ? null
                  : () => setApplicationModalOpen(true),
              href:
                projectNotRegistered && registry_provider
                  ? props.hrefWithParams(`?tab=createproject`)
                  : null,
            }}
          />
        )}
        {now > public_round_end_ms && now < cooldown_end_ms && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              existingChallengeForUser,
              text: existingChallengeForUser ? "Update challenge" : "Challenge payouts",
              onClick: () => setShowChallengePayoutsModal(true),
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
    <Widget
      src={`${ownerId}/widget/Pots.ChallengeModal`}
      props={{
        ...props,
        showChallengePayoutsModal,
        onCancel: () => setShowChallengePayoutsModal(false),
      }}
    />
  </Container>
);
