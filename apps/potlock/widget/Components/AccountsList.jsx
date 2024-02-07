const { accountIds, allowRemove, handleRemoveAccount } = props;

const MembersListItem = styled.div`
  padding: 16px 0px;
  border-top: 1px #f0f0f0 solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MembersListItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

const MembersListItemText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
`;

const RemoveMember = styled.a`
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 600;
  visibility: hidden;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
  }

  ${MembersListItem}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

return (
  <>
    {accountIds.map((accountId) => {
      return (
        <MembersListItem>
          <MembersListItemLeft>
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                style: {
                  width: "40px",
                  height: "40px",
                  margin: "0 -8px 0 0",
                  borderRadius: "50%",
                  background: "white",
                },
                imageClassName: "rounded-circle w-100 h-100 d-block",
                thumbnail: false,
                tooltip: true,
              }}
            />
            <MembersListItemText>@{accountId}</MembersListItemText>
          </MembersListItemLeft>
          {allowRemove && (
            <RemoveMember onClick={() => handleRemoveAccount(accountId)}>Remove</RemoveMember>
          )}
        </MembersListItem>
      );
    })}
  </>
);
