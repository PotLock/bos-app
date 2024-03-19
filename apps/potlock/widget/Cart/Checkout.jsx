const { ownerId } = props;
const donationContractId = "donate.potlock.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const TRASH_ICON_URL =
//   IPFS_BASE_URL + "bafkreifuvrxly3wuy4xdmavmdeb2o47nv6pzxwz3xmy6zvkxv76e55lj3y";

const DEFAULT_GATEWAY = "https://bos.potlock.org/";
const POTLOCK_TWITTER_ACCOUNT_ID = "PotLock_";

const DEFAULT_SHARE_HASHTAGS = ["BOS", "PublicGoods", "Donations"];
const [projectId, setProjectId] = useState("");

const Container = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
  width: 100%;
  padding: 24px;
  gap: 24px;
`;

// const ButtonsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 24px;
//   width: 50%;
//   align-items: center;
//   justify-content: center;
// `;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  //   background: #fafafa;
  width: 55%;
  //   background: pink;
  padding: 48px 40px 48px 64px;
  gap: 48px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 24px 16px 24px 16px;
  }
`;

const ColumnRight = styled.div`
  //   background: yellow;
  flex: 1;
  padding: 152px 148px 152px 84px;
  border-left: 1px #c7c7c7 solid;

  @media screen and (max-width: 768px) {
    padding: 24px 16px 24px 16px;
    border-left: none;
    border-top: 1px #c7c7c7 solid;
  }
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 48px;
  font-family: Lora;
  font-weight: 500;
  line-height: 56px;
  word-wrap: break-word;
  text-align: center;
`;

const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  path {
    transition: 300ms;
  }
`;

const ActionsContainer = styled.div`
  width: 100%;
  padding: 16px;
  background: white;
  border: 1px solid #dbdbdb;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border-radius: 6px;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
  gap: 24px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  :hover path {
    fill: #dd3345;
  }
`;

const SubTitle = styled.div`
  color: #2e2e2e;
  font-weight: 600;
  font-size: 14px;
`;

const TxLink = styled.a`
  color: #2e2e2e;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

State.init({
  selectedProjectIds: [],
  masterSelectorSelected: false,
  successfulDonationRecipientId: null,
  successfulDonationRecipientProfile: null,
  successfulDonationsRecipientProfiles: null,
});

const allSelected =
  state.selectedProjectIds.length !== 0 &&
  state.selectedProjectIds.length === Object.keys(props.cart).length;

if (props.transactionHashes && !state.successfulDonationsRecipientProfiles) {
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
    if (res.ok) {
      const methodName = res.body.result.transaction.actions[0].FunctionCall.method_name;
      const successVal = res.body.result.status?.SuccessValue;
      const result = JSON.parse(Buffer.from(successVal, "base64").toString("utf-8")); // atob not working
      const args = JSON.parse(
        Buffer.from(res.body.result.transaction.actions[0].FunctionCall.args, "base64").toString(
          "utf-8"
        )
      );
      const recipientId =
        methodName === "donate"
          ? result.recipient_id
          : methodName === "ft_transfer_call"
          ? JSON.parse(args.msg).recipient_id
          : "";
      if (recipientId) {
        Near.asyncView("social.near", "get", { keys: [`${recipientId}/profile/**`] }).then(
          (socialData) => {
            State.update({
              successfulDonationsRecipientProfiles: {
                ...state.successfulDonationsRecipientProfiles,
                [recipientId]: socialData[recipientId]["profile"],
              },
            });
          }
        );
      }
    }
  }
}

const twitterIntent = useMemo(() => {
  if (!state.successfulDonationsRecipientProfiles) return;
  const recipientIds = Object.keys(state.successfulDonationsRecipientProfiles);
  const twitterIntentBase = "https://twitter.com/intent/tweet?text=";

  // if more than one recipient, share the Explore Projects page; otherwise, share the project page
  let url = DEFAULT_GATEWAY + `${ownerId}/widget/Index?referrerId=${context.accountId}`;
  if (recipientIds.length === 1) {
    url = url + `&tab=project&projectId=${recipientIds[0]}`;
  } else {
    url = url + `&tab=projects`;
  }

  // Initialize an empty array to hold the recipient profiles along with their identifiers
  const recipientProfiles = [];

  // Iterate over each entry in the successfulDonationsRecipientProfiles object
  for (const [recipientId, profile] of Object.entries(state.successfulDonationsRecipientProfiles)) {
    // Determine the identifier to use: Twitter handle, name, or recipient ID
    const identifier = profile.linktree?.twitter
      ? `@${profile.linktree.twitter}`
      : profile.name
      ? profile.name
      : recipientId;

    // Add the profile and its identifier to the array
    recipientProfiles.push({
      identifier,
      hasTwitter: !!profile.linktree?.twitter,
    });
  }

  // Sort the recipientProfiles array to put ones with Twitter handles first
  recipientProfiles.sort((a, b) => {
    if (a.hasTwitter && !b.hasTwitter) return -1;
    if (!a.hasTwitter && b.hasTwitter) return 1;
    return 0;
  });

  // Extract the identifiers from the sorted array
  const sortedIdentifiers = recipientProfiles.map((profile) => profile.identifier);

  // Join the sorted recipient identifiers with " & " to create a single string
  const recipientsText = sortedIdentifiers.join(" & ");

  let text = `I just donated to ${recipientsText} on @${POTLOCK_TWITTER_ACCOUNT_ID}! Support public goods at `;
  text = encodeURIComponent(text);
  url = encodeURIComponent(url);
  return twitterIntentBase + text + `&url=${url}` + `&hashtags=${DEFAULT_SHARE_HASHTAGS.join(",")}`;
}, [state.successfulDonationsRecipientProfiles]);

return (
  // <div>
  <Container>
    {props.checkoutSuccess ? (
      <SuccessContainer>
        <Title>Thanks for donating!</Title>
        {twitterIntent && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              href: twitterIntent,
              target: "_blank",
              type: "primary",
              text: "Share to Twitter",
              disabled: !twitterIntent,
              style: {
                width: "300px",
              },
            }}
          />
        )}
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            href: props.hrefWithParams(`?tab=projects`),
            type: twitterIntent ? "secondary" : "primary",
            text: "Explore projects",
            style: {
              width: "300px",
            },
          }}
        />
        {/* {twitterIntent && props.checkoutSuccessTxHash ? (
          <TxLink
            target="_blank"
            href={`https://nearblocks.io/txns/${props.checkoutSuccessTxHash}`}
          >
            View transaction
          </TxLink>
        ) : (
          props.checkoutSuccessTxHash && (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                href: `https://nearblocks.io/txns/${props.checkoutSuccessTxHash}`,
                target: "_blank",
                type: "secondary",
                text: "View transaction",
                disabled: !props.checkoutSuccessTxHash,
                style: {
                  width: "300px",
                },
              }}
            />
          )
        )} */}
      </SuccessContainer>
    ) : (
      <>
        <ColumnLeft>
          <Title>Donation Cart</Title>
          <ActionsContainer>
            <InnerContainer>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "masterSelector",
                  disabled: Object.keys(props.cart).length === 0,
                  checked: state.masterSelectorSelected,
                  onClick: (e) => {
                    // if allSelected, then deselect all
                    // if not allSelected, then select all
                    const selectedProjectIds = Object.keys(props.cart).filter((_) => {
                      if (allSelected) {
                        return false;
                      }
                      return true;
                    });
                    State.update({
                      selectedProjectIds,
                      masterSelectorSelected: !allSelected,
                    });
                  },
                }}
              />
              <SubTitle>Select all</SubTitle>
            </InnerContainer>
            <InnerContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                // doesn't do anything if nothing selected
                if (state.selectedProjectIds.length === 0) return;
                // delete selected projects
                props.removeProjectsFromCart(state.selectedProjectIds);
                // uncheck box
                State.update({ selectedProjectIds: [], masterSelectorSelected: false });
              }}
            >
              <Icon viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 14C2.0875 14 1.73437 13.8531 1.44062 13.5594C1.14687 13.2656 1 12.9125 1 12.5V2.5H0V1H4V0H8V1H12V2.5H11V12.491C11 12.9137 10.8531 13.2708 10.5594 13.5625C10.2656 13.8542 9.9125 14 9.5 14H2.5ZM9.5 2.5H2.5V12.5H9.5V2.5ZM4 11H5.5V4H4V11ZM6.5 11H8V4H6.5V11Z"
                  fill="#7B7B7B"
                />
              </Icon>
              <SubTitle>Delete</SubTitle>
            </InnerContainer>
          </ActionsContainer>
          {Object.keys(props.cart).length === 0 ? (
            <div>No items in cart</div>
          ) : (
            Object.keys(props.cart).map((projectId) => {
              // setProjectId(projectId); // wtf is this?? commenting out
              const checked = state.selectedProjectIds.includes(projectId);
              return (
                <Widget
                  src={`${ownerId}/widget/Cart.CheckoutItem`}
                  props={{
                    ...props,
                    projectId,
                    checked,
                    handleCheckboxClick: (e) => {
                      // if selected, then deselect
                      // else, select
                      let selectedProjectIds = state.selectedProjectIds;
                      if (checked) {
                        selectedProjectIds = selectedProjectIds.filter((id) => id !== projectId);
                      } else {
                        selectedProjectIds.push(projectId);
                      }
                      const updatedState = {
                        selectedProjectIds,
                      };
                      if (
                        selectedProjectIds.length !== 0 &&
                        selectedProjectIds.length !== Object.keys(props.cart).length
                      ) {
                        updatedState.masterSelectorSelected = false;
                      }
                      State.update(updatedState);
                    },
                  }}
                />
              );
            })
          )}
        </ColumnLeft>
        <ColumnRight>
          <Widget
            src={`${ownerId}/widget/Cart.CheckoutBreakdown`}
            props={{
              ...props,
              projectId: projectId,
              updateSuccessfulDonationRecipientId: (recipientId) =>
                State.update({ successfulDonationRecipientId: recipientId }),
            }}
          />
        </ColumnRight>
      </>
    )}
  </Container>
  // </div>
);
