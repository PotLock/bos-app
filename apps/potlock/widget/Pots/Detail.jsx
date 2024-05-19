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
  getConfig: () => {},
  asyncGetApplications: () => {},
  asyncGetPublicRoundDonations: () => {},
};

const potDetail = PotSDK.getConfig(potId);

const MAX_APPLICATION_MESSAGE_LENGTH = 1000;

Big.PE = 100;
const FIFTY_TGAS = "50000000000000";
const THREE_HUNDRED_TGAS = "300000000000000";
const MIN_PROPOSAL_DEPOSIT_FALLBACK = "100000000000000000000000"; // 0.1N

const Wrapper = styled.div``;

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
    width: 100%;
    padding: 0;
  }
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 68px 0px;
`;

const BodyContainer = styled.div`
  margin-top: 52px;
  padding: 0 4rem;
  flex: 1;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
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
  isApplicationModalOpen: false,
  applicationMessage: "",
  applicationMessageError: "",
  applicationSuccess: false,
  isDao: false,
  daoAddress: "",
  daoAddressError: "",
  daoPolicy: null,
  registryStatus: null,
});

// if (state.sybilRequirementMet === null) {
//   if (potDetail.sybil_wrapper_provider) {
//     const [contractId, methodName] = potDetail.sybil_wrapper_provider.split(":");
//     Near.asyncView(contractId, methodName, { account_id: context.accountId })
//       .then((result) => {
//         State.update({ sybilRequirementMet: result });
//       })
//       .catch((e) => {
//         State.update({ sybilRequirementMet: false });
//       });
//   } else {
//     State.update({ sybilRequirementMet: true });
//   }
// }

const noPot = potDetail === undefined;
const loading = potDetail === null;

if (loading) return <div class="spinner-border text-secondary" role="status" />;

if (noPot) return "No pot found";

const now = Date.now();
const applicationNotStarted = now < potDetail.application_start_ms;
const applicationOpen = now >= potDetail.application_start_ms && now < potDetail.application_end_ms;

const publicRoundOpen =
  now >= potDetail.public_round_start_ms && now < potDetail.public_round_end_ms;
const publicRoundClosed = now >= potDetail.public_round_end_ms;

const payoutsPending = publicRoundClosed && !potDetail.cooldown_end_ms;

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
    disabled: now < potDetail.public_round_start_ms, // TODO: ADD BACK IN
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
            description: `Application to PotLock pot: ${potDetail.pot_name} (${potId})`,
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
  Near.asyncView("lists.potlock.near", "get_registrations_for_registrant", {
    registrant_id: address,
  }).then((registrations) => {
    const registration = registrations.find(
      (registration) => registration.list_id === 1 // potlock registry list id
    );
    if (registration) {
      State.update({ registryStatus: registration.status });
    }
  });
};

useEffect(() => {
  if (!state.isDao) {
    verifyIsOnRegistry(context.accountId || "");
  }
}, []);

// const registryRequirementMet = state.isOnRegistry || !potDetail.registry_provider;
const registrationApproved = state.registryStatus === "Approved";
const registrationNotApproved = state.registryStatus && state.registryStatus !== "Approved";
const registrationApprovedOrNoRegistryProvider =
  registrationApproved || !potDetail?.registry_provider;

const isError = state.applicationMessageError || state.daoAddressError;

// Get total public donations
const allDonationsPaginated = useCache(() => {
  const limit = 480; // number of donations to fetch per req
  const donationsCount = potDetail.public_donations_count;
  const paginations = [
    ...Array(parseInt(donationsCount / limit) + (donationsCount % limit > 0 ? 1 : 0)).keys(),
  ];
  try {
    const allDonations = paginations.map((index) =>
      PotSDK.asyncGetPublicRoundDonations(potId, {
        from_index: index * limit,
        limit: limit,
      })
    );
    return Promise.all(allDonations);
  } catch (error) {
    console.error(`error getting public donations from ${index} to ${index * limit}`, error);
  }
}, "pot-public-donations");

const allDonations = allDonationsPaginated ? allDonationsPaginated.flat() : null;

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Pots.HeaderStatus`}
      props={{
        ...props,
        potDetail: potDetail,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Pots.Header`}
      props={{
        ...props,
        potDetail: potDetail,
        setApplicationModalOpen: (isOpen) => State.update({ isApplicationModalOpen: isOpen }),
        applicationSuccess: state.applicationSuccess,
        registrationApproved,
        allDonations,
        registryStatus: state.registryStatus,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Profile.Tabs`}
      props={{
        ...props,
      }}
    />
    <BodyContainer>
      <Widget
        src={props.navOptions.find((option) => option.id == props.nav).source}
        props={{
          ...props,
          potDetail: potDetail,
          allDonations,
        }}
      />
    </BodyContainer>
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
                          : doesUserHaveDaoFunctionCallProposalPermissions(
                              context.accountId,
                              policy
                            );
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
                  // text: registrationApprovedOrNoRegistryProvider
                  //   ? state.isDao
                  //     ? "Propose to Send Application"
                  //     : "Send application"
                  //   : "Register to apply",
                  text: state.isDao
                    ? "Propose to Send Application"
                    : registrationApprovedOrNoRegistryProvider
                    ? "Send application"
                    : "Register to apply",
                  onClick:
                    state.isDao || registrationApprovedOrNoRegistryProvider
                      ? handleSendApplication
                      : null,
                  disabled: isError,
                  href:
                    state.isDao || registrationApprovedOrNoRegistryProvider
                      ? null
                      : props.hrefWithParams(`?tab=createproject`),
                  target:
                    state.isDao || registrationApprovedOrNoRegistryProvider ? "_self" : "_blank",
                }}
              />
            </Row>
          </>
        ),
      }}
    />
  </Wrapper>
);
