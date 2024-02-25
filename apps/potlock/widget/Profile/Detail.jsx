const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const accountId = props.accountId ?? context.accountId;

const { ProfileOptions } = VM.require(`${ownerId}/widget/Profile.Options`);

if (!accountId) {
  return "No account ID";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
return (
  <Wrapper>
    <Widget
      src={`${ownerId}/widget/Profile.Body`}
      props={{
        accounts: [accountId],
        nav: props.nav ?? "donations",
        navOptions: ProfileOptions(props),
      }}
    />
  </Wrapper>
);
