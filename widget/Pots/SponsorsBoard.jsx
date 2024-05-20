const { donations, base_currency, hrefWithParams } = props;

const sponsorsLeaderboard = [
  donations.slice(1, 3),
  donations.slice(0, 1),
  donations.slice(3, 5),
].filter((subList) => subList.length > 0);

const { _address } = VM.require("potlock.near/widget/Components.DonorsUtils") || {
  _address: () => "",
};

const { SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  SUPPORTED_FTS: {},
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  min-height: 430px;
  width: 100%;
  .col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .item {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
    border-radius: 12px;
    background: #fef6ee;
    height: 50%;
    padding: 24px;
    font-size: 14px;
    &.first {
      box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.08), 0px 1px 1px -1px rgba(0, 0, 0, 0.12);
      border: 2px solid #dd3345;
      align-items: center;
      text-align: center;
      height: 100%;
      .profile-image {
        width: 64px;
        height: 64px;
      }
      .footer {
        flex-direction: column;
        gap: 1rem;
      }
      .amount {
        font-size: 32px;
        font-family: "Lora";
      }
    }
    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      @media only screen and (max-width: 480px) {
        width: 40px;
        height: 40px;
      }
    }
    .name {
      white-space: nowrap;
      font-weight: 600;
      color: #292929;
      transition: all 300ms;
      font-size: 1rem;
      :hover {
        color: #dd3345;
        text-decoration: none;
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .amount {
      font-size: 22px;
      font-weight: 600;
    }
    .percentage {
      font-size: 1rem;
      background: #f8d3b0;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      height: fit-content;
    }
  }
  @media only screen and (max-width: 960px) {
    gap: 1rem;
    flex-direction: column;
    .col {
      gap: 1rem;
    }
    .col:nth-child(2) {
      order: -1;
    }
  }
`;

const ProfileImg = ({ profile }) => (
  <Widget
    src="mob.near/widget/Image"
    props={{
      image: profile.image,
      style: {},
      className: "profile-image",
      alt: profile.name,
      fallbackUrl:
        "https://ipfs.near.social/ipfs/bafkreidla73cknxbeovrhgb2blax2j2qgcgcn6ibluzza3buq2mbkoqs2e",
    }}
  />
);

const Sponsor = ({ donation: { amount, donor_id, percentage_share }, colIdx }) => {
  const profile = props.profile ?? Social.getr(`${donor_id}/profile`);

  return (
    <div className={`item ${colIdx === 2 && "first"}`}>
      <ProfileImg profile={profile} />
      <a
        href={hrefWithParams(`?tab=profile&accountId=${donor_id}`)}
        target="_blank"
        className="name"
      >
        {_address(profile.name || donor_id, 15)}
      </a>
      <div>{_address(profile.description, colIdx === 2 ? 120 : 35)}</div>
      <div className="footer">
        <div className="amount">{amount} NEAR</div>
        <div className="percentage">{percentage_share}%</div>
      </div>
    </div>
  );
};

return (
  <Container>
    {sponsorsLeaderboard.map((donationsCol, colIdx) => (
      <div className="col">
        {donationsCol.map((donation, idx) => (
          <Sponsor donation={donation} colIdx={colIdx + 1} idx={idx + 1} />
        ))}
      </div>
    ))}
  </Container>
);
