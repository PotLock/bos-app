const ownerId = "potlock.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  background: white;
  border: 1px solid #dbdbdb;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border-radius: 6px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ItemLeft = styled.div`
  height: 100%;
  padding: 24px 16px;
  border-right: 1px solid #dbdbdb;
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 24px 24px 16px;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.a`
  color: #2e2e2e;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  word-wrap: break-word;
`;

const Description = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: 24px;
`;

const FtIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// const Title = styled(Text)`
//   font-weight: 600;
// `;

// const Description = styled(Text)`
//   font-weight: 400;
// `;

const { projectId, checked, handleCheckboxClick } = props;

const profile = props.profile || Social.get(`${projectId}/profile/**`, "final") || {};
// console.log("profile: ", profile);

// TODO: move this to state to handle selected FT once we support multiple FTs
// TODO: also note this is duplicated in Cart.BreakdownSummary
const SUPPORTED_FTS = {
  NEAR: {
    iconUrl: IPFS_BASE_URL + "bafkreicwkm5y7ojxnnfnmuqcs6ykftq2jvzg6nfeqznzbhctgl4w3n6eja",
    toIndivisible: (amount) => amount * 10 ** 24,
    fromIndivisible: (amount) => amount / 10 ** 24,
  },
};

// console.log("props.cart: ", props.cart);
// console.log("props.cart[projectId]?.ft: ", props.cart[projectId]?.ft);
// console.log("SUPPORTED_FTS[props.cart[projectId].ft]: ", SUPPORTED_FTS[props.cart[projectId].ft]);
// console.log(
//   "SUPPORTED_FTS[props.cart[projectId].ft].iconUrl: ",
//   SUPPORTED_FTS[props.cart[projectId].ft].iconUrl
// );

return (
  <ItemContainer>
    <ItemLeft>
      <Widget
        src={`${ownerId}/widget/Inputs.Checkbox`}
        props={{
          id: "selector-" + projectId,
          checked,
          onClick: handleCheckboxClick,
        }}
      />
    </ItemLeft>
    <ItemRight>
      <ImageContainer>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: projectId,
            style: {
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "24px",
            },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 h-100 d-block",
            thumbnail: false,
          }}
        />
      </ImageContainer>
      <DetailsContainer>
        <Title href={`?tab=project&projectId=${projectId}`}>{profile.name ?? ""}</Title>
        <Description>{profile.description ?? ""}</Description>
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Amount",
            placeholder: "0",
            value: props.cart[projectId]?.amount,
            onChange: (amount) => {
              props.updateCartItem(projectId, amount, props.cart[projectId]?.ft); // TODO: update this to use selected FT ID
            },
            inputStyles: {
              textAlign: "right",
              borderRadius: "0px 4px 4px 0px",
            },
            prefixElement: (
              <Widget
                src={`${ownerId}/widget/Inputs.Select`}
                props={{
                  noLabel: true,
                  placeholder: "",
                  options: [
                    { text: "", value: "" },
                    { text: "NEAR", value: "NEAR" },
                  ],
                  value: { text: props.cart[projectId]?.ft, value: props.cart[projectId]?.ft },
                  onChange: ({ text, value }) => {
                    props.updateCartItem(projectId, undefined, value);
                  },
                  containerStyles: {
                    width: "auto",
                  },
                  inputStyles: {
                    border: "none",
                    borderRight: "1px #F0F0F0 solid",
                    boxShadow: "none",
                    borderRadius: "4px 0px 0px 4px",
                    width: "auto",
                    padding: "12px 16px",
                    boxShadow: "0px -2px 0px rgba(93, 93, 93, 0.24) inset",
                  },
                  iconLeft: <FtIcon src={SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />,
                }}
              />
            ),
          }}
        />
      </DetailsContainer>
    </ItemRight>
  </ItemContainer>
);
