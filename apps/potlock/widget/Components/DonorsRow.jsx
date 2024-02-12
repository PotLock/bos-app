const { ownerId, donation } = props;

const { id, donor_id, recipient_id, donated_at_ms } = donation;

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreib2cfbayerbbnoya6z4qcywnizqrbkzt5lbqe32whm2lubw3sywr4";

const { getTimePassed, _address, calcDonations } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #0000003e;
  &:last-of-type {
    border-bottom-color: transparent;
  }
  div,
  span {
    text-align: center;
    margin: auto;
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
    <div>{id}</div>
    <Widget
      src="near/widget/AccountProfileOverlay"
      props={{
        accountId: donor_id,
        children: (
          <a
            href={"https://near.org/near/widget/ProfilePage?accountId=" + donor_id}
            className="address"
            target="_blank"
          >
            {_address(donor_id)}{" "}
          </a>
        ),
      }}
    />
    <div className="price">
      {calcDonations(donation).toFixed(2)}

      <img src={nearLogo} alt="NEAR" />
    </div>
    <Widget
      src="near/widget/AccountProfileOverlay"
      props={{
        accountId: recipient_id,
        children: (
          <a
            href={"https://near.org/near/widget/ProfilePage?accountId=" + recipient_id}
            className="address"
            target="_blank"
          >
            {_address(recipient_id)}
          </a>
        ),
      }}
    />
    <div>{getTimePassed(donated_at_ms)} ago</div>
  </Container>
);
