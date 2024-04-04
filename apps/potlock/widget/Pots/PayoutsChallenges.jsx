const { potId, hrefWithParams } = props;

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getPayoutsChallenges: () => {},
  adminUpdatePayoutsChallenge: () => {},
  isUserPotAdminOrGreater: () => false,
};

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { getTimePassed } = VM.require(`potlock.near/widget/Components.DonorsUtils`) || {
  getTimePassed: () => "",
};
const payoutsChallenges = PotSDK.getPayoutsChallenges(potId); // TODO: ADD THIS BACK IN

const userIsAdminOrGreater = PotSDK.isUserPotAdminOrGreater(potId, context.accountId); // TODO: ADD THIS BACK IN

State.init({
  adminModalChallengerId: "",
  challengeAdminNotes: "",
  challengeAdminNotesError: "",
  resolveChallenge: false,
  toggleChallenges: false,
});

const {
  adminModalChallengerId,
  challengeAdminNotes,
  challengeAdminNotesError,
  resolveChallenge,
  toggleChallenges,
} = state;

const MAX_CHALLENGE_TEXT_LENGTH = 1000;

const handleAdminUpdateChallenge = () => {
  PotSDK.adminUpdatePayoutsChallenge(
    potId,
    adminModalChallengerId,
    challengeAdminNotes,
    resolveChallenge
  );
  State.update({
    adminModalChallengerId: "",
    challengeAdminNotes: "",
    challengeAdminNotesError: "",
    resolveChallenge: false,
  });
};

const handleCancelAdminUpdateChallenge = () => {
  State.update({
    adminModalChallengerId: "",
    challengeAdminNotes: "",
    challengeAdminNotesError: "",
    resolveChallenge: false,
  });
};

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #c7c7c7;
  margin: 3rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 1.5rem;
  div:first-of-type {
    font-weight: 600;
  }
  svg {
    rotate: 180deg;
    transition: all 300ms ease-in-out;
  }
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  transition: max-height 400ms ease-in-out;
  overflow: hidden;
  max-height: 1000px;
  opacity: 1;
  &.hidden {
    opacity: 0;
    max-height: 0;
  }
`;

const Challenge = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #c7c7c7;
  font-size: 14px;
  &:last-of-type {
    border-bottom: none;
  }
  .vertical-line {
    height: 100%;
    background: #c7c7c7;
    width: 1px;
    transform: translateX(0.75rem);
    z-index: -1;
  }
  .profile-image {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  .admin-icon {
    margin-right: 0.75rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
  .id {
    font-weight: 600;
    color: #292929;
    transition: 200ms;
    :hover {
      text-decoration: none;
      color: #dd3345;
    }
  }
  .title {
    font-weight: 600;
    color: #8b5af8;
  }
  .reason {
    color: #7b7b7b;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding-left: 2.5rem;
    background: white;
  }
  .admin-header {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .dot {
    background: #7b7b7b;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  .resolved-state {
    font-weight: 600;
  }
  .resolve-btn {
    cursor: pointer;
    background: none;
    border: none;
  }
  @media only screen and (max-width: 480px) {
    .profile-image {
      margin-right: 0;
    }
    .admin-icon {
      margin-right: 0.25rem;
    }
    .reason {
      padding-left: 2rem;
    }
    .date {
      width: 100%;
      margin-top: -0.5rem;
      padding-left: 2rem;
    }
  }
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

const HeaderItemText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const AdminSVG = () => (
  <div className="admin-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_10044_14103" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" />
      </mask>
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#656565"
      />
      <path
        d="M-0.666667 12C-0.666667 5.00439 5.00439 -0.666667 12 -0.666667C18.9956 -0.666667 24.6667 5.00439 24.6667 12H23.3333C23.3333 5.74077 18.2592 0.666667 12 0.666667C5.74077 0.666667 0.666667 5.74077 0.666667 12H-0.666667ZM24.6667 12.6667C24.6667 19.6623 18.9956 25.3333 12 25.3333C5.00439 25.3333 -0.666667 19.6623 -0.666667 12.6667L0.666667 12C0.666667 17.891 5.74077 22.6667 12 22.6667C18.2592 22.6667 23.3333 17.891 23.3333 12L24.6667 12.6667ZM12 25.3333C5.00439 25.3333 -0.666667 19.6623 -0.666667 12.6667V12C-0.666667 5.00439 5.00439 -0.666667 12 -0.666667V0.666667C5.74077 0.666667 0.666667 5.74077 0.666667 12C0.666667 17.891 5.74077 22.6667 12 22.6667V25.3333ZM12 -0.666667C18.9956 -0.666667 24.6667 5.00439 24.6667 12V12.6667C24.6667 19.6623 18.9956 25.3333 12 25.3333V22.6667C18.2592 22.6667 23.3333 17.891 23.3333 12C23.3333 5.74077 18.2592 0.666667 12 0.666667V-0.666667Z"
        fill="#292929"
        mask="url(#path-1-inside-1_10044_14103)"
      />
      <path
        d="M9.20029 12.7527L11.087 10.866L6.40695 6.19268C5.36695 7.23268 5.36695 8.91935 6.40695 9.96601L9.20029 12.7527ZM13.7203 11.546C14.7403 12.0193 16.1736 11.686 17.2336 10.626C18.507 9.35268 18.7536 7.52601 17.7736 6.54601C16.8003 5.57268 14.9736 5.81268 13.6936 7.08601C12.6336 8.14601 12.3003 9.57935 12.7736 10.5993L6.26695 17.106L7.20695 18.046L11.8003 13.466L16.387 18.0527L17.327 17.1127L12.7403 12.526L13.7203 11.546Z"
        fill="white"
      />
    </svg>
  </div>
);
const ProfileImg = ({ address }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: address, style: {} }} />
);

console.log("payoutsChallenges", payoutsChallenges);

return !payoutsChallenges ? (
  "Loading..."
) : payoutsChallenges.length === 0 ? (
  ""
) : (
  <>
    <Container>
      <Title
        onClick={() =>
          State.update({
            toggleChallenges: !toggleChallenges,
          })
        }
      >
        <div>Payout Challenges</div>
        <div>{payoutsChallenges?.length}</div>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          style={{
            rotate: toggleChallenges ? "0deg" : "180deg",
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 0.294922L0 6.29492L1.41 7.70492L6 3.12492L10.59 7.70492L12 6.29492L6 0.294922Z"
            fill="#151A23"
          />
        </svg>
      </Title>
      <Table className={`${!toggleChallenges ? "hidden" : ""}`}>
        {payoutsChallenges.map(({ challenger_id, admin_notes, created_at, reason, resolved }) => (
          <Challenge key={challenger_id}>
            {/* <div className="vertical-line" /> */}
            <div className="content">
              <div className="header">
                <ProfileImg address={challenger_id} />
                <a className="id" href={hrefWithParams(`?tab=profile&accountId=${challenger_id}`)}>
                  {challenger_id}
                </a>
                <div className="title">Challenged payout</div>
                <div className="date"> {getTimePassed(created_at)}</div>
              </div>
              <div className="reason">{reason}</div>
              <div className="admin-header">
                <AdminSVG />
                <div
                  className="resolved-state"
                  style={{
                    color: resolved ? "#4a7714" : "#C7C7C7",
                  }}
                >
                  {resolved ? "Resolved" : "Unresolved"}
                </div>

                {resolved ? (
                  <>
                    <div className="dot" />
                    <div>1 Response</div>
                  </>
                ) : userIsAdminOrGreater ? (
                  <>
                    <div className="dot" />
                    <button
                      className="resolve-btn"
                      onClick={() => State.update({ adminModalChallengerId: challenger_id })}
                    >
                      Reply
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="reason">{admin_notes}</div>
            </div>
          </Challenge>
        ))}
      </Table>
      {/* Admin update challenge modal */}
      <Widget
        src={`${ownerId}/widget/Components.Modal`}
        props={{
          isModalOpen: adminModalChallengerId,
          onClose: handleCancelAdminUpdateChallenge,
          contentStyle: {
            padding: "0px",
          },
          children: (
            <>
              <ModalHeader>Update Challenge from {adminModalChallengerId}</ModalHeader>
              <ModalBody>
                <HeaderItemText>Challenge Reason:</HeaderItemText>
                <div>
                  {
                    payoutsChallenges.find(
                      (challenge) => challenge.challenger_id === adminModalChallengerId
                    ).reason
                  }
                </div>
                <Widget
                  src={`${ownerId}/widget/Inputs.TextArea`}
                  props={{
                    noLabel: true,
                    inputRows: 5,
                    inputStyle: {
                      background: "#FAFAFA",
                    },
                    placeholder: "Respond to the challenge here",
                    value: challengeAdminNotes,
                    onChange: (challengeAdminNotes) => State.update({ challengeAdminNotes }),
                    validate: () => {
                      if (challengeAdminNotes.length > MAX_CHALLENGE_TEXT_LENGTH) {
                        State.update({
                          challengeAdminNotesError: `Notes must be less than ${MAX_CHALLENGE_TEXT_LENGTH} characters`,
                        });
                        return;
                      }

                      State.update({ challengeAdminNotesError: "" });
                    },
                    error: challengeAdminNotesError,
                  }}
                />
                <Widget
                  src={`${ownerId}/widget/Inputs.Checkbox`}
                  props={{
                    // id: "registrationSelector",
                    label: "Resolve this challenge?",
                    checked: resolveChallenge,
                    onClick: (e) => {
                      State.update({
                        resolveChallenge: e.target.checked,
                      });
                    },
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "tertiary",
                    text: "Cancel",
                    onClick: handleCancelAdminUpdateChallenge,
                  }}
                />
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "primary",
                    text: "Submit",
                    disabled: !challengeAdminNotes || !!challengeAdminNotesError,
                    onClick: handleAdminUpdateChallenge,
                  }}
                />
              </ModalFooter>
            </>
          ),
        }}
      />
    </Container>
    <Line />
  </>
);
