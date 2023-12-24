const { ownerId, potDetail, potId, POT_FACTORY_CONTRACT_ID } = props;

const DEFAULT_REGISTRY_PROVIDER = "registry.potlock.near:is_registered";
const DEFAULT_SYBIL_WRAPPER_PROVIDER = "sybil.potlock.near:is_human";
const DEFAULT_PROTOCOL_CONFIG_PROVIDER = `${POT_FACTORY_CONTRACT_ID}:get_protocol_config`;
const CURRENT_SOURCE_CODE_VERSION = "0.1.0";
const SOURCE_CODE_LINK = "https://github.com/PotLock/core"; // for use in contract source metadata
const POT_CODE_LINK = "https://github.com/PotLock/core/tree/main/contracts/pot"; // for directing user to view source code for Pot

Big.PE = 100;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 68px;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 320px 32px 32px 32px;
  }
`;

const FormDivider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #ebebeb;
`;

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 160px;
  margin: 48px 0 48px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const FormSectionLeftDiv = styled.div`
  //   flex: 1;
  width: 30%;
  display: flex;
  flex-direction: column;
  // background-color: yellow;
  gap: 16px;
`;

const FormSectionRightDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const FormSectionTitle = styled.div`
  color: #2e2e2e;
  font-size: 16;
  font-weight: 600;
  word-wrap: break-word;
`;

const FormSectionDescription = styled.div`
  color: #2e2e2e;
  font-size: 16;
  font-weight: 400;
  word-wrap: break-word;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
`;

const isUpdate = !!potDetail;

// TODO: take values from props.potDetail if present
// State.init({
//   owner:  context.accountId,
//   ownerError: "",
//   name: "",
//   nameError: "",
//   description: "",
//   descriptionError: "",
//   referrerFeeMatchingPoolBasisPoints: "",
//   referrerFeeMatchingPoolBasisPointsError: "",
//   referrerFeePublicRoundBasisPoints: "",
//   referrerFeePublicRoundBasisPointsError: "",
//   protocolFeeBasisPoints: "",
//   protocolFeeBasisPointsError: "",
//   applicationStartDate: "",
//   applicationStartDateError: "",
//   applicationEndDate: "",
//   applicationEndDateError: "",
//   matchingRoundStartDate: "",
//   matchingRoundStartDateError: "",
//   matchingRoundEndDate: "",
//   matchingRoundEndDateError: "",
//   chef: "",
//   chefError: "",
//   chefFeeBasisPoints: "",
//   chefFeeBasisPointsError: "",
//   maxProjects: "",
//   maxProjectsError: "",
//   latestSourceCodeCommitHash: "",
//   deploymentSuccess: false,
// });

const convertToUTCTimestamp = (localDateTime) => {
  if (!localDateTime) {
    return;
  }
  return new Date(localDateTime).getTime();
};

const formatTimestampForDateTimeLocal = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

State.init({
  owner: isUpdate ? potDetail.owner : context.accountId,
  ownerError: "",
  admins: isUpdate ? potDetail.admins : [],
  adminsError: "",
  name: isUpdate ? potDetail.pot_name : "",
  nameError: "",
  description: isUpdate ? potDetail.pot_description : "",
  descriptionError: "",
  referrerFeeMatchingPoolBasisPoints: isUpdate
    ? potDetail.referral_fee_matching_pool_basis_points
    : "",
  referrerFeeMatchingPoolBasisPointsError: "",
  referrerFeePublicRoundBasisPoints: isUpdate
    ? potDetail.referral_fee_public_round_basis_points
    : "",
  referrerFeePublicRoundBasisPointsError: "",
  protocolFeeBasisPoints: isUpdate ? potDetail.protocol_fee_basis_points : "",
  protocolFeeBasisPointsError: "",
  applicationStartDate: isUpdate
    ? formatTimestampForDateTimeLocal(potDetail.application_start_ms)
    : "",
  applicationStartDateError: "",
  applicationEndDate: isUpdate ? formatTimestampForDateTimeLocal(potDetail.application_end_ms) : "",
  applicationEndDateError: "",
  matchingRoundStartDate: isUpdate
    ? formatTimestampForDateTimeLocal(potDetail.public_round_start_ms)
    : "",
  matchingRoundStartDateError: "",
  matchingRoundEndDate: isUpdate
    ? formatTimestampForDateTimeLocal(potDetail.public_round_end_ms)
    : "",
  matchingRoundEndDateError: "",
  chef: isUpdate ? potDetail.chef : "",
  chefError: "",
  chefFeeBasisPoints: isUpdate ? potDetail.chef_fee_basis_points : "",
  chefFeeBasisPointsError: "",
  maxProjects: isUpdate ? potDetail.max_projects : "",
  maxProjectsError: "",
  baseCurrency: isUpdate ? potDetail.base_currency : "",
  baseCurrencyError: "",
  minMatchingPoolDonationAmount: isUpdate
    ? potDetail.min_matching_pool_donation_amount
    : "1000000000000000000000000", // 1 NEAR
  minMatchingPoolDonationAmountError: "",
  latestSourceCodeCommitHash: "",
  deploymentSuccess: false,
});

const MAX_DESCRIPTION_LENGTH = 320;

const userIsWhitelisted = props.QF_WHITELISTED_ACCOUNTS.includes(context.accountId);

if (!isUpdate && !userIsWhitelisted) return "Unauthorized";

if (!isUpdate && !state.latestSourceCodeCommitHash) {
  const res = fetch("https://api.github.com/repos/PotLock/core/commits");
  if (res.ok && res.body.length > 0) {
    State.update({
      latestSourceCodeCommitHash: res.body[0].sha,
    });
  }
}

// TODO: GET PROTOCOL FEES FROM POTFACTORY CONTRACT AND SET ON STATE & DISPLAY IN FORM AS READ-ONLY INPUTS

const getDeployArgsFromState = () => {
  return {
    owner: state.owner,
    admins: [], // TODO: CHANGE TO TAKE FROM STATE
    chef: state.chef,
    pot_name: state.name,
    pot_description: state.description,
    max_projects: parseInt(state.maxProjects),
    application_start_ms: convertToUTCTimestamp(state.applicationStartDate),
    application_end_ms: convertToUTCTimestamp(state.applicationEndDate),
    public_round_start_ms: convertToUTCTimestamp(state.matchingRoundStartDate),
    public_round_end_ms: convertToUTCTimestamp(state.matchingRoundEndDate),
    registry_provider: DEFAULT_REGISTRY_PROVIDER,
    sybil_wrapper_provider: DEFAULT_SYBIL_WRAPPER_PROVIDER,
    custom_sybil_checks: null, // not necessary to include null values but doing so for clarity
    custom_min_threshold_score: null,
    referral_fee_matching_pool_basis_points: state.referrerFeeMatchingPoolBasisPoints,
    referral_fee_public_round_basis_points: state.referrerFeePublicRoundBasisPoints,
    chef_fee_basis_points: state.chefFeeBasisPoints,
    protocol_config_provider: DEFAULT_PROTOCOL_CONFIG_PROVIDER, // TODO: this should not be passed in here, as it's too easy to override. Should be set by factory contract when deploying.
    source_metadata: {
      version: CURRENT_SOURCE_CODE_VERSION,
      commit_hash: state.latestSourceCodeCommitHash,
      link: SOURCE_CODE_LINK,
    },
  };
};

const getUpdateArgsFromState = () => {
  // pub owner: Option<AccountId>,
  // pub admins: Option<Vec<AccountId>>,
  // pub chef: Option<AccountId>,
  // pub pot_name: Option<String>,
  // pub pot_description: Option<String>,
  // pub max_projects: Option<u32>,
  // pub application_start_ms: Option<TimestampMs>,
  // pub application_end_ms: Option<TimestampMs>,
  // pub public_round_start_ms: Option<TimestampMs>,
  // pub public_round_end_ms: Option<TimestampMs>,
  // pub registry_provider: Option<ProviderId>,
  // pub min_matching_pool_donation_amount: Option<U128>,
  // pub sybil_wrapper_provider: Option<ProviderId>,
  // pub custom_sybil_checks: Option<Vec<CustomSybilCheck>>,
  // pub custom_min_threshold_score: Option<u32>,
  // pub referral_fee_matching_pool_basis_points: Option<u32>,
  // pub referral_fee_public_round_basis_points: Option<u32>,
  // pub chef_fee_basis_points: Option<u32>,
  return {
    owner: context.accountId === potDetail.owner ? state.owner : null,
    admins: state.admins,
    chef: state.chef,
    pot_name: state.name,
    pot_description: state.description,
    max_projects: parseInt(state.maxProjects),
    application_start_ms: convertToUTCTimestamp(state.applicationStartDate),
    application_end_ms: convertToUTCTimestamp(state.applicationEndDate),
    public_round_start_ms: convertToUTCTimestamp(state.matchingRoundStartDate),
    public_round_end_ms: convertToUTCTimestamp(state.matchingRoundEndDate),
    // TODO: add registry_provider, sybil_wrapper_provider, custom_sybil_checks, custom_min_threshold_score
    min_matching_pool_donation_amount: state.minMatchingPoolDonationAmount,
    referral_fee_matching_pool_basis_points: state.referrerFeeMatchingPoolBasisPoints,
    referral_fee_public_round_basis_points: state.referrerFeePublicRoundBasisPoints,
    chef_fee_basis_points: state.chefFeeBasisPoints,
  };
};

const handleDeploy = () => {
  // create deploy pot args
  const deployArgs = getDeployArgsFromState();
  //   console.log("deployargs: ", deployArgs);

  Near.asyncView(POT_FACTORY_CONTRACT_ID, "calculate_min_deployment_deposit", {
    args: deployArgs,
  }).then((amount) => {
    const amountYoctos = Big(amount).plus(Big("20000000000000000000000")); // add extra 0.02 NEAR as buffer
    const transactions = [
      {
        contractName: POT_FACTORY_CONTRACT_ID,
        methodName: "deploy_pot",
        deposit: amountYoctos,
        args: { pot_args: deployArgs },
        gas: props.ONE_TGAS.mul(300),
      },
    ];
    const now = Date.now();
    Near.call(transactions);
    // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
    // <---- EXTENSION WALLET HANDLING ---->
    // poll for updates
    const pollIntervalMs = 1000;
    // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
    const pollId = setInterval(() => {
      Near.asyncView(POT_FACTORY_CONTRACT_ID, "get_pots", {}).then((pots) => {
        // console.log("pots: ", pots);
        const pot = pots.find(
          (pot) => pot.deployed_by === context.accountId && pot.deployed_at_ms > now
        );
        if (pot) {
          clearInterval(pollId);
          State.update({ deploymentSuccess: true });
        }
      });
    }, pollIntervalMs);
  });
};

const handleUpdate = () => {
  // create update pot args
  const updateArgs = getUpdateArgsFromState();
  updateArgs.source_metadata = potDetail.source_metadata;
  //   console.log("updateArgs: ", updateArgs);
  const transactions = [
    {
      contractName: potId,
      methodName: "admin_dangerously_set_pot_config",
      //   deposit: Big(0.1).mul(Big(10).pow(24)),
      deposit: 0,
      args: { update_args: updateArgs },
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ---->
  // TODO: IMPLEMENT
};

// console.log("state: ", state);

const validateAndUpdatePercentages = (percent, stateKey, errorKey) => {
  // TODO: move this to separate component for percentage input that accepts "basisPoints" bool parameter
  const percentFloat = parseFloat(percent);
  const updates = {
    [errorKey]: "",
  };
  if (!percent) {
    updates[stateKey] = "";
  } else if (percentFloat && percentFloat <= 100) {
    updates[stateKey] = percentFloat * 100;
  }
  State.update(updates);
};

const FormSectionLeft = (title, description) => {
  return (
    <FormSectionLeftDiv>
      <FormSectionTitle>{title}</FormSectionTitle>
      <FormSectionDescription>{description}</FormSectionDescription>
    </FormSectionLeftDiv>
  );
};

return (
  <FormBody>
    <props.ToDo>Add validation to all fields (currently only %'s are validated)</props.ToDo>
    <FormDivider />
    <FormSectionContainer>
      {FormSectionLeft("Pot details", "")}
      <FormSectionRightDiv>
        {isUpdate && <props.ToDo>Only allow owner edit if logged in account is owner</props.ToDo>}
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Owner *",
            placeholder: `E.g. ${context.accountId}`,
            value: state.owner,
            onChange: (owner) => State.update({ owner, ownerError: "" }),
            validate: () => {
              // **CALLED ON BLUR**
              // TODO: validate owner
              State.update({ ownerError: "" });
            },
            error: state.ownerError,
          }}
        />
        <props.ToDo>ADD ADMINS multi-entry</props.ToDo>
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Name *",
            placeholder: "E.g. DeFi Center",
            value: state.name,
            onChange: (name) => State.update({ name, nameError: "" }),
            validate: () => {
              // **CALLED ON BLUR**
              // TODO: validate name
              State.update({ nameError: "" });
            },
            error: state.nameError,
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
              if (state.description.length > MAX_DESCRIPTION_LENGTH) {
                State.update({
                  descriptionError: `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
                });
                return;
              }

              State.update({ descriptionError: "" });
            },
            error: state.descriptionError,
          }}
        />
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Referrer fee % (matching pool)",
              placeholder: "% 0",
              value: state.referrerFeeMatchingPoolBasisPoints
                ? state.referrerFeeMatchingPoolBasisPoints / 100
                : "",
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "referrerFeeMatchingPoolBasisPoints",
                  "referrerFeeMatchingPoolBasisPointsError"
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate percent
                State.update({ referrerFeeMatchingPoolBasisPointsError: "" });
              },
              error: state.referrerFeeMatchingPoolBasisPointsError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Referrer fee % (public round)",
              placeholder: "% 0",
              value: state.referrerFeePublicRoundBasisPoints
                ? state.referrerFeePublicRoundBasisPoints / 100
                : "",
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "referrerFeePublicRoundBasisPoints",
                  "referrerFeePublicRoundBasisPointsError"
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate percent
                State.update({ referrerFeePublicRoundBasisPointsError: "" });
              },
              error: state.referrerFeePublicRoundBasisPointsError,
            }}
          />
          {/* <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                label: "Protocol fee %",
                placeholder: "% 0",
                value: state.protocolFeeBasisPoints ? state.protocolFeeBasisPoints / 100 : "",
                onChange: (percent) =>
                  State.update({
                    protocolFeeBasisPoints: parseFloat(percent) * 100,
                    protocolFeeBasisPointsError: "",
                  }),
                validate: () => {
                  // **CALLED ON BLUR**
                  // TODO: validate percent
                  State.update({ protocolFeeBasisPointsError: "" });
                },
                error: state.protocolFeeBasisPointsError,
              }}
            /> */}
        </Row>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Application start date",
              //   placeholder: "% 0", // TODO: possibly add this back in
              selectTime: true,
              value: state.applicationStartDate,
              onChange: (date) => {
                State.update({ applicationStartDate: date });
              },
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate date
                State.update({ applicationStartDateError: "" });
              },
              error: state.applicationStartDateError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Application end date",
              //   placeholder: "% 0", // TODO: possibly add this back in
              selectTime: true,
              value: state.applicationEndDate,
              onChange: (date) => State.update({ applicationEndDate: date }),
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate date
                State.update({ applicationEndDateError: "" });
              },
              error: state.applicationEndDateError,
            }}
          />
        </Row>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Matching round start date",
              selectTime: true,
              value: state.matchingRoundStartDate,
              onChange: (date) => State.update({ matchingRoundStartDate: date }),
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate date
                State.update({ matchingRoundStartDateError: "" });
              },
              error: state.matchingRoundStartDateError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Matching round end date",
              //   placeholder: "% 0", // TODO: possibly add this back in
              selectTime: true,
              value: state.matchingRoundEndDate,
              onChange: (date) => State.update({ matchingRoundEndDate: date }),
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate date
                State.update({ matchingRoundEndDateError: "" });
              },
              error: state.matchingRoundEndDateError,
            }}
          />
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
    {/* <FormDivider /> */}
    <FormSectionContainer>
      {FormSectionLeft("Chef details", "")}
      <FormSectionRightDiv>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Assign chef",
              value: state.chef,
              onChange: (chef) => State.update({ chef }),
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate chef
                State.update({ chefError: "" });
              },
              error: state.chefError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Chef fee %",
              placeholder: "% 0",
              value: state.chefFeeBasisPoints ? state.chefFeeBasisPoints / 100 : "",
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "chefFeeBasisPoints",
                  "chefFeeBasisPointsError"
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
                // TODO: validate percent
                State.update({ chefFeeBasisPointsError: "" });
              },
              error: state.chefFeeBasisPointsError,
            }}
          />
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
    {/* <FormDivider /> */}
    <FormSectionContainer>
      {FormSectionLeft("Application details", "")}
      <FormSectionRightDiv>
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Max. approved applicants",
            placeholder: "4",
            value: state.maxProjects,
            onChange: (maxProjects) => State.update({ maxProjects }),
            validate: () => {
              // **CALLED ON BLUR**
              // TODO: validate maxProjects
              State.update({ maxProjectsError: "" });
            },
            error: state.maxProjectsError,
          }}
        />
      </FormSectionRightDiv>
    </FormSectionContainer>
    <FormSectionContainer>
      {FormSectionLeft("Donor Requirements", "")}
      <FormSectionRightDiv>
        <props.ToDo>Add donor requirements as per latest sybil contract</props.ToDo>
        <props.ToDo>Add Pot images upload (main & background/cover)</props.ToDo>
        <Row style={{ justifyContent: "flex-end", marginTop: "36px" }}>
          {!isUpdate && (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "tertiary",
                text: "Cancel",
                style: props.style || {},
                onClick: () => {
                  // TODO: handle click
                },
              }}
            />
          )}
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: isUpdate ? "Save changes" : "Deploy",
              style: props.style || {},
              onClick: isUpdate ? handleUpdate : handleDeploy,
            }}
          />
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
  </FormBody>
);
