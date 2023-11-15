const ownerId = "potlock.near";
const donationContractId = "donate.potlock.near";

const donationContractConfig = Near.view(donationContractId, "get_config", {});

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
  margin-bottom: 24px;
`;

const FtIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const BreakdownSummary = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  cursor: pointer;
`;

const BreakdownSummaryRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  // background: pink;
  width: 100%;
`;

const BreakdownTitle = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  word-wrap: break-word;
`;

const ChevronIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

const BreakdownDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border: 1px #dbdbdb solid;
  background: #fafafa;
`;

const BreakdownItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const BreakdownItemLeft = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  word-wrap: break-word;
`;

const BreakdownItemRight = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const BreakdownAmount = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  word-wrap: break-word;
`;

const { projectId, checked, handleCheckboxClick } = props;

const profile = props.profile || Social.get(`${projectId}/profile/**`, "final") || {};

State.init({
  showBreakdown: false,
});

const basisPointsToPercent = (basisPoints) => {
  return basisPoints / 100;
};

if (!donationContractConfig) return "";

const {
  protocol_fee_basis_points: protocolFeeBasisPoints,
  referral_fee_basis_points: referralFeeBasisPoints,
  protocol_fee_recipient_account: protocolFeeRecipientAccount,
} = donationContractConfig;
const TOTAL_BASIS_POINTS = 10_000;
let projectAllocationBasisPoints = TOTAL_BASIS_POINTS - protocolFeeBasisPoints;
if (props.cart[projectId]?.referrerId) {
  projectAllocationBasisPoints -= referralFeeBasisPoints;
}
const projectAllocationPercent = basisPointsToPercent(projectAllocationBasisPoints);
const projectAllocationAmount =
  (parseFloat(props.cart[projectId]?.amount) * projectAllocationBasisPoints) / TOTAL_BASIS_POINTS;
const protocolFeePercent = basisPointsToPercent(protocolFeeBasisPoints);
const protocolFeeAmount =
  (parseFloat(props.cart[projectId]?.amount) * protocolFeeBasisPoints) / TOTAL_BASIS_POINTS;
const referrerFeePercent = basisPointsToPercent(referralFeeBasisPoints);
const referrerFeeAmount =
  (parseFloat(props.cart[projectId]?.amount) * referralFeeBasisPoints) / TOTAL_BASIS_POINTS;

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
              amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
              if (amount === ".") amount = "0.";
              props.updateCartItem(
                projectId,
                amount,
                props.cart[projectId]?.ft,
                props.cart[projectId]?.referrerId
              ); // TODO: update this to use selected FT ID
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
                  iconLeft: <FtIcon src={props.SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />,
                }}
              />
            ),
          }}
        />
        <BreakdownSummary onClick={() => State.update({ showBreakdown: !state.showBreakdown })}>
          <BreakdownSummaryRight>
            <BreakdownTitle style={{ fontSize: "14px", lineHeight: "16px" }}>
              {state.showBreakdown ? "Hide" : "Show"} breakdown
            </BreakdownTitle>
            <ChevronIcon src={state.showBreakdown ? CHEVRON_UP_URL : CHEVRON_DOWN_URL} />
          </BreakdownSummaryRight>
          {state.showBreakdown && (
            <BreakdownDetails>
              <BreakdownItem>
                <BreakdownItemLeft>
                  Protocol fee ({protocolFeePercent}% to {protocolFeeRecipientAccount})
                </BreakdownItemLeft>
                <BreakdownItemRight>
                  <BreakdownAmount>
                    {protocolFeeAmount ? protocolFeeAmount.toFixed(3) : "-"}
                  </BreakdownAmount>
                  <FtIcon src={props.SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />
                </BreakdownItemRight>
              </BreakdownItem>
              {props.cart[projectId]?.referrerId && (
                <BreakdownItem>
                  <BreakdownItemLeft>
                    Referrer fee ({referrerFeePercent}% to {props.cart[projectId]?.referrerId})
                  </BreakdownItemLeft>
                  <BreakdownItemRight>
                    <BreakdownAmount>
                      {referrerFeeAmount ? referrerFeeAmount.toFixed(3) : "-"}
                    </BreakdownAmount>
                    <FtIcon src={props.SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />
                  </BreakdownItemRight>
                </BreakdownItem>
              )}
              <BreakdownItem>
                <BreakdownItemLeft>On-Chain Storage</BreakdownItemLeft>
                <BreakdownItemRight>
                  <BreakdownAmount>{"<0.010"}</BreakdownAmount>
                  <FtIcon src={props.SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />
                </BreakdownItemRight>
              </BreakdownItem>
              <BreakdownItem>
                <BreakdownItemLeft>
                  Project allocation (~{projectAllocationPercent}% to {projectId})
                </BreakdownItemLeft>
                <BreakdownItemRight>
                  <BreakdownAmount>
                    ~{projectAllocationAmount ? projectAllocationAmount.toFixed(3) : "-"}
                  </BreakdownAmount>
                  <FtIcon src={props.SUPPORTED_FTS[props.cart[projectId].ft].iconUrl} />
                </BreakdownItemRight>
              </BreakdownItem>
            </BreakdownDetails>
          )}
        </BreakdownSummary>
      </DetailsContainer>
    </ItemRight>
  </ItemContainer>
);
