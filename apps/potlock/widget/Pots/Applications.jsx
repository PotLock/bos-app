// get applications
const {
  ownerId,
  potId,
  potDetail,
  SUPPORTED_FTS: { NEAR },
} = props;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 24px;
  border-bottom: 1px #f0f0f0 solid;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: white;
  padding: 24px 24px 12px 24px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-weight: 500;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  border-top: 1px #f0f0f0 solid;
  background: #fafafa;
  gap: 8px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background: #fafafa;
  padding: 12px 24px 24px 24px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  gap: 24px;
  width: 100%;
`;

State.init({
  isModalOpen: false,
  newStatus: "",
  projectId: "",
  reviewMessage: "",
});

const applications = Near.view(potId, "get_applications", {});

if (!applications) return "Loading...";

const daysAgo = (timestamp) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const differenceInTime = now - pastDate;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
};

const { owner, admins, chef } = potDetail;

const isChefOrGreater =
  context.accountId === chef || admins.includes(context.accountId) || context.accountId === owner;

const handleApproveApplication = (projectId) => {
  State.update({ isModalOpen: true, newStatus: "Approved", projectId });
};

const handleRejectApplication = (projectId) => {
  State.update({ isModalOpen: true, newStatus: "Rejected", projectId });
};

const handleCancel = () => {
  State.update({ isModalOpen: false, newStatus: "", projectId: "", reviewMessage: "" });
};

const handleSubmit = () => {
  const args = {
    project_id: state.projectId,
    status: state.newStatus,
    notes: state.reviewMessage,
  };
  const transactions = [
    {
      contractName: potId,
      methodName: "chef_set_application_status",
      deposit: NEAR.toIndivisible(0.01),
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- TODO: IMPLEMENT EXTENSION WALLET HANDLING ---->
};

return (
  <>
    {applications.map((application, index) => {
      const { project_id, message, status, submitted_at, review_notes } = application;

      return (
        <Row key={index}>
          <Widget
            src={`${ownerId}/widget/Project.ProfileImage`}
            props={{
              ...props,
              accountId: project_id,
              imageWrapperStyle: {
                height: "32px",
                width: "32px",
              },
            }}
          />
          <Column style={{ flex: 1 }}>
            <Row style={{ borderBottom: "none", padding: "0px" }}>
              <div style={{ fontWeight: "bold" }}>{project_id}</div>
              <div style={{ fontSize: "12px" }}>{props.daysAgo(submitted_at)}</div>
            </Row>
            <div>{message}</div>
            <div style={{ fontSize: "12px", marginTop: "8px" }}>
              Admin notes: {review_notes.length > 0 ? review_notes : "None yet"}
            </div>
          </Column>
          <div>{status}</div>
          {isChefOrGreater && (
            <>
              {status !== "Approved" && (
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "secondary",
                    text: "Approve",
                    onClick: () => handleApproveApplication(project_id),
                  }}
                />
              )}
              {status !== "Rejected" && (
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "primary",
                    text: "Reject",
                    onClick: () => handleRejectApplication(project_id),
                  }}
                />
              )}
            </>
          )}
        </Row>
      );
    })}
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen: state.isModalOpen,
        onClose: () => State.update({ isModalOpen: false, newStatus: "", projectId: "" }),
        contentStyle: {
          padding: "0px",
        },
        children: (
          <>
            <ModalHeader>
              {state.newStatus === "Approved"
                ? "Approve "
                : state.newStatus === "Rejected"
                ? "Reject "
                : ""}
              application from {state.projectId}
            </ModalHeader>
            <ModalBody>
              <div>Leave a note *</div>
              <Widget
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  noLabel: true,
                  inputRows: 5,
                  inputStyle: {
                    background: "#FAFAFA",
                  },
                  placeholder: "Type notes here",
                  value: state.reviewMessage,
                  onChange: (reviewMessage) => State.update({ reviewMessage }),
                  validate: () => {
                    if (state.reviewMessage.length > MAX_APPLICATION_MESSAGE_LENGTH) {
                      State.update({
                        reviewMessageError: `Application message must be less than ${MAX_APPLICATION_MESSAGE_LENGTH} characters`,
                      });
                      return;
                    }

                    State.update({ reviewMessageError: "" });
                  },
                  error: state.reviewMessageError,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "tertiary",
                  text: "Cancel",
                  onClick: handleCancel,
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: "Submit",
                  disabled: !state.reviewMessage || !!state.reviewMessageError,
                  onClick: handleSubmit,
                }}
              />
            </ModalFooter>
          </>
        ),
      }}
    />
  </>
);
