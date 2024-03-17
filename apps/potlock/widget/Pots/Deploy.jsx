const { canDeploy, hrefWithParams } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const POT_CODE_LINK = "https://github.com/PotLock/core/tree/main/contracts/pot"; // for directing user to view source code for Pot

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div:last-of-type {
    padding: 0px 175px;
  }
  @media only screen and (max-width: 992px) {
    > div:last-of-type {
      padding: 0px 20px;
    }
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

const HeaderTitle = styled.div`
  color: #292929;
  font-size: 60px;
  font-weight: 400;
  line-height: 72px;
  word-wrap: break-word;
  font-family: Lora;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  justify-content: center;
  min-height: 400px;
  overflow: hidden;
  .background {
    position: absolute;
    pointer-events: none;
    height: 100%;
    left: 0;
    top: 0;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px 175px;
  }
  .sub-title {
    letter-spacing: 1.12px;
    font-weight: 500;
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 24px;
    text-transform: uppercase;
  }
  .title {
    letter-spacing: -0.4px;
    font-weight: 500;
    font-size: 40px;
    font-family: "Lora";
    margin: 0;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    margin-top: 24px;
    > svg {
      height: 1em;
    }
  }

  @media only screen and (max-width: 992px) {
    .content {
      padding: 64px 20px;
    }
    .title {
      font-size: 36px;
    }
    .btns {
      flex-direction: column;
      gap: 1rem;
      margin-top: 24px;
    }
    .line-break {
      display: none;
    }
  }
  @media only screen and (max-width: 480px) {
    .btns a {
      width: 100%;
      padding: 12px 0;
    }
  }
`;

return props.deploymentSuccess || state.deploymentSuccess ? (
  <SuccessContainer>
    <HeaderTitle>Deployment Successful!</HeaderTitle>
    <Widget
      src={`${ownerId}/widget/Components.Button`}
      props={{
        type: "primary",
        text: "View all pots",
        style: props.style || {},
        href: props.hrefWithParams(`?tab=pots`),
      }}
    />
  </SuccessContainer>
) : (
  <Container>
    <HeaderContainer>
      <Widget
        src={`${ownerId}/widget/Pots.HomeBannerBackground`}
        props={{
          className: "background",
        }}
      />
      <div className="content">
        <h3 className="sub-title">Deploy pot</h3>
        <h1 className="title">
          Deploy a Quadratic <br className="line-break" />
          Funding Round
        </h1>
        <div className="info">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z"
              fill="#7B7B7B"
            />
          </svg>

          <div>Know More about Quadratic Funding</div>
        </div>
      </div>
    </HeaderContainer>
    <Widget
      src={`${ownerId}/widget/Pots.ConfigForm`}
      props={{
        ...props,
      }}
    />
  </Container>
);
