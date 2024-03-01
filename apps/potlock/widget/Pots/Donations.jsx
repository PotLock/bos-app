// get donations
const { potId, potDetail } = props;
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};
const { getTimePassed, _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  getTimePassed: () => "",
  _address: (address) => address,
};
State.init({
  allDonations: null,
  filteredDonations: [],
});

if (!state.allDonations) {
  Near.asyncView(potId, "get_public_round_donations", {}).then((donations) => {
    donations.sort((a, b) => b.donated_at - a.donated_at);
    State.update({ filteredDonations: donations, allDonations: donations });
  });
}

if (!state.allDonations) return <div class="spinner-border text-secondary" role="status" />;

// console.log("donations: ", donations);

const columns = ["Project", "Donor", "Amount", "Date"];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
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

const DonationsCount = styled.div`
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
  border-radius: 2px;
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

const { base_currency } = potDetail;

const searchDonations = (searchTerm) => {
  // filter donations that match the search term (donor_id, project_id)
  const filteredDonations = state.allDonations.filter((donation) => {
    const { donor_id, project_id } = donation;
    const searchFields = [donor_id, project_id];
    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  return filteredDonations;
};

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
    <OuterTextContainer>
      <OuterText>all donations</OuterText>
      <DonationsCount>{state.allDonations.length}</DonationsCount>
    </OuterTextContainer>
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
          placeholder="Search donations"
          onChange={({ target: { value } }) => {
            const filteredDonations = searchDonations(value);
            State.update({ filteredDonations });
          }}
        />
      </SearchBarContainer>
      <Header>
        {columns.map((column, index) => (
          <HeaderItem>
            <HeaderItemText key={index}>{column}</HeaderItemText>
          </HeaderItem>
        ))}
      </Header>
      {state.filteredDonations.length === 0 ? (
        <Row style={{ padding: "12px" }}>No donations to display</Row>
      ) : (
        state.filteredDonations.map((donation, index) => {
          const { project_id, message, donor_id, total_amount, donated_at } = donation;
          const totalDonationAmount =
            SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_amount);

          return (
            <Row key={index}>
              <RowItem href={`?tab=project&projectId=${project_id}`} target={"_blank"}>
                <Widget
                  src={`${ownerId}/widget/Project.ProfileImage`}
                  props={{
                    ...props,
                    accountId: project_id,
                    style: {
                      height: "24px",
                      width: "24px",
                    },
                  }}
                />
                <RowText>{_address(project_id)}</RowText>
              </RowItem>
              <RowItem href={`?tab=profile&accountId=${donor_id}`} target={"_blank"}>
                <Widget
                  src={`${ownerId}/widget/Project.ProfileImage`}
                  props={{
                    ...props,
                    accountId: donor_id,
                    style: {
                      height: "24px",
                      width: "24px",
                    },
                  }}
                />
                <RowText>{_address(donor_id)}</RowText>
              </RowItem>
              <RowItem>
                <RowText>
                  {totalDonationAmount} {base_currency.toUpperCase()}
                </RowText>
              </RowItem>
              <RowItem>
                <RowText>{getTimePassed(donated_at)} ago</RowText>
              </RowItem>
            </Row>
          );
        })
      )}
    </TableContainer>
  </Container>
);
