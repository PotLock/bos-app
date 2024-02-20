const {
  ownerId,
  registeredProjects,
  allPots,
  recipientId, // TODO: change this to projectId
  referrerId,
  // potId,
  // potDetail,
  onClose,
  DONATION_CONTRACT_ID,
} = props;

console.log("props in modal donation: ", props);

const projects = registeredProjects || [];

const approvedProjectIds = useMemo(
  // TODO: get projects for pot if potId
  () => projects.filter((project) => project.status === "Approved").map((project) => project.id),
  [projects]
);

const protocolConfigContractId = potDetail ? potDetail?.protocol_config_provider.split(":")[0] : "";
const protocolConfigViewMethodName = potDetail
  ? potDetail?.protocol_config_provider.split(":")[1]
  : "";
const protocolConfig =
  protocolConfigContractId && protocolConfigViewMethodName
    ? Near.view(protocolConfigContractId, protocolConfigViewMethodName, {})
    : null;

const donationContractConfig = !potDetail
  ? Near.view(DONATION_CONTRACT_ID, "get_config", {})
  : null;

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

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
const EDIT_ICON_URL = IPFS_BASE_URL + "bafkreigc2laqrwu6g4ihm5n2qfxwl3g5phujtrwybone2ouxaz5ittjzee";
const NADABOT_ICON_URL =
  IPFS_BASE_URL + "bafkreib2iag425b6dktehxlrshchyp2pccg5r6ea2blrnzppqia77kzdbe";
const ALERT_ICON_URL =
  IPFS_BASE_URL + "bafkreicqarojxk6jhdtsk2scfsmnigqpxjfgar6om4wlhn5xmqbbu74u5i";

const MAX_NAME_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 77;

const profile = Social.getr(`${recipientId}/profile`);

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

const PointerIcon = styled.img`
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
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
  // align-items: center;
  // justify-content: center;
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
  font-size: 12px;
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

const DENOMINATION_OPTIONS = [
  { text: "NEAR", value: "NEAR" },
  { text: "USD", value: "USD" },
];

const DEFAULT_DONATION_AMOUNT = "1";

const MAX_NOTE_LENGTH = 60;

State.init({
  amount: DEFAULT_DONATION_AMOUNT,
  denomination: DENOMINATION_OPTIONS[0].value,
  showBreakdown: false,
  bypassProtocolFee: false,
  bypassChefFee: false,
  addNote: false,
  donationNote: "",
  donationNoteError: "",
  // activeRoundsForProject: null, // mapping of potId to { potDetail, isUserHumanVerified }
  intervalId: null,
  // activeRound: null,
  // userShouldVerify: false,
});

// let activeRoundsForProject = useMemo(() => {
//   if (!recipientId) return false;
//   // const activeRounds = Object.entries(allPots).filter(([_id, { approvedProjects, detail }]) => {
//   //   const { public_round_start_ms, public_round_end_ms } = detail;
//   //   console.log("public_round_start_ms", public_round_start_ms);
//   //   const now = Date.now();
//   //   return (
//   //     approvedProjects.includes(recipientId) &&
//   //     public_round_start_ms < now &&
//   //     public_round_end_ms > now
//   //   );
//   // });
//   const activeRounds = [Object.entries(allPots)[0]]; // TODO: REMOVE THIS LINE
//   console.log("activeRounds line 33", activeRounds);
//   return activeRounds.reduce((acc, [id, pot]) => {
//     console.log("pot line 336: ", pot);
//     const { sybil_wrapper_provider } = pot.detail;
//     const [contractId, viewMethodName] = (sybil_wrapper_provider ?? "").split(":");
//     console.log("line 37: ", contractId, viewMethodName);
//     acc[id] = {
//       pot,
//       isUserHumanVerified:
//         !contractId || !viewMethodName
//           ? true
//           : Near.view(contractId, viewMethodName, { account_id: context.accountId }),
//     };
//     return acc;
//   }, {});
// }, [allPots, recipientId]);

if (!state.activeRoundsForProject) {
  const activeRounds = Object.entries(allPots).filter(([_id, { approvedProjects, detail }]) => {
    const { public_round_start_ms, public_round_end_ms } = detail;
    const now = Date.now();
    return (
      approvedProjects.includes(recipientId) &&
      public_round_start_ms < now &&
      public_round_end_ms > now
    );
  });
  // const activeRounds = [Object.entries(allPots)[0]]; // TODO: REMOVE THIS LINE
  State.update({
    activeRoundsForProject: activeRounds.reduce((acc, [id, pot]) => {
      const { sybil_wrapper_provider } = pot.detail;
      const [contractId, viewMethodName] = (sybil_wrapper_provider ?? "").split(":");
      acc[id] = {
        potDetail: pot.detail,
        isUserHumanVerified:
          !contractId || !viewMethodName
            ? true
            : Near.view(contractId, viewMethodName, { account_id: context.accountId }),
      };
      return acc;
    }, {}),
  });
}

// console.log("state in modal donation: ", state);

const activeRound = useMemo(() => {
  if (!state.activeRoundsForProject) return;
  // return Object.entries(state.activeRoundsForProject)[0];
  return Object.entries(state.activeRoundsForProject).find(
    // take first active round for now TODO: allow user to select
    ([_id, { isUserHumanVerified }]) => isUserHumanVerified
  );
}, [state.activeRoundsForProject]);
// console.log("active round: ", activeRound);

// useEffect(() => {
//   if (!state.activeRound && state.activeRoundsForProject) {
//     const activeRound = Object.entries(state.activeRoundsForProject).find(
//           ([_id, { isUserHumanVerified }]) => isUserHumanVerified
//         );
//     // const activeRound = Object.entries(state.activeRoundsForProject)[0]; // take first active round for now TODO: allow user to select
//     if (activeRound) {
//       console.log("active round in use effect: ", activeRound)
//       const { sybil_wrapper_provider } = activeRound.potDetail;
//       const [contractId, viewMethodName] = (sybil_wrapper_provider ?? "").split(":");
//       State.update({
//         activeRound: {
//           ...activeRound,
//           sybilWrapperContractId: contractId,
//           sybilWrapperViewMethodName: viewMethodName,
//         },
//         userShouldVerify:
//             !contractId || !viewMethodName
//               ? false
//               : !(Near.view(contractId, viewMethodName, { account_id: context.accountId }) || true),,
//       })
//     }
//     State.update({ activeRound });

//   }
// }, [state.activeRoundsForProject]);

// if (state.activeRound && state.userShouldVerify) {
//   // poll for updates
// }

// activeRoundsForProject = [Object.entries(allPots)[0]]; // TODO: REMOVE THIS LINE
// console.log("activeRoundsForProject", activeRoundsForProject);

// if (activeRound) activeRound[1].isUserHumanVerified = false; // TODO: REMOVE THIS LINE

const userShouldVerify = activeRound && !activeRound[1].isUserHumanVerified;

const resetState = () => {
  State.update({
    amount: DEFAULT_DONATION_AMOUNT,
    denomination: DENOMINATION_OPTIONS[0].value,
    showBreakdown: false,
    bypassProtocolFee: false,
    bypassChefFee: false,
    addNote: false,
    donationNote: "",
    donationNoteError: "",
  });
};

const profileName = profile?.name || "No name";

const handleAddToCart = () => {
  props.addProjectsToCart([
    {
      id: recipientId,
      amount: state.amount,
      ft: "NEAR",
      referrerId,
      // potId,
      potDetail,
    },
  ]);
};

const amountNear =
  state.denomination === "NEAR" ? state.amount : (state.amount / props.nearToUsd).toFixed(2);

const handleDonate = () => {
  const amountIndivisible = props.SUPPORTED_FTS.NEAR.toIndivisible(parseFloat(amountNear));
  // TODO: get projectId for random donation
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
  const potId = activeRound ? activeRound[0] : null;
  const isPotDonation = potId && !userShouldVerify;
  if (isPotDonation) {
    args.project_id = projectId;
    if (state.bypassChefFee) {
      args.custom_chef_fee_basis_points = 0;
    }
  } else {
    args.recipient_id = projectId;
  }

  const transactions = [
    {
      contractName: isPotDonation ? potId : DONATION_CONTRACT_ID,
      methodName: "donate",
      args,
      deposit: amountIndivisible.toString(),
      gas: "300000000000000",
    },
  ];

  const now = Date.now();
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <-------- EXTENSION WALLET HANDLING -------->
  // poll for updates
  // TODO: update this to also poll Pot contract
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    Near.asyncView(isPotDonation ? potId : DONATION_CONTRACT_ID, "get_donations_for_donor", {
      donor_id: context.accountId,
      // TODO: implement pagination (should be OK without until there are 500+ donations from this user)
    }).then((donations) => {
      for (const donation of donations) {
        const { recipient_id, project_id, donated_at_ms } = donation;
        if ((recipient_id === projectId || project_id === projectId) && donated_at_ms > now) {
          // display success message & clear cart
          clearInterval(pollId);
          props.openDonationSuccessModal(donation);
        }
      }
    });
  }, pollIntervalMs);
};

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      onClose: (e) => {
        // e.preventDefault();
        e.stopPropagation();
        resetState();
        onClose();
      },
      contentStyle: {
        padding: "0px",
      },
      children: (
        <>
          <ModalHeader>
            <div></div>
            <ModalHeaderText>Donate {recipientId ? "to project" : "Randomly"}</ModalHeaderText>
            <PointerIcon src={CLOSE_ICON_URL} onClick={onClose} />
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
                  label: "Amount",
                  placeholder: "0",
                  value: state.amount,
                  onChange: (amount) => {
                    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
                    if (amount === ".") amount = "0.";
                    State.update({ amount });
                  },
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
                        options: DENOMINATION_OPTIONS,
                        value: { text: state.denomination, value: state.denomination },
                        onChange: ({ text, value }) => {
                          State.update({ denomination: value });
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
                        iconLeft:
                          state.denomination == "NEAR" ? (
                            <Icon src={props.SUPPORTED_FTS.NEAR.iconUrl} />
                          ) : (
                            "$"
                          ),
                      }}
                    />
                  ),
                }}
              />
              <Row style={{ justifyContent: "space-between", width: "100%", padding: "0px" }}>
                <HintText>1 NEAR = ~${props.nearToUsd * 1} USD</HintText>
                <div style={{ display: "flex" }}>
                  <HintText style={{ marginRight: "6px" }}>Account balance: </HintText>
                  <Icon
                    style={{ width: "14px", height: "14px", marginRight: "2px" }}
                    src={props.SUPPORTED_FTS.NEAR.iconUrl}
                  />
                  <HintText>-- Max</HintText>
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
                amountNear,
                bypassProtocolFee: state.bypassProtocolFee,
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
                <Icon
                  src={EDIT_ICON_URL}
                  style={{ width: "18px", height: "18px", marginRight: "8px" }}
                />
                <AddNote onClick={() => State.update({ addNote: true })}>Add Note</AddNote>
              </Row>
            )}
            {userShouldVerify && (
              <InfoSection>
                <Icon src={ALERT_ICON_URL} />
                <Column>
                  <TitleText>Increase your impact!</TitleText>
                  <SubtitleText>
                    Verify that you are a human on nadabot to multiply the impact of your donation!
                  </SubtitleText>
                  <VerifyLink href={props.NADA_BOT_URL} target="_blank">
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
            {recipientId && (
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "tertiary",
                  text: "Add to cart",
                  onClick: handleAddToCart,
                  style: {
                    padding: "12px 16px",
                  },
                }}
              />
            )}
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                text: userShouldVerify ? "Nah, I want to have less impact" : "Donate",
                // disabled: !state.reviewMessage || !!state.reviewMessageError,
                onClick: handleDonate,
                // href: userShouldVerify ? props.NADA_BOT_URL : null,
                // target: userShouldVerify ? "_blank" : "_self",
                // iconSrc: userShouldVerify ? NADABOT_ICON_URL : null,
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
