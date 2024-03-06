const { onClose } = props;
const {
  SUPPORTED_FTS: { NEAR },
  IPFS_BASE_URL,
} = VM.require("${config/account}/widget/constants") || {
  SUPPORTED_FTS: {},
  IPFS_BASE_URL: "",
};
const { yoctosToUsd, href } = VM.require("${config/account}/widget/utils") || {
  yoctosToUsd: () => "",
  href: () => {},
};
const loraCss = fetch(
  "https://fonts.googleapis.com/css2?family=Lora&display=swap"
).body;

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
  let successfulApplication = props.successfulApplication;
  // if !successfulDonation and !successfulApplication, then we need to fetch the transaction
  // once fetched, determine whether it was a donation or an application & set on state accordingly
  if (
    !successfulDonation &&
    !successfulApplication &&
    props.transactionHashes
  ) {
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
    if (res.ok) {
      const methodName =
        res.body.result.transaction.actions[0].FunctionCall.method_name;
      const successVal = res.body.result.status?.SuccessValue;
      let decoded = JSON.parse(
        Buffer.from(successVal, "base64").toString("utf-8")
      ); // atob not working
      if (methodName === "donate") {
        // donation
        successfulDonation = decoded;
      } else if (methodName === "apply") {
        // application
        successfulApplication = decoded;
      }
    }
  }
  // if (successfulDonation) console.log("successful donation: ", successfulDonation);
  if (successfulDonation) {
    const { donor_id, recipient_id, project_id } = successfulDonation;
    Near.asyncView("social.near", "get", {
      keys: [`${recipient_id || project_id}/profile/**`],
    }).then((recipientData) => {
      Near.asyncView("social.near", "get", {
        keys: [`${donor_id}/profile/**`],
      }).then((donorData) => {
        State.update({
          successfulDonation,
          recipientProfile:
            recipientData[recipient_id || project_id]?.profile || {},
          donorProfile: donorData[donor_id]?.profile || {},
        });
      });
    });
  } else if (successfulApplication) {
    State.update({
      successfulApplication,
    });
  }
}

const twitterIntent = useMemo(() => {
  if (!state.recipientProfile) return;
  const twitterIntentBase = "https://twitter.com/intent/tweet?text=";
  let url =
    DEFAULT_GATEWAY +
    `${config / account}/widget/Index?tab=project&projectId=${
      state.successfulDonation.recipient_id
    }&referrerId=${context.accountId}`;
  let text = `I just donated to ${
    state.recipientProfile
      ? state.recipientProfile.linktree?.twitter
        ? `@${state.recipientProfile.linktree.twitter}`
        : state.recipientProfile.name
      : state.successfulDonation.recipient_id
  } on @${POTLOCK_TWITTER_ACCOUNT_ID}! Support public goods at `;
  text = encodeURIComponent(text);
  url = encodeURIComponent(url);
  return (
    twitterIntentBase +
    text +
    `&url=${url}` +
    `&hashtags=${DEFAULT_SHARE_HASHTAGS.join(",")}`
  );
}, [state.successfulDonation, state.recipientProfile]);

return (
  <Widget
    src={"${config/account}/widget/Components.Modal"}
    props={{
      ...props,
      contentStyle: {
        padding: "0px",
      },
      children: state.successfulApplication ? (
        <>
          <ModalMain>
            <H1>Thank you for applying!</H1>
            <TextBold>
              Your application status: {state.successfulApplication.status}
            </TextBold>
          </ModalMain>
        </>
      ) : state.successfulDonation ? (
        <>
          <ModalMain>
            <HeaderIcon src={HEADER_ICON_URL} />
            <Column>
              <Row style={{ gap: "9px" }}>
                <AmountNear>
                  {state.successfulDonation?.total_amount
                    ? parseFloat(
                        NEAR.fromIndivisible(
                          state.successfulDonation.total_amount
                        ).toString()
                      )
                    : "-"}
                </AmountNear>
                <NearIcon src={NEAR.iconUrl} />
              </Row>
              <AmountUsd>
                {(state.successfulDonation?.total_amount
                  ? yoctosToUsd(state.successfulDonation.total_amount)
                  : "$-") + " USD"}
              </AmountUsd>
            </Column>
            <Row style={{ gap: "8px" }}>
              <TextBold>Has been donated to</TextBold>
              <Link
                to={href({
                  params: {
                    tab: "project",
                    project:
                      state.successfulDonation.recipient_id ||
                      state.successfulDonation.project_id,
                  },
                })}
              >
                <UserChipLink>
                  {state.successfulDonation && (
                    <Widget
                      src={"${config/account}/widget/Project.ProfileImage"}
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
              </Link>
            </Row>
            <Widget
              src={"${config/account}/widget/Cart.BreakdownSummary"}
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
            <Row
              style={{ width: "100%", justifyContent: "center", gap: "24px" }}
            >
              <Widget
                src={"${config/account}/widget/Components.Button"}
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
                src={"${config/account}/widget/Components.Button"}
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
                    src={"${config/account}/widget/Project.ProfileImage"}
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
      ) : (
        ""
      ),
    }}
  />
);
