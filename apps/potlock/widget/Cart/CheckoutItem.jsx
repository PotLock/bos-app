const { basisPointsToPercent } = VM.require("potlock.near/widget/utils") || {
  basisPointsToPercent: () => 0,
};
const { SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  SUPPORTED_FTS: {},
};

const { removeItemsFromCart, updateItemInCart } = VM.require(
  "${config_account}/widget/SDK.cart"
) || {
  removeItemsFromCart: () => {},
  updateItemInCart: () => {},
};

const { href } = VM.require("devs.near/widget/lib.url") || {
  href: () => {},
};

const { cartItem, checked, handleCheckboxClick } = props;

const projectId = cartItem?.id;
const isPotDonation = cartItem?.potId;

const profile = props.profile || Social.get(`${projectId}/profile/**`, "final") || {};

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const CHEVRON_DOWN_URL =
  IPFS_BASE_URL + "bafkreiabkwyfxq6pcc2db7u4ldweld5xcjesylfuhocnfz7y3n6jw7dptm";
const CHEVRON_UP_URL =
  IPFS_BASE_URL + "bafkreibdm7w6zox4znipjqlmxr66wsjjpqq4dguswo7evvrmzlnss3c3vi";

const getPriceUSD = () => {
  const res = fetch(`https://api.nearblocks.io/v1/stats`, { mode: "cors" });
  return res.body.stats[0].near_price;
};

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

const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;

const NearIcon = (props) => (
  <Icon
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="near-logo"
  >
    <rect width="24" height="24" rx="12" fill="#CECECE" />
    <path
      d="M15.616 6.61333L13.1121 10.3333C12.939 10.5867 13.2719 10.8933 13.5117 10.68L15.9756 8.53333C16.0422 8.48 16.1354 8.52 16.1354 8.61333V15.32C16.1354 15.4133 16.0155 15.4533 15.9623 15.3867L8.50388 6.45333C8.26415 6.16 7.91787 6 7.53163 6H7.26526C6.5727 6 6 6.57333 6 7.28V16.72C6 17.4267 6.5727 18 7.27858 18C7.71809 18 8.13097 17.7733 8.3707 17.3867L10.8746 13.6667C11.0477 13.4133 10.7148 13.1067 10.475 13.32L8.0111 15.4533C7.94451 15.5067 7.85128 15.4667 7.85128 15.3733V8.68C7.85128 8.58667 7.97114 8.54667 8.02442 8.61333L15.4828 17.5467C15.7225 17.84 16.0821 18 16.4551 18H16.7214C17.4273 18 18 17.4267 18 16.72V7.28C18 6.57333 17.4273 6 16.7214 6C16.2686 6 15.8557 6.22667 15.616 6.61333Z"
      fill="black"
    />
  </Icon>
);

const [itemAmount, setItemAmount] = useState(cartItem?.amount);
const [itemFt, setItemFt] = useState(cartItem?.ft);

return (
  <ItemContainer>
    <ItemLeft>
      <Widget
        src={"${config_account}/widget/Inputs.Checkbox"}
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
          <Title
            href={href({
              widgetSrc: "${config_account}/widget/Index",
              params: {
                tab: "project",
                projectId,
              },
            })}
          >
            {profile.name ?? ""}
          </Title>
          <Widget
            src={"${config_account}/widget/Pots.Tag"}
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
          src={"${config_account}/widget/Inputs.Text"}
          props={{
            label: "Amount",
            placeholder: "0",
            value: itemAmount,
            onChange: (amount) => {
              amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
              if (amount === ".") amount = "0.";
              setItemAmount(amount);
            },
            onBlur: (e) => {
              updateItemInCart({
                ...cartItem,
                amount: e.target.value,
              });
            },
            inputStyles: {
              textAlign: "right",
              borderRadius: "0px 4px 4px 0px",
            },
            preInputChildren: (
              <Widget
                src={"${config_account}/widget/Inputs.Select"}
                props={{
                  noLabel: true,
                  placeholder: "",
                  options: [
                    { text: "", value: "" },
                    { text: "NEAR", value: "NEAR" },
                    { text: "USD", value: "USD" },
                  ],
                  value: { text: itemFt, value: itemFt },
                  onChange: ({ text, value }) => {
                    setItemFt(value);
                    setItemAmount(undefined);
                    updateCartItem({
                      ...cartItem,
                      ft: value,
                      amount: undefined,
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
                  iconLeft: itemFt == "NEAR" ? <NearIcon /> : "$",
                }}
              />
            ),
          }}
        />
        <Widget
          src={"${config_account}/widget/Cart.BreakdownSummary"}
          props={{
            ...props,
            referrerId,
            amountNear: itemAmount,
            bypassProtocolFee: false, // TODO: allow user to choose
            containerStyle: { marginTop: "16px" },
          }}
        />
      </DetailsContainer>
    </ItemRight>
  </ItemContainer>
);
