const ownerId = "potlock.near";
const potFactoryContractId = "potfactory1.tests.potlock.near"; // TODO: update to production address when contract is deployed to prod

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
`;

const HeaderDescription = styled.div`
  color: #292929;
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
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
  Near.asyncView(potFactoryContractId, "get_pots", {}).then((pots) => {
    State.update({ pots });
    for (let i = 0; i < pots.length; i++) {
      const potId = pots[i].id;
      Near.asyncView(potId, "get_config", {}).then((potConfig) => {
        State.update({ potConfigs: { ...state.potConfigs, [potId]: potConfig } });
      });
    }
  });
}

console.log("state: ", state);

// const pots = Array(5).fill(state.pots[0]);

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
    {/* <Divider /> */}
    {
      state.pots && (
        <Widget
          src={`${ownerId}/widget/Components.ListSection`}
          props={{
            items: state.pots,
            renderItem: (pot) => (
              <Widget
                src={`${ownerId}/widget/Pots.Card`}
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
      )
      // Array(5)
      //   .fill(state.pots[0])
      //     .map((pot) => {
      //       console.log("pot: ", pot);
      //       const potConfig = state.potConfigs[pot.id];
      //       console.log("potConfig: ", potConfig);
      //       if (!potConfig) return null;
      //       return (
      //         <Widget
      //           src={`${ownerId}/widget/Pots.Card`}
      //           props={{
      //             potId: pot.id,
      //             potConfig: state.potConfigs[pot.id],
      //             ...props,
      //             //   style: props.style || {},
      //           }}
      //         />
      //       );
      //     })
    }
  </Container>
);
