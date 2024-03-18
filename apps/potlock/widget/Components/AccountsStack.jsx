const { accountIds, maxDisplayCount, sendToBack } = props;

const MAX_DISPLAY_COUNT = maxDisplayCount || 5;

const StackContainer = styled.div`
  width: 200px;
  height: 30px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    margin-left: 36px;
  }
`;

const MoreAccountsContainer = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid white;
  border-radius: 50%;
  background: #dd3345;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${accountIds.length + 1};
  margin-right: -8px;
`;

const MoreAccountsText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const accounts = useMemo(() => accountIds.slice(0, MAX_DISPLAY_COUNT), [accountIds]);

return (
  <StackContainer>
    {accountIds.length > MAX_DISPLAY_COUNT && (
      <MoreAccountsContainer>
        <MoreAccountsText>{MAX_DISPLAY_COUNT}+</MoreAccountsText>
      </MoreAccountsContainer>
    )}
    {accounts.map((accountId, idx) => {
      return (
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            style: {
              width: "28px",
              height: "28px",
              zIndex: sendToBack ? 0 : accountIds.length - idx,
              margin: "0 -8px 0 0",
              border: "2px solid white",
              borderRadius: "50%",
              background: "white",
            },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 h-100 d-block",
            thumbnail: false,
            tooltip: true,
          }}
        />
      );
    })}
  </StackContainer>
);
