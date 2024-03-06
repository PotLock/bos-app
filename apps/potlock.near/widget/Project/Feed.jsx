const { Feed } = VM.require("devs.near/widget/Feed") ?? {
  Feed: () => <></>,
};

return (
  <Feed
    index={{
      action: "post",
      key: "main",
      options: {
        limit: 10,
        order: "desc",
        accountId: props.accounts || [props.projectId],
      },
    }}
    Item={(p) => (
      <Widget
        loading={<div className="w-100" style={{ height: "200px" }} />}
        src="mob.near/widget/MainPage.N.Post"
        props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
      />
    )}
  />
);
