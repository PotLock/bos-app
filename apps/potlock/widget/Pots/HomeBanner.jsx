const { canDeploy, hrefWithParams } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const { HomeBannerBackground } = VM.require("potlock.near/widget/Pots.HomeBannerBackground") || {
  HomeBannerBackground: () => {},
};

const Container = styled.div`
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
    padding: 64px;
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

  .btns {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 40px;
    a {
      padding: 12px 16px;
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: 6px;
      box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
      text-decoration: none;
      color: #292929;
      transition: all 300ms;
      &:first-of-type {
        color: white;
        background: #dd3345;
        &:hover {
        }
      }
      &:hover {
        background: #292929;
        color: white;
      }
    }
  }

  @media only screen and (max-width: 768px) {
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

return (
  <Container>
    <HomeBannerBackground className="background" />

    <div className="content">
      <h3 className="sub-title">Explore Pots</h3>
      <h1 className="title">
        Donate to Matching Rounds <br className="line-break" /> to Get Your Contributions Amplified.
      </h1>
      <div className="btns">
        {canDeploy && <a href={hrefWithParams(`?tab=deploypot`)}>Deploy Pot</a>}
        <a href="https://wtfisqf.com" target="_blank">
          Learn More
        </a>
      </div>
    </div>
  </Container>
);
