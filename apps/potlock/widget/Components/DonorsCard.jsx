const { donor, ownerId } = props;
const { id, rank, className, amount } = donor;
const { nearToUsdWithFallback } = VM.require("potlock.near/widget/utils") || {
  nearToUsdWithFallback: () => "",
};
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
  > .profile {
    transform: translateY(-50%);
  }
  .amount {
    margin-top: 1rem;
    border: 1px solid #b3b3b3;
    padding: 4px;
    border-radius: 4px;
  }
`;

const profile = Social.getr(`${id}/profile`);

return (
  <div key={donation} className={className || ""}>
    <Container>
      {profile === null ? (
        <div class="spinner-border text-secondary" role="status" />
      ) : (
        <>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.backgroundImage,
              className: "background",
              alt: profile.name,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
            }}
          />
          <div className="tag">{rank}</div>
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              profile,
              style: { width: "4rem", height: "4rem" },
              className: "profile",
            }}
          />{" "}
          <a
            href={props.hrefWithParams(`?tab=profile&accountId=${id}`)}
            className="name"
            target="_blank"
          >
            {profile.name ? _address(profile.name) : id}
          </a>
          <div className="description">
            {profile.description ? _address(profile.description, 20) : "-"}
          </div>
          <div className="amount">{nearToUsdWithFallback(amount)} Donated</div>
        </>
      )}
    </Container>
  </div>
);
