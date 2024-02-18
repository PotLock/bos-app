const {
  ownerId,
  projectId,
  userIsRegistryAdmin,
  REGISTRY_CONTRACT_ID,
  tab,
  POT_FACTORY_CONTRACT_ID,
} = props;

const { ProjectOptions } = VM.require(`${ownerId}/widget/Project.Options`);

const project = Near.view(REGISTRY_CONTRACT_ID, "get_project_by_id", { project_id: projectId });
if (!project || project == null) {
  return "Loading";
}

if (project == undefined) {
  return "Project not found";
}
// Fetch Project Donations
const donations = Near.view("donate.potlock.near", "get_donations_for_recipient", {
  recipient_id: projectId,
});

props.donations = donations;
props.navOptions = ProjectOptions(props);

if (!props.nav) props.nav = "home"; // default to home tab

const profile = Social.getr(`${projectId}/profile`);
if (profile === null) {
  return "Loading";
}

const [statusReview, setStatusReview] = useState({ modalOpen: false, notes: "", newStatus: "" });

const projectLink = `https://near.social/potlock.near/widget/Index?tab=project&projectId=${
  props.projectId
}${context.accountId && `&referrerId=${context.accountId}`}`;

const handleUpdateStatus = () => {
  Near.call([
    {
      contractName: REGISTRY_CONTRACT_ID,
      methodName: "admin_set_project_status",
      args: {
        project_id: props.projectId,
        status: statusReview.newStatus,
        review_notes: statusReview.notes,
      },
      deposit: NEAR.toIndivisible(0.01).toString(),
    },
  ]);
};

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
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

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        project,
      }}
    />

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
