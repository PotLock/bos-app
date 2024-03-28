const { projectId } = props;
const { getTagsFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTagsFromSocialProfileData: () => [],
};
const {
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const accountId = props.accountId ?? context.accountId;

const [statusReview, setStatusReview] = useState({ modalOpen: false, notes: "", newStatus: "" });

let ListsSDK =
  VM.require("potlock.near/widget/SDK.lists") ||
  (() => ({
    getContractId: () => "",
    isRegistryAdmin: () => {},
    getRegistration: () => {},
  }));

ListsSDK = ListsSDK({ env: props.env });
const listsContractId = ListsSDK.getContractId();
const userIsRegistryAdmin = ListsSDK.isRegistryAdmin(context.accountId);
const registration = ListsSDK.getRegistration(null, projectId);

const handleUpdateStatus = () => {
  Near.call([
    {
      contractName: listsContractId,
      methodName: "update_registration",
      args: {
        registration_id: registration.id,
        status: statusReview.newStatus,
        notes: statusReview.notes,
      },
      deposit: NEAR.toIndivisible(0.01).toString(),
    },
  ]);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 3rem 4rem 24px;
  @media screen and (max-width: 768px) {
    padding: 24px 1rem;
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
        ShowFollowers: true,
        accountId: projectId || accountId,
      }}
    />
    <Container>
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
            value: { text: props.registration.status, value: props.registration.status },
            onChange: (status) => {
              if (status.value != registration.status) {
                setStatusReview({ ...statusReview, newStatus: status.value, modalOpen: true });
              }
            },
            containerStyles: {
              padding: "16px 24px",
            },
          }}
        />
      )}
      <Widget
        src={`${ownerId}/widget/Profile.Tabs`}
        props={{
          ...props,
        }}
      />

      <Details>
        <Widget
          src={props.navOptions.find((option) => option.id == props.nav).source}
          props={{
            ...props,
            accounts: [projectId || accountId],
          }}
        />
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
