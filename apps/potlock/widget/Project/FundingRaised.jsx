const { donations } = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const total = useMemo(() => {
  let total = Big(0);
  donations.forEach((donation) => {
    total = total.plus(Big(donation.total_amount));
  });
  return total;
}, [donations]);

const totalDonationAmount = SUPPORTED_FTS["NEAR"].fromIndivisible(total.toString());

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 1rem;
  border-radius: 12px;
  gap: 24px;
  background: #f6f5f3;
  .text {
    font-family: "Lora";
    font-size: 22px;
    font-style: italic;
    font-weight: 500;
    color: #292929;
  }
  img {
    width: 100%;
    max-width: 604px;
  }
  @media screen and (max-width: 768px) {
    padding: 1.5rem 1rem;
    .text {
      font-size: 16px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Line = styled.div`
  width: 100%;
  background: #c7c7c7;
  height: 1px;
  margin: 3rem 0;
`;

const Stats = styled.div`
  display: flex;
  margin: 24px 0;
  .item {
    display: flex;
    gap: 8px;
    padding: 0 1rem;
    :first-of-type {
      padding-left: 0;
      border-right: 1px solid #7b7b7b;
    }
    :last-of-type {
      padding-right: 0;
      border-left: 1px solid #7b7b7b;
    }
  }
  .line {
    width: 1px;
    height: 1.5em;
    background: #7b7b7b;
    margin: 0 1rem;
  }
`;

const stats = {
  donated: "12N",
  "Unique Donors": "3",
  "Total matched ": "3N",
};
const filteredDonations = [
  { potId: "Creative Dao", amount: "2", donate_at: "2days" },
  { donor_id: "baam25.near", amount: "2", donate_at: "2days" },
  { potId: "baam25.near", amount: "2", donate_at: "2days" },
];

return (
  <Container>
    <Widget src={`${ownerId}/widget/Project.ExternalFunding`} />
    <Line />
    <Title>Potlock Funding</Title>
    <Stats>
      {Object.keys(stats).map((k) => (
        <div className="item">
          <div className="item-value">{stats[k]}</div>
          <div className="item-label">{k}</div>
        </div>
      ))}
      {/* <div className="dropdown">
        <Widget
          src={`${ownerId}/widget/Inputs.Dropdown`}
          props={{
            sortVal: title,
            title: (
              <MenuItem className="selected" count={tabs[0].count}>
                {tabs[0].val}{" "}
              </MenuItem>
            ),
            sortList: sortList,
            FilterMenuCustomStyle: `left:auto; right:0;`,
            handleSortChange: ({ val: option }) => {
              setTitle(
                <MenuItem className="selected" count={option.count}>
                  {option.val}
                </MenuItem>
              );
              setTab(option.val);
            },
          }}
        />
      </div> */}
    </Stats>
    <Widget
      src={`${ownerId}/widget/Project.PotlockFunding`}
      props={{ ...props, filteredDonations }}
    />
  </Container>
);

{
  /* 
<NoResults>
    <img
      src="https://ipfs.near.social/ipfs/bafkreif5awokaip363zk6zqrsgmpehs6rap3w67engc4lxdlk4x6iystru"
      alt="pots"
    />
    <div className="text">No funds have been raised for this project.</div>
  </NoResults> */
}
