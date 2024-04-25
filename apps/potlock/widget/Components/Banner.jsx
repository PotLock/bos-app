let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
};

const [activeRounds, setActiveRounds] = useState([]);

PotFactorySDK = PotFactorySDK({ env: props.env });

const pots = PotFactorySDK.getPots();

const now = Date.now();

useEffect(() => {
  if (pots) {
    pots.forEach((pot) => {
      PotSDK.asyncGetConfig(pot.id)
        .then((potConfig) => {
          const { public_round_start_ms, public_round_end_ms } = potConfig;
          if (public_round_start_ms < now && public_round_end_ms > now) {
            setActiveRounds((prevActiveRounds) => [
              ...prevActiveRounds,
              {
                ...potConfig,
                pot_id: pot.id,
              },
            ]);
          }
        })
        .catch((e) => {
          console.error("error getting pot detail: ", e);
        });
    });
  }
}, [pots]);

const Wrapper = styled.div`
  height: ${(props) => (props.active ? "48px" : "0px !important")};
  @media screen and (max-width: 768px) {
    height: 36px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: ${(props) => (props.active ? "48px" : "0px !important")};
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  background: #7fc41e;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    display: flex;
    gap: 1rem;
    .link {
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 4px;
      color: white;
      text-decoration: underline;
      transition: transform 300ms ease-in-out;
      img {
        transition: rotate 300ms ease-in-out;
        height: 1em;
        width: fit-content;
      }
      :hover {
        transform: translateX(4px);
        img {
          rotate: 45deg;
        }
      }
    }
  }
  @media screen and (max-width: 992px) {
    .text {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    height: 36px;
    .text {
      font-size: 12px;
      gap: 0.5rem;
    }
  }
`;
const isSingleRound = activeRounds.length === 1;
const limit = isSingleRound ? 20 : 10;
const potName =
  activeRounds[0].pot_name.length > limit
    ? activeRounds[0].pot_name.slice(0, limit).trim() + "..."
    : activeRounds[0].pot_name;

const textForOneRound = `${potName} round is live`;
const textForMultipleRounds = `Pot round is live for ${potName} and +${
  activeRounds.length - 1
} More`;

return (
  <Wrapper active={!!activeRounds.length}>
    <Container active={!!activeRounds.length}>
      <div className="text">
        {isSingleRound ? textForOneRound : textForMultipleRounds}
        <a
          href={props.hrefWithParams(
            isSingleRound ? `?tab=pot&potId=${activeRounds[0].pot_id}` : `?tab=pots`
          )}
          className="link"
        >
          {isSingleRound ? "Donate" : "Check Now"}
          <img
            src="https://ipfs.near.social/ipfs/bafkreigots5l4o5d3a4zksfimch3gvqw7ezb2quundmjwml33abo5atgwi"
            alt="arrow"
          />
        </a>
      </div>
    </Container>
  </Wrapper>
);
