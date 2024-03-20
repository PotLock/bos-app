const { basisPointsToPercent } = VM.require("potlock.near/widget/utils") || {
  basisPointsToPercent: () => 0,
};
const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const donationContractConfig = DonateSDK.getConfig();

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const CHEVRON_DOWN_URL =
  IPFS_BASE_URL + "bafkreiabkwyfxq6pcc2db7u4ldweld5xcjesylfuhocnfz7y3n6jw7dptm";
const CHEVRON_UP_URL =
  IPFS_BASE_URL + "bafkreibdm7w6zox4znipjqlmxr66wsjjpqq4dguswo7evvrmzlnss3c3vi";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  background: white;
  // background: pink;
  border: 1px solid #dbdbdb;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border-radius: 6px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ItemLeft = styled.div`
  height: 100%;
  padding: 24px 16px;
  // background: green;
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 24px 24px 16px;
  width: 100%;
  // background: yellow;
  border-left: 1px solid #dbdbdb;
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
  overflow: hidden;
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
  overflow-wrap: break-word;
  margin: 16px 0px 24px 0px;
`;

const FtIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const { projectId, checked, handleCheckboxClick } = props;

const profile = props.profile || Social.get(`${projectId}/profile/**`, "final") || {};

State.init({
  showBreakdown: false,
  ftBalances: null,
  denominationOptions: [
    { text: "NEAR", value: "NEAR", selected: cartItem?.token.text === "NEAR", decimals: 24 },
  ],
});

if (!donationContractConfig) return "";

const cartItem = props.cart[projectId];
const isPotDonation = !!cartItem?.potId;

// * REMOVING FTs FROM CHECKOUT FOR NOW *
// const ftBalancesRes = useCache(
//   () =>
//     asyncFetch(
//       `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${context.accountId}/balances/FT`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
//         },
//       }
//     )
//       .then((res) => res.body)
//       .catch((e) => console.log("error fetching ft balances: ", e)),
//   `ft-balances-${context.accountId}`
// );
// console.log("ftBalancesRes: ", ftBalancesRes);

// console.log("state in CheckoutItem: ", state);

// * REMOVING FTs FROM CHECKOUT FOR NOW *
// useEffect(() => {
//   if (context.accountId && !isPotDonation && ftBalancesRes && !state.ftBalances) {
//     State.update({
//       ftBalances: ftBalancesRes.balances,
//       denominationOptions: state.denominationOptions.concat(
//         ftBalancesRes.balances
//           .map(({ amount, contract_account_id, metadata }) => ({
//             amount,
//             id: contract_account_id,
//             text: metadata.symbol,
//             value: metadata.symbol,
//             icon: metadata.icon,
//             decimals: metadata.decimals,
//             selected: false,
//           }))
//           .filter((option) => option.text.length < 10)
//       ),
//     });
//   }
// }, [context.accountId, state.ftBalances, ftBalancesRes, isPotDonation]);

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
        <Row>
          <Title href={props.hrefWithParams(`?tab=project&projectId=${projectId}`)}>
            {profile.name ?? ""}
          </Title>
          <Widget
            src={`${ownerId}/widget/Pots.Tag`}
            props={{
              ...props,
              backgroundColor: isPotDonation ? "#FEF6EE" : "#F6F5F3",
              borderColor: isPotDonation ? "rgba(219, 82, 27, 0.36)" : "#DBDBDB",
              textColor: isPotDonation ? "#EA6A25" : "#292929",
              text: isPotDonation
                ? cartItem.potDetail
                  ? cartItem.potDetail.pot_name
                  : "-"
                : "Direct Donation",
            }}
          />
        </Row>
        <Description>{profile.description ?? ""}</Description>
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Amount",
            placeholder: "0",
            value: cartItem?.amount,
            onChange: (amount) => {
              amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
              if (amount === ".") amount = "0.";
              // error if amount is greater than balance
              props.updateCartItem({
                projectId,
                amount,
                token: cartItem?.token,
                // price: cartItem?.price ?? getPriceUSD(),
                referrerId: cartItem?.referrerId,
                potId: cartItem?.potId,
                potDetail: cartItem?.potDetail,
                note: cartItem?.note,
              }); // TODO: update this to use selected FT ID
            },
            inputStyles: {
              textAlign: "right",
              borderRadius: "0px 4px 4px 0px",
            },
            preInputChildren: (
              <Widget
                src={`${ownerId}/widget/Inputs.Select`}
                props={{
                  noLabel: true,
                  placeholder: "",
                  options: state.denominationOptions,
                  value: { text: cartItem?.token.text, value: cartItem?.token.value },
                  onChange: ({ text, value }) => {
                    const token = state.denominationOptions.find((option) => option.text === text);
                    props.updateCartItem({
                      projectId,
                      amount: undefined,
                      token,
                      // price: cartItem?.price ?? getPriceUSD(),
                      referrerId: cartItem?.referrerId,
                      potId: cartItem?.potId,
                      potDetail: cartItem?.potDetail,
                      note: Storage.get("note"),
                    });
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
                  iconLeft:
                    cartItem?.token.text == "NEAR" ? (
                      <FtIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
                    ) : (
                      <FtIcon src={cartItem?.token.icon} />
                    ),
                }}
              />
            ),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Cart.BreakdownSummary`}
          props={{
            ...props,
            ftIcon: cartItem?.token.icon,
            referrerId,
            totalAmount: cartItem?.amount,
            bypassProtocolFee: false, // TODO: allow user to choose
            containerStyle: { marginTop: "16px" },
          }}
        />
      </DetailsContainer>
    </ItemRight>
  </ItemContainer>
);
