const { referrerId, totalAmount, bypassProtocolFee, recipientId, ftIcon } = props;
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

const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const BreakdownSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
  .breakdown-details {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 8px;
    gap: 12px;
    border-radius: 8px;
    border: 1px #dbdbdb solid;
    background: #fafafa;
    transition: all 300ms ease-in-out;
    &.hidden {
      visibility: hidden;
      height: 0;
      opacity: 0;
      transform: translateY(100px);
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const BreakdownTitle = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  word-wrap: break-word;
`;

const ChevronIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  margin-left: 8px;
  transition: all 300ms ease-in-out;
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
  transition: all 300ms ease-in-out;
`;

const BreakdownItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  :first-of-type {
    padding-top: 1rem;
  }
  :last-of-type {
    padding-bottom: 1rem;
  }
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

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const NearIcon = (props) => (
  <SvgIcon
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
  </SvgIcon>
);

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
  (parseFloat(totalAmount) * projectAllocationBasisPoints) / TOTAL_BASIS_POINTS;
const protocolFeePercent = basisPointsToPercent(protocolFeeBasisPoints);
const protocolFeeAmount = (parseFloat(totalAmount) * protocolFeeBasisPoints) / TOTAL_BASIS_POINTS;
const referrerFeePercent = basisPointsToPercent(referralFeeBasisPoints);
const referrerFeeAmount = (parseFloat(totalAmount) * referralFeeBasisPoints) / TOTAL_BASIS_POINTS;

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
      <ChevronIcon
        style={{
          rotate: state.showBreakdown ? "0deg" : "180deg",
        }}
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 0.295013L0 6.29501L1.41 7.70501L6 3.12501L10.59 7.70501L12 6.29501L6 0.295013Z"
          fill="#7B7B7B"
        />
      </ChevronIcon>
    </Header>
    <div
      className={`breakdown-details ${!state.showBreakdown ? "hidden" : ""}`}
      active={state.showBreakdown}
    >
      {!bypassProtocolFee && (
        <BreakdownItem>
          <BreakdownItemLeft>
            Protocol fee ({protocolFeePercent}% to {protocolFeeRecipientAccount})
          </BreakdownItemLeft>
          <BreakdownItemRight>
            <BreakdownAmount>
              {protocolFeeAmount ? protocolFeeAmount.toFixed(2) : "-"}
            </BreakdownAmount>
            {ftIcon ? <Icon src={ftIcon} /> : <NearIcon />}{" "}
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
            {ftIcon ? <Icon src={ftIcon} /> : <NearIcon />}
          </BreakdownItemRight>
        </BreakdownItem>
      )}
      <BreakdownItem>
        <BreakdownItemLeft>On-Chain Storage</BreakdownItemLeft>
        <BreakdownItemRight>
          <BreakdownAmount>{"<0.01"}</BreakdownAmount>
          {ftIcon ? <Icon src={ftIcon} /> : <NearIcon />}
        </BreakdownItemRight>
      </BreakdownItem>
      <BreakdownItem>
        <BreakdownItemLeft>
          Project allocation (~{projectAllocationPercent}% to {recipientId || "project"})
        </BreakdownItemLeft>
        <BreakdownItemRight>
          <BreakdownAmount>~{projectAllocationAmount.toFixed(2)}</BreakdownAmount>
          {ftIcon ? <Icon src={ftIcon} /> : <NearIcon />}
        </BreakdownItemRight>
      </BreakdownItem>
    </div>
  </BreakdownSummary>
);
