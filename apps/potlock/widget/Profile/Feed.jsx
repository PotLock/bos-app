if (!props.accounts) return "No accounts to display feed for";

return (
  <Widget key="feed" src="mob.near/widget/MainPage.N.Feed" props={{ accounts: props.accounts }} />
);
