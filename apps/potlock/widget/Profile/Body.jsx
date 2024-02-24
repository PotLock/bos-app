const { projectId, getTagsFromSocialProfileData } = props;
const {
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const accountId = props.accountId ?? context.accountId;

const [statusReview, setStatusReview] = useState({ modalOpen: false, notes: "", newStatus: "" });

const PotlockRegistrySDK = VM.require("potlock.near/widget/SDK.registry");
const registry = PotlockRegistrySDK({ env: props.env });
const userIsRegistryAdmin = registry.isUserRegistryAdmin(context.accountId);

const handleUpdateStatus = () => {
  registry.setProjectStatus(projectId, statusReview.newStatus, statusReview.notes);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 252px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding-top: 240px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 0%;
  width: 100%;
  .nav-view {
    width: 100%;
    padding: 24px 50px;
    background: #f6f5f3;
    @media screen and (max-width: 768px) {
      padding: 24px 1rem;
    }
  }
`;

const SidebarContainer = styled.div`
  width: 15%;
  padding-left: 1rem;
  @media screen and (max-width: 768px) {
    width: fit-content;
    > div:first-of-type {
      display: none;
    }
  }
`;

const ModalTitle = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const { PROJECT_STATUSES } = VM.require("potlock.near/widget/constants") || {
  PROJECT_STATUSES: [],
};

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.BannerHeader`}
      props={{
        ...props,
        accountId: projectId || accountId,
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "280px",
        },
      }}
    />
    <Container>
      {/* Side Nav */}
      <Widget
        src={`${ownerId}/widget/Project.NavOptionsMobile`}
        props={{
          ...props,
        }}
      />
      <SidebarContainer>
        <Widget
          src={`${ownerId}/widget/Components.NavOptions`}
          props={{
            ...props,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Profile.Linktree`}
          props={{
            ...props,
          }}
        />
      </SidebarContainer>

      {/* Body */}
      <Details>
        <Widget
          src={`${ownerId}/widget/Profile.BodyHeader`}
          props={{
            ...props,
            accountId,
          }}
        />
        {userIsRegistryAdmin && projectId && (
          <Widget
            src={`${ownerId}/widget/Inputs.Select`}
            props={{
              noLabel: true,
              options: PROJECT_STATUSES.map((status) => ({
                value: status,
                text: status,
              })),
              value: { text: props.project.status, value: props.project.status },
              onChange: (status) => {
                if (status.value != project.status) {
                  setStatusReview({ ...statusReview, newStatus: status.value, modalOpen: true });
                }
              },
              containerStyles: {
                padding: "16px 24px",
              },
            }}
          />
        )}
        <div className="nav-view">
          <Widget
            src={props.navOptions.find((option) => option.id == props.nav).source}
            props={{
              ...props,
            }}
          />
        </div>
      </Details>
    </Container>
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen: statusReview.modalOpen,
        onClose: () => setStatusReview({ ...statusReview, modalOpen: false }),
        children: (
          <>
            <ModalTitle>Enter Notes for changing status to {statusReview.newStatus}</ModalTitle>
            <Widget
              src={`${ownerId}/widget/Inputs.TextArea`}
              props={{
                noLabel: true,
                inputRows: 5,
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Your notes here...",
                value: statusReview.notes,
                onChange: (notes) => setStatusReview({ ...statusReview, notes }),
                validate: () => {
                  // none necessary
                },
              }}
            />
            <Row style={{ justifyContent: "flex-end", marginTop: "12px" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: "Submit",
                  onClick: handleUpdateStatus,
                }}
              />
            </Row>
          </>
        ),
      }}
    />
  </Wrapper>
);
