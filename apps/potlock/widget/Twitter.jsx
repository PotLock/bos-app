const { address } = props;

const twitter = Social.get(`${address}/profile/linktree/twitter`, "final");

if (!twitter) {
  return <p>No Twitter account linked</p>;
}

return (
  <a
    href={
      twitter.startsWith("http://") || twitter.startsWith("https://")
        ? twitter
        : `https://x.com/${twitter}`
    }
    target="_blank"
    rel="noreferrer"
  >
    {twitter}
  </a>
);
