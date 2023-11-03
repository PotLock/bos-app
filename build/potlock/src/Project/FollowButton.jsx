const ownerId = "potlock.near";

if (!props.accountId || !context.accountId || context.accountId === props.accountId) {
  return "";
}

const followEdge = Social.keys(`${context.accountId}/graph/follow/${props.accountId}`, undefined, {
  values_only: true,
});

const inverseEdge = Social.keys(`${props.accountId}/graph/follow/${context.accountId}`, undefined, {
  values_only: true,
});

const loading = followEdge === null || inverseEdge === null;
const follow = followEdge && Object.keys(followEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = follow ? "unfollow" : "follow";

const socialArgs = {
  data: {
    [context.accountId]: {
      graph: { follow: { [props.accountId]: follow ? null : "" } },
      index: {
        graph: JSON.stringify({
          key: "follow",
          value: {
            type,
            accountId: props.accountId,
          },
        }),
        notify: JSON.stringify({
          key: props.accountId,
          value: {
            type,
          },
        }),
      },
    },
  },
};

const buttonText = loading ? "Loading" : follow ? "Following" : inverse ? "Follow back" : "Follow";

return (
  <Widget
    src={`${ownerId}/widget/Buttons.ActionButton`}
    props={{
      type: "tertiary",
      text: buttonText,
      disabled: loading,
      style: {
        border: "1px solid rgba(123, 123, 123, 0.36)",
        boxShadow: "0px -2.700000047683716px 0px rgba(123, 123, 123, 0.36) inset",
      },
      onClick: () => {
        const transactions = [
          {
            contractName: "social.near",
            methodName: "set",
            deposit: Big(JSON.stringify(socialArgs).length * 0.00003).mul(Big(10).pow(24)),
            args: socialArgs,
          },
        ];
        Near.call(transactions);
      },
    }}
  />
  //   <CommitButton
  //     disabled={loading}
  //     className={`btn ${loading || follow ? "btn-outline-dark" : "btn-primary"} rounded-5`}
  //     data={data}
  //   >
  //     {loading ? "Loading" : follow ? "Following" : inverse ? "Follow back" : "Follow"}
  //   </CommitButton>
);
