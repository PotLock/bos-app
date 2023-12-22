// console.log("props in Pot Detail: ", props);
const { potId, ownerId } = props;

const MAX_APPLICATION_MESSAGE_LENGTH = 1000;

// const registeredProject = projects.find(
//   (project) => project.id == props.projectId && project.status == "Approved"
// );

// const name = profile.name || "No-name profile";
// const image = profile.image;
// const backgroundImage = profile.backgroundImage;
// const tags = Object.keys(profile.tags ?? {});

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));

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
    padding: 240px 16px 32px 16px;
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
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #292929;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 30vh;
`;

const ModalContent = styled.div`
  border-radius: 6px;
  width: 100%;
  max-width: 600px;
  padding: 24px 24px 18px 24px;
  background: white;
  border: 1px rgba(41, 41, 41, 0.4) solid;
  display: flex;
  flex-direction: column;
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
  canApply: null,
  isApplicationModalOpen: false,
  applicationMessage: "",
  applicationMessageError: "",
  applicationSuccess: false,
});

if (state.potDetail === null) {
  Near.asyncView(potId, "get_config", {})
    .then((potDetail) => {
      // check for registration requirement
      // potDetail.registryProvider = "registry.potlock.near:is_registered"; // TODO: REMOVE THIS
      if (potDetail.registryProvider) {
        const [registryId, registryMethod] = potDetail.registryProvider.split(":");
        if (registryId && registryMethod) {
          Near.asyncView(registryId, registryMethod, { account_id: context.accountId })
            .then((canApply) => {
              State.update({ canApply, potDetail });
            })
            .catch((e) => {
              console.log("error getting registry: ", e);
              State.update({ potDetail, canApply: true });
            });
        } else {
          State.update({ potDetail, canApply: true });
        }
      } else {
        State.update({ potDetail, canApply: true });
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

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </ModalOverlay>
  );
};

// these will be passed down to child components
props.navOptions = [
  {
    label: "Projects",
    id: "projects",
    disabled: false,
    source: `${ownerId}/widget/Pots.Projects`,
    href: `?tab=pot&potId=${potId}&nav=projects`,
  },
  {
    label: "Applications",
    id: "applications",
    disabled: false,
    source: `${ownerId}/widget/Pots.Applications`,
    href: `?tab=pot&potId=${potId}&nav=applications`,
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${ownerId}/widget/Pots.Donations`,
    href: `?tab=pot&potId=${potId}&nav=donations`,
  },
  {
    label: "Settings",
    id: "settings",
    disabled: false,
    source: `${ownerId}/widget/Pots.Settings`,
    href: `?tab=pot&potId=${potId}&nav=settings`,
  },
];

if (!props.nav) props.nav = "projects"; // default to home tab

// const imageHeightPx = 120;
// const profileImageTranslateYPx = 220;

const handleSendApplication = () => {
  const args = {
    message: state.applicationMessage,
  };
  const deposit = Big(JSON.stringify(args).length * 0.00003).plus(Big("10000000000000000000000")); // add extra 0.01 NEAR as buffer
  const transactions = [
    {
      contractName: potId,
      methodName: "apply",
      deposit,
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ---->
  // poll for updates
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    Near.asyncView(potId, "get_applications", {}).then((applications) => {
      const application = applications.find(
        (application) => application.project_id === context.accountId
      );
      if (application) {
        clearInterval(pollId);
        State.update({ applicationSuccess: true });
      }
    });
  }, pollIntervalMs);
};

if (loading) return "Loading...";

if (noPot) return "No pot found";

return (
  <Wrapper>
    {/* {!registeredProject ? (
      <div style={{ textAlign: "center", paddingTop: "12px" }}>Project not found</div>
    ) : ( */}
    <>
      <Widget
        src={`${ownerId}/widget/Pots.Header`}
        props={{
          ...props,
          setApplicationModalOpen: (isOpen) => State.update({ isApplicationModalOpen: isOpen }),
          handleApplyToPot,
        }}
      />
      <Container>
        <Divider />
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
              }}
            />
          </BodyContainer>
        </ContainerInner>
      </Container>
    </>
    {/* )} */}
    <Modal
      isOpen={state.isApplicationModalOpen}
      onClose={() => State.update({ isApplicationModalOpen: false })}
    >
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
      <Row style={{ justifyContent: "flex-end", marginTop: "12px" }}>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Send application",
            onClick: handleSendApplication,
          }}
        />
      </Row>
    </Modal>
  </Wrapper>
);
