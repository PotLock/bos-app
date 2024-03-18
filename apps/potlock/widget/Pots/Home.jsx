const { ownerId } = props;

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getContractId: () => {},
    getConfig: () => {},
    getPots: () => {},
    canUserDeployPot: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const potFactoryContractId = PotFactorySDK.getContractId();
const potFactoryConfig = PotFactorySDK.getConfig();
const pots = PotFactorySDK.getPots();
const canDeploy = PotFactorySDK.canUserDeployPot(context.accountId);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 48px;
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 64px;
  }
  @media only screen and (max-width: 768px) {
    .content {
      padding: 0 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 50px;
`;

const Count = styled.div`
  margin-top: 48px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 24px;
  .text {
    font-size: 18px;
    font-weight: 600;
  }
  .line {
    height: 1px;
    flex: 1;
    background: #c7c7c7;
  }
`;

const Attribution = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 147px;
  p {
    font-size: 11px;
    color: #7b7b7b;
  }
  svg {
    width: 20px;
  }
`;

if (!potFactoryConfig) {
  return <div class="spinner-border text-secondary" role="status" />;
}

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Pots.HomeBanner`}
      props={{
        ...props,
        canDeploy,
      }}
    />

    <div className="content">
      <Count>
        <div className="text">All Pots</div>
        <div>{pots.length}</div>
        <div className="line" />
      </Count>
      {pots && (
        <Widget
          src={`${ownerId}/widget/Project.ListSection`}
          props={{
            ...props,
            items: pots,
            renderItem: (pot) => (
              <Widget
                src={`${ownerId}/widget/Pots.Card`}
                props={{
                  ...props,
                  potId: pot.id,
                }}
              />
            ),
            maxCols: 3,
            responsive: [
              {
                breakpoint: 1114,
                items: 2,
              },
              {
                breakpoint: 768,
                items: 1,
              },
            ],
          }}
        />
      )}
      <Attribution>
        <p>USD prices powered by CoinGecko</p>
        <a href="https://www.coingecko.com/" target="_blank">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16H11V14H9V16ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z"
              fill="#7B7B7B"
            />
          </svg>
        </a>
      </Attribution>
    </div>
  </Container>
);
