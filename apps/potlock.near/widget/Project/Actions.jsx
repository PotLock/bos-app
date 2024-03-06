const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);
const [isModalDonationSucessOpen, setIsModalDonationSucessOpen] =
  useState(false);

const { projectId } = props;

const { isProjectApproved } =
  VM.require("${config/account}/widget/SDK.registry") ||
  {
    isProjectApproved: () => false,
  };

const projectIsApproved = isProjectApproved(projectId);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const SubRow1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  width: 66%;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 24px;
  }
`;

const SubRow2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
  width: 33%;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 24px;
  }
`;

const DonationButton = styled.button`
  padding: 12px 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  background: #fef6ee;
  border-radius: 6px;
  border: none;
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  &:hover {
    background: #dd3345;
    color: #fff;
  }
`;

// const FollowingMobile = styled.div`
//   display: none;

//   @media screen and (max-width: 768px) {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: flex-start;
//     gap: 24px;
//   }
// `;

State.init({
  successfulDonation: null,
});

return (
  <Container>
    <SubRow1>
      <Widget
        src={"${config/account}/widget/Project.FollowStats"}
        props={{ ...props, accountId: props.id }}
      />
      <Widget
        src={"${config/account}/widget/Project.FollowButton"}
        props={{ accountId: props.id }}
      />
    </SubRow1>
    {props.tab === "project" && projectIsApproved && (
      <SubRow2>
        <Widget
          src={"${config/account}/widget/Components.Button"}
          props={{
            type: "primary",
            text: "Donate",
            onClick: () => setIsModalDonationOpen(true),
          }}
        />
        <Widget
          src={"${config/account}/widget/Project.ModalDonation"}
          props={{
            ...props,
            isModalOpen: isModalDonationOpen,
            onClose: () => setIsModalDonationOpen(false),
            recipientId: props.projectId,
            referrerId: props.referrerId,
            openDonateToProjectModal: () => setIsModalDonationOpen(true),
            openDonationModalSuccess: (donation) => {
              setIsModalDonationOpen(false);
              State.update({
                successfulDonation: donation,
              });
            },
            // potId: state.donateToProjectModal.potId, // TODO: add this in if project is in a pot?
          }}
        />
      </SubRow2>
    )}
    {state.successfulDonation && (
      <Widget
        src={"${config/account}/widget/Project.ModalSuccess"}
        props={{
          ...props,
          successfulDonation: state.successfulDonation,
          isModalOpen: state.successfulDonation != null,
          onClose: () =>
            State.update({
              successfulDonation: null,
            }),
        }}
      />
    )}
  </Container>
);
