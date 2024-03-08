const { ownerId, projectId } = props;

let RegistrySDK =
  VM.require("potlock.near/widget/SDK.registry") ||
  (() => ({
    isProjectApproved: () => {},
  }));
RegistrySDK = RegistrySDK({ env: props.env });

const projectIsApproved = RegistrySDK.isProjectApproved(projectId);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const SubRow1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  width: 66%;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 24px;
  }
`;

const SubRow2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
  width: 33%;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 24px;
  }
`;

const DonationButton = styled.button`
  padding: 12px 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  background: #fef6ee;
  border-radius: 6px;
  border: none;
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  &:hover {
    background: #dd3345;
    color: #fff;
  }
`;

State.init({
  successfulDonation: null,
});

return (
  <Container>
    <SubRow1>
      <Widget
        src={`${ownerId}/widget/Project.FollowStats`}
        props={{ ...props, accountId: props.id }}
      />
    </SubRow1>
  </Container>
);
