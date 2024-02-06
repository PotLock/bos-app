const {
  ownerId,
  isModalOpen,
  onClose,
  titleText,
  descriptionText,
  unitText,
  inputValue,
  onInputChange,
  handleAddAccount,
  handleRemoveAccount,
  accountError,
  accounts,
} = props;

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const ADD_ACCOUNTS_ICON_URL =
  IPFS_BASE_URL + "bafkreig6c7m2z2lupreu2br4pm3xx575mv6uvmuy2qkij4kzzfpt7tipcq";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const ModalHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
`;

const ModalTitle = styled.div`
  font-color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
`;

const ModalDescription = styled.p`
  font-color: #2e2e2e;
  font-size: 16px;
  font-weight: 400;
`;

const Space = styled.div`
  height: ${(props) => props.height}px;
`;

const MembersCount = styled.span`
  color: #2e2e2e;
  font-weight: 600;
`;

const MembersText = styled.div`
  color: #7b7b7b;
  font-size: 12px;
  font-weight: 400;
`;

const MembersListItem = styled.div`
  padding: 16px 0px;
  border-top: 1px #f0f0f0 solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      isModalOpen,
      onClose,
      children: (
        <>
          <ModalHeader>
            <ModalHeaderLeft>
              <IconContainer>
                <Icon src={ADD_ACCOUNTS_ICON_URL} />
              </IconContainer>
              <ModalTitle>{titleText}</ModalTitle>
            </ModalHeaderLeft>
            <Icon cursor={"pointer"} src={CLOSE_ICON_URL} onClick={onClose} />
          </ModalHeader>
          <ModalDescription>{descriptionText}</ModalDescription>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              placeholder: "NEAR account ID",
              value: inputValue,
              onChange: onInputChange,
              postInputChildren: (
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "primary",
                    text: "Add",
                    onClick: handleAddAccount,
                    style: { borderRadius: `0px 4px 4px 0px` },
                    submit: true,
                  }}
                />
              ),
              handleKeyPress: (e) => {
                if (e.key === "Enter") {
                  handleAddAccount();
                }
              },
              error: accountError,
            }}
          />
          <Space height={24} />
          <MembersText>
            <MembersCount>{accounts.filter((account) => !account.remove).length} </MembersCount>
            {accounts.filter((account) => !account.remove).length == 1 ? unitText : `${unitText}s`}
          </MembersText>
          {accounts
            .filter((account) => !account.remove)
            .map((account) => {
              return (
                <MembersListItem>
                  <MembersListItemLeft>
                    <Widget
                      src="mob.near/widget/ProfileImage"
                      props={{
                        accountId: account.accountId,
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
                    <MembersListItemText>@{account.accountId}</MembersListItemText>
                  </MembersListItemLeft>
                  <RemoveMember onClick={() => handleRemoveAccount(account.accountId)}>
                    Remove
                  </RemoveMember>
                </MembersListItem>
              );
            })}
        </>
      ),
    }}
  />
);
