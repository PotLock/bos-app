const { ownerId, NADABOT_HUMAN_METHOD } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADABOT_HUMAN_METHOD: "",
};

const { AmountInput } = VM.require(`potlock.near/widget/ModalDonation.AmountInput`) || {
  AmountInput: () => {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const DonationType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  > div {
    display: flex;
    border-radius: 8px;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    color: #a6a6a6;
    background: #f6f5f3;
    border: 1px solid transparent;
    &.active {
      box-shadow: 0px 0px 1.4px 2px #fee6e5;
      background: white;
      color: #dd3345;
      border-color: #dd3345;
    }
    &.disabled {
      pointer-events: none;
    }
  }
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #d9d9d9;
  display: flex;
  border-radius: 50%;
  div {
    width: 10px;
    height: 10px;
    background: transparent;
    border-radius: 50%;
    margin: auto;
  }
  &.active {
    border-color: #dd3345;
    div {
      background: #dd3345;
    }
  }
`;

const Button = styled.div`
  display: flex;
  margin-top: 4rem;
  margin-bottom: 0.5rem;
  button {
    padding: 12px 16px;
    width: 100%;
    font-weight: 500;
  }
`;

const CurrentBalance = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  .amount-alert {
    color: #e54141;
  }
  .balance {
    display: flex;
    gap: 0.5rem;
    div:last-of-type {
      color: #7b7b7b;
    }
  }
`;

const PotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const PotSelector = styled.div`
  display: flex;
`;

const Pot = styled.div`
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  border-bottom-width: 2px;
  background: #fff;
  padding: 0.75rem 1rem;
`;

const SelectPot = ({ selectedRound, activeRoundsOptions, updateState }) => (
  <PotSelector>
    <Widget
      src={`${ownerId}/widget/Inputs.Dropdown`}
      props={{
        sortVal: activeRoundsOptions ? activeRoundsOptions[selectedRound].label : "",
        showCount: false,
        sortList: Object.values(activeRoundsOptions),
        buttonStyle: {
          border: "1px solid #dbdbdb",
          padding: "0.75rem 1rem",
          borderBottomWidth: "2px",
          borderRadius: "6px",
        },
        FilterMenuCustomStyle: `left:0; right:auto;`,
        handleSortChange: ({ val }) => {
          updateState({
            selectedRound: val,
          });
        },
      }}
    />
  </PotSelector>
);

const FormPage = (props) => {
  const {
    recipientId,
    profile,
    amount,
    amountError,
    denominationOptions,
    updateState,
    selectedDenomination,
    donationType,
    ftBalance,
    activeRounds,
    activeRound,
    NADABOT_CONTRACT_ID,
    updateTab,
  } = props;

  const isUserHumanVerified = Near.view(NADABOT_CONTRACT_ID, NADABOT_HUMAN_METHOD, {
    account_id: context.accountId,
  });

  const donationTypes = [
    {
      label: "Direct donation",
      val: "direct",
      disabled: false,
    },
    {
      label: "Quadratically matched donation",
      val: "pot",
      disabled: !activeRound && (!activeRounds || activeRounds.length === 0),
    },
  ];

  const activeRoundsOptions = {};

  (activeRounds || []).forEach((round) => {
    activeRoundsOptions[round] = {
      label: PotSDK.getConfig(round)?.pot_name || round,
      val: round,
    };
  });

  const passedPotConfig = PotSDK.getConfig(activeRound);

  const isFtDonation = selectedDenomination.text !== "NEAR";

  const HandleAmoutChange = (amount) => {
    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
    if (amount === ".") amount = "0.";
    updateState({ amount, amountError: "" });
    // error if amount is greater than balance
    if (amount > ftBalance) {
      updateState({ amountError: "Insufficient balance" });
    } else if (!isFtDonation && parseFloat(amount) < 0.1) {
      updateState({ amountError: "Minimum donation is 0.1 NEAR" });
    }
  };

  const isLoading = isUserHumanVerified === null || activeRounds === null;

  return recipientId ? (
    profile === null ? (
      <Widget src={`${ownerId}/widget/Components.Loading`} />
    ) : (
      <Form>
        <Label>How do you want to donate?</Label>
        <DonationType>
          {donationTypes.map((type) => (
            <div
              key={type.val}
              onClick={() =>
                updateState({
                  donationType: type.val,
                })
              }
              className={`${donationType === type.val ? "active" : ""} ${
                type.disabled ? "disabled" : ""
              }`}
            >
              <CheckBox className={`${donationType === type.val ? "active" : ""}`}>
                <div></div>
              </CheckBox>
              <div>
                {type.label} {type.disabled && <span> (no pots available) </span>}
              </div>
            </div>
          ))}
        </DonationType>
        {donationType === "pot" && (
          <PotWrapper>
            <Label>Select Pot</Label>
            {(activeRound || activeRounds?.length === 1) && (
              <Pot>{Object.values(activeRoundsOptions)[0]?.label}</Pot>
            )}
            {activeRounds?.length > 1 && (
              <SelectPot {...props} activeRoundsOptions={activeRoundsOptions} />
            )}
          </PotWrapper>
        )}
        <Label
          style={{
            marginTop: "1.5rem",
          }}
        >
          Amount
        </Label>
        <AmountInput
          value={amount}
          donationType={donationType}
          HandleAmoutChange={HandleAmoutChange}
          updateState={updateState}
          denominationOptions={denominationOptions}
          selectedDenomination={selectedDenomination}
        />

        <CurrentBalance>
          <div className="amount-alert">{amountError}</div>
          <div className="balance">
            <div>
              {ftBalance} <span> {selectedDenomination.text} </span>
            </div>
            <div>available</div>
          </div>
        </CurrentBalance>
        <Button>
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              disabled: amountError,
              text: isLoading
                ? "Loading..."
                : isUserHumanVerified === false
                ? "Nah, I want to have less impact"
                : "Proceed to donate",
              onClick: () => updateState({ currentPage: "confirm" }),
              style: {
                padding: "12px 16px",
              },
            }}
          />
        </Button>
      </Form>
    )
  ) : (
    ""
  );
};

return {
  FormPage,
};
