const {
  ownerId,
  potDetail,
  potId,
  POT_FACTORY_CONTRACT_ID,
  NADABOT_CONTRACT_ID,
  validateNearAddress,
  SUPPORTED_FTS: { NEAR },
} = props;

const DEFAULT_REGISTRY_PROVIDER = "registry.potlock.near:is_registered";
const DEFAULT_SYBIL_WRAPPER_PROVIDER = `${NADABOT_CONTRACT_ID}:is_human`;
const DEFAULT_PROTOCOL_CONFIG_PROVIDER = `${POT_FACTORY_CONTRACT_ID}:get_protocol_config`;
const CURRENT_SOURCE_CODE_VERSION = "0.1.0";
const SOURCE_CODE_LINK = "https://github.com/PotLock/core"; // for use in contract source metadata
const POT_CODE_LINK = "https://github.com/PotLock/core/tree/main/contracts/pot"; // for directing user to view source code for Pot

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const ADD_ADMINS_ICON_URL =
  IPFS_BASE_URL + "bafkreig6c7m2z2lupreu2br4pm3xx575mv6uvmuy2qkij4kzzfpt7tipcq";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreifel4bfm6hxmklcsqjilk3bhvi3acf2rxqepcgglluhginbttkyqm";

const MAX_POT_NAME_LENGTH = 64;
const MAX_POT_DESCRIPTION_LENGTH = 256;
const MAX_MAX_PROJECTS = 100;
const MAX_REFERRAL_FEE_MATCHING_POOL_BASIS_POINTS = 1000; // 10%
const MAX_REFERRAL_FEE_PUBLIC_ROUND_BASIS_POINTS = 1000; // 10%
const MAX_CHEF_FEE_BASIS_POINTS = 1000; // 10%

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

const protocolConfigContractId = DEFAULT_PROTOCOL_CONFIG_PROVIDER.split(":")[0];
const protocolConfigViewMethodName = DEFAULT_PROTOCOL_CONFIG_PROVIDER.split(":")[1];
const protocolConfig = Near.view(protocolConfigContractId, protocolConfigViewMethodName, {});

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

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
`;

const isUpdate = !!potDetail;

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
  admin: "",
  admins: isUpdate ? potDetail.admins : [],
  adminsError: "",
  isAdminsModalOpen: false,
  name: isUpdate ? potDetail.pot_name : "",
  nameError: "",
  description: isUpdate ? potDetail.pot_description : "",
  descriptionError: "",
  // referrerFeeMatchingPoolPercent * 100: isUpdate
  //   ? potDetail.referral_fee_matching_pool_basis_points
  //   : "",
  // referrerFeeMatchingPoolPercent * 100Error: "",
  referrerFeeMatchingPoolPercent: isUpdate
    ? potDetail.referral_fee_matching_pool_basis_points / 100
    : "",
  referrerFeeMatchingPoolPercentError: "",
  referrerFeePublicRoundPercent: isUpdate ? potDetail.referral_fee_public_round_basis_points : "",
  referrerFeePublicRoundPercentError: "",
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
  chefFeePercent: isUpdate ? potDetail.chef_fee_basis_points : "",
  chefFeePercentError: "",
  maxProjects: isUpdate ? potDetail.max_projects : "",
  maxProjectsError: "",
  baseCurrency: isUpdate ? potDetail.base_currency : "",
  baseCurrencyError: "",
  minMatchingPoolDonationAmount: NEAR.fromIndivisible(
    isUpdate ? potDetail.min_matching_pool_donation_amount : "1000000000000000000000000" // 1 NEAR
  ),
  minMatchingPoolDonationAmountError: "",
  useNadabotSybil: isUpdate
    ? potDetail.sybil_wrapper_provider == DEFAULT_SYBIL_WRAPPER_PROVIDER
    : true,
  usePotlockRegistry: isUpdate ? potDetail.registry_provider == DEFAULT_REGISTRY_PROVIDER : true,
  latestSourceCodeCommitHash: "",
  deploymentSuccess: false,
});

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

console.log("state: ", state);

const getDeployArgsFromState = () => {
  return {
    owner: state.owner,
    admins: state.admins.filter((admin) => !admin.remove).map((admin) => admin.accountId),
    chef: state.chef,
    pot_name: state.name,
    pot_description: state.description,
    max_projects: parseInt(state.maxProjects),
    application_start_ms: convertToUTCTimestamp(state.applicationStartDate),
    application_end_ms: convertToUTCTimestamp(state.applicationEndDate),
    public_round_start_ms: convertToUTCTimestamp(state.matchingRoundStartDate),
    public_round_end_ms: convertToUTCTimestamp(state.matchingRoundEndDate),
    min_matching_pool_donation_amount: NEAR.toIndivisible(
      state.minMatchingPoolDonationAmount
    ).toString(),
    registry_provider: state.usePotlockRegistry ? DEFAULT_REGISTRY_PROVIDER : null,
    sybil_wrapper_provider: state.useNadabotSybil ? DEFAULT_SYBIL_WRAPPER_PROVIDER : null,
    custom_sybil_checks: null, // not necessary to include null values but doing so for clarity
    custom_min_threshold_score: null, // not necessary to include null values but doing so for clarity
    referral_fee_matching_pool_basis_points: state.referrerFeeMatchingPoolPercent * 100,
    referral_fee_public_round_basis_points: state.referrerFeePublicRoundPercent * 100,
    chef_fee_basis_points: state.chefFeePercent * 100,
    source_metadata: {
      // TODO: think about the best way to handle this so that it keeps up to date with the latest source code
      version: CURRENT_SOURCE_CODE_VERSION,
      commit_hash: state.latestSourceCodeCommitHash,
      link: SOURCE_CODE_LINK,
    },
  };
};

const getUpdateArgsFromState = () => {
  return {
    owner: context.accountId === potDetail.owner ? state.owner : null,
    admins: state.admins.filter((admin) => !admin.remove).map((admin) => admin.accountId),
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
    chef_fee_basis_points: state.chefFeePercent,
  };
};

const canDeploy = useMemo(() => {
  if (
    !state.owner ||
    state.ownerError ||
    !state.name ||
    state.nameError ||
    !state.description ||
    state.descriptionError ||
    !state.referrerFeeMatchingPoolPercent ||
    state.referrerFeeMatchingPoolPercentError ||
    !state.applicationStartDate ||
    state.applicationStartDateError ||
    !state.applicationEndDate ||
    state.applicationEndDateError ||
    !state.matchingRoundStartDate ||
    state.matchingRoundStartDateError ||
    !state.matchingRoundEndDate ||
    state.matchingRoundEndDateError ||
    !state.chef ||
    state.chefError ||
    !state.chefFeePercent ||
    state.chefFeePercentError ||
    !state.maxProjects ||
    state.maxProjectsError
  ) {
    return false;
  }
  return true;
}, [state]);

const handleDeploy = () => {
  // create deploy pot args
  const deployArgs = getDeployArgsFromState();
  console.log("deployArgs: ", deployArgs);

  Near.asyncView(POT_FACTORY_CONTRACT_ID, "calculate_min_deployment_deposit", {
    args: deployArgs,
  }).then((amount) => {
    console.log("amount: ", amount);
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

const validateAndUpdatePercentages = (percent, stateKey, errorKey, maxVal) => {
  // TODO: move this to separate component for percentage input that accepts "basisPoints" bool parameter
  const updates = {
    [errorKey]: "",
  };
  if (!percent) {
    updates[stateKey] = "0";
  } else {
    const split = percent.split(".");
    if (split.length > 2) {
      return;
    }
    if (split.length === 2 && split[1].length > 2) {
      return;
    }
    // if it ends with a period and this is the only period in the string, set on state
    if (percent.endsWith(".") && percent.indexOf(".") === percent.length - 1) {
      State.update({
        [stateKey]: percent,
      });
      return;
    }
    // otherwise, parse into a float
    const percentFloat = parseFloat(percent);
    if (percentFloat) {
      updates[stateKey] = percentFloat.toString();
      if (percentFloat > maxVal) {
        updates[errorKey] = `Maximum ${maxVal}%`;
      }
    }
  }
  State.update(updates);
};

const handleAddAdmin = () => {
  let isValid = props.validateNearAddress(state.admin);
  if (!isValid) {
    State.update({
      adminsError: "Invalid NEAR account ID",
    });
    return;
  }
  if (!state.admins.find((admin) => admin.accountId == state.admin && !admin.remove)) {
    // TODO: if already in state.admins with remove = true, set remove = false
    // get data from social.near
    // const profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
    const newAdmin = {
      accountId: state.admin.toLowerCase(),
      // imageUrl: profileImageUrl,
    };
    const admins = [...state.admins, newAdmin];
    console.log("admins: ", admins);
    State.update({
      admins,
      admin: "",
      adminsError: "",
    });
  }
};

const handleRemoveAdmin = (accountId) => {
  State.update({
    admins: state.admins.map((admin) => {
      if (admin.accountId == accountId) {
        return { ...admin, remove: true };
      }
      return admin;
    }),
  });
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
              const valid = validateNearAddress(state.owner);
              State.update({ ownerError: valid ? "" : "Invalid NEAR account ID" });
            },
            error: state.ownerError,
            disabled: true,
          }}
        />
        {/* <props.ToDo>ADD ADMINS multi-entry</props.ToDo> */}
        <Label>Admins</Label>
        <Widget
          src={`${ownerId}/widget/Components.AccountsList`}
          props={{
            accountIds: state.admins
              .filter((account) => !account.remove)
              .map((account) => account.accountId),
            allowRemove: true,
            handleRemoveAccount: handleRemoveAdmin,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "tertiary",
            text: "Add admins",
            style: { width: "fit-content" },
            onClick: () => State.update({ isAdminsModalOpen: true }),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Name *",
            placeholder: "E.g. DeFi Center",
            value: state.name,
            onChange: (name) => State.update({ name, nameError: "" }),
            validate: () => {
              // **CALLED ON BLUR**
              const valid = state.name.length <= MAX_POT_NAME_LENGTH;
              State.update({
                nameError: valid ? "" : `Name must be ${MAX_POT_NAME_LENGTH} characters or less`,
              });
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
              // **CALLED ON BLUR**
              const valid = state.description.length <= MAX_POT_DESCRIPTION_LENGTH;
              State.update({
                descriptionError: valid
                  ? ""
                  : `Description must be ${MAX_POT_DESCRIPTION_LENGTH} characters or less`,
              });
            },
            error: state.descriptionError,
          }}
        />
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Referrer fee % (matching pool)",
              placeholder: "0",
              percent: true,
              value: state.referrerFeeMatchingPoolPercent,
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "referrerFeeMatchingPoolPercent",
                  "referrerFeeMatchingPoolPercentError",
                  MAX_REFERRAL_FEE_MATCHING_POOL_BASIS_POINTS / 100
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
              },
              error: state.referrerFeeMatchingPoolPercentError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Referrer fee % (public round)",
              placeholder: "0",
              percent: true,
              value: state.referrerFeePublicRoundPercent,
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "referrerFeePublicRoundPercent",
                  "referrerFeePublicRoundPercentError",
                  MAX_REFERRAL_FEE_PUBLIC_ROUND_BASIS_POINTS / 100
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
              },
              error: state.referrerFeeMatchingPoolPercentError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Protocol fee %",
              value: protocolConfig ? protocolConfig.basis_points / 100 : "-",
              disabled: true,
              percent: true,
            }}
          />
        </Row>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Application start date",
              //   placeholder: "0", // TODO: possibly add this back in
              selectTime: true,
              value: state.applicationStartDate,
              onChange: (date) => {
                State.update({ applicationStartDate: date });
              },
              validate: () => {
                // **CALLED ON BLUR**
                // must be after now & before application end date
                const now = Date.now();
                const valid =
                  state.applicationStartDate > now &&
                  (!state.applicationEndDate ||
                    state.applicationStartDate < state.applicationEndDate);
                State.update({
                  applicationStartDateError: valid ? "" : "Invalid application start date",
                });
              },
              error: state.applicationStartDateError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Application end date",
              //   placeholder: "0", // TODO: possibly add this back in
              selectTime: true,
              value: state.applicationEndDate,
              onChange: (date) => State.update({ applicationEndDate: date }),
              validate: () => {
                // **CALLED ON BLUR**
                // must be before matching round start date
                const valid =
                  (!state.matchingRoundStartDate ||
                    state.applicationEndDate < state.matchingRoundStartDate) &&
                  (!state.applicationStartDate ||
                    state.applicationEndDate > state.applicationStartDate);
                State.update({
                  applicationEndDateError: valid ? "" : "Invalid application end date",
                });
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
                // must be after application end and before matching round end
                const valid =
                  (!state.applicationEndDate ||
                    state.matchingRoundStartDate > state.applicationEndDate) &&
                  (!state.matchingRoundEndDate ||
                    state.matchingRoundStartDate < state.matchingRoundEndDate);
                State.update({
                  matchingRoundStartDateError: valid ? "" : "Invalid round start date",
                });
              },
              error: state.matchingRoundStartDateError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Date`}
            props={{
              label: "Matching round end date",
              //   placeholder: "0", // TODO: possibly add this back in
              selectTime: true,
              value: state.matchingRoundEndDate,
              onChange: (date) => State.update({ matchingRoundEndDate: date }),
              validate: () => {
                // **CALLED ON BLUR**
                // must be after matching round start
                const valid =
                  !state.matchingRoundStartDate ||
                  state.matchingRoundEndDate > state.matchingRoundStartDate;
                State.update({ matchingRoundEndDateError: valid ? "" : "Invalid round end date" });
              },
              error: state.matchingRoundEndDateError,
            }}
          />
        </Row>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Min matching pool donation amount (in NEAR - optional)",
              placeholder: "0",
              value: state.minMatchingPoolDonationAmount,
              onChange: (amountNear) => {
                State.update({ minMatchingPoolDonationAmount: amountNear });
              },
              validate: () => {
                // **CALLED ON BLUR**
              },
              error: state.referrerFeeMatchingPoolPercentError,
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
              placeholder: "E.g. user.near",
              value: state.chef,
              onChange: (chef) => State.update({ chef }),
              validate: () => {
                // **CALLED ON BLUR**
                const valid = validateNearAddress(state.chef);
                State.update({ chefError: valid ? "" : "Invalid NEAR account ID" });
              },
              error: state.chefError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Chef fee %",
              placeholder: "0",
              percent: true,
              value: state.chefFeePercent,
              onChange: (percent) => {
                validateAndUpdatePercentages(
                  percent,
                  "chefFeePercent",
                  "chefFeePercentError",
                  MAX_CHEF_FEE_BASIS_POINTS / 100
                );
              },
              validate: () => {
                // **CALLED ON BLUR**
              },
              error: state.chefFeePercentError,
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
            label: "Max. approved projects",
            placeholder: "e.g. 20",
            value: state.maxProjects,
            onChange: (maxProjects) => State.update({ maxProjects }),
            validate: () => {
              // **CALLED ON BLUR**
              const valid = parseInt(state.maxProjects) <= MAX_MAX_PROJECTS;
              State.update({ maxProjectsError: valid ? "" : `Maximum ${MAX_MAX_PROJECTS}` });
            },
            error: state.maxProjectsError,
          }}
        />
      </FormSectionRightDiv>
    </FormSectionContainer>
    <FormSectionContainer>
      {FormSectionLeft("Project Registration", "")}
      <FormSectionRightDiv>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Checkbox`}
            props={{
              id: "registrationSelector",
              checked: state.usePotlockRegistry,
              onClick: (e) => {
                State.update({
                  usePotlockRegistry: e.target.checked,
                });
              },
            }}
          />
          <Label htmlFor="sybilSelector">Require approval on PotLock registry (recommended)</Label>
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
    <FormSectionContainer>
      {FormSectionLeft("Donor Sybil Resistance", "")}
      <FormSectionRightDiv>
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Checkbox`}
            props={{
              id: "sybilSelector",
              checked: state.useNadabotSybil,
              onClick: (e) => {
                State.update({
                  useNadabotSybil: e.target.checked,
                });
              },
            }}
          />
          <Label htmlFor="sybilSelector">🤖 nada.bot human verification (recommended)</Label>
        </Row>
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
              // disabled: !canDeploy,
            }}
          />
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
    <Widget
      src={`${ownerId}/widget/Components.ModalMultiAccount`}
      props={{
        ...props,
        isModalOpen: state.isAdminsModalOpen,
        onClose: () => State.update({ isAdminsModalOpen: false }),
        titleText: "Add admins",
        descriptionText: "Add NEAR account IDs for your admins.",
        inputValue: state.admin,
        onInputChange: (admin) => {
          State.update({ admin, adminsError: "" });
        },
        handleAddAccount: handleAddAdmin,
        handleRemoveAccount: handleRemoveAdmin,
        accountError: state.adminsError,
        accounts: state.admins,
        unitText: "admin",
      }}
    />
  </FormBody>
);
