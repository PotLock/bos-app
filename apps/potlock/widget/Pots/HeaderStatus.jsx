const { potDetail } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const [mobileMenuActive, setMobileMenuActive] = useState(false);

const {
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
  cooldown_end_ms,
  all_paid_out,
} = potDetail;

const now = Date.now();

const stats = [
  {
    label: "Applications round",
    daysLeft: application_end_ms,
    started: now >= application_start_ms,
    completed: now > application_end_ms,
    progress:
      now > application_end_ms
        ? 1
        : (now - application_start_ms) / (application_end_ms - application_start_ms),
  },
  {
    label: "Matching round",
    daysLeft: public_round_end_ms,
    started: now >= public_round_start_ms,
    completed: now > public_round_end_ms,
    progress:
      now > public_round_end_ms
        ? 1
        : (now - public_round_start_ms) / (public_round_end_ms - public_round_start_ms),
  },
  {
    label: "Challenge period",
    daysLeft: cooldown_end_ms,
    started: now >= public_round_end_ms,
    completed: now > cooldown_end_ms && !!cooldown_end_ms,
    progress:
      now > cooldown_end_ms && !!cooldown_end_ms
        ? 1
        : (cooldown_end_ms - now) / (public_round_end_ms - cooldown_end_ms),
  },
  {
    label: "Payouts completed",
    daysLeft: null,
    started: null,
    completed: all_paid_out,
    progress: all_paid_out ? 1 : 0,
  },
];

const ProgressBar = ({ progress, completed, started }) => (
  <ProgressBarWrapper>
    <svg viewBox="0 0 160 160" className="circle">
      <circle
        r="70"
        cx="80"
        cy="80"
        fill="transparent"
        stroke={completed ? "#629D13" : started ? "#000000" : "#C7C7C7"}
        strokeWidth="12px"
      ></circle>
      <circle
        r="70"
        cx="80"
        cy="80"
        fill="transparent"
        stroke="#C7C7C7"
        strokeWidth="12px"
        strokeDasharray="439.6px"
        strokeDashoffset={439.6 * progress + "px"}
      ></circle>
    </svg>
    <svg className="check" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.72667 7.05333L0.946667 4.27333L0 5.21333L3.72667 8.94L11.7267 0.94L10.7867 0L3.72667 7.05333Z"
        style={{
          fill: completed ? "#629D13" : started ? "#7B7B7B" : "#C7C7C7",
        }}
      />
    </svg>
  </ProgressBarWrapper>
);

const getIndexOfActive = () => {
  let index;
  stats.forEach((state, idx) => {
    if (state.started && !state.completed) {
      index = idx;
    }
  });
  if (index === null) return 3;
  return index;
};

const containerHeight = 181;
const showActiveState = getIndexOfActive() * (containerHeight / 4);

const Wrapper = styled.div`
  border-top: 1px solid rgb(199 199 199 / 50%);
  border-bottom: 1px solid rgb(199 199 199 / 50%);
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -1px;
  pointer-events: none;
  .spread-indicator {
    height: auto;
    width: 12px;
    transition: all 300ms ease-in-out;
    display: none;
  }
  @media only screen and (max-width: 1100px) {
    pointer-events: all;
    cursor: pointer;
    .spread-indicator {
      display: block;
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  transition: all 300ms ease-in-out;
  .mobile-selected {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem 0;
    transition: all 300ms ease-in-out;
  }
  @media only screen and (max-width: 1100px) {
    justify-content: left;
    height: ${containerHeight / 4}px;
    overflow: hidden;
    .mobile-selected {
      margin: 10px 0;
      transform: translateY(${-showActiveState}px);
      flex-direction: column;
    }
  }
`;

const State = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  font-size: 14px;
  white-space: nowrap;
  color: ${(props) => (props.active ? "#000" : "#7b7b7b")};
  span {
    font-weight: 600;
    color: #dd3345;
  }
`;

const Loader = styled.div`
  position: relative;
  background: #dbdbdb;
  border-radius: 1px;
  height: 4px;
  width: 130px;
  @media only screen and (max-width: 1400px) {
    width: 90px;
  }
  @media only screen and (max-width: 1100px) {
    height: 40px;
    width: 4px;
    position: absolute;
    left: 10px;
    z-index: 0;
    top: 50%;
  }
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  .circle {
    width: 24px;
    height: 24px;
    transform: rotate(-90deg);
  }
  .check {
    width: 12px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  @media only screen and (max-width: 1100px) {
    z-index: 1;
    background: white;
    padding: 2px 0;
  }
`;

return (
  <Wrapper onClick={() => setMobileMenuActive(!mobileMenuActive)}>
    <Container
      style={
        mobileMenuActive
          ? {
              height: containerHeight + "px",
            }
          : {}
      }
    >
      <div
        className="mobile-selected"
        style={
          mobileMenuActive
            ? {
                transform: "translateY(0px)",
              }
            : {}
        }
      >
        {stats.map(({ label, daysLeft, progress, started, completed }, idx) => {
          return (
            <State active={completed || started} key={timeLeft}>
              <ProgressBar progress={progress} started={started} completed={completed} />
              <div>
                {label}
                {!daysLeft && started && <span>pending </span>}
                {started && !completed && daysLeft && (
                  <span>
                    ends in
                    <Widget
                      src={`${ownerId}/widget/Pots.TimeLeft`}
                      props={{
                        daysLeft,
                      }}
                    />
                  </span>
                )}
                {idx === 0 && !started && " hasn’t started"}
              </div>

              <Loader
                style={{
                  background: completed ? "#629D13" : "#dbdbdb",
                  display: idx === 3 ? "none" : "flex",
                }}
              />
            </State>
          );
        })}
      </div>
    </Container>
    <svg
      className="spread-indicator"
      style={{
        rotate: mobileMenuActive ? "180deg" : "0deg",
      }}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.59 0.294922L6 4.87492L1.41 0.294922L0 1.70492L6 7.70492L12 1.70492L10.59 0.294922Z"
        fill="#7B7B7B"
      />
    </svg>
  </Wrapper>
);
