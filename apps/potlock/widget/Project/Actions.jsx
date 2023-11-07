const ownerId = "potlock.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const SubRow1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: flex-end;
  gap: 40px;
  width: 66%;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 24px;
  }
`;

const SubRow2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
  width: 33%;
  // background: pink;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 24px;
  }
`;

// const FollowingMobile = styled.div`
//   display: none;

//   @media screen and (max-width: 768px) {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: flex-start;
//     gap: 24px;
//   }
// `;

const existsInCart = props.cart && !!props.cart[props.projectId];

return (
  <Container>
    {/* <FollowingMobile>
      <Widget
        src={`${ownerId}/widget/Project.FollowStats`}
        props={{ accountId: props.projectId }}
      />
      <Widget
        src={`${ownerId}/widget/Project.FollowButton`}
        props={{ accountId: props.projectId }}
      />
    </FollowingMobile> */}
    <SubRow1>
      <Widget
        src={`${ownerId}/widget/Project.FollowStats`}
        props={{ accountId: props.projectId }}
      />
      <Widget
        src={`${ownerId}/widget/Project.FollowButton`}
        props={{ accountId: props.projectId }}
      />
    </SubRow1>
    <SubRow2>
      <Widget
        src={`${ownerId}/widget/Buttons.ActionButton`}
        props={{
          type: "primary",
          text: existsInCart ? "Remove from cart" : "Add to cart",
          onClick: () => {
            if (existsInCart) {
              props.removeProjectsFromCart([props.projectId]);
            } else {
              props.addProjectsToCart([
                { id: props.projectId, amount: "1", ft: "NEAR", referrerId: props.referrerId },
              ]);
              props.setIsCartModalOpen(true);
            }
          },
        }}
      />
    </SubRow2>
  </Container>
);
