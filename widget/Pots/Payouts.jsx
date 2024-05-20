// get donations
const { potId, potDetail, allDonations } = props;
// potDetail.cooldown_end_ms = 1710105146000; // TODO: remove this line
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const { calculatePayouts, yoctosToNear } = VM.require("potlock.near/widget/utils") || {
  calculatePayouts: () => {},
  yoctosToNear: () => "",
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  isUserPotAdminOrGreater: () => {},
  getPayoutsChallenges: () => {},
  challengePayouts: () => {},
  adminUpdatePayoutsChallenge: () => {},
  getFlaggedAccounts: () => {},
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
  width: 100%;
  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 99%;
  }
  @media screen and (max-width: 390px) {
    width: 98%;
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
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(199, 199, 199, 0.5);
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: flex-start;
  justify-content: space-between;
  width: 110px;
  justify-content: right;
  &.project {
    flex: 1;
    justify-content: left;
  }
  @media only screen and (max-width: 768px) {
    display: none;
    &.project {
      display: flex;
    }
  }
`;

const HeaderItemText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const MobileAmount = styled.div`
  width: 100%;
  margin-left: 2rem;
  display: none;
  max-height: 0px;
  overflow: hidden;
  transition: all 200ms;
  span {
    font-weight: 600;
  }
  @media screen and (max-width: 768px) {
    order: 2;
    display: block;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  gap: 2rem;
  border-top: 1px solid rgba(199, 199, 199, 0.5);
  position: relative;
  .toggle-check {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    display: none;
  }
  .toggle-check:checked ~ svg {
    rotate: 0deg;
  }
  .toggle-check:checked + ${MobileAmount} {
    max-height: 100px;
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
    .toggle-check {
      display: block;
    }
  }
`;

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 110px;
  justify-content: right;
  &:hover {
    text-decoration: none;
  }
  &.project {
    flex: 1;
    display: flex;
    gap: 1rem;
    justify-content: left;
    transition: 200ms;
    a {
      color: #292929;
      font-weight: 600;
      transition: 200ms;
      &:hover {
        color: #dd3345;
        text-decoration: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    &.project {
      gap: 0.5rem;
    }
    &.donors,
    &.amount {
      display: none;
    }
  }
`;

const RowText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  word-wrap: break-word;
  span {
    color: #7b7b7b;
    font-weight: 600;
    display: none;
  }
  @media screen and (max-width: 768px) {
    span {
      display: inline;
    }
    &:last-of-type {
      display: flex;
      gap: 4px;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: #f6f5f3;
  padding: 0.5rem 1rem;
  @media only screen and (max-width: 768px) {
    gap: 8px;
  }
`;

const SearchBar = styled.input`
  background: none;
  width: 100%;
  outline: none;
  border: none;
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
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid #f4b37d;
  border-radius: 6px;
  background: #fef6ee;
  gap: 1rem;
  margin-left: auto;
  margin-bottom: 1.5rem;
`;

const WarningText = styled.div`
  text-align: center;
  color: #dd3345;
  font-weight: 500;
  font-size: 14px;
`;
const AlertSvg = styled.svg`
  width: 18px;
  @media screen and (max-width: 768px) {
    width: 1rem;
  }
`;

State.init({
  allPayouts: null,
  filteredPayouts: null,
  showChallengePayoutsModal: false,
  flaggedAddresses: null,
});

const { allPayouts, filteredPayouts, showChallengePayoutsModal, flaggedAddresses } = state;

if (!flaggedAddresses) {
  PotSDK.getFlaggedAccounts(potDetail, potId)
    .then((data) => {
      const listOfFlagged = [];
      data.forEach((adminFlaggedAcc) => {
        const addresses = Object.keys(adminFlaggedAcc.potFlaggedAcc);
        listOfFlagged.push(...addresses);
      });
      State.update({ flaggedAddresses: listOfFlagged });
    })
    .catch((err) => console.log("error getting the flagged accounts ", err));
}

if (!allPayouts && allDonations && potDetail && flaggedAddresses) {
  calculatePayouts(allDonations, potDetail.matching_pool_balance, flaggedAddresses).then(
    (calculatedPayouts) => {
      console.log("calculated payouts: ", calculatedPayouts);
      if (potDetail.payouts.length) {
        // handle these payouts, which don't contain all the info needed
        // pot payouts contain id, project_id, amount & paid_at
        // loop through potDetail payouts and synthesize the two sets of payouts, so projectId and matchingAmount are taken from potDetail payouts, and donorCount and totalAmount are taken from calculatedPayouts
        const synthesizedPayouts = potDetail.payouts.map((payout) => {
          const { project_id, amount } = payout;
          const { totalAmount, donorCount } = calculatedPayouts[project_id];
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
  );
}

const columns = ["Project", "Total Raised", "Total Unique Donors", "Matching Pool Allocation"];

const { base_currency } = potDetail;

const searchPayouts = (searchTerm) => {
  // filter payouts that match the search term (donor_id, project_id)
  const filteredPayouts = allPayouts.filter((payout) => {
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

const MAX_ACCOUNT_ID_DISPLAY_LENGTH = 10;

const ProfileImage = ({ projectId }) => (
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
);

const Arrow = styled.svg`
  width: 12px;
  rotate: 180deg;
  transition: all 200ms;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const ArrowDown = (props) => (
  <Arrow {...props} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 0.294983L0 6.29498L1.41 7.70498L6 3.12498L10.59 7.70498L12 6.29498L6 0.294983Z"
      fill="#7B7B7B"
    />
  </Arrow>
);

return (
  <Container>
    <Widget src={`${ownerId}/widget/Pots.FlaggedAccounts`} props={props} />
    <Widget src={`${ownerId}/widget/Pots.PayoutsChallenges`} props={props} />

    {!potDetail.all_paid_out && (
      <InfoContainer>
        <AlertSvg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.25 4.25H8.75V5.75H7.25V4.25ZM7.25 7.25H8.75V11.75H7.25V7.25ZM8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
            fill="#EE8949"
          />
        </AlertSvg>

        <WarningText>
          {potDetail.cooldown_end_ms
            ? "These payouts have been set on the contract but have not been paid out yet."
            : "These payouts are estimated amounts only and have not been set on the contract yet."}
        </WarningText>
      </InfoContainer>
    )}
    <TableContainer>
      <Header>
        <HeaderItem className="project">
          <HeaderItemText>Project</HeaderItemText>
        </HeaderItem>
        <HeaderItem>
          <HeaderItemText>Total Raised</HeaderItemText>
        </HeaderItem>
        <HeaderItem>
          <HeaderItemText>Unique Donors</HeaderItemText>
        </HeaderItem>
        <HeaderItem>
          <HeaderItemText>Pool Allocation</HeaderItemText>
        </HeaderItem>
      </Header>
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
      {!filteredPayouts ? (
        <div>Loading</div>
      ) : filteredPayouts.length === 0 ? (
        <Row style={{ padding: "12px" }}>No payouts to display</Row>
      ) : (
        filteredPayouts.map((payout, index) => {
          const { projectId, donorCount, matchingAmount, totalAmount } = payout;

          return (
            <Row key={index}>
              <RowItem className="project">
                <ProfileImage projectId={projectId} />
                <a href={`?tab=project&projectId=${projectId}`} target={"_blank"}>
                  {projectId.length > MAX_ACCOUNT_ID_DISPLAY_LENGTH
                    ? projectId.slice(0, MAX_ACCOUNT_ID_DISPLAY_LENGTH) + "..."
                    : projectId}
                </a>
              </RowItem>
              {/* Total Raised */}
              <RowItem className="amount">
                <RowText>{yoctosToNear(totalAmount, true)}</RowText>
              </RowItem>
              <input type="checkbox" className="toggle-check" />
              <MobileAmount>
                <span>{yoctosToNear(totalAmount, true)}</span> raised from
                <span>{donorCount}</span> unique donors
              </MobileAmount>
              {/* Total Unique Donors */}
              <RowItem className="donors">
                <RowText>{donorCount}</RowText>
              </RowItem>
              {/* Matching Pool Allocation */}
              <RowItem>
                <RowText>
                  {yoctosToNear(matchingAmount, true)} <span>Allocated</span>
                </RowText>
              </RowItem>
              <ArrowDown />
            </Row>
          );
        })
      )}
    </TableContainer>
  </Container>
);
