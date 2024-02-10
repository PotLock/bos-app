const {
  ownerId,
  isModalOpen,
  onClose,
  handleAddFundingSource,
  fundingSources,
  fundingSourceIndex,
} = props;

// console.log("props in add funding source modal: ", props);

State.init({
  investorName: fundingSources[fundingSourceIndex]?.investorName || "",
  investorNameError: "",
  description: fundingSources[fundingSourceIndex]?.description || "",
  descriptionError: "",
  denomination: fundingSources[fundingSourceIndex]?.denomination || "",
  denominationError: "",
  amountReceived: fundingSources[fundingSourceIndex]?.amountReceived || "",
  amountReceivedError: "",
});

// console.log("state in add funding source modal: ", state);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const MONEY_ICON_URL =
  IPFS_BASE_URL + "bafkreiem3zqv4smaflel54lwtl65d7zbulkan3vnfor4fi2sqn3n5p7tpe";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f6f5f3;
  padding: 10px 20px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const ModalHeaderText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #292929;
  line-height: 24px;
  word-wrap: break-word;
  margin-left: 8px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 20px 32px 20px;
  gap: 24px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      isModalOpen,
      onClose,
      overlayStyle: {
        zIndex: 1000,
      },
      contentStyle: {
        padding: "0px",
      },
      children: (
        <>
          <ModalHeader>
            <div></div>
            <Row>
              <Icon src={MONEY_ICON_URL} />
              <ModalHeaderText>Add Past Funding Source</ModalHeaderText>
            </Row>
            <Icon src={CLOSE_ICON_URL} onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                label: "Name of investor",
                placeholder: "Enter investor name",
                value: state.investorName,
                onChange: (val) => State.update({ investorName: val }),
                validate: () => {
                  if (state.investorName.length < 3) {
                    State.update({ investorNameError: "Must be at least 3 characters" });
                    return;
                  }
                  if (state.investorName.length > 50) {
                    State.update({ investorNameError: "Must be less than 50 characters" });
                    return;
                  }
                  State.update({ investorNameError: "" });
                },
                error: state.investorNameError,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Inputs.TextArea`}
              props={{
                label: "Description",
                placeholder: "Type description",
                value: state.description,
                onChange: (description) => State.update({ description }),
                validate: () => {
                  if (state.description.length > 500) {
                    State.update({ descriptionError: "Must be less than 500 characters" });
                    return;
                  }
                  State.update({ descriptionError: "" });
                },
                error: state.descriptionError,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                label: "Denomination of investment",
                placeholder: "e.g. NEAR, USD, USDC, etc.",
                value: state.denomination,
                onChange: (val) => State.update({ denomination: val.toUpperCase() }),
                validate: () => {
                  if (state.denomination.length < 3) {
                    State.update({ denominationError: "Must be at least 3 characters" });
                    return;
                  }
                  if (state.denomination.length > 10) {
                    State.update({ denominationError: "Must be less than 10 characters" });
                    return;
                  }
                  State.update({ denominationError: "" });
                },
                error: state.denominationError,
              }}
            />
            <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                label: "Investment amount",
                placeholder: "e.g. 1000",
                value: state.amountReceived,
                onChange: (val) => State.update({ amountReceived: val }),
                validate: () => {
                  // TODO: VALIDATE AMOUNT
                  if (isNaN(state.amountReceived)) {
                    State.update({ amountReceivedError: "Must be a number" });
                    return;
                  }
                  State.update({ amountReceivedError: "" });
                },
                error: state.amountReceivedError,
              }}
            />
            <Row style={{ width: "100%", justifyContent: "flex-end" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: "Add Funding Source",
                  disabled:
                    !state.investorName ||
                    !!state.investorNameError ||
                    !state.description ||
                    !!state.descriptionError ||
                    !state.denomination ||
                    !!state.denominationError ||
                    !state.amountReceived ||
                    !!state.amountReceivedError,
                  onClick: () => {
                    const fundingSource = {
                      investorName: state.investorName,
                      description: state.description,
                      denomination: state.denomination,
                      amountReceived: state.amountReceived,
                    };
                    State.update({
                      investorName: "",
                      investorNameError: "",
                      description: "",
                      descriptionError: "",
                      denomination: "",
                      denominationError: "",
                      amountReceived: "",
                      amountReceivedError: "",
                    });
                    handleAddFundingSource(fundingSource);
                  },
                }}
              />
            </Row>
          </ModalBody>
        </>
      ),
    }}
  />
);
