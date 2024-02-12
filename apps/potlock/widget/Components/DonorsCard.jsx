const { donation, ownerId } = props;
const nearToUsd = props.nearToUsd || 1;

const { _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px #00000081;
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
  font-size: 14px;
  .name {
    font-weight: bold;
    color: var(--primary-color);
  }
  .description {
    color: #b3b3b3;
  }
  .tag {
    position: absolute;
    right: 4px;
    top: 4px;
    background: white;
    border-radius: 2px;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 18px;
      height: auto;
    }
  }
  .background {
    height: 100px;
    width: 100%;
  }
  .profile {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transform: translateY(-50%);
    position: relative;
    :before {
      content: " ";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: url("https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi");
    }
  }
  .amount {
    margin-top: 1rem;
    border: 1px solid #b3b3b3;
    padding: 4px;
    border-radius: 4px;
  }
`;

return (
  <div key={donation} className={donation.className || ""}>
    <Container
      href={"https://near.org/near/widget/ProfilePage?accountId=" + donation.id}
      target="_blank"
    >
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: donation.backgroundImage,
          className: "background",
          alt: donation.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        }}
      />
      <div className="tag">{donation.rank}</div>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: donation.image,
          className: "profile",
          alt: donation.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        }}
      />{" "}
      <a
        href={"https://near.org/near/widget/ProfilePage?accountId=" + recipient_id}
        className="name"
        target="_blank"
      >
        {_address(donation.name)}
      </a>
      <div className="description">{_address(donation.description, 30, 20)}</div>
      <div className="amount">${donation.amount * nearToUsd} Donated</div>
    </Container>
  </div>
);
