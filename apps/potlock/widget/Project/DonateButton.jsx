const DonationButton = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #fef6ee;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: #2e2e2e;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

State.init({
  donateModal: {
    isOpen: false,
    recipientId: null,
    referrerId: null,
    potId: null,
    potDetail: null,
    successfulDonation: null,
  },
});

const openDonateModal = () => {
  State.update({
    donateModal: {
      isOpen: true,
      recipientId: projectId,
      referrerId: null,
      potId: null,
      potDetail: null,
      successfulDonation: null,
    },
  });
};

return (
  <>
    <DonationButton
      onClick={(e) => {
        e.preventDefault();
        openDonateModal();
      }}
      disabled={!context.accountId}
    >
      {context.accountId ? "Donate" : "Sign in to donate"}
    </DonationButton>
    {state.donateModal.isOpen && (
      <Widget
        src={`${ownerId}/widget/Project.ModalDonation`}
        loading={""}
        props={{
          ...props,
          isModalOpen: state.donateModal.isOpen,
          onClose: () =>
            State.update({
              donateModal: {
                isOpen: false,
                recipientId: null,
                referrerId: null,
                potId: null,
                potDetail: null,
              },
            }),
          openDonationModalSuccess: (donation) => {
            State.update({
              donateModal: {
                isOpen: false,
                recipientId: null,
                referrerId: null,
                potId: null,
                potDetail: null,
              },
              successfulDonation: donation,
            });
          },
          recipientId: state.donateModal.recipientId,
          referrerId: props.referrerId,
          potId,
        }}
      />
    )}
    {state.successfulDonation && (
      <Widget
        src={`${ownerId}/widget/Project.ModalSuccess`}
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
  </>
);
