const [showFundingTable, setShowFundingTable] = useState(true);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > .description {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .external-funding {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #7b7b7b;
    background: #fff;
    transition: all 300ms ease-in-out;
    &.hidden {
      visibility: hidden;
      height: 0;
      opacity: 0;
      transform: translateY(100px);
    }
    .header {
      border-bottom: 0.5px solid #7b7b7b;
      padding: 10px 20px;
      div {
        font-weight: 600;
      }
    }
    .funding-row {
      padding: 20px;
    }
    .header,
    .funding-row {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      font-size: 14px;
      div {
        text-transform: capitalize;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 156px;
        text-align: left;
        &:last-of-type {
          text-align: right;
        }
      }
      .description {
        flex: 1;
        max-width: 100%;
      }
    }
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Arrow = styled.svg`
  width: 12px;
  transition: all 200ms;
`;

const ArrowDown = (props) => (
  <Arrow
    {...props}
    style={{
      rotate: props.showFundingTable ? "" : "180deg",
    }}
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0.294983L0 6.29498L1.41 7.70498L6 3.12498L10.59 7.70498L12 6.29498L6 0.294983Z"
      fill="#151A23"
    />
  </Arrow>
);

const externalTableTabs = ["funding Source", "description", "amount"];
const Funding = [
  {
    src: "James Kritik Moriaty",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
    amount: "USD 3.00",
  },
  {
    src: "James Kritik Moriaty",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
    amount: "NEAR 3.00",
  },
];
return (
  <Container>
    <Title
      style={{
        cursor: "pointer",
      }}
      onClick={() => setShowFundingTable(!showFundingTable)}
    >
      External Funding <ArrowDown showFundingTable={showFundingTable} />
    </Title>
    <div className="description">This not related to the funding generated on this platform</div>
    <div
      className={`
          external-funding ${showFundingTable ? "" : "hidden"}
      `}
    >
      <div className="header">
        {externalTableTabs.map((tab) => (
          <div className={tab} key={tab}>
            {tab}
          </div>
        ))}
      </div>
      {Funding.map(({ src, description, amount }) => (
        <div className="funding-row">
          <div style={{ fontWeight: 600 }}>{src}</div>
          <div className="description">{description}</div>
          <div style={{ fontWeight: 600 }}>{amount}</div>
        </div>
      ))}
    </div>
  </Container>
);
