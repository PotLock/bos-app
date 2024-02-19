const { ownerId } = props;
const accountId = props.accountId ?? context.accountId;

const { ProfileOptions } = VM.require(`${ownerId}/widget/Project.Options`);

if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const fast = !props.profile;

if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

props.navOptions = ProfileOptions(props);

if (!props.nav) props.nav = "feed";

return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        ...props,
        profile,
        accounts: [accountId],
      }}
    />
  </Wrapper>
);
