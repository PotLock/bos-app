const { ownerId, NADABOT_HUMAN_METHOD, DONATION_CONTRACT_ID } = VM.require(
  "potlock.near/widget/constants"
) || {
  ownerId: "",
  NADABOT_HUMAN_METHOD: "",
  DONATION_CONTRACT_ID: "",
};

const { nearToUsd } = VM.require("potlock.near/widget/utils");

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
  asyncGetDonationsForDonor: () => {},
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;
const Amout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-weight: 600;
  }
  div {
    font-weight: 600;
    font-size: 1rem;
  }
  .usd-amount {
    color: #7b7b7b;
  }
  img,
  svg {
    width: 20px;
  }
`;

const SvgIcon = styled.svg`
  width: 16px;
`;

const NoteWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 8px;
  svg {
    width: 14px;
  }
  div {
    font-weight: 500;
  }
`;

const FeesRemoval = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .check {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .label {
    margin-right: 4px;
    margin-left: 8px;
  }
  .address {
    font-weight: 600;
    gap: 4px;
    display: flex;
    align-items: center;
    color: #292929;
    transition: all 300ms;
    &:hover {
      color: #dd3345;
      text-decoration: none;
    }
  }
  .profile-image {
    width: 17px;
    height: 17px;
    display: flex !important;
  }
  @media only screen and (max-width: 480px) {
    .address {
      margin-left: 34px;
      width: 100%;
    }
  }
`;

const Button = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  button {
    padding: 12px 16px;
    width: 100%;
    font-weight: 500;
  }
`;

const NearIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_454_78)">
      <circle cx="8" cy="8" r="7.25" stroke="#292929" stroke-width="1.5" />
      <path
        d="M11.1477 4C10.851 4 10.5763 4.15333 10.421 4.406L8.74866 6.88867C8.72453 6.92441 8.71422 6.96772 8.71967 7.01051C8.72511 7.05329 8.74594 7.09264 8.77826 7.1212C8.81057 7.14976 8.85218 7.1656 8.89531 7.16574C8.93844 7.16589 8.98015 7.15034 9.01266 7.122L10.6587 5.69467C10.6683 5.68598 10.6802 5.68028 10.6931 5.67828C10.7059 5.67628 10.719 5.67806 10.7308 5.6834C10.7426 5.68875 10.7526 5.69742 10.7596 5.70836C10.7665 5.7193 10.7702 5.73203 10.77 5.745V10.215C10.77 10.2287 10.7658 10.2421 10.7579 10.2534C10.7501 10.2646 10.7389 10.2732 10.726 10.2778C10.7131 10.2825 10.6991 10.2831 10.6858 10.2795C10.6726 10.2758 10.6608 10.2682 10.652 10.2577L5.67667 4.30167C5.59667 4.20709 5.49701 4.1311 5.38463 4.079C5.27226 4.0269 5.14987 3.99994 5.026 4H4.85233C4.62628 4 4.40949 4.0898 4.24964 4.24964C4.0898 4.40949 4 4.62628 4 4.85233V11.1477C4 11.3333 4.06061 11.5139 4.17263 11.6619C4.28465 11.81 4.44194 11.9174 4.6206 11.9679C4.79926 12.0184 4.98952 12.0091 5.16245 11.9416C5.33538 11.874 5.48152 11.7519 5.57867 11.5937L7.251 9.111C7.27513 9.07525 7.28544 9.03194 7.27999 8.98916C7.27455 8.94637 7.25372 8.90703 7.22141 8.87846C7.18909 8.8499 7.14748 8.83407 7.10435 8.83392C7.06122 8.83377 7.01951 8.84932 6.987 8.87766L5.341 10.3053C5.33134 10.3139 5.31939 10.3195 5.3066 10.3215C5.29381 10.3234 5.28074 10.3216 5.26898 10.3162C5.25721 10.3108 5.24726 10.3021 5.24034 10.2912C5.23342 10.2803 5.22983 10.2676 5.23 10.2547V5.784C5.22997 5.77027 5.23418 5.75687 5.24206 5.74563C5.24993 5.73438 5.26109 5.72584 5.274 5.72117C5.28691 5.71651 5.30094 5.71594 5.31419 5.71955C5.32743 5.72315 5.33924 5.73076 5.348 5.74133L10.3227 11.698C10.4847 11.8893 10.7227 11.9997 10.9733 12H11.147C11.373 12.0001 11.5898 11.9104 11.7498 11.7507C11.9097 11.591 11.9997 11.3744 12 11.1483V4.85233C11.9999 4.62631 11.9101 4.40956 11.7503 4.24974C11.5904 4.08992 11.3737 4.00009 11.1477 4Z"
        fill="#292929"
      />
    </g>
    <defs>
      <clipPath id="clip0_454_78">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

const ProfileImg = ({ accountId }) => (
  <Widget
    src={`${ownerId}/widget/Project.ProfileImage`}
    props={{
      accountId,
      style: {},
    }}
  />
);

const CheckBox = ({ id, checked, onClick }) => (
  <Widget
    src={`${ownerId}/widget/Inputs.Checkbox`}
    props={{
      id,
      checked,
      onClick,
    }}
  />
);

const getFeesBasisPoints = (protocolConfig, potDetail, donationContractConfig) => {
  if (protocolConfig) {
    return [
      protocolConfig.account_id,
      protocolConfig.basis_points,
      potDetail.referral_fee_public_round_basis_points,
    ];
  } else if (donationContractConfig) {
    return [
      donationContractConfig.protocol_fee_recipient_account,
      donationContractConfig.protocol_fee_basis_points,
      donationContractConfig.referral_fee_basis_points,
    ];
  } else {
    return ["", 0, 0];
  }
};

const pollForDonationSuccess = ({
  projectId: donatedProject,
  afterTs,
  accountId,
  openDonationSuccessModal,
  isPotDonation,
}) => {
  // poll for updates
  // TODO: update this to also poll Pot contract
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    (isPotDonation ? PotSDK : DonateSDK).asyncGetDonationsForDonor(accountId).then((donations) => {
      for (const donation of donations) {
        const { recipient_id, project_id, donated_at_ms, donated_at } = donation; // donation contract uses recipient_id, pot contract uses project_id; donation contract uses donated_at_ms, pot contract uses donated_at

        if (
          ((project_id || recipient_id) === donatedProject &&
            (donated_at_ms || donated_at) > afterTs) ||
          donated_at > afterTs
        ) {
          // display success message
          clearInterval(pollId);

          openDonationSuccessModal({
            projectId: donation,
          });
        }
      }
    });
  }, pollIntervalMs);
};

const ConfirmDirect = (props) => {
  const {
    selectedDenomination,
    bypassProtocolFee,
    bypassChefFee,
    donationNote,
    donationNoteError,
    addNote,
    updateState,
    selectedRound,
    projectId,
    referrerId,
    accountId,
    amount,
    openDonationSuccessModal,
    donationType,
  } = props;

  // Get protcol, referral & chef Fee
  const potDetail = PotSDK.getConfig(selectedRound);

  const protocolConfigContractId = potDetail
    ? potDetail.protocol_config_provider.split(":")[0]
    : "";
  const protocolConfigViewMethodName = potDetail
    ? potDetail.protocol_config_provider.split(":")[1]
    : "";
  const protocolConfig =
    protocolConfigContractId && protocolConfigViewMethodName
      ? Near.view(protocolConfigContractId, protocolConfigViewMethodName, {})
      : null;

  const donationContractConfig = !potDetail ? DonateSDK.getConfig() || {} : null;

  const [protocolFeeRecipientAccount, protocolFeeBasisPoints, referralFeeBasisPoints] =
    getFeesBasisPoints(protocolConfig, potDetail, donationContractConfig);

  const chefFeeBasisPoints = donationType === "pot" ? potDetail?.chef_fee_basis_points : "";

  const storageBalanceBounds = Near.view(selectedDenomination.id, "storage_balance_bounds", {});
  const storageBalanceProtocolFeeRecipient = Near.view(
    selectedDenomination.id,
    "storage_balance_of",
    { account_id: protocolFeeRecipientAccount }
  );
  const storageBalanceReferrer = referrerId
    ? Near.view(selectedDenomination.id, "storage_balance_of", {
        account_id: referrerId,
      })
    : null;
  const storageBalanceDonationContract = Near.view(selectedDenomination.id, "storage_balance_of", {
    account_id: DONATION_CONTRACT_ID,
  });

  const handleDonate = () => {
    const donationAmountIndivisible = Big(amount).mul(
      new Big(10).pow(selectedDenomination.decimals)
    );

    const args = {
      referrer_id: referrerId,
      bypass_protocol_fee: bypassProtocolFee,
      message: donationNote,
      ...(bypassChefFee ? { custom_chef_fee_basis_points: 0 } : {}),
    };

    const potId = selectedRound || null;
    const isPotDonation = potId && donationType === "pot";

    const now = Date.now();

    const successArgs = {
      projectId,
      afterTs: now,
      accountId,
      openDonationSuccessModal,
      isPotDonation,
    };

    if (isPotDonation) {
      args.project_id = projectId;
      if (bypassChefFee) {
        args.custom_chef_fee_basis_points = 0;
      }
    } else {
      args.recipient_id = projectId;
    }
    // FT WORKFLOW:
    // 1. SEND DEPOSIT TO DONATION CONTRACT
    /// 2. CALL FT CONTRACT:
    /// - check for storage balance for all accounts (protocol fee recipient, referrer, project, donation contract)
    const transactions = [];

    const isFtDonation = selectedDenomination.text !== "NEAR";

    if (isFtDonation) {
      const ftId = selectedDenomination.id;
      // add storage deposit transaction
      let requiredDepositFloat = 0.012; // base amount for donation storage
      requiredDepositFloat += 0.0001 * args.message.length; // add 0.0001 NEAR per character in message
      transactions.push({
        contractName: DONATION_CONTRACT_ID,
        methodName: "storage_deposit",
        args: {},
        deposit: Big(requiredDepositFloat).mul(Big(10).pow(24)),
        gas: "100000000000000",
      });
      const { min, max } = storageBalanceBounds;
      const storageMaxBig = Big(max);

      // check storage balance for each account
      if (
        !args.bypass_protocol_fee &&
        (!storageBalanceProtocolFeeRecipient ||
          Big(storageBalanceProtocolFeeRecipient.total).lt(storageMaxBig))
      ) {
        transactions.push({
          contractName: ftId,
          methodName: "storage_deposit",
          args: { account_id: protocolFeeRecipientAccount },
          deposit: storageMaxBig.minus(Big(storageBalanceProtocolFeeRecipient || 0)),
          gas: "100000000000000",
        });
      }
      // referrer
      if (
        referrerId &&
        (!storageBalanceReferrer || Big(storageBalanceReferrer.total).lt(storageMaxBig))
      ) {
        transactions.push({
          contractName: ftId,
          methodName: "storage_deposit",
          args: { account_id: referrerId },
          deposit: storageMaxBig.minus(Big(storageBalanceReferrer || 0)),
          gas: "100000000000000",
        });
      }
      // donation contract
      if (
        !storageBalanceDonationContract ||
        Big(storageBalanceDonationContract.total).lt(storageMaxBig)
      ) {
        transactions.push({
          contractName: ftId,
          methodName: "storage_deposit",
          args: { account_id: DONATION_CONTRACT_ID },
          deposit: storageMaxBig.minus(Big(storageBalanceDonationContract || 0)),
          gas: "100000000000000",
        });
      }
      // project (can't do this till this point)
      Near.asyncView(ftId, "storage_balance_of", { account_id: projectId }).then((balance) => {
        if (!balance || Big(balance.total).lt(storageMaxBig)) {
          transactions.push({
            contractName: ftId,
            methodName: "storage_deposit",
            args: { account_id: projectId },
            deposit: storageMaxBig.minus(Big(balance || 0)),
            gas: "100000000000000",
          });
        }

        // add donation transaction
        transactions.push({
          contractName: ftId,
          methodName: "ft_transfer_call",
          args: {
            receiver_id: DONATION_CONTRACT_ID,
            amount: donationAmountIndivisible.toFixed(0),
            msg: JSON.stringify({
              recipient_id: projectId,
              referrer_id: referrerId || null,
              bypass_protocol_fee: bypassProtocolFee,
              message: args.message,
            }),
          },
          deposit: "1",
          gas: "300000000000000",
        });
        Near.call(transactions);
        // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
        // <-------- EXTENSION WALLET HANDLING -------->
        pollForDonationSuccess(successArgs);
      });
    } else {
      transactions.push({
        contractName: isPotDonation ? potId : DONATION_CONTRACT_ID,
        methodName: "donate",
        args,
        deposit: donationAmountIndivisible.toFixed(0),
        gas: "300000000000000",
      });
      Near.call(transactions);
      // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
      // <-------- EXTENSION WALLET HANDLING -------->
      pollForDonationSuccess(successArgs);
    }
  };

  return (
    <Container>
      <div>
        <Label>Total amount</Label>
        <Amout>
          <div>
            {selectedDenomination.icon ? <img src={selectedDenomination.icon} /> : <NearIcon />}
          </div>
          <div>
            {amount} <span>{selectedDenomination.text}</span>
          </div>
          {nearToUsd && selectedDenomination.text === "NEAR" && (
            <div className="usd-amount">~${(nearToUsd * amount).toFixed(2)}</div>
          )}
        </Amout>
      </div>
      <div>
        <Widget
          src={`${ownerId}/widget/Cart.BreakdownSummary`}
          props={{
            ...props,
            referrerId,
            protocolFeeBasisPoints,
            referralFeeBasisPoints,
            bypassChefFee,
            chef: potDetail?.chef,
            chefFeeBasisPoints,
            totalAmount: amount,
            bypassProtocolFee: bypassProtocolFee,
            ftIcon: selectedDenomination.icon,
          }}
        />
      </div>
      <FeesRemoval>
        <div className="check">
          <CheckBox
            id="bypassProtocolFeeSelector"
            checked={bypassProtocolFee}
            onClick={(e) => {
              updateState({ bypassProtocolFee: e.target.checked });
            }}
          />

          <div className="label">Remove {protocolFeeBasisPoints / 100 || "-"}% protocol fee</div>
          <a
            href={`https://near.social/mob.near/widget/ProfilePage?accountId=${protocolFeeRecipientAccount}`}
            className="address"
            target="_blank"
          >
            <ProfileImg accountId={protocolFeeRecipientAccount} />

            {protocolFeeRecipientAccount}
          </a>
        </div>
        {potDetail?.chef && chefFeeBasisPoints > 0 && (
          <div className="check">
            <CheckBox
              id="bypassChefFeeSelector"
              checked={bypassChefFee}
              onClick={(e) => {
                updateState({ bypassChefFee: e.target.checked });
              }}
            />

            <div className="label"> Remove {chefFeeBasisPoints / 100 || "-"}% chef fee</div>
            <a
              href={`https://near.social/mob.near/widget/ProfilePage?accountId=${potDetail?.chef}`}
              className="address"
              target="_blank"
            >
              <ProfileImg accountId={potDetail?.chef} />

              {potDetail?.chef}
            </a>
          </div>
        )}
      </FeesRemoval>

      {addNote ? (
        <Widget
          src={`${ownerId}/widget/Inputs.TextArea`}
          props={{
            label: "Note",
            inputRows: 2,
            inputStyle: {
              background: "#FAFAFA",
            },
            placeholder: `Add an optional note for the project (max ${MAX_NOTE_LENGTH} characters)`,
            value: donationNote,
            onChange: (donationNote) => updateState({ donationNote }),
            validate: () => {
              if (donationNote.length > MAX_NOTE_LENGTH) {
                updateState({
                  donationNoteError: `Note must be less than ${MAX_NOTE_LENGTH} characters`,
                });
                return;
              }
              updateState({ donationNoteError: "" });
            },
            error: donationNoteError,
          }}
        />
      ) : (
        <NoteWrapper onClick={() => updateState({ addNote: true })}>
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.249054 13.7509H3.06155L11.3566 5.4559L8.54405 2.6434L0.249054 10.9384V13.7509ZM1.74905 11.5609L8.54405 4.7659L9.23405 5.4559L2.43905 12.2509H1.74905V11.5609Z"
              fill="#7B7B7B"
            />
            <path
              d="M11.7766 0.468398C11.4841 0.175898 11.0116 0.175898 10.7191 0.468398L9.34655 1.8409L12.1591 4.6534L13.5316 3.2809C13.8241 2.9884 13.8241 2.5159 13.5316 2.2234L11.7766 0.468398Z"
              fill="#7B7B7B"
            />
          </svg>

          <div>Add Note</div>
        </NoteWrapper>
      )}
      <Button>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Confirm donation",
            onClick: handleDonate,
          }}
        />
      </Button>
    </Container>
  );
};

return {
  ConfirmDirect,
};
