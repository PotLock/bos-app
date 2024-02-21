// get donations
const {
  ownerId,
  potId,
  potDetail,
  SUPPORTED_FTS: { NEAR },
} = props;

State.init({
  donations: null,
});

const { donations, allDonations } = state;

if (!allDonations) {
  Near.asyncView(potId, "get_matching_pool_donations", {}).then((donations) => {
    // sort by size)
    donations.sort(
      (a, b) => NEAR.fromIndivisible(b.total_amount) - NEAR.fromIndivisible(a.total_amount)
    );
    // add % share of total to each donation
    const total = NEAR.fromIndivisible(potDetail.matching_pool_balance);
    donations = donations.map((donation) => {
      return {
        ...donation,
        percentage_share: (NEAR.fromIndivisible(donation.net_amount) / total) * 100,
      };
    });
    State.update({ donations });
  });
}

if (!donations) return "Loading...";

const columns = ["Rank", "Donor", "Amount", "Percentage Share"];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  width: 100%;
`;

const OuterTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px rgba(41, 41, 41, 0.5) solid;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2);
  border-radius: 2px;
  width: 100%;
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
  width: ${95 / columns.length}%;
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

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  width: ${95 / columns.length}%;
`;

const RowText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const { base_currency } = potDetail;

const maxRowItemLength = 14;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Pots.SponsorsBoard`}
      props={{
        ...props,
        donations: donations,
      }}
    />
    <TableContainer>
      <Header>
        {columns.map((column, index) => (
          <HeaderItem style={index === 0 ? { width: "5%" } : {}}>
            <HeaderItemText key={index}>{column}</HeaderItemText>
          </HeaderItem>
        ))}
      </Header>
      {donations.length === 0 ? (
        <Row style={{ padding: "12px" }}>No donations to display</Row>
      ) : (
        donations.map((donation, index) => {
          const { donor_id, total_amount, donated_at, percentage_share } = donation;
          const totalDonationAmount =
            props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_amount);

          return (
            <Row key={index}>
              <RowItem style={{ width: "5%" }}>
                <RowText>#{index + 1}</RowText>
              </RowItem>
              <RowItem>
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
                <RowText>
                  {donor_id.length > maxRowItemLength
                    ? donor_id.slice(0, maxRowItemLength) + "..."
                    : donor_id}
                </RowText>
              </RowItem>
              <RowItem>
                <RowText>
                  {totalDonationAmount} {base_currency.toUpperCase()}
                </RowText>
              </RowItem>
              <RowItem>
                <RowText>{percentage_share.toFixed(0)}%</RowText>
              </RowItem>
            </Row>
          );
        })
      )}
    </TableContainer>
  </Container>
);
