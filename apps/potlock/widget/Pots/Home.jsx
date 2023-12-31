const { ownerId, POT_FACTORY_CONTRACT_ID } = props;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 48px;
`;

const HeaderTitle = styled.div`
  color: #292929;
  font-size: 60px;
  font-weight: 400;
  line-height: 72px;
  word-wrap: break-word;
  font-family: Lora;
  text-align: center;
`;

const HeaderDescription = styled.div`
  color: #292929;
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  text-align: center;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #ebebeb;
  margin-bottom: 40px;
`;

const userIsWhitelisted = props.QF_WHITELISTED_ACCOUNTS.includes(context.accountId);

State.init({
  pots: null,
  potConfigs: {},
});

if (!state.pots) {
  Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
    State.update({ pots });
    for (let i = 0; i < pots.length; i++) {
      const potId = pots[i].id;
      Near.asyncView(potId, "get_config", {}).then((potConfig) => {
        State.update({ potConfigs: { ...state.potConfigs, [potId]: potConfig } });
      });
    }
  });
}

return (
  <Container>
    <HeaderContent>
      <HeaderTitle>Explore Pots</HeaderTitle>
      <HeaderDescription>
        Donate to matching rounds to get your contributions amplified.
      </HeaderDescription>
      {userIsWhitelisted && (
        <>
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: "Deploy pot",
              style: props.style || {},
              href: `?tab=deploypot`,
            }}
          />
          <props.ToDo>Only show deploy button for admin</props.ToDo>
        </>
      )}
    </HeaderContent>
    {state.pots && (
      <Widget
        src={`${ownerId}/widget/Components.ListSection`}
        props={{
          items: state.pots,
          renderItem: (pot) => (
            <Widget
              src={`${ownerId}/widget/Pots.Card`}
              loading={
                <div
                  style={{
                    width: "320px",
                    height: "500px",
                    borderRadius: "12px",
                    background: "white",
                    boxShadow: "0px -2px 0px #464646 inset",
                    border: "1px solid #292929",
                  }}
                />
              }
              props={{
                ...props,
                potId: pot.id,
                potConfig: state.potConfigs[pot.id],
              }}
            />
          ),
          containerStyle: {
            background: "white",
          },
          listStyle: {
            justifyContent: "center",
          },
        }}
      />
    )}
  </Container>
);
