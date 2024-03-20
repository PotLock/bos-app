const { onClose } = props;
const {
  ownerId,
  SUPPORTED_FTS: { NEAR },
  IPFS_BASE_URL,
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
  IPFS_BASE_URL: "",
};
const { yoctosToUsd } = VM.require("potlock.near/widget/utils") || { yoctosToUsd: () => "" };

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
  gap: 24px;
  padding: 80px 36px;
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
const HeaderIcon = styled.div`
  padding: 1rem;
  width: 64px;
  height: 64px;
  border-radius: 44px;
  background: radial-gradient(97.66% 97.66% at 50% 2.34%, #e84a5b 0%, #c02031 100%);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
  svg {
    width: 100%;
    height: 100%;
  }
`;
const Amount = styled.div`
  color: #292929;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  font-family: "Lora";
`;

const AmountUsd = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const NearIcon = styled.svg`
  width: 28px;
  height: 28px;
`;

const ImgIcon = styled.img`
  width: 28px;
  height: 28px;
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
  successfulDonation: null,
});

// [Log] null – "transactionHashes: " – ["Dit7Tr3XAu3951BmMzMSTGbrpXmTnyz4uda2BYekjcS9", "A3brwxMVYY7aYbLfKMZt2gHwic2PhiPNyUVVqS9GRGKE"] (2) (main.302622478fe5b49ecaaa.bundle.js, line 8)

// const body = JSON.stringify({
//   jsonrpc: "2.0",
//   id: "dontcare",
//   method: "tx",
//   params: ["Dit7Tr3XAu3951BmMzMSTGbrpXmTnyz4uda2BYekjcS9", context.accountId],
// });
// console.log("body: ", body);
// const res = fetch("https://rpc.mainnet.near.org", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body,
// });
// console.log("res line 180: ", res);

if (props.isModalOpen && !state.successfulDonation) {
  /// NEW APPROACH:
  // get donations for donor
  // let successfulDonation = props.successfulDonation;
  // let successfulApplication = props.successfulApplication;
  // if !successfulDonation and !successfulApplication, then we need to fetch the transaction
  // once fetched, determine whether it was a donation or an application & set on state accordingly
  if (!successfulDonation && !successfulApplication && props.transactionHashes) {
    const transactionHashes = props.transactionHashes.split(",");
    for (let i = 0; i < transactionHashes.length; i++) {
      const txHash = transactionHashes[i];
      const body = JSON.stringify({
        jsonrpc: "2.0",
        id: "dontcare",
        method: "tx",
        params: [txHash, context.accountId],
      });
      const res = fetch("https://rpc.mainnet.near.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      // console.log("tx res: ", res);
      if (res.ok) {
        const methodName = res.body.result.transaction.actions[0].FunctionCall.method_name;
        const successVal = res.body.result.status?.SuccessValue;
        let decoded = JSON.parse(Buffer.from(successVal, "base64").toString("utf-8")); // atob not working
        if (methodName === "donate") {
          // NEAR donation
          getProfileDataForSuccessfulDonation(decoded);
          break;
        } else if (methodName === "apply") {
          // application
          State.update({
            successfulApplication: decoded,
          });
          break;
        } else if (methodName === "ft_transfer_call") {
          console.log("res: ", res.body);
          const args = JSON.parse(
            Buffer.from(
              res.body.result.transaction.actions[0].FunctionCall.args,
              "base64"
            ).toString("utf-8")
          );
          console.log("args: ", args);
          // ft donation
          const signerId = res.body.result.transaction.signer_id;
          Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_donor", {
            donor_id: signerId,
          })
            .then((donations) => {
              if (donations.length) {
                const donation = donations.sort((a, b) => b.donated_at_ms - a.donated_at_ms)[0];
                getProfileDataForSuccessfulDonation(donation);
              }
            })
            .catch((e) => console.log("error fetching donations for donor: ", e));
          break;
        } else {
          if (i === transactionHashes.length - 1) {
            // close modal
            onClose();
          }
        }
      }
    }
  }
}

const ftMetadata = Near.view(state.successfulDonation?.ft_id, "ft_metadata", {});

const getProfileDataForSuccessfulDonation = (donation) => {
  const { donor_id, recipient_id, project_id } = donation;
  Near.asyncView("social.near", "get", {
    keys: [`${recipient_id || project_id}/profile/**`],
  }).then((recipientData) => {
    Near.asyncView("social.near", "get", {
      keys: [`${donor_id}/profile/**`],
    }).then((donorData) => {
      State.update({
        successfulDonation: donation,
        recipientProfile: recipientData[recipient_id || project_id]?.profile || {},
        donorProfile: donorData[donor_id]?.profile || {},
      });
    });
  });
};

const twitterIntent = useMemo(() => {
  if (!state.recipientProfile) return;
  const twitterIntentBase = "https://twitter.com/intent/tweet?text=";
  let url =
    DEFAULT_GATEWAY +
    `${ownerId}/widget/Index?tab=project&projectId=${state.successfulDonation.recipient_id}&referrerId=${context.accountId}`;
  let text = `I just donated to ${
    state.recipientProfile
      ? state.recipientProfile.linktree?.twitter
        ? `@${state.recipientProfile.linktree.twitter}`
        : state.recipientProfile.name
      : state.successfulDonation.recipient_id
  } on @${POTLOCK_TWITTER_ACCOUNT_ID}! Support public goods at `;
  text = encodeURIComponent(text);
  url = encodeURIComponent(url);
  return twitterIntentBase + text + `&url=${url}` + `&hashtags=${DEFAULT_SHARE_HASHTAGS.join(",")}`;
}, [state.successfulDonation, state.recipientProfile]);

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      contentStyle: {
        padding: "0px",
      },
      children: state.successfulApplication ? (
        <>
          <ModalMain>
            <H1>Thank you for applying!</H1>
            <TextBold>Your application status: {state.successfulApplication.status}</TextBold>
          </ModalMain>
        </>
      ) : state.successfulDonation ? (
        <>
          <ModalMain>
            <HeaderIcon>
              <svg viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.39016 7.9C4.12016 7.31 3.39016 6.7 3.39016 5.75C3.39016 4.66 4.40016 3.9 6.09016 3.9C7.87016 3.9 8.53016 4.75 8.59016 6H10.8002C10.7302 4.28 9.68016 2.7 7.59016 2.19V0H4.59016V2.16C2.65016 2.58 1.09016 3.84 1.09016 5.77C1.09016 8.08 3.00016 9.23 5.79016 9.9C8.29016 10.5 8.79016 11.38 8.79016 12.31C8.79016 13 8.30016 14.1 6.09016 14.1C4.03016 14.1 3.22016 13.18 3.11016 12H0.910156C1.03016 14.19 2.67016 15.42 4.59016 15.83V18H7.59016V15.85C9.54016 15.48 11.0902 14.35 11.0902 12.3C11.0902 9.46 8.66016 8.49 6.39016 7.9Z"
                  fill="white"
                />
              </svg>
            </HeaderIcon>
            <Column>
              <Row style={{ gap: "9px" }}>
                <Amount>
                  {state.successfulDonation?.total_amount
                    ? parseFloat(
                        // NEAR.fromIndivisible(state.successfulDonation.total_amount).toString()
                        Big(state.successfulDonation.total_amount)
                          .div(Big(10).pow(ftMetadata?.decimals || 24))
                          .toFixed(2)
                      )
                    : "-"}
                </Amount>
                {ftMetadata?.icon ? (
                  <ImgIcon src={ftMetadata.icon} />
                ) : (
                  <NearIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#CECECE" />
                    <path
                      d="M15.616 6.61333L13.1121 10.3333C12.939 10.5867 13.2719 10.8933 13.5117 10.68L15.9756 8.53333C16.0422 8.48 16.1354 8.52 16.1354 8.61333V15.32C16.1354 15.4133 16.0155 15.4533 15.9623 15.3867L8.50388 6.45333C8.26415 6.16 7.91787 6 7.53163 6H7.26526C6.5727 6 6 6.57333 6 7.28V16.72C6 17.4267 6.5727 18 7.27858 18C7.71809 18 8.13097 17.7733 8.3707 17.3867L10.8746 13.6667C11.0477 13.4133 10.7148 13.1067 10.475 13.32L8.0111 15.4533C7.94451 15.5067 7.85128 15.4667 7.85128 15.3733V8.68C7.85128 8.58667 7.97114 8.54667 8.02442 8.61333L15.4828 17.5467C15.7225 17.84 16.0821 18 16.4551 18H16.7214C17.4273 18 18 17.4267 18 16.72V7.28C18 6.57333 17.4273 6 16.7214 6C16.2686 6 15.8557 6.22667 15.616 6.61333Z"
                      fill="black"
                    />
                  </NearIcon>
                )}
              </Row>
              {state.successfulDonation?.total_amount &&
                yoctosToUsd(state.successfulDonation.total_amount) && (
                  <AmountUsd>
                    {yoctosToUsd(state.successfulDonation.total_amount) + " USD"}
                  </AmountUsd>
                )}
            </Column>
            <Row style={{ gap: "8px" }}>
              <TextBold>Has been donated to</TextBold>
              <UserChipLink
                href={props.hrefWithParams(
                  `?tab=project&projectId=${
                    state.successfulDonation.recipient_id || state.successfulDonation.project_id
                  }`
                )}
                target="_blank"
              >
                {state.successfulDonation && (
                  <Widget
                    src={`${ownerId}/widget/Project.ProfileImage`}
                    props={{
                      ...props,
                      accountId:
                        state.successfulDonation.recipient_id ||
                        state.successfulDonation.project_id,
                      style: {
                        height: "17px",
                        width: "17px",
                      },
                    }}
                  />
                )}
                <TextBold>{state.recipientProfile?.name || "-"}</TextBold>
              </UserChipLink>
            </Row>
            <Widget
              src={`${ownerId}/widget/Cart.BreakdownSummary`}
              props={{
                ...props,
                referrerId: state.successfulDonation?.referrer_id,
                totalAmount: NEAR.fromIndivisible(
                  state.successfulDonation?.total_amount || "0"
                ).toString(),
                bypassProtocolFee:
                  !state.successfulDonation?.protocol_fee ||
                  state.successfulDonation?.protocol_fee === "0", // TODO: allow user to choose
                headerStyle: { justifyContent: "center" },
                ftIcon: ftMetadata?.icon,
              }}
            />
            <Row style={{ width: "100%", justifyContent: "center", gap: "24px" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "secondary",
                  text: "Do it again!",
                  onClick: () => {
                    onClose();
                    props.openDonateToProjectModal();
                  },
                  style: { width: "100%" },
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "secondary",
                  text: "Explore projects",
                  onClick: () => {
                    onClose();
                  },
                  style: { width: "100%" },
                }}
              />
            </Row>
          </ModalMain>
          <ModalFooter>
            <Row style={{ gap: "6px", justifyContent: "center" }}>
              <TextBold>From</TextBold>
              <UserChip>
                {state.donorProfile && (
                  <Widget
                    src={`${ownerId}/widget/Project.ProfileImage`}
                    props={{
                      ...props,
                      accountId: state.successfulDonation?.donor_id,
                      style: {
                        height: "17px",
                        width: "17px",
                      },
                    }}
                  />
                )}
                <TextBold>{state.donorProfile?.name || "-"}</TextBold>
              </UserChip>
            </Row>
            <Row style={{ gap: "8px", justifyContent: "center" }}>
              <ShareText>Share to</ShareText>
              <a href={twitterIntent} target="_blank">
                <SocialIcon viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.92 2C20.15 2.35 19.32 2.58 18.46 2.69C19.34 2.16 20.02 1.32 20.34 0.31C19.51 0.81 18.59 1.16 17.62 1.36C16.83 0.5 15.72 0 14.46 0C12.11 0 10.19 1.92 10.19 4.29C10.19 4.63 10.23 4.96 10.3 5.27C6.74 5.09 3.57 3.38 1.46 0.79C1.09 1.42 0.88 2.16 0.88 2.94C0.88 4.43 1.63 5.75 2.79 6.5C2.08 6.5 1.42 6.3 0.84 6V6.03C0.84 8.11 2.32 9.85 4.28 10.24C3.65073 10.4122 2.9901 10.4362 2.35 10.31C2.62161 11.1625 3.15354 11.9084 3.87102 12.4429C4.5885 12.9775 5.45545 13.2737 6.35 13.29C4.83363 14.4904 2.954 15.1393 1.02 15.13C0.68 15.13 0.34 15.11 0 15.07C1.9 16.29 4.16 17 6.58 17C14.46 17 18.79 10.46 18.79 4.79C18.79 4.6 18.79 4.42 18.78 4.23C19.62 3.63 20.34 2.87 20.92 2Z"
                    fill="#7B7B7B"
                  />
                </SocialIcon>
              </a>
            </Row>
          </ModalFooter>
        </>
      ) : (
        ""
      ),
    }}
  />
);
