const { ownerId, donations, nearToUsd, SUPPORTED_FTS, hrefWithEnv } = props;

const [page, setPage] = useState(0);
const [totalDonation, setTotalDonation] = useState(0);
const [search, setSearch] = useState("");
const perPage = 30; // need to be less than 50

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreicdcpxua47eddhzjplmrs23mdjt63czowfsa2jnw4krkt532pa2ha";

const { getTimePassed, _address, calcNetDonationAmount, reverseArr } = VM.require(
  `${ownerId}/widget/Components.DonorsUtils`
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: white;
  box-shadow: 0px 4px 12px -4px rgba(82, 82, 82, 0.2), 0px 2px 4px -2px rgba(82, 82, 82, 0.3);
  border: 1px solid rgba(41, 41, 41, 0.5);

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
      background: #f6f5f3;
      color: black;
      font-weight: 600;
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
  > div,
  > span {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #292929;
  }

  .price {
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      width: 1.5rem;
    }
  }
  .address {
    width: 200px;
    color: #292929;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-radius: 2px;
    transition: all 200ms;
    > .profile-image {
      margin-right: 1rem;
      margin-left: 0;
    }
    :hover {
      background: #f6f5f3;
    }
  }
`;
const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0;
  .label {
    color: #7b7b7b;
  }
  .item,
  .count {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .amount {
    font-weight: 600;
  }
  .count {
    margin-left: auto;
  }
  .count .amount {
    color: #dd3345;
  }
`;

const Filter = styled.div`
  display: flex;
  position: relative;
  img {
    height: 1rem;
    cursor: pointer;
  }
`;

const Search = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #dbdbdb;
  img {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  input {
    padding: 1rem 0;
    padding-left: 3rem;
    width: 100%;
    &:focus {
      border: none;
      box-shadow: none;
    }
  }
`;

let total = Big(0);
donations.forEach((donation) => {
  total = total.plus(Big(donation.total_amount));
});
const totalDonationAmount = SUPPORTED_FTS["NEAR"].fromIndivisible(total.toString());

const stats = [{ label: "Donated", amount: (totalDonationAmount * nearToUsd).toFixed(2) }];

const SearchBar = () => (
  <Search>
    <img
      src="https://ipfs.near.social/ipfs/bafkreiaayazawvdxdt2f4ahyh3yy3sz622bwwxdnrj32jzkoec7k7jaxza"
      alt="search-icon"
    />
    <input type="text" placeholder="Search donors" onChange={(e) => setSearch(e.target.value)} />
  </Search>
);

return (
  <Container>
    <Stats>
      {stats.map((stat) => (
        <div className="item">
          <div className="amount">${stat.amount}</div>
          <div className="label">{stat.label}</div>
        </div>
      ))}
      <div className="count">
        <div className="label">All DONATIONS</div>
        <div className="amount">{donations.length}</div>
        <Filter>
          <img
            src="https://ipfs.near.social/ipfs/bafkreic33twoqwpwykkvc4bwkdrioeiey3vrie4gwmxahvo7cb2o2lm6ay"
            alt="sort-icon"
          />
        </Filter>
      </div>
    </Stats>
    <SearchBar />
    <Table>
      <div className="transcation">
        <div className="header">
          <div style={{ width: "200px" }}>Project Name</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Extra Fee</div>
        </div>
        {donations
          .slice(page * perPage, (page + 1) * perPage)
          .filter((item) => (item.pot_name || item.recipient_id).toLowerCase().includes(search))
          .map((donation) => {
            const {
              recipient_id,
              total_amount,
              pot_id,
              base_currency,
              ft_id,
              pot_name,
              referrer_fee,
              chef_fee,
              protocol_fee,
            } = donation;

            const isPot = !!pot_id;
            const donationAmount =
              SUPPORTED_FTS[(base_currency || ft_id).toUpperCase()].fromIndivisible(total_amount);

            const projectId = recipient_id || pot_id;
            const url = isPot
              ? `?tab=pot&potId=${pot_id}`
              : `?tab=project&projectId=${recipient_id}`;
            const name = isPot ? pot_name : recipient_id;

            const fees = SUPPORTED_FTS[(base_currency || ft_id).toUpperCase()].fromIndivisible(
              referrer_fee || 0 + chef_fee || 0 + protocol_fee || 0,
              3
            );
            return (
              <TrRow>
                <a href={hrefWithEnv(url)} className="address" target="_blank">
                  {isPot ? (
                    <img
                      className="profile-image"
                      src="https://ipfs.near.social/ipfs/bafkreib447lbtzgo4mbegsush6ybv5evwreeydgmlg2agn6vxlsf5gpmdq"
                      alt="pot"
                    />
                  ) : (
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{ accountId: projectId, style: { width: "2rem", height: "2rem" } }}
                    />
                  )}
                  {_address(name)}{" "}
                </a>
                <div>{isPot ? "Sponsorship" : "Direct Donation"}</div>
                <div className="price">
                  <img src={nearLogo} alt="NEAR" />
                  {donationAmount}
                </div>
                <div className="price">
                  <img src={nearLogo} alt="NEAR" />
                  {fees}
                </div>
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
          bgColor: "#7B7B7B",
        }}
      />
    </Table>
  </Container>
);
