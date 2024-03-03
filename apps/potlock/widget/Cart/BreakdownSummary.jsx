const { referrerId, amountNear, bypassProtocolFee, recipientId } = props;
const { basisPointsToPercent } = VM.require("potlock.near/widget/utils") || {
  basisPointsToPercent: () => 0,
};

const { SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
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
  cursor: pointer;
`;

const Header = styled.div`
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

State.init({
  showBreakdown: false,
});

if (!donationContractConfig) return "";

const {
  protocol_fee_basis_points: protocolFeeBasisPoints,
  referral_fee_basis_points: referralFeeBasisPoints,
  protocol_fee_recipient_account: protocolFeeRecipientAccount,
} = donationContractConfig;

const TOTAL_BASIS_POINTS = 10_000;
let projectAllocationBasisPoints =
  TOTAL_BASIS_POINTS - (bypassProtocolFee ? 0 : protocolFeeBasisPoints);
if (referrerId) {
  projectAllocationBasisPoints -= referralFeeBasisPoints;
}
const projectAllocationPercent = basisPointsToPercent(projectAllocationBasisPoints);
const projectAllocationAmount =
  (parseFloat(amountNear) * projectAllocationBasisPoints) / TOTAL_BASIS_POINTS;
const protocolFeePercent = basisPointsToPercent(protocolFeeBasisPoints);
const protocolFeeAmount = (parseFloat(amountNear) * protocolFeeBasisPoints) / TOTAL_BASIS_POINTS;
const referrerFeePercent = basisPointsToPercent(referralFeeBasisPoints);
const referrerFeeAmount = (parseFloat(amountNear) * referralFeeBasisPoints) / TOTAL_BASIS_POINTS;

const nearIconUrl = SUPPORTED_FTS.NEAR.iconUrl;

return (
  <BreakdownSummary
    style={props.containerStyle || {}}
    onClick={() => State.update({ showBreakdown: !state.showBreakdown })}
  >
    <Header style={props.headerStyle || {}}>
      <BreakdownTitle style={{ fontSize: "14px", lineHeight: "16px" }}>
        {state.showBreakdown ? "Hide" : "Show"} breakdown
      </BreakdownTitle>
      <ChevronIcon src={state.showBreakdown ? CHEVRON_UP_URL : CHEVRON_DOWN_URL} />
    </Header>
    {state.showBreakdown && (
      <BreakdownDetails>
        {!bypassProtocolFee && (
          <BreakdownItem>
            <BreakdownItemLeft>
              Protocol fee ({protocolFeePercent}% to {protocolFeeRecipientAccount})
            </BreakdownItemLeft>
            <BreakdownItemRight>
              <BreakdownAmount>
                {protocolFeeAmount ? protocolFeeAmount.toFixed(2) : "-"}
              </BreakdownAmount>
              <FtIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
            </BreakdownItemRight>
          </BreakdownItem>
        )}
        {referrerId && (
          <BreakdownItem>
            <BreakdownItemLeft>
              Referrer fee ({referrerFeePercent}% to {referrerId})
            </BreakdownItemLeft>
            <BreakdownItemRight>
              <BreakdownAmount>
                {referrerFeeAmount ? referrerFeeAmount.toFixed(2) : "-"}
              </BreakdownAmount>
              <FtIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
            </BreakdownItemRight>
          </BreakdownItem>
        )}
        <BreakdownItem>
          <BreakdownItemLeft>On-Chain Storage</BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownAmount>{"<0.01"}</BreakdownAmount>
            <FtIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
          </BreakdownItemRight>
        </BreakdownItem>
        <BreakdownItem>
          <BreakdownItemLeft>
            Project allocation (~{projectAllocationPercent}% to {recipientId || "project"})
          </BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownAmount>~{projectAllocationAmount.toFixed(2)}</BreakdownAmount>
            <FtIcon src={SUPPORTED_FTS.NEAR.iconUrl} />
          </BreakdownItemRight>
        </BreakdownItem>
      </BreakdownDetails>
    )}
  </BreakdownSummary>
);
