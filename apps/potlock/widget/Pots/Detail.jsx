const { potId } = props;
const { doesUserHaveDaoFunctionCallProposalPermissions } = VM.require(
  "potlock.near/widget/utils"
) || { doesUserHaveDaoFunctionCallProposalPermissions: () => "" };
const {
  ownerId,
  ONE_TGAS,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  ONE_TGAS: 0,
  SUPPORTED_FTS: {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
  asyncGetApplications: () => {},
};

const MAX_APPLICATION_MESSAGE_LENGTH = 1000;

Big.PE = 100;
const FIFTY_TGAS = "50000000000000";
const THREE_HUNDRED_TGAS = "300000000000000";
const MIN_PROPOSAL_DEPOSIT_FALLBACK = "100000000000000000000000"; // 0.1N

// const registeredProject = projects.find(
//   (project) => project.id == props.projectId && project.status == "Approved"
// );

// const name = profile.name || "No-name profile";
// const image = profile.image;
// const backgroundImage = profile.backgroundImage;
// const tags = Object.keys(profile.tags ?? {});

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  /* overflow-x: hidden; */
  // @media screen and (max-width: 768px) {
  //   .mb-2 {
  //     width: 64px;
  //     height: 64px;
  //   }
  // }
`;

const SidebarContainer = styled.div`
  width: 25%;
  // width: 500px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 0px 68px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    //padding: 240px 16px 32px 16px;
    width: 100%;
    padding: 0;
  }
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 68px 0px;
`;

const BodyContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #292929;
`;

const ModalTitle = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

State.init({
  potDetail: null,
  // canApply: null,
  isApplicationModalOpen: false,
  applicationMessage: "",
  applicationMessageError: "",
  applicationSuccess: false,
  sybilRequirementMet: null,
  isDao: false,
  daoAddress: "",
  daoAddressError: "",
  daoPolicy: null,
  isOnRegistry: false,
});

if (state.potDetail === null) {
  PotSDK.asyncGetConfig(potId)
    .then((potDetail) => {
      if (potDetail.sybil_wrapper_provider) {
        const [contractId, methodName] = potDetail.sybil_wrapper_provider.split(":");
        Near.asyncView(contractId, methodName, { account_id: context.accountId })
          .then((result) => {
            State.update({ potDetail, sybilRequirementMet: result });
          })
          .catch((e) => {
            State.update({ potDetail, sybilRequirementMet: false });
          });
      } else {
        State.update({ potDetail, sybilRequirementMet: true });
      }
    })
    .catch((e) => {
      console.log("error getting pot detail: ", e);
      State.update({ potDetail: undefined });
    });
}

// console.log("state in pot detail: ", state);

const noPot = state.potDetail === undefined;
const loading = state.potDetail === null;

if (loading) return <div class="spinner-border text-secondary" role="status" />;

if (noPot) return "No pot found";

// these will be passed down to child components
props.navOptions = [
  {
    label: "Projects",
    id: "projects",
    disabled: false,
    source: `${ownerId}/widget/Pots.Projects`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=projects`),
  },
  {
    label: "Applications",
    id: "applications",
    disabled: false,
    source: `${ownerId}/widget/Pots.Applications`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=applications`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${ownerId}/widget/Pots.Donations`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=donations`),
  },
  {
    label: "Sponsors",
    id: "sponsors",
    disabled: false,
    source: `${ownerId}/widget/Pots.Sponsors`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=sponsors`),
  },
  {
    label: "Payouts",
    id: "payouts",
    disabled: !state.potDetail.payouts.length,
    source: `${ownerId}/widget/Pots.Payouts`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=payouts`),
  },
  {
    label: "Settings",
    id: "settings",
    disabled: false,
    source: `${ownerId}/widget/Pots.Settings`,
    href: props.hrefWithParams(`?tab=pot&potId=${potId}&nav=settings`),
  },
];

const potDetail = state.potDetail;
const now = Date.now();
const applicationNotStarted = now < potDetail.application_start_ms;
const applicationOpen = now >= potDetail.application_start_ms && now < potDetail.application_end_ms;

const publicRoundOpen =
  now >= potDetail.public_round_start_ms && now < potDetail.public_round_end_ms;
const publicRoundClosed = now >= potDetail.public_round_end_ms;

const payoutsPending = publicRoundClosed && !potDetail.cooldown_end_ms;

//console.log("state", canPayoutsBeSet);

if (!props.nav) {
  let nav;
  applicationNotStarted
    ? (nav = "sponsors")
    : applicationOpen
    ? (nav = "applications")
    : publicRoundOpen
    ? (nav = "projects")
    : !payoutsPending
    ? (nav = "donations")
    : (nav = "payouts");
  props.nav = nav;
} // default to home tab

// const imageHeightPx = 120;
// const profileImageTranslateYPx = 220;

const handleSendApplication = () => {
  const args = {
    message: state.applicationMessage,
  };
  let deposit = NEAR.toIndivisible("0.01");
  const extraDeposit = Big(state.applicationMessage.length * 0.0001).mul(Big(10).pow(24));
  deposit = deposit.plus(extraDeposit);

  const transactions = [
    {
      contractName: potId,
      methodName: "apply",
      deposit,
      args,
      gas: ONE_TGAS.mul(100),
    },
  ];

  // if it is a DAO, we need to convert transactions to DAO function call proposals
  if (state.isDao) {
    const clonedTransactions = JSON.parse(JSON.stringify(transactions));
    transactions = clonedTransactions.map((tx) => {
      const action = {
        method_name: tx.methodName,
        gas: FIFTY_TGAS,
        deposit: tx.deposit ? tx.deposit.toString() : "0",
        args: Buffer.from(JSON.stringify(tx.args), "utf-8").toString("base64"),
      };
      return {
        ...tx,
        contractName: state.daoAddress,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `Application to PotLock pot: ${state.potDetail.pot_name} (${potId})`,
            kind: {
              FunctionCall: {
                receiver_id: tx.contractName,
                actions: [action],
              },
            },
          },
        },
        deposit: state.daoPolicy.proposal_bond || MIN_PROPOSAL_DEPOSIT_FALLBACK,
        gas: THREE_HUNDRED_TGAS,
      };
    });
  }

  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ---->
  // poll for updates
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    PotSDK.asyncGetApplications(potId).then((applications) => {
      const application = applications.find(
        (application) =>
          application.project_id === (state.isDao ? state.daoAddress : context.accountId)
      );
      if (application) {
        clearInterval(pollId);
        State.update({ applicationSuccess: true });
      }
    });
  }, pollIntervalMs);
};

const verifyIsOnRegistry = (address) => {
  const { registry_provider } = state.potDetail;
  if (registry_provider) {
    const [registryId, registryMethod] = registry_provider.split(":");
    if (registryId && registryMethod) {
      Near.asyncView(registryId, registryMethod, { account_id: address })
        .then((isOnRegistry) => {
          State.update({ isOnRegistry });
        })
        .catch((e) => {
          console.log("error getting registry: ", e);
        });
    }
  }
};

useEffect(() => {
  if (!state.isDao) {
    verifyIsOnRegistry(context.accountId || "");
  }
}, []);

const registryRequirementMet = state.isOnRegistry || !state.potDetail.registry_provider;

const isError = state.applicationMessageError || state.daoAddressError;

return (
  <Wrapper>
    <>
      <Widget
        src={`${ownerId}/widget/Pots.Header`}
        props={{
          ...props,
          potDetail: state.potDetail,
          setApplicationModalOpen: (isOpen) => State.update({ isApplicationModalOpen: isOpen }),
          handleApplyToPot,
          sybilRequirementMet: state.sybilRequirementMet,
          applicationSuccess: state.applicationSuccess,
        }}
      />
      <Container>
        <ContainerInner>
          <SidebarContainer
          // class="col-3"
          >
            <Widget
              src={`${ownerId}/widget/Components.NavOptions`}
              props={{
                ...props,
              }}
            />
          </SidebarContainer>
          <BodyContainer
          // class="col-9"
          >
            <Widget
              src={props.navOptions.find((option) => option.id == props.nav).source}
              props={{
                ...props,
                potDetail: state.potDetail,
                publicRoundOpen,
                sybilRequirementMet: state.sybilRequirementMet,
              }}
            />
          </BodyContainer>
        </ContainerInner>
      </Container>
    </>
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen: state.isApplicationModalOpen,
        onClose: () => State.update({ isApplicationModalOpen: false }),
        children: (
          <>
            <ModalTitle>
              Application message <span style={{ color: "#DD3345" }}>*</span>
            </ModalTitle>
            <Widget
              src={`${ownerId}/widget/Inputs.TextArea`}
              props={{
                noLabel: true,
                inputRows: 5,
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Your application message here...",
                value: state.applicationMessage,
                onChange: (applicationMessage) => State.update({ applicationMessage }),
                validate: () => {
                  if (state.applicationMessage.length > MAX_APPLICATION_MESSAGE_LENGTH) {
                    State.update({
                      applicationMessageError: `Application message must be less than ${MAX_APPLICATION_MESSAGE_LENGTH} characters`,
                    });
                    return;
                  }

                  State.update({ applicationMessageError: "" });
                },
                error: state.applicationMessageError,
              }}
            />
            <Row style={{ margin: "12px 0px" }}>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "isDaoSelector",
                  checked: state.isDao,
                  onClick: (e) => {
                    State.update({
                      isDao: e.target.checked,
                    });
                    if (!e.target.checked) {
                      // check current account ID against registry
                      verifyIsOnRegistry(context.accountId);
                    }
                  },
                  label: "I'm applying as a DAO",
                }}
              />
            </Row>
            {state.isDao && (
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "DAO address *",
                  placeholder: "E.g. mydao.sputnikdao.near",
                  value: state.daoAddress,
                  onChange: (daoAddress) => State.update({ daoAddress, daoAddressError: "" }),
                  validate: () => {
                    // **CALLED ON BLUR**
                    Near.asyncView(state.daoAddress, "get_policy", {})
                      .then((policy) => {
                        const hasPermissions = !policy
                          ? false
                          : doesUserHaveDaoFunctionCallProposalPermissions(policy);
                        State.update({
                          daoAddressError: hasPermissions
                            ? ""
                            : "You don't have required permissions to submit proposals to this DAO.",
                          daoPolicy: policy,
                        });
                        // check registry
                        verifyIsOnRegistry(state.daoAddress);
                      })
                      .catch((e) => {
                        State.update({
                          daoAddressError: "Invalid DAO address",
                        });
                      });
                  },
                  error: state.daoAddressError,
                  disabled: isUpdate ? !isAdminOrGreater : false,
                }}
              />
            )}
            <Row style={{ justifyContent: "flex-end", marginTop: "12px" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: registryRequirementMet
                    ? state.isDao
                      ? "Propose to Send Application"
                      : "Send application"
                    : "Register to apply",
                  onClick: registryRequirementMet ? handleSendApplication : null,
                  disabled: isError,
                  href: registryRequirementMet ? null : props.hrefWithParams(`?tab=createproject`),
                  target: registryRequirementMet ? "_self" : "_blank",
                }}
              />
            </Row>
          </>
        ),
      }}
    />
  </Wrapper>
);
