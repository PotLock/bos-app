const { donations, base_currency } = props;

const { _address } = VM.require("potlock.near/widget/Components.DonorsUtils") || {
  _address: () => "",
};

const { SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  SUPPORTED_FTS: {},
};

const SponsorOverlayWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 50%;
  transform: translate(0%, -50%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 250px;
  box-shadow: 0px 8px 14px 0px rgba(123, 123, 123, 0.08), 0px 4px 6px 0px rgba(123, 123, 123, 0.14),
    0px 0px 1.5px 0px rgba(123, 123, 123, 0.3), 0px 0px 0.5px 0px rgba(123, 123, 123, 0.3);
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  background: #fff;
  opacity: 0;
  z-index: -1;
  width: 0;
  gap: 10px;
  font-size: 12px;
  .info {
    display: flex;
    * {
      font-weight: 600;
    }
    align-items: center;
    gap: 1.25rem;
    .profile-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .address {
      display: flex;
      flex-direction: column;
      > a {
        color: inherit;
        transition: 300ms ease;

        :hover {
          color: #dd3345;
          text-decoration: none;
        }
      }
      .amount {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        gap: 2rem;
        .precentage {
          color: #a6a6a6;
          font-weight: 500;
        }
      }
    }
  }
  .description {
    color: #525252;
    font-size: 0.75rem;
  }
  @media only screen and (max-width: 768px) {
    right: 0%;
    .info {
      gap: 0.5rem;
      flex-wrap: wrap;
      .profile-image {
        width: 2rem;
        height: 2rem;
      }
      .address .amount {
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  height: 640px;
  width: 100%;
  .col {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &:not(:last-of-type) .item ${SponsorOverlayWrapper} {
      left: 50%;
    }
  }
  .item {
    position: relative;
    display: flex;
    align-items: end;
    padding: 8px;
    background: #fef6ee;
    height: 100%;
    :hover {
      .item-overlay {
        opacity: 1;
      }
      ${SponsorOverlayWrapper} {
        opacity: 1;
        z-index: 2;
        width: 150%;
      }
    }
    .item-overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #dd3345;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 600;
      font-size: 2rem;
      opacity: 0;
      z-index: 1;
      transition: 300ms ease-in-out;
    }
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
  @media only screen and (max-width: 768px) {
    height: 400px;
    .item {
      font-size: 12px;
      .item-overlay {
        font-size: 1rem;
      }
      :hover ${SponsorOverlayWrapper} {
        width: 200%;
      }
    }
    .col:not(:last-of-type) .item ${SponsorOverlayWrapper} {
      left: 0%;
    }
  }
  @media only screen and (max-width: 480px) {
    .item {
      font-size: 0.5rem;
      .item-overlay {
        font-size: 0.75rem;
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
  .profile-image {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    @media only screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
    @media only screen and (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }
  .name {
    white-space: nowrap;
  }
`;

const ProfileImg = ({ profile }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ profile: profile, style: {} }} />
);

const SponsorOverlay = ({
  profile,
  name,
  description,
  account_id,
  total_amount,
  percentage_share,
}) => (
  <SponsorOverlayWrapper>
    <div className="info">
      <ProfileImg profile={profile} />
      <div className="address">
        <a href={props.hrefWithParams(`?tab=profile&accountId=${account_id}`)}>
          {_address(name || account_id, 15)}
        </a>
        <div className="amount">
          <div>{total_amount} NEAR</div>
          <div className="precentage">{percentage_share}%</div>
        </div>
      </div>
    </div>
    <div className="description">{description}</div>
  </SponsorOverlayWrapper>
);

const Sponsor = ({ donation: { amount, donor_id, percentage_share }, colIdx, idx }) => {
  const profile = props.profile ?? Social.getr(`${donor_id}/profile`);

  return (
    <div className="item">
      <SponsorOverlay
        profile={profile}
        name={profile.name}
        description={profile.description}
        account_id={donor_id}
        total_amount={amount}
        percentage_share={percentage_share}
      />
      <div className="item-overlay">{percentage_share}%</div>
      <SponsorWrapper>
        <ProfileImg profile={profile} />
        {colIdx < 3 && <div className="name">{profile.name || donor_id}</div>}
      </SponsorWrapper>
      <div className="footer">
        <div className="amount">{amount} NEAR</div>
        <div className="percentage">{percentage_share}%</div>
      </div>
    </div>
  );
};

const sponsorsLeaderboard = [
  [donations[0]],
  [donations[1], donations[2]],
  [donations[3], donations[4], donations[5]],
];
return (
  <Container>
    {sponsorsLeaderboard.map(
      (donationsCol, colIdx) =>
        donationsCol[0] && (
          <div className="col">
            {donationsCol.map((donation, idx) => {
              return donation ? (
                <Sponsor donation={donation} colIdx={colIdx + 1} idx={idx + 1} />
              ) : (
                ""
              );
            })}
          </div>
        )
    )}
  </Container>
);
