const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 24px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

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

const PointerIcon = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: rotate 100ms ease-in-out;
  :hover {
    rotate: 90deg;
  }
`;

const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const HintText = styled.div`
  font-size: 11px;
  color: #7b7b7b;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 20px 32px 20px;
  gap: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 24px 24px 24px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  gap: 24px;
  width: 100%;
`;

const TitleText = styled.div`
  font-size: 14px;
  color: #292929;
  font-weight: 600;
  line-height: 24px;
  word-break: break-word;
`;

const SubtitleText = styled.div`
  font-size: 14px;
  color: #7b7b7b;
  font-weight: 400;
  line-height: 24px;
  word-break: break-word;
`;

const AddNote = styled.div`
  font-size: 14px;
  color: #292929;
  font-weight: 500;
  line-height: 20px;
  word-wrap: break-word;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UserChipLink = styled.a`
  display: flex;
  flex-direction: row;
  padding: 2px 12px;
  margin: 0px 4px;
  gap: 4px;
  border-radius: 32px;
  background: #ebebeb;

  &:hover {
    text-decoration: none;
  }
`;

const TextBold = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
  text-align: center;
`;

const InfoBanner = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dd3345;
  padding: 2px 0px;

  &:hover {
    text-decoration: none;
  }

  > div {
    color: white;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px #dd3345 solid;
  width: 100%;
  background: #fef3f2;
  gap: 16px;
`;

const VerifyLink = styled.a`
  color: #dd3345;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
  text-align: center;

  &:hover {
    text-decoration: none;
  }
`;

const LinkSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(45deg);
  }

  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const NearIcon = (props) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="near-logo"
  >
    <rect width="24" height="24" rx="12" fill="#CECECE" />
    <path
      d="M15.616 6.61333L13.1121 10.3333C12.939 10.5867 13.2719 10.8933 13.5117 10.68L15.9756 8.53333C16.0422 8.48 16.1354 8.52 16.1354 8.61333V15.32C16.1354 15.4133 16.0155 15.4533 15.9623 15.3867L8.50388 6.45333C8.26415 6.16 7.91787 6 7.53163 6H7.26526C6.5727 6 6 6.57333 6 7.28V16.72C6 17.4267 6.5727 18 7.27858 18C7.71809 18 8.13097 17.7733 8.3707 17.3867L10.8746 13.6667C11.0477 13.4133 10.7148 13.1067 10.475 13.32L8.0111 15.4533C7.94451 15.5067 7.85128 15.4667 7.85128 15.3733V8.68C7.85128 8.58667 7.97114 8.54667 8.02442 8.61333L15.4828 17.5467C15.7225 17.84 16.0821 18 16.4551 18H16.7214C17.4273 18 18 17.4267 18 16.72V7.28C18 6.57333 17.4273 6 16.7214 6C16.2686 6 15.8557 6.22667 15.616 6.61333Z"
      fill="black"
    />
  </SvgIcon>
);

const {
  recipientId, // TODO: change this to projectId
  referrerId,
  potId,
  // potDetail,
  onClose,
  NADABOT_CONTRACT_ID,
  POT,
} = props;
const { ownerId, DONATION_CONTRACT_ID, NADABOT_HUMAN_METHOD, NADA_BOT_URL, SUPPORTED_FTS } =
  VM.require("potlock.near/widget/constants") || {
    DONATION_CONTRACT_ID: "",
    NADABOT_HUMAN_METHOD: "",
    ownerId: "",
    NADA_BOT_URL: "",
    SUPPORTED_FTS: {},
  };
// console.log("props in donation modal: ", props);

let ListsSDK =
  VM.require("potlock.near/widget/SDK.lists") ||
  (() => ({
    getRegistrations: () => {},
  }));
ListsSDK = ListsSDK({ env: props.env });

const projects = ListsSDK.getRegistrations() || [];

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const pots = PotFactorySDK.getPots();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
  asyncGetConfig: () => {},
  getApprovedApplications: () => {},
  asyncGetApprovedApplications: () => {},
  asyncGetDonationsForDonor: () => {},
};

const { nearToUsd, formatWithCommas } = VM.require("potlock.near/widget/utils") || {
  nearToUsd: 1,
  formatWithCommas: () => {},
};

const { addItemsToCart, clearCart } = VM.require("potlock.near/widget/SDK.cart") || {
  addItemsToCart: () => {},
  clearCart: () => {},
};

const approvedProjectIds = useMemo(
  // TODO: get projects for pot if potId
  () => {
    if (projects) {
      return projects
        .filter((project) => project.status === "Approved")
        .map((project) => project.registrant_id);
    }
  },
  [projects]
);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const CLOSE_ICON_URL =
//   IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
// const EDIT_ICON_URL = IPFS_BASE_URL + "bafkreigc2laqrwu6g4ihm5n2qfxwl3g5phujtrwybone2ouxaz5ittjzee";
// const NADABOT_ICON_URL =
//   IPFS_BASE_URL + "bafkreib2iag425b6dktehxlrshchyp2pccg5r6ea2blrnzppqia77kzdbe";
// const ALERT_ICON_URL =
//   IPFS_BASE_URL + "bafkreicqarojxk6jhdtsk2scfsmnigqpxjfgar6om4wlhn5xmqbbu74u5i";

const MAX_NAME_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 77;

const profile = Social.getr(`${recipientId}/profile`);

const DEFAULT_DONATION_AMOUNT = "1";

const MAX_NOTE_LENGTH = 60;

const initialState = {
  amount: DEFAULT_DONATION_AMOUNT,
  denomination: DENOMINATION_OPTIONS[0].value,
  showBreakdown: false,
  bypassProtocolFee: false,
  bypassChefFee: false,
  addNote: false,
  donationNote: "",
  donationNoteError: "",
  allPots: null,
  detailForPots: {},
  approvedProjectsForPots: {},
  activeRoundsForProject: potId ? [potId] : null, // mapping of potId to { potDetail }
  intervalId: null,
  ftBalances: null,
  nearBalance: null,
  denominationOptions: [{ text: "NEAR", value: "NEAR", selected: true, decimals: 24 }],
};

State.init(initialState);

const resetState = () => {
  State.update({ ...initialState });
};

const activeRound = useMemo(() => {
  if (!state.activeRoundsForProject) return;
  return state.activeRoundsForProject[0];
}, [state.activeRoundsForProject]);

const selectedDenomination = useMemo(
  () => state.denominationOptions.find((option) => option.selected),
  [state.denominationOptions]
);

const ftBalancesRes = useCache(
  () =>
    asyncFetch(
      `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${context.accountId}/balances/FT`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
        },
      }
    )
      .then((res) => res.body)
      .catch((e) => console.log("error fetching ft balances: ", e)),
  `ft-balances-${context.accountId}`
);
// console.log("ftBalancesRes: ", ftBalancesRes);

useEffect(() => {
  if (context.accountId && !potId && !activeRound && ftBalancesRes && !state.ftBalances) {
    State.update({
      ftBalances: ftBalancesRes.balances,
      denominationOptions: state.denominationOptions.concat(
        ftBalancesRes.balances
          .map(({ amount, contract_account_id, metadata }) => ({
            amount,
            id: contract_account_id,
            text: metadata.symbol,
            value: metadata.symbol,
            icon: metadata.icon,
            decimals: metadata.decimals,
            selected: false,
          }))
          .filter((option) => option.text.length < 10)
      ),
    });
  }
}, [context.accountId, state.ftBalances, ftBalancesRes, potId, activeRound]);

const nearBalanceRes = useCache(
  () =>
    asyncFetch(
      `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${context.accountId}/balances/NEAR`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
        },
      }
    )
      .then((res) => res.body)
      .catch((e) => console.log("error fetching near balance: ", e)),
  `near-balance-${context.accountId}`
);

useEffect(() => {
  if (context.accountId && nearBalanceRes && !state.nearBalance) {
    State.update({
      nearBalance: nearBalanceRes.balance,
    });
  }
}, [context.accountId, state.nearBalance, nearBalanceRes]);

useEffect(() => {
  if (
    pots &&
    Object.keys(state.approvedProjectsForPots).length == pots.length &&
    Object.keys(state.detailForPots).length == pots.length
  ) {
    const activeRoundsForProject = [];
    for (const pot of pots) {
      const potDetail = state.detailForPots[pot.id];
      const approvedProjects = state.approvedProjectsForPots[pot.id];
      const now = Date.now();
      const activeRound = approvedProjects.find((proj) => {
        return (
          proj.project_id === recipientId &&
          potDetail.public_round_start_ms < now &&
          potDetail.public_round_end_ms > now
        );
      });
      if (activeRound) {
        activeRoundsForProject.push(pot.id);
      }
    }
    State.update({ activeRoundsForProject });
  }
}, [pots, state.approvedProjectsForPots, state.detailForPots]);

useEffect(() => {
  if (pots) {
    const detailForPots = {};
    pots.forEach((pot) => {
      PotSDK.asyncGetConfig(pot.id)
        .then((detail) => {
          detailForPots[pot.id] = detail;
          if (Object.keys(detailForPots).length === pots.length) {
            State.update({ detailForPots });
          }
        })
        .catch((e) => {
          console.error("error getting pot detail: ", e);
        });
    });
  }
}, [pots]);

useEffect(() => {
  if (pots) {
    const approvedProjectsForPots = {};
    pots.forEach((pot) => {
      PotSDK.asyncGetApprovedApplications(pot.id)
        .then((approvedProjects) => {
          approvedProjectsForPots[pot.id] = approvedProjects;
          if (Object.keys(approvedProjectsForPots).length === pots.length) {
            State.update({ approvedProjectsForPots });
          }
        })
        .catch((e) => {
          console.error("error getting approved projects: ", e);
        });
    });
  }
}, [pots]);

const handleModalClose = () => {
  resetState();
  onClose();
};

// console.log("state in donation modal: ", state);

const isUserHumanVerified = Near.view(NADABOT_CONTRACT_ID, NADABOT_HUMAN_METHOD, {
  account_id: context.accountId,
});

const potDetail = state.detailForPots[activeRound];

const protocolConfigContractId = potDetail ? potDetail.protocol_config_provider.split(":")[0] : "";
const protocolConfigViewMethodName = potDetail
  ? potDetail.protocol_config_provider.split(":")[1]
  : "";
const protocolConfig =
  protocolConfigContractId && protocolConfigViewMethodName
    ? Near.view(protocolConfigContractId, protocolConfigViewMethodName, {})
    : null;

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const donationContractConfig = !potDetail ? DonateSDK.getConfig() || {} : null;

const [protocolFeeRecipientAccount, protocolFeeBasisPoints, referralFeeBasisPoints] = useMemo(
  // if this is a pot donation, use pot config, else use donation contract config
  () => {
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
  }
);

const profileName = profile?.name || "No name";

const handleAddToCart = () => {
  addItemsToCart([
    {
      id: recipientId,
      amount: state.amount,
      token: selectedDenomination,
      referrerId,
      potId: activeRound || null,
      potDetail: activeRound ? state.detailForPots[activeRound] : null,
    },
  ]);
  handleModalClose();
};

const isFtDonation = selectedDenomination.text !== "NEAR";

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

// const amountNear =
//   state.denomination === "NEAR" ? state.amount : (state.amount / nearToUsd).toFixed(2);

const pollForDonationSuccess = (projectId, afterTs) => {
  // poll for updates
  // TODO: update this to also poll Pot contract
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    (isPotDonation ? PotSDK : DonateSDK)
      .asyncGetDonationsForDonor(context.accountId)
      .then((donations) => {
        for (const donation of donations) {
          const { recipient_id, project_id, donated_at_ms, donated_at } = donation; // donation contract uses recipient_id, pot contract uses project_id; donation contract uses donated_at_ms, pot contract uses donated_at
          if (
            ((recipient_id === projectId || project_id === projectId) && donated_at_ms > afterTs) ||
            donated_at > afterTs
          ) {
            // display success message
            clearInterval(pollId);
            props.openDonationSuccessModal(donation);
          }
        }
      });
  }, pollIntervalMs);
};

const handleDonate = () => {
  // const amountIndivisible = SUPPORTED_FTS.NEAR.toIndivisible(parseFloat(amountNear));
  const donationAmountIndivisible = Big(state.amount).mul(
    new Big(10).pow(selectedDenomination.decimals)
  );
  let projectId = recipientId;
  if (!projectId) {
    // get random project
    const randomIndex = Math.floor(Math.random() * approvedProjectIds.length);
    projectId = approvedProjectIds[randomIndex];
  }
  const args = {
    referrer_id: referrerId,
    bypass_protocol_fee: state.bypassProtocolFee,
    message: state.donationNote,
  };
  if (state.bypassChefFee) {
    args.custom_chef_fee_basis_points = 0;
  }
  const potId = activeRound || null;
  const isPotDonation = potId && isUserHumanVerified === true;
  if (isPotDonation) {
    args.project_id = projectId;
    if (state.bypassChefFee) {
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
            bypass_protocol_fee: state.bypassProtocolFee,
            message: args.message,
          }),
        },
        deposit: "1",
        gas: "300000000000000",
      });
      const now = Date.now();
      Near.call(transactions);
      // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
      // <-------- EXTENSION WALLET HANDLING -------->
      pollForDonationSuccess(projectId, now);
    });
  } else {
    transactions.push({
      contractName: isPotDonation ? potId : DONATION_CONTRACT_ID,
      methodName: "donate",
      args,
      deposit: donationAmountIndivisible.toFixed(0),
      gas: "300000000000000",
    });
    const now = Date.now();
    Near.call(transactions);
    // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
    // <-------- EXTENSION WALLET HANDLING -------->
    pollForDonationSuccess(projectId, now);
  }
};

const donateLoading = !state.activeRoundsForProject || isUserHumanVerified === null;
const donateDisabled = donateLoading || state.amountError || state.donationNoteError;

const ftBalance = useMemo(() => {
  if (selectedDenomination.text === "NEAR") {
    return state.nearBalance
      ? formatWithCommas(Big(state.nearBalance.amount).div(Big(10).pow(24)).toFixed(2))
      : "-";
  }
  const balance = state.denominationOptions.find(
    (option) => option.text === selectedDenomination.text
  );
  return balance
    ? formatWithCommas(Big(balance.amount).div(Big(10).pow(balance.decimals)).toFixed(2))
    : "-";
}, [selectedDenomination, state.ftBalances, state.nearBalance]);

// console.log("ftBalance: ", ftBalance);

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      onClose: (e) => {
        // e.preventDefault();
        e.stopPropagation();
        handleModalClose();
      },
      contentStyle: {
        padding: "0px",
      },
      children: (
        <>
          <ModalHeader>
            <div></div>
            <ModalHeaderText>Donate {recipientId ? "to project" : "Randomly"}</ModalHeaderText>
            <PointerIcon
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onClose}
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="#7B7B7B"
              />
            </PointerIcon>
          </ModalHeader>
          {/* {userShouldVerify && (
            <InfoBanner href={props.NADA_BOT_URL} target="_blank">
              <div>You are not a verified human on nadabot. Verify Now!</div>
            </InfoBanner>
          )} */}
          <ModalBody>
            {recipientId ? (
              profile === null ? (
                <Widget src={`${ownerId}/widget/Components.Loading`} />
              ) : (
                <Row>
                  <Column>
                    <Widget
                      src={`${ownerId}/widget/Project.ProfileImage`}
                      props={{
                        ...props,
                        accountId: recipientId,
                        profile,
                        style: {
                          height: "24px",
                          width: "24px",
                        },
                      }}
                    />
                  </Column>
                  <Column>
                    <TitleText>
                      {profileName.length > MAX_NAME_LENGTH
                        ? profileName.slice(0, MAX_NAME_LENGTH) + "..."
                        : profileName}
                    </TitleText>
                    <SubtitleText>
                      {profile?.description?.length > MAX_DESCRIPTION_LENGTH
                        ? profile?.description?.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
                        : profile?.description}
                    </SubtitleText>
                  </Column>
                </Row>
              )
            ) : (
              <SubtitleText>
                Randomly donate to an approved project on our public good registry and discover who
                you supported afterwards!
              </SubtitleText>
            )}
            <Column style={{ width: "100%" }}>
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  name: "amount",
                  label: "Amount",
                  placeholder: "0",
                  value: state.amount,
                  onChange: (amount) => {
                    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
                    if (amount === ".") amount = "0.";
                    State.update({ amount, amountError: "" });
                    // error if amount is greater than balance
                    if (
                      Big(amount)
                        .mul(Big(10).pow(isFtDonation ? selectedDenomination.decimals : 24))
                        .gt(isFtDonation ? selectedDenomination.amount : state.nearBalance.amount)
                    ) {
                      State.update({ amountError: "Insufficient balance" });
                    } else if (!isFtDonation && parseFloat(amount) < 0.1) {
                      State.update({ amountError: "Minimum donation is 0.1 NEAR" });
                    }
                  },
                  error: state.amountError,
                  inputStyles: {
                    textAlign: "right",
                    borderRadius: "0px 4px 4px 0px",
                  },
                  preInputChildren: (
                    <Widget
                      src={`${ownerId}/widget/Inputs.Select`}
                      props={{
                        noLabel: true,
                        placeholder: "",
                        options: state.denominationOptions,
                        value: {
                          text: selectedDenomination.text,
                          value: selectedDenomination.value,
                        },
                        onChange: ({ text, value }) => {
                          State.update({
                            denominationOptions: state.denominationOptions.map((option) => {
                              option.selected = option.value === value;
                              return option;
                            }),
                          });
                        },
                        containerStyles: {
                          width: "auto",
                        },
                        inputStyles: {
                          border: "none",
                          borderRight: "1px #F0F0F0 solid",
                          boxShadow: "none",
                          borderRadius: "4px 0px 0px 4px",
                          width: "auto",
                          padding: "12px 16px",
                          boxShadow: "0px -2px 0px rgba(93, 93, 93, 0.24) inset",
                        },
                        iconLeft: selectedDenomination.icon ? (
                          <img
                            src={selectedDenomination.icon}
                            style={{ height: "24px", width: "24px" }}
                          />
                        ) : (
                          <NearIcon />
                        ),
                      }}
                    />
                  ),
                }}
              />
              <Row style={{ justifyContent: "space-between", width: "100%", padding: "0px" }}>
                <HintText>1 NEAR = ~${nearToUsd} USD</HintText>
                <div style={{ display: "flex" }}>
                  <HintText style={{ marginRight: "6px" }}>Account balance: </HintText>

                  {selectedDenomination.icon ? (
                    <img
                      src={selectedDenomination.icon}
                      style={{ height: "14px", width: "14px" }}
                    />
                  ) : (
                    <NearIcon style={{ height: "14px", width: "14px" }} />
                  )}

                  <HintText style={{ marginLeft: "4px" }}>{ftBalance}</HintText>
                </div>
              </Row>
            </Column>
            <Row style={{ padding: "0px", gap: "0px" }}>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "bypassProtocolFeeSelector",
                  checked: state.bypassProtocolFee,
                  onClick: (e) => {
                    State.update({ bypassProtocolFee: e.target.checked });
                  },
                }}
              />
              {/* <Label htmlFor="bypassProtocolFeeSelector">Bypass protocol fee</Label>
               */}
              <Label htmlFor="bypassProtocolFeeSelector">
                Bypass {protocolFeeBasisPoints / 100 || "-"}% protocol fee to{" "}
                <UserChipLink
                  href={`https://near.social/mob.near/widget/ProfilePage?accountId=${protocolFeeRecipientAccount}`}
                  target="_blank"
                >
                  <Widget
                    src={`${ownerId}/widget/Project.ProfileImage`}
                    props={{
                      ...props,
                      accountId: protocolFeeRecipientAccount,
                      style: {
                        height: "12px",
                        width: "12px",
                      },
                    }}
                  />
                  <TextBold>
                    {protocolFeeRecipientProfile?.name || protocolFeeRecipientAccount}
                  </TextBold>
                </UserChipLink>
              </Label>
            </Row>
            {potDetail?.chef && potDetail?.chef_fee_basis_points > 0 && (
              <Row style={{ padding: "0px", gap: "0px" }}>
                <Widget
                  src={`${ownerId}/widget/Inputs.Checkbox`}
                  props={{
                    id: "bypassChefFeeSelector",
                    checked: state.bypassChefFee,
                    onClick: (e) => {
                      State.update({ bypassChefFee: e.target.checked });
                    },
                  }}
                />
                <Label htmlFor="bypassChefFeeSelector">
                  Bypass {potDetail?.chef_fee_basis_points / 100 || "-"}% chef fee to{" "}
                  <UserChipLink
                    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${potDetail?.chef}`}
                    target="_blank"
                  >
                    <Widget
                      src={`${ownerId}/widget/Project.ProfileImage`}
                      props={{
                        ...props,
                        accountId: potDetail?.chef,
                        style: {
                          height: "12px",
                          width: "12px",
                        },
                      }}
                    />
                    <TextBold>{chefProfile?.name || potDetail?.chef}</TextBold>
                  </UserChipLink>
                </Label>
              </Row>
            )}
            <Widget
              src={`${ownerId}/widget/Cart.BreakdownSummary`}
              props={{
                ...props,
                referrerId,
                totalAmount: state.amount,
                bypassProtocolFee: state.bypassProtocolFee,
                ftIcon: selectedDenomination.icon,
              }}
            />
            {state.addNote ? (
              <Widget
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  label: "Note",
                  inputRows: 2,
                  inputStyle: {
                    background: "#FAFAFA",
                  },
                  placeholder: `Add an optional note for the project (max ${MAX_NOTE_LENGTH} characters)`,
                  value: state.donationNote,
                  onChange: (donationNote) => State.update({ donationNote }),
                  validate: () => {
                    if (state.donationNote.length > MAX_NOTE_LENGTH) {
                      State.update({
                        donationNoteError: `Note must be less than ${MAX_NOTE_LENGTH} characters`,
                      });
                      return;
                    }
                    State.update({ donationNoteError: "" });
                  },
                  error: state.donationNoteError,
                }}
              />
            ) : (
              <Row style={{ padding: "0px", gap: "0px", cursor: "pointer" }}>
                <SvgIcon
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "18px", height: "18px", marginRight: "8px" }}
                >
                  <path
                    d="M0 13.5019H2.8125L11.1075 5.20687L8.295 2.39438L0 10.6894V13.5019ZM1.5 11.3119L8.295 4.51688L8.985 5.20687L2.19 12.0019H1.5V11.3119Z"
                    fill="#7B7B7B"
                  />
                  <path
                    d="M11.5275 0.219375C11.235 -0.073125 10.7625 -0.073125 10.47 0.219375L9.0975 1.59187L11.91 4.40437L13.2825 3.03188C13.575 2.73938 13.575 2.26688 13.2825 1.97438L11.5275 0.219375Z"
                    fill="#7B7B7B"
                  />
                </SvgIcon>
                <AddNote onClick={() => State.update({ addNote: true })}>Add Note</AddNote>
              </Row>
            )}
            {activeRound && isUserHumanVerified === false && (
              <InfoSection>
                <SvgIcon viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                    fill="#DD3345"
                  />
                </SvgIcon>
                <Column>
                  <TitleText>Increase your impact!</TitleText>
                  <SubtitleText>
                    Verify that you are a human on nadabot to multiply the impact of your donation!
                  </SubtitleText>
                  <VerifyLink href={NADA_BOT_URL} target="_blank">
                    Verify Now{" "}
                    <LinkSvg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[18px] group-hover:rotate-[45deg] transition-all"
                    >
                      <path
                        d="M11.6652 6.77894C11.0834 6.78279 10.5015 6.78574 9.91929 6.78777C9.06125 6.78766 8.20376 6.79135 7.34566 6.78145C6.762 6.77478 6.29535 6.33298 6.30266 5.81732C6.31009 5.32123 6.77706 4.88706 7.32973 4.89083C9.53277 4.89897 11.7351 4.91291 13.9368 4.93265C14.6025 4.93925 14.9748 5.32235 14.9826 6.0022C15.0022 8.19227 15.0157 10.3823 15.0231 12.5723C15.0251 13.2043 14.6477 13.6102 14.0912 13.6135C13.5527 13.6152 13.1403 13.1552 13.1372 12.5298C13.1307 11.2364 13.133 9.9431 13.1287 8.64975C13.1284 8.51553 13.113 8.38013 13.0963 8.12137L12.7089 8.50873C10.6829 10.5347 8.64711 12.5508 6.63972 14.5954C6.22161 15.0212 5.62148 14.9861 5.28149 14.6461C4.88466 14.2493 4.90002 13.7158 5.32463 13.2846C7.35705 11.2478 9.39203 9.21284 11.4295 7.17969L11.7105 6.89876L11.6652 6.77894Z"
                        fill="currentColor"
                      ></path>
                    </LinkSvg>
                  </VerifyLink>
                </Column>
              </InfoSection>
            )}
          </ModalBody>
          <ModalFooter>
            {recipientId && !isFtDonation && (
              <Widget
                src={`${ownerId}/widget/Cart.AddToCart`}
                props={{
                  ownerId: ownerId,
                  text: donateLoading && "Loading...",
                  onClick: handleAddToCart,
                  disabled: donateDisabled,
                  item: {
                    id: recipientId,
                    amount: state.amount,
                    // ft: "NEAR",
                    token: selectedDenomination,
                    referrerId,
                    potId: activeRound || null,
                    potDetail: activeRound ? state.detailForPots[activeRound] : null,
                  },
                  handleCallback: () => handleModalClose(),
                }}
              />
            )}
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                text: donateLoading
                  ? "Loading..."
                  : userShouldVerify
                  ? "Nah, I want to have less impact"
                  : "Donate",
                disabled: donateDisabled,
                onClick: handleDonate,
                style: {
                  padding: "12px 16px",
                },
              }}
            />
            {/* <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                text: userShouldVerify ? "Verify Now" : "Donate",
                // disabled: !state.reviewMessage || !!state.reviewMessageError,
                onClick: userShouldVerify ? null : handleDonate,
                href: userShouldVerify ? props.NADA_BOT_URL : null,
                target: userShouldVerify ? "_blank" : "_self",
                iconSrc: userShouldVerify ? NADABOT_ICON_URL : null,
                style: {
                  padding: "12px 16px",
                },
              }}
            /> */}
          </ModalFooter>
        </>
      ),
    }}
  />
);
