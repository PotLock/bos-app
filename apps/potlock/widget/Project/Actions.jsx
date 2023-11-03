const ownerId = "potlock.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between';
  width: 100%;
`;

const SubRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

const existsInCart = props.cart && !!props.cart[props.projectId];

return (
  <Container className="gx-0">
    <SubRow className="col-4">
      <Widget
        src={`${ownerId}/widget/Buttons.ActionButton`}
        props={{
          type: "secondary",
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
    </SubRow>
    <SubRow className="col-8" style={{ justifyContent: "flex-end" }}>
      <Widget
        src={`${ownerId}/widget/Project.FollowStats`}
        props={{ accountId: props.projectId }}
      />
      <Widget
        src={`${ownerId}/widget/Project.FollowButton`}
        props={{ accountId: props.projectId }}
      />
    </SubRow>
  </Container>
);
