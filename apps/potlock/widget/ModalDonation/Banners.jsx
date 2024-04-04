const AlertBanner = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  color: #ed464f;
  gap: 1rem;
  align-items: center;
  border: 1px solid #f4b37d;
  border-radius: 6px;
  background: #fef6ee;
  margin-top: 1.5rem;
  div {
    font-weight: 500;
  }
  .icon {
    width: 22px;
  }
`;

const NadabotBanner = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid #f4b37d;
  border-radius: 6px;
  background: #fef6ee;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  .label {
    display: flex;
    align-items: center;
    font-weight: 500;
    gap: 1rem;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .verify {
    color: #dd3345;
    font-weight: 500;
    margin-left: auto;
    &:hover {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    .labe {
      align-items: flex-start;
    }
    .verify {
      margin-left: 40px;
    }
  }
`;
const NADA_BOT_ICON = "bafkreicojpp23dmf7hakbt67eah4ba52dx3reekdccaupoggzzlhdkroyi";

const Alert = ({ error }) => (
  <AlertBanner>
    <div className="icon">
      <svg viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 4.49L18.53 17.5H3.47L11 4.49ZM11 0.5L0 19.5H22L11 0.5ZM12 14.5H10V16.5H12V14.5ZM12 8.5H10V12.5H12V8.5Z"
          fill="#F6767A"
        />
      </svg>
    </div>
    <div>{error}</div>
  </AlertBanner>
);

const Nadabot = () => (
  <NadabotBanner>
    <div className="label">
      <img src={`https://ipfs.near.social/ipfs/${NADA_BOT_ICON}`} alt="nadabot" />
      You need to be verified to donate.
    </div>
    <a href="https://app.nada.bot/" target="_blank" className="verify">
      Verify to donate
    </a>
  </NadabotBanner>
);

return {
  Alert,
  Nadabot,
};
