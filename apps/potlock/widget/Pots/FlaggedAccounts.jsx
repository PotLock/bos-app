const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getFlaggedAccounts: () => {},
};

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
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
  width: 100%;
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
  overflow-y: scroll;
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

const Flag = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #c7c7c7;
  font-size: 14px;
  &:last-of-type {
    border-bottom: none;
  }
  .profile-image {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
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
    a {
      transition: 200ms;
      font-weight: 600;
      color: #292929;
      :hover {
        text-decoration: none;
        color: #dd3345;
      }
    }
  }
  .flagged-account {
    color: #ed464f;
    font-weight: 600;
    :hover {
      text-decoration: none;
    }
  }
  .role {
    color: #656565;
    font-weight: 600;
  }
  .reason {
    color: #656565;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding-left: 2.5rem;
    background: white;
  }
  .dot {
    background: #656565;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  @media only screen and (max-width: 480px) {
    .profile-image {
      margin-right: 0;
    }
    .reason {
      padding-left: 2rem;
    }
  }
`;
const ProfileImg = ({ address }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ accountId: address, style: {} }} />
);

const { potId, hrefWithParams, potDetail } = props;

const [flaggedAddresses, setFlaggedAddresses] = useState(null);
const [toggleView, setToggleView] = useState(null);

if (!flaggedAddresses) {
  PotSDK.getFlaggedAccounts(potDetail, potId)
    .then((data) => {
      const listOfFlagged = [];
      data.forEach((adminFlaggedAcc) => {
        const addresses = Object.keys(adminFlaggedAcc.potFlaggedAcc);
        addresses.forEach((address) => {
          listOfFlagged.push({
            address: address,
            reason: adminFlaggedAcc.potFlaggedAcc[address],
            flaggedBy: adminFlaggedAcc.flaggedBy,
            role: adminFlaggedAcc.role,
          });
        });
      });

      setFlaggedAddresses(listOfFlagged);
    })
    .catch((err) => console.log("error getting the flagged accounts ", err));
}

return !flaggedAddresses ? (
  "Loading..."
) : flaggedAddresses.length === 0 ? (
  ""
) : (
  <>
    <Container>
      <Title onClick={() => setToggleView(!toggleView)}>
        <div>Flagged Accounts</div>
        <div>{flaggedAddresses?.length}</div>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          style={{
            rotate: toggleView ? "0deg" : "180deg",
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
      <Table className={`${!toggleView ? "hidden" : ""}`}>
        {flaggedAddresses.map(({ role, flaggedBy, address, reason }) => (
          <Flag key={flaggedBy}>
            {/* <div className="vertical-line" /> */}
            <div className="content">
              <div className="header">
                <ProfileImg address={flaggedBy} />
                <div className="role">{role}</div>
                <div className="dot" />
                <div className="id">
                  <a href={hrefWithParams(`?tab=profile&accountId=${flaggedBy}`)} target="_blank">
                    {flaggedBy}{" "}
                  </a>
                  has flagged
                </div>
                <a
                  className="flagged-account"
                  href={hrefWithParams(`?tab=profile&accountId=${address}`)}
                  target="_blank"
                >
                  {address}
                </a>
              </div>
              <div className="reason">{reason}</div>
            </div>
          </Flag>
        ))}
      </Table>
    </Container>
    <Line />
  </>
);
