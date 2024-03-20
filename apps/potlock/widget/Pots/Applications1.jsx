// get applications
const { potId, potDetail } = props;
const { daysAgo } = VM.require("potlock.near/widget/utils") || { daysAgo: () => "" };
const {
  ONE_TGAS,
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ONE_TGAS: 0,
  ownerId: "",
  SUPPORTED_FTS: {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getApplications: () => {},
};
const applications = PotSDK.getApplications(potId);

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

const StatusText = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StatusTextMobile = styled.div`
  display: none;
  font-size: 14px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const ProjectLink = styled.a`
  font-weight: 600;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const APPLICATIONS_FILTERS = {
  ALL: "All applications",
  PENDING: "Pending applications",
  APPROVED: "Approved applications",
  REJECTED: "Rejected applications",
};

State.init({
  isModalOpen: false,
  newStatus: "",
  projectId: "",
  reviewMessage: "",
  searchTerm: "",
  allApplications: null,
  filteredApplications: [],
  filterVal: APPLICATIONS_FILTERS.ALL,
});

if (applications && !state.allApplications) {
  State.update({ filteredApplications: applications, allApplications: applications });
}

if (!state.allApplications) return <div class="spinner-border text-secondary" role="status" />;

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
      gas: ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- TODO: IMPLEMENT EXTENSION WALLET HANDLING ---->
};

// console.log("applications: ", applications);
// console.log("state: ", state);

const searchApplications = (searchTerm) => {
  // filter applications that match the search term (message, project_id, review_notes or status)
  const filteredApplications = state.allApplications.filter((application) => {
    const { message, project_id, review_notes, status } = application;
    const searchFields = [message, project_id, review_notes, status];
    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  return filteredApplications;
};

const sortApplications = (sortVal) => {
  if (sortVal === APPLICATIONS_FILTERS.ALL) {
    return searchApplications(state.searchTerm);
  }
  const filtered = state.allApplications.filter((application) => {
    return application.status === sortVal.split(" ")[0];
  });
  return filtered;
};

return (
  <>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Project.SearchBar`}
      props={{
        title: "Filter",
        tab: tab,
        numItems: state.filteredApplications.length,
        itemName: "application",
        sortList: Object.values(APPLICATIONS_FILTERS),
        sortVal: state.filterVal,
        setSearchTerm: (value) => {
          const results = searchApplications(value);
          State.update({ searchTerm: value, filteredApplications: results });
        },
        handleSortChange: (sortVal) => {
          const sorted = sortApplications(sortVal);
          State.update({ filteredApplications: sorted, filterVal: sortVal });
        },
      }}
    />
    {state.filteredApplications.length === 0 ? (
      <Row>No applications to display</Row>
    ) : (
      state.filteredApplications.map((application, index) => {
        const { project_id, message, status, submitted_at, review_notes } = application;
        // console.log("status: ", status);

        return (
          <Row
            key={index}
            style={{
              background:
                status === "Approved" ? "#F7FDE8" : status === "Rejected" ? "#FEF3F2" : "white",
              alignItems: "flex-start",
            }}
          >
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
                <ProjectLink href={props.hrefWithParams(`?tab=project&projectId=${project_id}`)}>
                  {project_id}
                </ProjectLink>
                <div style={{ fontSize: "12px" }}>{daysAgo(submitted_at)}</div>
              </Row>
              <div>{message}</div>
              <div style={{ fontSize: "12px", marginTop: "8px" }}>
                Admin notes: {review_notes.length > 0 ? review_notes : "None yet"}
              </div>
              <StatusTextMobile>{status}</StatusTextMobile>
            </Column>
            <StatusText>{status}</StatusText>
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
      })
    )}
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
