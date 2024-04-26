const { onClose } = props;
const {
  ownerId,
  SUPPORTED_FTS: { NEAR },
  IPFS_BASE_URL,
  NADABOT_HUMAN_METHOD,
  NADABOT_CONTRACT_ID,
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
  IPFS_BASE_URL: "",
  NADABOT_HUMAN_METHOD: "",
  NADABOT_CONTRACT_ID: "",
};

const { VerifyInfo } = VM.require(`potlock.near/widget/ModalDonation.Banners`) || {
  VerifyInfo: () => {},
};

const { yoctosToUsd } = VM.require("potlock.near/widget/utils") || { yoctosToUsd: () => null };

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    asyncGetDonationsForDonor: () => {},
    getContractId: () => "",
  }));

DonateSDK = DonateSDK({ env: props.env });

const DONATION_CONTRACT_ID = DonateSDK.getContractId();

// const HEADER_ICON_URL =
//   IPFS_BASE_URL + "bafkreiholfe7utobo5y2znjdr6ou26qmlcgf5teoxtyjo2undgfpl5kcwe";
// const TWITTER_ICON_URL =
//   IPFS_BASE_URL + "bafkreibkeyodxxrf76cr5q3in4tsmhuhzmkl5cdr56rfl57x4aji47gsby";

const DEFAULT_GATEWAY = "https://bos.potlock.org/";
const POTLOCK_TWITTER_ACCOUNT_ID = "PotLock_";

const DEFAULT_SHARE_HASHTAGS = ["BOS", "PublicGoods", "Donations"];

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  padding: 40px 32px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f6f5f3;
  gap: 12px;
  padding: 28px 36px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const HeaderIcon = styled.div`
  padding: 12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dd3345;
  box-shadow: 0px 0px 0px 6px #fee6e5;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const TwitterShare = styled.a`
  display: flex;
  gap: 8px;
  color: white;
  border-radius: 4px;
  padding: 6px 1rem;
  background: rgb(41, 41, 41);
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`;
const ModalMiddel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .amount-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    img,
    svg {
      width: 20px;
      height: 20px;
    }
    img {
      border-radius: 50%;
    }
  }
`;

const Amount = styled.div`
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.33px;
  text-transform: uppercase;
`;

const AmountUsd = styled.div`
  color: #7b7b7b;
  font-size: 22px;
`;

const ProjectName = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 14px;
  div {
    color: #7b7b7b;
  }
  a {
    color: #525252;
    &:hover {
      text-decoration: none;
    }
  }
`;

const H1 = styled.h1`
  color: #292929;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

const TextBold = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const UserChip = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 12px;
  gap: 4px;
  border-radius: 32px;
  background: #ebebeb;
`;

const UserChipLink = styled.a`
  display: flex;
  flex-direction: row;
  padding: 2px 12px;
  gap: 4px;
  border-radius: 32px;
  background: #ebebeb;

  &:hover {
    text-decoration: none;
  }
`;

const ShareText = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const SocialIcon = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
  path {
    transition: 300ms;
  }
  :hover path {
    fill: #dd3345;
  }
`;

State.init({
  showBreakdown: false,
});
const [successfulDonation, setSuccessfulDonation] = useState(props.successfulDonation);
const [ftMetadata, setFtMetadata] = useState(null);
const { recipientProfile, successfulApplication } = state;

const successfulDonationVals = successfulDonation ? Object.values(successfulDonation) : [];
const recipientProfileVals = recipientProfile ? Object.values(recipientProfile) : [];

const getProfileDataForSuccessfulDonation = (donationsObj) => {
  const donations = Object.values(donationsObj);
  donations.forEach((donation) => {
    const { donor_id, recipient_id, project_id } = donation;
    Near.asyncView("social.near", "get", {
      keys: [`${recipient_id || project_id}/profile/**`],
    }).then((recipientData) => {
      Near.asyncView("social.near", "get", {
        keys: [`${donor_id}/profile/**`],
      }).then((donorData) => {
        State.update({
          recipientProfile: {
            ...recipientProfile,
            [recipient_id || project_id]: recipientData[recipient_id || project_id]?.profile || {},
          },
          donorProfile: donorData[donor_id]?.profile || {},
        });
      });
    });
  });
};

if (successfulDonation && !recipientProfile) {
  getProfileDataForSuccessfulDonation(successfulDonation);
}
const getTotalAmount = () => {
  const totalAmount = Big(0);
  if (successfulDonation) {
    successfulDonationVals.forEach(
      (doantion) => (totalAmount = totalAmount.plus(Big(doantion.total_amount)))
    );
  }
  return totalAmount.toString();
};

const totalAmount = getTotalAmount();

if (props.isModalOpen && !successfulDonation) {
  const transactionHashes = props.transactionHashes.split(",");

  for (let i = 0; i < transactionHashes.length; i++) {
    const txHash = transactionHashes[i];
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "tx",
      params: [txHash, context.accountId],
    });
    const res = asyncFetch("https://rpc.mainnet.near.org", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        const methodName = res.body.result.transaction.actions[0].FunctionCall.method_name;
        const successVal = res.body.result.status?.SuccessValue;
        const receiver_id = res.body.result.transaction.receiver_id;
        const result = JSON.parse(Buffer.from(successVal, "base64").toString("utf-8")); // atob not working

        const args = JSON.parse(
          Buffer.from(res.body.result.transaction.actions[0].FunctionCall.args, "base64").toString(
            "utf-8"
          )
        );

        const recipientId =
          methodName === "donate"
            ? result.project_id
              ? result.project_id
              : result.recipient_id
            : methodName === "ft_transfer_call"
            ? JSON.parse(args.msg).recipient_id
            : "";

        if (recipientId) {
          if (methodName === "donate") {
            setSuccessfulDonation((prev) => ({
              ...prev,
              [recipientId]: result,
            }));
          } else if (methodName === "apply") {
            // application
            State.update({
              successfulApplication: result,
            });
          } else if (methodName === "ft_transfer_call" && recipientId) {
            asyncFetch(
              `https://near-mainnet.api.pagoda.co/eapi/v1/nep141/metadata/${receiver_id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
                },
              }
            )
              .then((data) => {
                const metadata = data.body.metadata;
                setFtMetadata(metadata);
                setSuccessfulDonation((prev) => ({
                  ...prev,
                  [recipientId]: {
                    project_id: recipientId,
                    total_amount: result,
                  },
                }));
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
  }
}

useEffect(() => {
  if (successfulDonation && !ftMetadata) {
    Near.asyncView(successfulDonationVals[0]?.ft_id, "ft_metadata", {}).then((metaDate) =>
      setFtMetadata(metaDate)
    );
  }
}, [successfulDonation]);

const twitterIntent = useMemo(() => {
  if (!recipientProfile) return;
  const twitterIntentBase = "https://twitter.com/intent/tweet?text=";

  const recipient_id =
    successfulDonationVals[0].recipient_id || successfulDonationVals[0].project_id;
  const profile = recipientProfileVals[0];
  const singlePorject = profile
    ? profile.linktree?.twitter
      ? `@${profile.linktree.twitter}`
      : profile.name
    : recipient_id;

  const tag =
    `${singlePorject}` +
    (successfulDonationVals.length > 1
      ? ` and ${successfulDonationVals?.length - 1} other${
          successfulDonationVals?.length === 2 ? "" : "s"
        }`
      : "");

  let url =
    DEFAULT_GATEWAY +
    `${ownerId}/widget/Index?tab=project&projectId=${recipient_id}&referrerId=${context.accountId}`;
  let text = `I just donated to ${tag} on @${POTLOCK_TWITTER_ACCOUNT_ID}! Support public goods at `;
  text = encodeURIComponent(text);
  url = encodeURIComponent(url);
  return twitterIntentBase + text + `&url=${url}` + `&hashtags=${DEFAULT_SHARE_HASHTAGS.join(",")}`;
}, [successfulDonation, recipientProfile]);

const isUserHumanVerified = Near.view(NADABOT_CONTRACT_ID, NADABOT_HUMAN_METHOD, {
  account_id: context.accountId,
});

const needsToVerify = isUserHumanVerified === false;

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      contentStyle: {
        padding: "0px",
      },
      children: successfulApplication ? (
        <>
          <ModalMain>
            <H1>Thank you for applying!</H1>
            <TextBold>Your application status: {successfulApplication.status}</TextBold>
          </ModalMain>
        </>
      ) : successfulDonation ? (
        <ModalMain>
          <ModalHeader>
            <HeaderIcon>
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.79499 10.875L1.62499 6.70498L0.204987 8.11498L5.79499 13.705L17.795 1.70498L16.385 0.294983L5.79499 10.875Z"
                  fill="white"
                />
              </svg>
            </HeaderIcon>
            <div>Donation Successful</div>
            <TwitterShare href={twitterIntent} target="_blank">
              <div>Share to</div>
              <div className="icon">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.25 13.4035L8.97064 5.70858L8.97965 5.71579L13.7398 0.200562H12.1491L8.27135 4.68956L5.19196 0.200562H1.02012L5.9489 7.38477L5.94831 7.38416L0.75 13.4035H2.34071L6.65183 8.40919L10.0782 13.4035H14.25ZM4.56169 1.40082L11.969 12.2032H10.7084L3.29515 1.40082H4.56169Z"
                    fill="#DBDBDB"
                  />
                </svg>
              </div>
            </TwitterShare>
          </ModalHeader>
          <ModalMiddel>
            <div className="amount-wrapper">
              {ftMetadata?.icon ? (
                <img src={ftMetadata.icon} />
              ) : (
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                </svg>
              )}
              <Amount>
                {totalAmount
                  ? parseFloat(
                      // NEAR.fromIndivisible(totalAmount).toString()
                      Big(totalAmount)
                        .div(Big(10).pow(ftMetadata?.decimals || 24))
                        .toFixed(2)
                    )
                  : "-"}
                {ftMetadata?.symbol || "NEAR"}
              </Amount>
              {totalAmount && yoctosToUsd(totalAmount) && !ftMetadata && (
                <AmountUsd>{yoctosToUsd(totalAmount)} </AmountUsd>
              )}
            </div>

            <ProjectName>
              <div>Has been donated to</div>
              <a
                href={props.hrefWithParams(
                  `?tab=project&projectId=${
                    successfulDonationVals[0]?.recipient_id || successfulDonationVals[0]?.project_id
                  }`
                )}
                target="_blank"
              >
                {recipientProfileVals[0]?.name ||
                  successfulDonationVals[0]?.recipient_id ||
                  successfulDonationVals[0]?.project_id ||
                  "-"}
              </a>
              {successfulDonationVals.length > 1 && (
                <div>and {successfulDonationVals.length - 1} others</div>
              )}
            </ProjectName>
          </ModalMiddel>

          <Widget
            src={`${ownerId}/widget/Cart.BreakdownSummary`}
            props={{
              ...props,
              referrerId: successfulDonationVals[0]?.referrer_id,
              totalAmount: Big(totalAmount)
                .div(Big(10).pow(ftMetadata?.decimals || 24))
                .toFixed(2),
              bypassProtocolFee:
                !successfulDonationVals[0]?.protocol_fee ||
                successfulDonationVals[0]?.protocol_fee === "0", // TODO: allow user to choose
              ftIcon: ftMetadata?.icon,
            }}
          />

          {needsToVerify && <VerifyInfo />}
        </ModalMain>
      ) : (
        ""
      ),
    }}
  />
);
