const {
  ownerId,
  registeredProjects,
  recipientId,
  referrerId,
  potId,
  potDetail,
  onClose,
  DONATION_CONTRACT_ID,
} = props;
const projects = registeredProjects || [];

const projectIds = useMemo(
  // TODO: get projects for pot if potId
  () => projects.filter((project) => project.status === "Approved").map((project) => project.id),
  [projects]
);

// console.log("pot id in modal: ", potId);

const protocolConfigContractId = potDetail?.protocol_config_provider.split(":")[0];
const protocolConfigViewMethodName = potDetail?.protocol_config_provider.split(":")[1];
const protocolConfig = Near.view(protocolConfigContractId, protocolConfigViewMethodName, {});
// console.log("protocolConfig: ", protocolConfig);

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
const EDIT_ICON_URL = IPFS_BASE_URL + "bafkreigc2laqrwu6g4ihm5n2qfxwl3g5phujtrwybone2ouxaz5ittjzee";

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

const Name = styled.div`
  font-size: 14px;
  color: #292929;
  font-weight: 600;
  line-height: 24px;
  word-break: break-word;
`;

const Description = styled.div`
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
});

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
      referrerId: referrerId,
      potId: potId,
      potDetail: potDetail,
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
    const randomIndex = Math.floor(Math.random() * projects.length);
    projectId = projects[randomIndex].id;
  }
  const args = {
    referrer_id: referrerId,
    bypass_protocol_fee: state.bypassProtocolFee,
    message: state.donationNote,
  };
  if (state.bypassChefFee) {
    args.custom_chef_fee_basis_points = 0;
  }
  if (potId) {
    args.project_id = projectId;
    if (state.bypassChefFee) {
      args.custom_chef_fee_basis_points = 0;
    }
  } else {
    args.recipient_id = projectId;
  }

  const transactions = [
    {
      contractName: potId ?? DONATION_CONTRACT_ID,
      methodName: "donate",
      args,
      deposit: amountIndivisible.toString(),
      gas: "300000000000000",
    },
  ];
  console.log("transactions: ", transactions);

  const now = Date.now();
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <-------- EXTENSION WALLET HANDLING -------->
  // poll for updates
  // TODO: update this to also poll Pot contract
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    Near.asyncView(DONATION_CONTRACT_ID, "get_donations_for_donor", {
      donor_id: context.accountId,
      // TODO: implement pagination (should be OK without until there are 500+ donations from this user)
    }).then((donations) => {
      for (const donation of donations) {
        const { recipient_id, donated_at_ms } = donation;
        if (recipient_id === projectId && donated_at_ms > now) {
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
                    <Name>
                      {profileName.length > MAX_NAME_LENGTH
                        ? profileName.slice(0, MAX_NAME_LENGTH) + "..."
                        : profileName}
                    </Name>
                    <Description>
                      {profile?.description?.length > MAX_DESCRIPTION_LENGTH
                        ? profile?.description?.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
                        : profile?.description}
                    </Description>
                  </Column>
                </Row>
              )
            ) : (
              <Description>
                Randomly donate to an approved project on our public good registry and discover who
                you supported afterwards!
              </Description>
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
                Bypass {protocolConfig?.basis_points / 100 || "-"}% protocol fee to{" "}
                <UserChipLink
                  href={`https://near.social/mob.near/widget/ProfilePage?accountId=${protocolConfig?.account_id}`}
                  target="_blank"
                >
                  <Widget
                    src={`${ownerId}/widget/Project.ProfileImage`}
                    props={{
                      ...props,
                      accountId: protocolConfig?.account_id,
                      style: {
                        height: "12px",
                        width: "12px",
                      },
                    }}
                  />
                  <TextBold>
                    {protocolFeeRecipientProfile?.name || protocolConfig?.account_id}
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
          </ModalBody>
          <ModalFooter>
            {recipientId && (
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "tertiary",
                  text: "Add to cart",
                  onClick: handleAddToCart,
                }}
              />
            )}
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                text: "Donate",
                // disabled: !state.reviewMessage || !!state.reviewMessageError,
                onClick: handleDonate,
              }}
            />
          </ModalFooter>
        </>
      ),
    }}
  />
);
