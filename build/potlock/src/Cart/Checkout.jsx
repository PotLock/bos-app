const { ownerId } = props;
const donationContractId = "donate.potlock.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const TRASH_ICON_URL =
  IPFS_BASE_URL + "bafkreicwtubzlywmtvoxc4tqjfturyi5oqxtbpezceosiw3juv2d4uf7om";

const DEFAULT_GATEWAY = "https://near.social/";
const POTLOCK_TWITTER_ACCOUNT_ID = "PotLock_";

const DEFAULT_SHARE_HASHTAGS = ["BOS", "PublicGoods", "Donations"];

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;

//   @media screen and (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

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

const Icon = styled.img`
  width: 20px;
  height: 20px;
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
  gap: 12px;
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
});

const allSelected =
  state.selectedProjectIds.length !== 0 &&
  state.selectedProjectIds.length === Object.keys(props.cart).length;
// const twitterSuccessText = `I just donated to this project on @potlock_!`;

// console.log("props in Checkout: ", props);

// const txInfo = useMemo(() => {
//   if (props.transactionHashes && props.registeredProjects) {
//     const body = JSON.stringify({
//       jsonrpc: "2.0",
//       id: "dontcare",
//       method: "tx",
//       params: [props.transactionHashes, context.accountId],
//     });
//     const res = fetch("https://rpc.mainnet.near.org", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body,
//     });
//     console.log("tx res: ", res);
//     if (res.ok) {
//       const successVal = res.body.result.status?.SuccessValue;
//       let decoded = Buffer.from(successVal, "base64").toString("utf-8"); // atob not working
//       decoded = JSON.parse(decoded);
//       const recipientId = decoded.recipient_id;
//       if (recipientId) {
//         State.update({ successfulDonationRecipientId: recipientId });
//       }
//     }
//   }
// }, [props.transactionHashes]);

if (props.transactionHashes && props.registeredProjects && !state.successfulDonationRecipientId) {
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
    decoded = JSON.parse(decoded);
    const recipientId = decoded.recipient_id;
    if (recipientId) {
      State.update({ successfulDonationRecipientId: recipientId });
    }
  }
}

if (state.successfulDonationRecipientId && !state.successfulDonationRecipientProfile) {
  const profile = Social.getr(`${state.successfulDonationRecipientId}/profile`);
  // console.log("profile: ", profile);
  if (profile) {
    State.update({ successfulDonationRecipientProfile: profile });
  }
}

const twitterIntent = useMemo(() => {
  if (!state.successfulDonationRecipientId) return;
  const twitterIntentBase = "https://twitter.com/intent/tweet?text=";
  let url =
    DEFAULT_GATEWAY +
    `${ownerId}/widget/Index?tab=project&projectId=${state.successfulDonationRecipientId}&referrerId=${context.accountId}`;
  let text = `I just donated to ${
    state.successfulDonationRecipientProfile
      ? state.successfulDonationRecipientProfile.linktree?.twitter
        ? `@${state.successfulDonationRecipientProfile.linktree.twitter}`
        : state.successfulDonationRecipientProfile.name
      : state.successfulDonationRecipientId
  } on @${POTLOCK_TWITTER_ACCOUNT_ID}! Support public goods at `;
  text = encodeURIComponent(text);
  url = encodeURIComponent(url);
  return twitterIntentBase + text + `&url=${url}` + `&hashtags=${DEFAULT_SHARE_HASHTAGS.join(",")}`;
}, [state.successfulDonationRecipientId, state.successfulDonationRecipientProfile]);

// console.log(encodeURIComponent("https://twitter.com/intent/tweet?text=Hello%20world"));

// const donationsForDonor = useMemo(() => {
//   const donations = Near.view(donationContractId, "get_donations_for_donor", {
//     donor_id: context.accountId,
//   });
//   console.log("donations: ", donations);
// }, []);

// console.log("props in Checkout: ", props);

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
            href: `?tab=projects`,
            type: twitterIntent ? "secondary" : "primary",
            text: "Explore projects",
            style: {
              width: "300px",
            },
          }}
        />
        {twitterIntent && props.checkoutSuccessTxHash ? (
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
        )}
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
              <Icon src={TRASH_ICON_URL} />
              <SubTitle>Delete</SubTitle>
            </InnerContainer>
          </ActionsContainer>
          {Object.keys(props.cart).length === 0 ? (
            <div>No items in cart</div>
          ) : (
            Object.keys(props.cart).map((projectId) => {
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
            src={`${ownerId}/widget/Cart.BreakdownSummary`}
            props={{
              ...props,
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
