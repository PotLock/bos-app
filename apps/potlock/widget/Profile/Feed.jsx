const post = props.post || true;
const hashtags = props.hashtags || [];

if (!props.accounts) return "No accounts to display feed for";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .post-btn {
    background: rgb(46, 46, 46);
    border-radius: 6px;
    padding: 12px 16px;
    border: none;
    color: white;
  }
`;

const extraHashtags = hashtags.map((hashtag) => `#${hashtag}`).join(" ");
const initialText = `#potlock #update ${extraHashtags}`;

return (
  <Container>
    {post && <Widget src="potlock.near/widget/Profile.Compose" props={{ initialText }} />}
    <Widget key="feed" src="mob.near/widget/MainPage.N.Feed" props={{ accounts: props.accounts }} />
  </Container>
);
