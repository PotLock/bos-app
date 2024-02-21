const {
  donations,
  potDetail: { base_currency },
  SUPPORTED_FTS,
} = props;

const Container = styled.div`
  display: flex;
  /* grid-template-columns: repeat(3, 1fr); */
  gap: 10px;
  height: 640px;
  width: 100%;
  .col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: end;
    padding: 8px;
    background: #fef6ee;
    height: 100%;
    .footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .amount {
        color: #525252;
        font-weight: 600;
      }
      .percentage {
        color: #a6a6a6;
        text-decoration-line: underline;
        font-weight: 600;
      }
    }
  }
`;

const SponsorWrapper = styled.div`
  display: flex;
  color: #525252;
  gap: 12px;
  font-weight: 600;
  flex-direction: column;
  align-items: center;
  position: relative;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  > div:first-of-type {
    width: 72px !important;
    height: 72px !important;
    border-radius: 50%;
  }
`;

const SponsorImg = ({ donorId, name }) => (
  <SponsorWrapper>
    <Widget src="mob.near/widget/ProfileImage" props={{ accountId: donorId }} />
    <div>{name}</div>
  </SponsorWrapper>
);

const Sponsor = ({ donation: { total_amount, donor_id, percentage_share } }) => {
  const totalDonationAmount =
    SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_amount);
  return (
    <div className="item">
      <SponsorImg donorId={donor_id} name={donor_id} />
      <div className="footer">
        <div className="amount">{totalDonationAmount} NEAR</div>
        <div className="percentage">{percentage_share.toFixed(2)}%</div>
      </div>
    </div>
  );
};

const sponsorsLeaderboard = [
  [donations[0]],
  [donations[1], donations[2]],
  [donations[3], donations[4], donations[5]],
];
console.log(sponsorsLeaderboard);
return (
  <Container>
    {sponsorsLeaderboard.map(
      (donationsCol) =>
        donationsCol[0] && (
          <div className="col">
            {donationsCol.map((donation) => {
              return donation ? <Sponsor donation={donation} /> : "";
            })}
          </div>
        )
    )}
  </Container>
);
