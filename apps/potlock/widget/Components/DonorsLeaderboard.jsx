const { ownerId, donations } = props;
const nearToUsd = props.nearToUsd || 1;

const [page, setPage] = useState(0);
const perPage = 30; // need to be less than 50

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const { getTimePassed, _address, calcDonations, reverseArr } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .transcation {
    display: grid;
    width: 100%;
    overflow-x: scroll;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      gap: 1rem;
      background: var(--primary-color);
      color: white;
      div {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const TrRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #0000003e;
  &:last-of-type {
    border-bottom-color: transparent;
  }
  > div,
  > span {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }

  .price {
    display: flex;
    gap: 4px;
    align-items: center;
    font-weight: 600;
    img {
      width: 14px;
    }
  }
  .address {
    width: 200px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-radius: 2px;
    transition: all 200ms;
    > div {
      margin-right: 1rem;
      margin-left: 0;
    }
    :hover {
      background: var(--primary-color);
      color: white;
    }
  }
`;

const totalDonations = 0;
donations.forEach((donation) => {
  totalDonations += donation.amount;
});

return (
  <Container>
    <div className="transcation">
      <div className="header">
        <div>Rank</div>
        <div style={{ width: "200px" }}>Address</div>
        <div>Amount</div>
        <div>Amount (USD)</div>
        <div>Percentage Share</div>
      </div>
      {donations.slice(page * perPage, (page + 1) * perPage).map((donation, idx) => {
        const { donor_id, amount } = donation;

        return (
          <TrRow>
            <div>#{idx + 1 + page * perPage}</div>

            <a
              href={"https://app.potlock.org/near/widget/ProfilePage?accountId=" + donor_id}
              className="address"
              target="_blank"
            >
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{ accountId: donor_id, style: { width: "2rem", height: "2rem" } }}
              />
              {_address(donor_id)}{" "}
            </a>

            <div className="price">
              {amount.toFixed(2)}

              <img src={nearLogo} alt="NEAR" />
            </div>
            <div>${(amount * nearToUsd).toFixed(2)}</div>
            <div>{((amount * 100) / totalDonations).toFixed(2)}%</div>
          </TrRow>
        );
      })}
    </div>
    <Widget
      src="baam25.near/widget/pagination"
      props={{
        onClick: (page) => {
          setPage(page);
        },
        data: donations,
        page: page,
        perPage: perPage,
        bgColor: "var(--primary-color)",
      }}
    />
  </Container>
);
