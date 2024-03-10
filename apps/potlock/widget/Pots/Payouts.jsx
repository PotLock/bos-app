// get donations
const { potId, potDetail } = props;
// potDetail.cooldown_end_ms = 1710105146000; // TODO: remove this line
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const { getTimePassed } = VM.require(`${ownerId}/widget/Components.DonorsUtils`);

const { calculatePayouts, yoctosToNear } = VM.require("potlock.near/widget/utils") || {
  calculatePayouts: () => {},
  yoctosToNear: () => "",
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  isUserPotAdminOrGreater: () => {},
  getPayoutsChallenges: () => {},
  challengePayouts: () => {},
  adminUpdatePayoutsChallenge: () => {},
};

const userIsAdminOrGreater = PotSDK.isUserPotAdminOrGreater(potId, context.accountId); // TODO: ADD THIS BACK IN
// const userIsAdminOrGreater = true; // TODO: REMOVE THIS LINE

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const ALERT_ICON_URL =
//   IPFS_BASE_URL + "bafkreicqarojxk6jhdtsk2scfsmnigqpxjfgar6om4wlhn5xmqbbu74u5i";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 99%;
  }
  @media screen and (max-width: 390px) {
    width: 98%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const UserLink = styled.a`
  font-weight: 600;
  color: black;

  &:hover {
    text-decoration: underline;
  }
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

const OuterTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media screen and (max-width: 768px) {
    padding-right: 10px;
  }
`;

const OuterText = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 24px;
  letter-spacing: 1.12px;
  word-wrap: break-word;
`;

const Count = styled.div`
  color: #dd3345;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px rgba(41, 41, 41, 0.5) solid;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2);
  border-radius: 6px;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f6f5f3;
  width: 100%;
`;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: flex-start;
  padding: 10px 20px;
  width: ${100 / columns.length}%;
`;

const HeaderItemText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RowItem = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  width: ${100 / columns.length}%;
  &:hover {
    text-decoration: none;
  }
`;

const RowText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-bottom: 1px #dbdbdb solid;
  padding: 12px 24px;
`;

const SearchBar = styled.input`
  background: none;
  width: 100%;
  outline: none;
  border: none;
  color: #525252;
  &:focus {
    outline: none;
    border: none;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  background: ${potDetail.all_paid_out
    ? "green"
    : potDetail.cooldown_end_ms
    ? "#E6B800"
    : "#dd3345"};
  border-radius: 6px;
  gap: 10px;
`;

const WarningText = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 4px;
  }
`;
const AlertSvg = styled.svg`
  width: 24px;
  // @media screen and (max-width: 768px) {
  //   width: 24px;
  // }
`;

const DivLink = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
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

const ChallengesHeaderText = styled.div`
  color: #292929;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 16px;
`;

const ChallengeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 24px;
  border-bottom: 1px #f0f0f0 solid;
  width: 100%;
`;

const payoutsChallenges = PotSDK.getPayoutsChallenges(potId); // TODO: ADD THIS BACK IN
// const payoutsChallenges = [
//   {
//     challenger_id: "lachlan.near",
//     created_at: Date.now(),
//     reason: "I don't think these payouts are accurate",
//     admin_notes: "they are",
//     resolved: true,
//   },
// ]; // TODO: REMOVE THIS

const existingChallengeForUser = (payoutsChallenges || []).find(
  (challenge) => challenge.challenger_id === context.accountId
);
// console.log("payoutsChallenges: ", payoutsChallenges);

State.init({
  allPayouts: null,
  filteredPayouts: null,
  showChallengePayoutsModal: false,
  challengeReason: "",
  challengeReasonError: "",
  adminModalChallengerId: "",
  challengeAdminNotes: "",
  challengeAdminNotesError: "",
  resolveChallenge: false,
});

if (!state.challengeReason && existingChallengeForUser) {
  State.update({ challengeReason: existingChallengeForUser.reason });
}

const allDonationsForPot = Near.view(potId, "get_public_round_donations", {});
if (!state.allPayouts && allDonationsForPot) {
  const calculatedPayouts = calculatePayouts(allDonationsForPot, potDetail.matching_pool_balance);
  console.log("calculated payouts: ", calculatedPayouts);
  if (potDetail.payouts.length) {
    // handle these payouts, which don't contain all the info needed
    // pot payouts contain id, project_id, amount & paid_at
    // loop through potDetail payouts and synthesize the two sets of payouts, so projectId and matchingAmount are taken from potDetail payouts, and donorCount and totalAmount are taken from calculatedPayouts
    const synthesizedPayouts = potDetail.payouts.map((payout) => {
      const { project_id, amount } = payout;
      const { totalAmount, matchingAmount, donorCount } = calculatedPayouts[project_id];
      return {
        projectId: project_id,
        totalAmount,
        matchingAmount: amount,
        donorCount,
      };
    });
    State.update({ allPayouts: synthesizedPayouts, filteredPayouts: synthesizedPayouts });
  } else {
    // calculate estimated payouts
    const allPayouts = Object.entries(calculatedPayouts).map(
      ([projectId, { totalAmount, matchingAmount, donorCount }]) => {
        return {
          projectId,
          totalAmount,
          matchingAmount,
          donorCount,
        };
      }
    ); // TODO: refactor to use PotsSDK (note that this is duplicated in Pots/Projects.jsx)
    allPayouts.sort((a, b) => {
      // sort by matching pool allocation, highest to lowest
      return b.matchingAmount - a.matchingAmount;
    });
    State.update({ allPayouts, filteredPayouts: allPayouts });
  }
}

const columns = ["Project", "Total Raised", "Total Unique Donors", "Matching Pool Allocation"];

const { base_currency } = potDetail;

const searchPayouts = (searchTerm) => {
  // filter payouts that match the search term (donor_id, project_id)
  const filteredPayouts = state.allPayouts.filter((payout) => {
    const { projectId } = payout;
    const searchFields = [projectId];
    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  filteredPayouts.sort((a, b) => {
    // sort by matching pool allocation, highest to lowest
    return b.matchingAmount - a.matchingAmount;
  });
  return filteredPayouts;
};

const handleCancelChallenge = () => {
  State.update({ showChallengePayoutsModal: false, challengeReason: "", challengeReasonError: "" });
};

const handleSubmitChallenge = () => {
  PotSDK.challengePayouts(potId, state.challengeReason);
  State.update({ showChallengePayoutsModal: false });
};

const handleAdminUpdateChallenge = () => {
  PotSDK.adminUpdatePayoutsChallenge(
    potId,
    state.adminModalChallengerId,
    state.challengeAdminNotes,
    state.resolveChallenge
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

const MAX_ACCOUNT_ID_DISPLAY_LENGTH = 20;
const MAX_CHALLENGE_TEXT_LENGTH = 1000;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
    <Row>
      <a
        href="https://github.com/PotLock/bos-app/blob/297df3d99c0d4423b32cb773b3912dd0b670963a/apps/potlock/widget/utils.jsx#L179-L367"
        target="_blank"
        style={{ color: "#2b2b2b" }}
      >
        View payouts calculation code
      </a>
      <OuterTextContainer style={{ alignSelf: "flex-end" }}>
        <OuterText>all payouts</OuterText>
        <Count>{state.allPayouts.length}</Count>
      </OuterTextContainer>
    </Row>
    <InfoContainer>
      <Row style={{ justifyContent: "center" }}>
        <AlertSvg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          aria-hidden="true"
          // width="18px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          ></path>
        </AlertSvg>
        <WarningText>
          {potDetail.all_paid_out
            ? "All payouts have been paid out."
            : potDetail.cooldown_end_ms
            ? "These payouts have been set on the contract but have not been paid out yet."
            : "These payouts are estimated amounts only and have not been set on the contract yet."}
        </WarningText>
      </Row>
      {potDetail.cooldown_end_ms > Date.now() && (
        <DivLink onClick={() => State.update({ showChallengePayoutsModal: true })}>
          {existingChallengeForUser && !existingChallengeForUser.resolved
            ? `Update your challenge (submitted ${getTimePassed(
                existingChallengeForUser.created_at
              )} ago)`
            : "Something doesn't look right? Challenge payouts"}
        </DivLink>
      )}
    </InfoContainer>
    <TableContainer>
      <SearchBarContainer>
        <SearchIcon>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7549 14.2549H14.9649L14.6849 13.9849C15.6649 12.8449 16.2549 11.3649 16.2549 9.75488C16.2549 6.16488 13.3449 3.25488 9.75488 3.25488C6.16488 3.25488 3.25488 6.16488 3.25488 9.75488C3.25488 13.3449 6.16488 16.2549 9.75488 16.2549C11.3649 16.2549 12.8449 15.6649 13.9849 14.6849L14.2549 14.9649V15.7549L19.2549 20.7449L20.7449 19.2549L15.7549 14.2549ZM9.75488 14.2549C7.26488 14.2549 5.25488 12.2449 5.25488 9.75488C5.25488 7.26488 7.26488 5.25488 9.75488 5.25488C12.2449 5.25488 14.2549 7.26488 14.2549 9.75488C14.2549 12.2449 12.2449 14.2549 9.75488 14.2549Z"
              fill="#C7C7C7"
            />
          </svg>
        </SearchIcon>
        <SearchBar
          placeholder="Search payouts"
          onChange={({ target: { value } }) => {
            const filteredPayouts = searchPayouts(value);
            State.update({ filteredPayouts });
          }}
        />
      </SearchBarContainer>
      <Header>
        {/* {columns.map((column, index) => (
          <HeaderItem>
            <HeaderItemText key={index}>{column}</HeaderItemText>
          </HeaderItem>
        ))} */}
        <HeaderItem style={{ width: "40%" }}>
          <HeaderItemText>Project</HeaderItemText>
        </HeaderItem>
        <HeaderItem style={{ width: "20%" }}>
          <HeaderItemText>Total Raised</HeaderItemText>
        </HeaderItem>
        <HeaderItem style={{ width: "20%" }}>
          <HeaderItemText>Unique Donors</HeaderItemText>
        </HeaderItem>
        <HeaderItem style={{ width: "20%" }}>
          <HeaderItemText>Pool Allocation</HeaderItemText>
        </HeaderItem>
      </Header>
      {!state.filteredPayouts ? (
        <div>Loading</div>
      ) : state.filteredPayouts.length === 0 ? (
        <Row style={{ padding: "12px" }}>No payouts to display</Row>
      ) : (
        state.filteredPayouts.map((payout, index) => {
          const { projectId, donorCount, matchingAmount, totalAmount } = payout;
          // const totalDonationAmount =
          //   SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_amount);

          return (
            <Row key={index}>
              {/* Project */}
              <RowItem
                href={`?tab=project&projectId=${projectId}`}
                target={"_blank"}
                style={{ width: "40%" }}
              >
                <Widget
                  src={`${ownerId}/widget/Project.ProfileImage`}
                  props={{
                    ...props,
                    accountId: projectId,
                    style: {
                      height: "24px",
                      width: "24px",
                    },
                  }}
                />
                <RowText>
                  {projectId.length > MAX_ACCOUNT_ID_DISPLAY_LENGTH
                    ? projectId.slice(0, MAX_ACCOUNT_ID_DISPLAY_LENGTH) + "..."
                    : projectId}
                </RowText>
              </RowItem>
              {/* Total Raised */}
              <RowItem style={{ width: "20%" }}>
                <RowText>{yoctosToNear(totalAmount, true)}</RowText>
              </RowItem>
              {/* Total Unique Donors */}
              <RowItem style={{ width: "20%" }}>
                <RowText>{donorCount}</RowText>
              </RowItem>
              {/* Matching Pool Allocation */}
              <RowItem style={{ width: "20%" }}>
                <RowText>{yoctosToNear(matchingAmount, true)}</RowText>
              </RowItem>
            </Row>
          );
        })
      )}
    </TableContainer>
    {}
    <ChallengesHeaderText>Payouts Challenges</ChallengesHeaderText>
    {!payoutsChallenges ? (
      "Loading..."
    ) : payoutsChallenges.length === 0 ? (
      <ChallengeRow>No payouts challenges to display</ChallengeRow>
    ) : (
      payoutsChallenges.map((challenge, index) => {
        const { challenger_id, created_at, reason, admin_notes, resolved } = challenge;
        // console.log("status: ", status);

        return (
          <ChallengeRow
            key={index}
            style={{
              background: resolved ? "#F7FDE8" : "white",
            }}
          >
            <Widget
              src={`${ownerId}/widget/Project.ProfileImage`}
              props={{
                ...props,
                accountId: challenger_id,
                style: {
                  alignSelf: "flex-start",
                  height: "32px",
                  width: "32px",
                },
                // imageWrapperStyle: {
                //   height: "32px",
                //   width: "32px",
                // },
              }}
            />
            <Column style={{ flex: 1 }}>
              <ChallengeRow
                style={{ borderBottom: "none", padding: "0px", justifyContent: "flex-start" }}
              >
                <UserLink href={props.hrefWithParams(`?tab=profile&accountId=${challenger_id}`)}>
                  {challenger_id}
                </UserLink>
                <div style={{ fontSize: "12px" }}>{getTimePassed(created_at) + " ago"}</div>
              </ChallengeRow>
              <div>{reason}</div>
              <div style={{ fontSize: "12px", marginTop: "8px" }}>
                Admin notes: {admin_notes && admin_notes.length > 0 ? admin_notes : "None yet"}
              </div>
              <StatusTextMobile>{resolved ? "Resolved" : "Unresolved"}</StatusTextMobile>
            </Column>
            <StatusText>{resolved ? "Resolved" : "Unresolved"}</StatusText>
            {userIsAdminOrGreater && !resolved && (
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "secondary",
                  text: "Update/Resolve",
                  onClick: () => State.update({ adminModalChallengerId: challenger_id }),
                }}
              />
            )}
          </ChallengeRow>
        );
      })
    )}
    {/* Challenge modal */}
    {state.showChallengePayoutsModal && (
      <Widget
        src={`${ownerId}/widget/Components.Modal`}
        props={{
          isModalOpen: state.showChallengePayoutsModal,
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
                    value: state.challengeReason,
                    onChange: (challengeReason) => State.update({ challengeReason }),
                    validate: () => {
                      if (state.challengeReason.length > MAX_CHALLENGE_TEXT_LENGTH) {
                        State.update({
                          challengeReasonError: `Challenge reason must be less than ${MAX_CHALLENGE_TEXT_LENGTH} characters`,
                        });
                        return;
                      }

                      State.update({ challengeReasonError: "" });
                    },
                    error: state.challengeReasonError,
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
                    disabled: !state.challengeReason || !!state.challengeReasonError,
                    onClick: handleSubmitChallenge,
                  }}
                />
              </ModalFooter>
            </>
          ),
        }}
      />
    )}
    {/* Admin update challenge modal */}
    {state.adminModalChallengerId && (
      <Widget
        src={`${ownerId}/widget/Components.Modal`}
        props={{
          isModalOpen: state.adminModalChallengerId,
          onClose: handleCancelAdminUpdateChallenge,
          contentStyle: {
            padding: "0px",
          },
          children: (
            <>
              <ModalHeader>Update Challenge from {state.adminModalChallengerId}</ModalHeader>
              <ModalBody>
                <HeaderItemText>Challenge Reason:</HeaderItemText>
                <div>
                  {
                    payoutsChallenges.find(
                      (challenge) => challenge.challenger_id === state.adminModalChallengerId
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
                    value: state.challengeAdminNotes,
                    onChange: (challengeAdminNotes) => State.update({ challengeAdminNotes }),
                    validate: () => {
                      if (state.challengeAdminNotes.length > MAX_CHALLENGE_TEXT_LENGTH) {
                        State.update({
                          challengeAdminNotesError: `Notes must be less than ${MAX_CHALLENGE_TEXT_LENGTH} characters`,
                        });
                        return;
                      }

                      State.update({ challengeAdminNotesError: "" });
                    },
                    error: state.challengeAdminNotesError,
                  }}
                />
                <Widget
                  src={`${ownerId}/widget/Inputs.Checkbox`}
                  props={{
                    // id: "registrationSelector",
                    label: "Resolve this challenge?",
                    checked: state.resolveChallenge,
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
                    disabled: !state.challengeAdminNotes || !!state.challengeAdminNotesError,
                    onClick: handleAdminUpdateChallenge,
                  }}
                />
              </ModalFooter>
            </>
          ),
        }}
      />
    )}
  </Container>
);
