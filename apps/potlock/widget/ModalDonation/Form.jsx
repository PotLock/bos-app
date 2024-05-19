const { ownerId, NADABOT_HUMAN_METHOD } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADABOT_HUMAN_METHOD: "",
};

const { AmountInput } = VM.require(`potlock.near/widget/ModalDonation.AmountInput`) || {
  AmountInput: () => {},
};
const { Checks } = VM.require(`potlock.near/widget/ModalDonation.Checks`) || {
  Checks: () => {},
};
const { VerifyInfo, Alert } = VM.require(`potlock.near/widget/ModalDonation.Banners`) || {
  VerifyInfo: () => {},
  Alert: () => {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  @media only screen and (max-width: 480px) {
    padding: 1.5rem 1.125rem;
  }
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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
  @media only screen and (max-width: 480px) {
    margin-top: 2rem;
  }
`;

const CurrentBalance = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
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
  > div:last-of-type {
    width: 100%;
  }
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
          justifyContent: "space-between",
        },
        menuStyle: {
          top: "120%",
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

const FormDirect = (props) => {
  const {
    projectId,
    profile,
    amount,
    amountError,
    denominationOptions,
    updateState,
    selectedDenomination,
    donationType,
    ftBalance,
    activeRounds,
    NADABOT_CONTRACT_ID,
    accountId,
  } = props;

  const isUserHumanVerified = Near.view(NADABOT_CONTRACT_ID, NADABOT_HUMAN_METHOD, {
    account_id: accountId,
  });

  const needsToVerify = isUserHumanVerified === false && donationType === "pot";

  const donationTypes = [
    {
      label: "Direct donation",
      val: "direct",
      disabled: false,
    },
    {
      label: "Quadratically matched donation",
      val: "pot",
      disabled: !activeRounds || activeRounds.length === 0,
      disabledText: "(no pots available)",
    },
  ];

  const activeRoundsOptions = {};

  (activeRounds || []).forEach((round) => {
    activeRoundsOptions[round] = {
      label: PotSDK.getConfig(round)?.pot_name || round,
      val: round,
    };
  });

  const isFtDonation = selectedDenomination.text !== "NEAR";

  const HandleAmoutChange = (amount) => {
    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
    if (amount === ".") amount = "0.";
    updateState({ amount, amountError: "" });
    // error if amount is greater than balance
    if (amount > ftBalance && ftBalance !== null) {
      updateState({ amountError: "You don’t have enough balance to complete this transaction." });
    } else if (!isFtDonation && parseFloat(amount) < 0.1) {
      updateState({ amountError: "Minimum donation is 0.1 NEAR" });
    }
  };

  const isLoading =
    donationType === "pot" ? isUserHumanVerified === null || activeRounds === null : false;

  return projectId ? (
    profile === null ? (
      <Widget src={`${ownerId}/widget/Components.Loading`} />
    ) : (
      <Form>
        <Label>How do you want to donate?</Label>
        <Checks
          options={donationTypes}
          value={donationType}
          onClick={(val) =>
            updateState({
              donationType: val,
            })
          }
        />
        {donationType === "pot" && (
          <PotWrapper>
            <Label>Select Pot</Label>
            <SelectPot {...props} activeRoundsOptions={activeRoundsOptions} />
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

        {ftBalance && (
          <CurrentBalance>
            <div className="balance">
              <div>
                {ftBalance} <span> {selectedDenomination.text} </span>
              </div>
              <div>available</div>
            </div>
          </CurrentBalance>
        )}
        {amountError && <Alert error={amountError} />}
        {needsToVerify && <VerifyInfo />}

        <Button>
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              disabled: amountError || !amount,
              text: isLoading ? "Loading..." : "Proceed to donate",
              onClick: () => updateState({ currentPage: "confirm" }),
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
  FormDirect,
};
