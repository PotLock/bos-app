const { showChallengePayoutsModal, onCancel, existingChallengeForUser } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

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
  challengeReason: "",
  challengeReasonError: "",
});

useEffect(() => {
  if (existingChallengeForUser?.reason) {
    State.update({
      challengeReason: existingChallengeForUser?.reason,
    });
  }
}, [existingChallengeForUser]);

const { challengeReason, challengeReasonError } = state;

const handleCancelChallenge = () => {
  onCancel();
  State.update({ challengeReason: "", challengeReasonError: "" });
};

const handleSubmitChallenge = () => {
  PotSDK.challengePayouts(potId, challengeReason);
  onClose();
};

const MAX_CHALLENGE_TEXT_LENGTH = 1000;

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      isModalOpen: showChallengePayoutsModal,
      onClose: handleCancelChallenge,
      contentStyle: {
        padding: "0px",
      },
      children: (
        <>
          <ModalHeader>Challenge Payouts</ModalHeader>
          <ModalBody>
            <div>Explain the reason for your challenge</div>
            <Widget
              src={`${ownerId}/widget/Inputs.TextArea`}
              props={{
                noLabel: true,
                inputRows: 5,
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Type the reason for your challenge here",
                value: challengeReason,
                onChange: (challengeReason) => State.update({ challengeReason }),
                validate: () => {
                  if (challengeReason.length > MAX_CHALLENGE_TEXT_LENGTH) {
                    State.update({
                      challengeReasonError: `Challenge reason must be less than ${MAX_CHALLENGE_TEXT_LENGTH} characters`,
                    });
                    return;
                  }

                  State.update({ challengeReasonError: "" });
                },
                error: challengeReasonError,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "tertiary",
                text: "Cancel",
                onClick: handleCancelChallenge,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                text: "Submit Challenge",
                disabled: !challengeReason || !!challengeReasonError,
                onClick: handleSubmitChallenge,
              }}
            />
          </ModalFooter>
        </>
      ),
    }}
  />
);
