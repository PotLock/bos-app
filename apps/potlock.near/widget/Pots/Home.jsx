const { getConfig, getPots, canUserDeployPot } =
  VM.require("${config/account}/widget/SDK.potfactory") ||
  (() => ({
    getConfig: () => {},
    getPots: () => {},
    canUserDeployPot: () => {},
  }));
const potFactoryContractId = "${alias/potFactoryContractId}";
const potFactoryConfig = getConfig();
const pots = getPots();
const canDeploy = canUserDeployPot(context.accountId);

const { href } = VM.require("${config/account}/widget/utils") || {
  href: () => {},
};

const loraCss = fetch(
  "https://fonts.googleapis.com/css2?family=Lora&display=swap"
).body;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 48px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 100px 48px;
  background: #f6f5f3;
  width: 100%;
`;

const HeaderTitle = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  word-wrap: break-word;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
`;

const HeaderDescription = styled.div`
  color: #292929;
  font-size: 44px;
  font-weight: 400;
  line-height: 56px;
  word-wrap: break-word;
  text-align: center;
  font-family: "Lora";
  ${loraCss}
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #ebebeb;
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 50px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const IconArrow = styled.img`
  width: 50px;
  height: 50px;
`;

const containerStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100%;
  gap: 20px;
  margin-top: -20px;
  &::before,
  &::after {
    @include white-gradient;
    content: "";
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  &::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }
`;

if (!potFactoryConfig) {
  return <div class="spinner-border text-secondary" role="status" />;
}

//console.log("props", state.pots);
return (
  <Container>
    <HeaderContent>
      <HeaderTitle>Explore Pots</HeaderTitle>
      <HeaderDescription>
        Donate to matching rounds <br />
        to get your contributions amplified.
      </HeaderDescription>
      <Row>
        {canDeploy && (
          <Widget
            src={"${config/account}/widget/Components.Button"}
            props={{
              type: "primary",
              text: "Deploy Pot",
              href: href({ params: { tab: "deploypot", referallId: props.referralId, env: props.env }}),
            }}
          />
        )}
        <Widget
          src={"${config/account}/widget/Components.Button"}
          props={{
            type: canDeploy ? "secondary" : "primary",
            text: "Learn More",
            href: "https://potlock.org/chef-training",
            target: "_blank",
          }}
        />
      </Row>
    </HeaderContent>
    {/* <Content>
      <Title>Featured Pots</Title>
      <Icon>
        <IconArrow
          src="https://img.icons8.com/ios/50/circled-left--v1.png"
          alt="circled-left--v1"
        />
        <IconArrow
          src="https://img.icons8.com/ios/50/circled-right--v1.png"
          alt="circled-left--v1"
        />
      </Icon>
    </Content>
    <containerStyle>
      {state.pots.map((pot) => (
        <Widget
          src={"${config/account}/widget/Pots.Card"}
          // loading={
          //   <div
          //     style={{
          //       width: "320px",
          //       height: "500px",
          //       borderRadius: "12px",
          //       background: "white",
          //       boxShadow: "0px -2px 0px #464646 inset",
          //       border: "1px solid #292929",
          //     }}
          //   />
          // }
          props={{
            ...props,
            potId: pot.id,
            potConfig: state.potConfigs[pot.id],
          }}
        />
      ))}
    </containerStyle> */}

    {pots && (
      <Widget
        src={"${config/account}/widget/Project.ListSection"}
        props={{
          ...props,
          items: pots,
          renderItem: (pot) => (
            <Widget
              src={"${config/account}/widget/Pots.Card"}
              props={{
                ...props,
                potId: pot.id,
              }}
            />
          ),
          maxCols: 2,
        }}
      />
    )}
  </Container>
);
