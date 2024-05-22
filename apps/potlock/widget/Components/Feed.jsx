let ListsSDK =
  VM.require("${config_account}/widget/SDK.lists") ||
  (() => ({
    getRegistrations: () => {},
  }));
ListsSDK = ListsSDK({ env: props.env });

const registrations = ListsSDK.getRegistrations() || [];

const registrantIds = registrations
  .filter((reg) => reg.status === "Approved")
  .map((reg) => reg.registrant_id);

const Container = styled.div`
  padding: 24px 64px;

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
  }
`;

return (
  <Container>
    <Widget
      key="feed"
      src={"${config_account}/widget/Profile.Feed"}
      props={{ accounts: registrantIds }}
    />
  </Container>
);
