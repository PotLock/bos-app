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

const VerifyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ecc113;
  background: #fbf9c6;
  box-shadow: 0px 2px 1px 1px rgba(255, 255, 255, 0.8) inset,
    0px -2px 4px 0px rgba(15, 15, 15, 0.15) inset;
  font-size: 14px;
  color: #3f2209;
  margin-top: 1.5rem;
  .icon {
    width: 17px;
    display: flex;
    height: fit-content;
    svg {
      width: 100%;
    }
  }
  .text {
    flex: 1;
    line-height: 150%;
  }
  a {
    font-weight: 500;
    color: #dd3345;
    :hover {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 480px) {
    flex-wrap: wrap;
    a {
      width: 100%;
      text-align: center;
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

const VerifyInfo = () => (
  <VerifyInfoWrapper>
    <div className="icon">
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 15.125H17.25L9 0.875L0.75 15.125ZM9.75 12.875H8.25V11.375H9.75V12.875ZM9.75 9.875H8.25V6.875H9.75V9.875Z"
          fill="#ECC113"
        />
      </svg>
    </div>
    <div className="text">
      Your contribution won't be matched unless verified as human before the matching round ends.
    </div>
    <a href="https://app.nada.bot/" target="_blank">
      Verify you’re human
    </a>
  </VerifyInfoWrapper>
);

return {
  Alert,
  Nadabot,
  VerifyInfo,
};
