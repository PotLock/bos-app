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
  accountIds,
} = props;

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const ADD_ACCOUNTS_ICON_URL =
//   IPFS_BASE_URL + "bafkreig6c7m2z2lupreu2br4pm3xx575mv6uvmuy2qkij4kzzfpt7tipcq";
// const CLOSE_ICON_URL =
//   IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";

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

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
  transition: 300ms ease-in-out;
  :hover {
    ${(props) => props.hover || ""}
  }
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
                <Icon viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.24 7.65C15.07 7.13 13.63 6.75 12 6.75C10.37 6.75 8.93 7.14 7.76 7.65C6.68 8.13 6 9.21 6 10.39V12H18V10.39C18 9.21 17.32 8.13 16.24 7.65ZM8.07 10C8.16 9.77 8.34 9.58 8.56 9.48C9.66 8.99 10.82 8.75 11.99 8.75C13.17 8.75 14.32 9 15.42 9.48C15.65 9.58 15.82 9.77 15.91 10H8.07Z"
                    fill="#151A23"
                  />
                  <path
                    d="M1.22 8.58C0.48 8.9 0 9.62 0 10.43V12H4.5V10.39C4.5 9.56 4.73 8.78 5.13 8.1C4.76 8.04 4.39 8 4 8C3.01 8 2.07 8.21 1.22 8.58Z"
                    fill="#151A23"
                  />
                  <path
                    d="M22.78 8.58C21.93 8.21 20.99 8 20 8C19.61 8 19.24 8.04 18.87 8.1C19.27 8.78 19.5 9.56 19.5 10.39V12H24V10.43C24 9.62 23.52 8.9 22.78 8.58Z"
                    fill="#151A23"
                  />
                  <path
                    d="M12 6C13.66 6 15 4.66 15 3C15 1.34 13.66 0 12 0C10.34 0 9 1.34 9 3C9 4.66 10.34 6 12 6ZM12 2C12.55 2 13 2.45 13 3C13 3.55 12.55 4 12 4C11.45 4 11 3.55 11 3C11 2.45 11.45 2 12 2Z"
                    fill="#151A23"
                  />
                  <path
                    d="M3.9999 2.49687L1.49677 5L3.9999 7.50313L6.50303 5L3.9999 2.49687Z"
                    fill="#151A23"
                  />
                  <path d="M20 3L17.5 7H22.5L20 3Z" fill="#151A23" />
                </Icon>
              </IconContainer>
              <ModalTitle>{titleText}</ModalTitle>
            </ModalHeaderLeft>
            <Icon
              cursor={"pointer"}
              hover={`
              rotate: 180deg;
            `}
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onClose}
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#7B7B7B"
              />
            </Icon>
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
            <MembersCount>{accountIds.length} </MembersCount>
            {accountIds.length == 1 ? unitText : `${unitText}s`}
          </MembersText>
          <Widget
            src={`${ownerId}/widget/Components.AccountsList`}
            props={{
              accountIds,
              allowRemove: true,
              handleRemoveAccount,
            }}
          />
        </>
      ),
    }}
  />
);
