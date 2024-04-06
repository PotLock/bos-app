const {
  referrerId,
  totalAmount,
  bypassProtocolFee,
  recipientId,
  potRferralFeeBasisPoints,
  ftIcon,
  bypassChefFee,
  chef,
  chefFeeBasisPoints,
} = props;
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
  width: 16px;
  height: 16px;
`;

const BreakdownSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .breakdown-details {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 8px;
    gap: 12px;
    border: 1px #dbdbdb solid;
    border-radius: 8px;
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const BreakdownTitle = styled.div`
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 500;
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
  font-weight: 400;
  word-wrap: break-word;
`;

const BreakdownItemRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
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
  width: 16px;
  height: 16px;
`;

const NearIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_454_78)">
      <circle cx="8" cy="8" r="7.25" stroke="#292929" stroke-width="1.5" />
      <path
        d="M11.1477 4C10.851 4 10.5763 4.15333 10.421 4.406L8.74866 6.88867C8.72453 6.92441 8.71422 6.96772 8.71967 7.01051C8.72511 7.05329 8.74594 7.09264 8.77826 7.1212C8.81057 7.14976 8.85218 7.1656 8.89531 7.16574C8.93844 7.16589 8.98015 7.15034 9.01266 7.122L10.6587 5.69467C10.6683 5.68598 10.6802 5.68028 10.6931 5.67828C10.7059 5.67628 10.719 5.67806 10.7308 5.6834C10.7426 5.68875 10.7526 5.69742 10.7596 5.70836C10.7665 5.7193 10.7702 5.73203 10.77 5.745V10.215C10.77 10.2287 10.7658 10.2421 10.7579 10.2534C10.7501 10.2646 10.7389 10.2732 10.726 10.2778C10.7131 10.2825 10.6991 10.2831 10.6858 10.2795C10.6726 10.2758 10.6608 10.2682 10.652 10.2577L5.67667 4.30167C5.59667 4.20709 5.49701 4.1311 5.38463 4.079C5.27226 4.0269 5.14987 3.99994 5.026 4H4.85233C4.62628 4 4.40949 4.0898 4.24964 4.24964C4.0898 4.40949 4 4.62628 4 4.85233V11.1477C4 11.3333 4.06061 11.5139 4.17263 11.6619C4.28465 11.81 4.44194 11.9174 4.6206 11.9679C4.79926 12.0184 4.98952 12.0091 5.16245 11.9416C5.33538 11.874 5.48152 11.7519 5.57867 11.5937L7.251 9.111C7.27513 9.07525 7.28544 9.03194 7.27999 8.98916C7.27455 8.94637 7.25372 8.90703 7.22141 8.87846C7.18909 8.8499 7.14748 8.83407 7.10435 8.83392C7.06122 8.83377 7.01951 8.84932 6.987 8.87766L5.341 10.3053C5.33134 10.3139 5.31939 10.3195 5.3066 10.3215C5.29381 10.3234 5.28074 10.3216 5.26898 10.3162C5.25721 10.3108 5.24726 10.3021 5.24034 10.2912C5.23342 10.2803 5.22983 10.2676 5.23 10.2547V5.784C5.22997 5.77027 5.23418 5.75687 5.24206 5.74563C5.24993 5.73438 5.26109 5.72584 5.274 5.72117C5.28691 5.71651 5.30094 5.71594 5.31419 5.71955C5.32743 5.72315 5.33924 5.73076 5.348 5.74133L10.3227 11.698C10.4847 11.8893 10.7227 11.9997 10.9733 12H11.147C11.373 12.0001 11.5898 11.9104 11.7498 11.7507C11.9097 11.591 11.9997 11.3744 12 11.1483V4.85233C11.9999 4.62631 11.9101 4.40956 11.7503 4.24974C11.5904 4.08992 11.3737 4.00009 11.1477 4Z"
        fill="#292929"
      />
    </g>
    <defs>
      <clipPath id="clip0_454_78">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

State.init({
  showBreakdown: true,
});

if (!donationContractConfig) return "";

const {
  protocol_fee_basis_points,
  referral_fee_basis_points,
  protocol_fee_recipient_account: protocolFeeRecipientAccount,
} = donationContractConfig;

const protocolFeeBasisPoints = props.protocolFeeBasisPoints ?? protocol_fee_basis_points;
const referralFeeBasisPoints = potRferralFeeBasisPoints || props.referralFeeBasisPoints;

const TOTAL_BASIS_POINTS = 10_000;
let projectAllocationBasisPoints =
  TOTAL_BASIS_POINTS -
  (bypassProtocolFee || !protocolFeeBasisPoints ? 0 : protocolFeeBasisPoints) -
  (bypassChefFee || !chefFeeBasisPoints ? 0 : chefFeeBasisPoints);
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
const chefFeePercent = basisPointsToPercent(chefFeeBasisPoints);
const chefFeeAmount = (parseFloat(totalAmount) * chefFeeBasisPoints) / TOTAL_BASIS_POINTS;

const fees = [
  {
    label: "Protocol fee",
    percentage: protocolFeePercent,
    amount: protocolFeeAmount,
    show: !bypassProtocolFee,
  },
  {
    label: "Referrer fee",
    percentage: referrerFeePercent,
    amount: referrerFeeAmount,
    show: referrerId,
  },
  {
    label: "Chef fee",
    percentage: chefFeePercent,
    amount: chefFeeAmount,
    show: !bypassChefFee && chefFeeBasisPoints,
  },
  {
    label: "On-Chain Storage",
    percentage: "",
    amount: "<0.01",
    show: true,
  },
  {
    label: "Project allocation",
    percentage: projectAllocationPercent,
    amount: projectAllocationAmount,
    show: true,
  },
];

return (
  <BreakdownSummary
    style={props.containerStyle || {}}
    // onClick={() => State.update({ showBreakdown: !state.showBreakdown })}
  >
    <Header style={props.headerStyle || {}}>
      <BreakdownTitle> Breakdown</BreakdownTitle>
    </Header>
    <div
      className={`breakdown-details ${!state.showBreakdown ? "hidden" : ""}`}
      active={state.showBreakdown}
    >
      {fees.map(({ show, amount, label, percentage }) => {
        return show ? (
          <BreakdownItem key={label}>
            <BreakdownItemLeft>
              {label} {percentage ? `(${percentage}%)` : ""}{" "}
            </BreakdownItemLeft>
            <BreakdownItemRight>
              <BreakdownAmount>{typeof amount === "string" ? amount : amount}</BreakdownAmount>
              {ftIcon ? <Icon src={ftIcon} alt="ft-icon" /> : <NearIcon />}
            </BreakdownItemRight>
          </BreakdownItem>
        ) : (
          ""
        );
      })}
    </div>
  </BreakdownSummary>
);
