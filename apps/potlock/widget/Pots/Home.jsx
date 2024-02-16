const { ownerId, POT_FACTORY_CONTRACT_ID } = props;

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

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

State.init({
  pots: null,
  potConfigs: {},
  potFactoryConfig: null,
});
if (!state.pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    State.update({ pots });
  });
}
if (!state.potFactoryConfig) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_config", {}).then((potFactoryConfig) => {
    State.update({ potFactoryConfig });
  });
}

// console.log("state: ", state);
// console.log("props: ", props);

if (!state.potFactoryConfig) {
  return <div class="spinner-border text-secondary" role="status" />;
}
// user can deploy a pot if !potConfig.require_whitelist or potConfig.whitelisted_deployers.includes(context.accountId)
const canDeploy =
  !state.potFactoryConfig.require_whitelist ||
  state.potFactoryConfig.whitelisted_deployers.includes(context.accountId);

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
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: "Deploy Pot",
              href: props.hrefWithEnv(`?tab=deploypot`),
            }}
          />
        )}
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: canDeploy ? "secondary" : "primary",
            text: "Learn More",
            href: "https://potlock.org/chef-training",
            target: "_blank",
          }}
        />
      </Row>
    </HeaderContent>
    {state.pots && (
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          ...props,
          items: state.pots,
          itemsAll: state.potConfigs,
          renderItem: (pot) => (
            <Widget
              src={`${ownerId}/widget/Pots.Card`}
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
          ),
          maxCols: 2,
          // containerStyle: {
          //   background: "white",
          // },
          // listStyle: {
          //   justifyContent: "center",
          // },
        }}
      />
    )}
  </Container>
);
