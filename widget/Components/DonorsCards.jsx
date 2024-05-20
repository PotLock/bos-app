const { sponsors, sortedDonations, currentTab } = props;

const donations = currentTab === "sponsors" ? sponsors : sortedDonations;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
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
  .profile {
    position: relative;
    transform: translateY(-50%);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .amount {
    margin-top: 1rem;
    border: 1px solid #b3b3b3;
    padding: 4px;
    border-radius: 4px;
  }
`;

const Card = ({ donor }) => {
  const { id, rank, className, amount } = donor;

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
                  "https://ipfs.near.social/ipfs/bafkreidla73cknxbeovrhgb2blax2j2qgcgcn6ibluzza3buq2mbkoqs2e",
              }}
            />
            <div className="tag">{rank}</div>
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: profile.image,
                className: "profile",
                alt: profile.name,
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreiccpup6f2kihv7bhlkfi4omttbjpawnsns667gti7jbhqvdnj4vsm",
              }}
            />
            <a
              href={props.hrefWithParams(`?tab=profile&accountId=${id}`)}
              className="name"
              target="_blank"
            >
              {_address(profile.name ? profile.name : id)}
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
};

const leaderboard = [
  {
    rank: "#2",
    id: donations[1].donor_id,
    amount: donations[1].amount,
  },
  {
    rank: (
      <img
        src="https://ipfs.near.social/ipfs/bafkreicjk6oy6465ps32owoomppfkvimbjlnhbaldvf6ujuyhkjas6ghjq"
        alt="top"
      />
    ),
    id: donations[0].donor_id,
    className: "top",
    amount: donations[0].amount,
  },
  {
    rank: "#3",
    id: donations[2].donor_id,
    amount: donations[2].amount,
  },
];

return (
  <div className="cards">
    {leaderboard.map((donor) => (donor.id ? <Card donor={donor} /> : ""))}
  </div>
);
