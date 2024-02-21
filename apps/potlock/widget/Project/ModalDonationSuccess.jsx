const {
  ownerId,
  onClose,
  IPFS_BASE_URL,
  SUPPORTED_FTS: { NEAR },
} = props;

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

const HEADER_ICON_URL =
  IPFS_BASE_URL + "bafkreiholfe7utobo5y2znjdr6ou26qmlcgf5teoxtyjo2undgfpl5kcwe";
const TWITTER_ICON_URL =
  IPFS_BASE_URL + "bafkreibkeyodxxrf76cr5q3in4tsmhuhzmkl5cdr56rfl57x4aji47gsby";

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

const HeaderIcon = styled.img`
  width: 64px;
  height: 64px;
`;

const AmountNear = styled.div`
  color: #292929;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  font-family: "Lora";
  ${loraCss}
`;

const AmountUsd = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const NearIcon = styled.img`
  width: 28px;
  height: 28px;
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

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

State.init({
  showBreakdown: false,
  successfulDonation: null,
});

if (props.isModalOpen && !state.successfulDonation) {
  let successfulDonation = props.successfulDonation;
  if (!successfulDonation && props.transactionHashes) {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "tx",
      params: [props.transactionHashes, context.accountId],
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
      const successVal = res.body.result.status?.SuccessValue;
      let decoded = Buffer.from(successVal, "base64").toString("utf-8"); // atob not working
      successfulDonation = JSON.parse(decoded);
    }
  }
  console.log("successful donation: ", successfulDonation);
  const { donor_id, recipient_id, project_id } = successfulDonation;
  Near.asyncView("social.near", "get", {
    keys: [`${recipient_id || project_id}/profile/**`],
  }).then((recipientData) => {
    Near.asyncView("social.near", "get", {
      keys: [`${donor_id}/profile/**`],
    }).then((donorData) => {
      State.update({
        successfulDonation,
        recipientProfile: recipientData[recipient_id || project_id]?.profile || {},
        donorProfile: donorData[donor_id]?.profile || {},
      });
    });
  });
}

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
      children: (
        <>
          <ModalMain>
            <HeaderIcon src={HEADER_ICON_URL} />
            <Column>
              <Row style={{ gap: "9px" }}>
                <AmountNear>
                  {state.successfulDonation?.total_amount
                    ? parseFloat(
                        NEAR.fromIndivisible(state.successfulDonation.total_amount).toString()
                      )
                    : "-"}
                </AmountNear>
                <NearIcon src={NEAR.iconUrl} />
              </Row>
              <AmountUsd>
                {(state.successfulDonation?.total_amount
                  ? props.yoctosToUsd(state.successfulDonation.total_amount)
                  : "$-") + " USD"}
              </AmountUsd>
            </Column>
            <Row style={{ gap: "8px" }}>
              <TextBold>Has been donated to</TextBold>
              <UserChipLink
                href={props.hrefWithEnv(
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
                amountNear: NEAR.fromIndivisible(
                  state.successfulDonation?.total_amount || "0"
                ).toString(),
                bypassProtocolFee:
                  !state.successfulDonation?.protocol_fee ||
                  state.successfulDonation?.protocol_fee === "0", // TODO: allow user to choose
                headerStyle: { justifyContent: "center" },
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
                <SocialIcon src={TWITTER_ICON_URL} />
              </a>
            </Row>
          </ModalFooter>
        </>
      ),
    }}
  />
);
