const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  justify-content: center;
  border: 1px solid #f8d3b0;
  border-radius: 12px;
  overflow: hidden;
  .background {
    position: absolute;
    pointer-events: none;
    left: 0px;
    width: 100%;
    top: 0px;
    min-height: 600px;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px 40px;
  }
  .sub-title {
    color: #dd3345;
    font-weight: 600;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 12px;
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
    font-size: 14px;
    a,
    button {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: 6px;
      box-shadow: 0px 0px 0px 1px #292929, 0px -2px 0px 0px #292929 inset;
      border: none;
      text-decoration: none;
      color: #292929;
      transition: all 300ms;
      &:hover {
        background: #292929;
        color: white;
      }
    }
    button {
      color: white;
      background: #dd3345;
      &:hover {
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .content {
      padding: 48px 20px;
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
    .btns a,
    button {
      width: 100%;
      padding: 12px 0;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ebebeb;
  margin-top: 1rem;
`;

const { HomeBannerStyle } = VM.require("${config_account}/widget/Pots.HomeBannerBackground") || {
  HomeBannerStyle: {},
};
const { DonationStats } = VM.require("${config_account}/widget/Project.DonationStats") || {
  DonationStats: () => {},
};

const NewHero = ({ isRegisteredProject, accountId, donateRandomly }) => {
  return (
    <Container>
      <HeroContainer
        style={{
          ...HomeBannerStyle,
        }}
      >
        <div className="content">
          <h3 className="sub-title">Transforming Funding for Public Goods</h3>
          <h1 className="title">
            Discover impact projects, donate directly, & <br className="line-break" /> participate
            in funding rounds.
          </h1>
          <div className="btns">
            <button onClick={donateRandomly} className="donate-btn">
              Donate Randomly
            </button>

            <a
              href={
                isRegisteredProject ? `?tab=project&projectId=${accountId}` : "?tab=createproject"
              }
            >
              {isRegisteredProject ? "View Your Project" : "Register Your Project"}
            </a>
          </div>
        </div>
      </HeroContainer>
      <DonationStats />
      <Line />
    </Container>
  );
};

return {
  NewHero,
};
