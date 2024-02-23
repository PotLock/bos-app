const { ownerId } = props;

const Button = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #dd3345;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

State.init({
  isModalOpen: false,
  successfulDonation: null,
});

const handleDonateRandomly = () => {
  State.update({
    isModalOpen: true,
    successfulDonation: null,
  });
};

return (
  <>
    <Button onClick={handleDonateRandomly}>Donate Randomly</Button>
    {state.isModalOpen && (
      <Widget
        src={`${ownerId}/widget/Project.ModalDonation`}
        props={{
          ...props,
          isModalOpen: state.isModalOpen,
          onClose: () =>
            State.update({
              isModalOpen: false,
            }),
          openDonationModalSuccess: (donation) => {
            State.update({
              isModalOpen: false,
              successfulDonation: donation,
            });
          },
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
