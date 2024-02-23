const { ownerId, donations, filter } = props;
const [page, setPage] = useState(0);
const perPage = 30; // need to be less than 50

useEffect(() => {
  setPage(0);
}, [filter]);

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const { getTimePassed, _address, calcNetDonationAmount, reverseArr } = VM.require(
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
  width: 100%;
  justify-content: space-between;
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
    color: var(--primary-color);
    font-weight: 500;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 2px;
    transition: all 200ms;
    :hover {
      background: var(--primary-color);
      color: white;
    }
  }
`;

return (
  <Container>
    <div className="transcation">
      <div className="header">
        <div>ID</div>
        <div>Donor ID</div>
        <div>Amount</div>
        <div>Project ID</div>
        <div>Date</div>
      </div>
      {reverseArr(donations)
        .slice(page * perPage, (page + 1) * perPage)
        .map((donation) => {
          const { id, donor_id, recipient_id, donated_at_ms } = donation;

          return (
            <TrRow>
              <div>{id}</div>
              <Widget
                src="near/widget/AccountProfileOverlay"
                props={{
                  accountId: donor_id,
                  children: (
                    <a
                      href={props.hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
                      className="address"
                      target="_blank"
                    >
                      {_address(donor_id)}{" "}
                    </a>
                  ),
                }}
              />
              <div className="price">
                {calcNetDonationAmount(donation).toFixed(2)}

                <img src={nearLogo} alt="NEAR" />
              </div>
              <Widget
                src="near/widget/AccountProfileOverlay"
                props={{
                  accountId: recipient_id,
                  children: (
                    <a
                      href={props.hrefWithParams(`?tab=project&projectId=${recipient_id}`)}
                      Name="address"
                      target="_blank"
                    >
                      {_address(recipient_id)}
                    </a>
                  ),
                }}
              />
              <div>{getTimePassed(donated_at_ms)} ago</div>
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
