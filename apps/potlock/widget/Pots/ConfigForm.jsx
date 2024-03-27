const { potDetail, potId, NADABOT_CONTRACT_ID } = props;
const { validateNearAddress } = VM.require("potlock.near/widget/utils") || {
  validateNearAddress: () => "",
};
const {
  NADABOT_HUMAN_METHOD,
  ownerId,
  ONE_TGAS,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  NADABOT_HUMAN_METHOD: "",
  ownerId: "",
  ONE_TGAS: 0,
  SUPPORTED_FTS: {},
};

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getContractId: () => {},
    getProtocolConfig: () => {},
    asyncGetPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const potFactoryContractId = PotFactorySDK.getContractId();
const protocolConfig = PotFactorySDK.getProtocolConfig();
// console.log("props in config form: ", props);

let ListsSDK =
  VM.require("potlock.near/widget/SDK.lists") ||
  (() => ({
    getContractId: () => "",
  }));
ListsSDK = ListsSDK({ env: props.env });

const DEFAULT_REGISTRY_PROVIDER = `${ListsSDK.getContractId()}:is_registered`;
const DEFAULT_SYBIL_WRAPPER_PROVIDER = `${NADABOT_CONTRACT_ID}:${NADABOT_HUMAN_METHOD}`;
const CURRENT_SOURCE_CODE_VERSION = "0.1.0";
const SOURCE_CODE_LINK = "https://github.com/PotLock/core"; // for use in contract source metadata
const POT_CODE_LINK = "https://github.com/PotLock/core/tree/main/contracts/pot"; // for directing user to view source code for Pot

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const ADD_ADMINS_ICON_URL =
//   IPFS_BASE_URL + "bafkreig6c7m2z2lupreu2br4pm3xx575mv6uvmuy2qkij4kzzfpt7tipcq";
// const CLOSE_ICON_URL =
//   IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
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

Big.PE = 100;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0px;
  width: 100%;

  @media screen and (max-width: 880px) {
    padding: 10px 10px;
  }
`;

const FormDivider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #ebebeb;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 48px 0;
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
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormSectionRightDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
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
  align-items: end;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Checkbox = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
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

// console.log("potDetail: ", potDetail);

State.init({
  owner: isUpdate ? potDetail.owner : context.accountId,
  ownerError: "",
  admin: "",
  admins: isUpdate ? potDetail.admins.map((accountId) => ({ accountId })) : [],
  adminsError: "",
  isAdminsModalOpen: false,
  name: isUpdate ? potDetail.pot_name : "",
  nameError: "",
  customHandle: isUpdate ? potId.split(`.${potFactoryContractId}`)[0] : "",
  customHandleError: "",
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
  referrerFeePublicRoundPercent: isUpdate
    ? potDetail.referral_fee_public_round_basis_points / 100
    : "",
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
  chefFeePercent: isUpdate ? potDetail.chef_fee_basis_points / 100 : "",
  chefFeePercentError: "",
  maxProjects: isUpdate ? potDetail.max_projects : "",
  maxProjectsError: "",
  baseCurrency: isUpdate ? potDetail.base_currency : "",
  baseCurrencyError: "",
  minMatchingPoolDonationAmount: NEAR.fromIndivisible(
    isUpdate ? potDetail.min_matching_pool_donation_amount : "1"
  ),
  minMatchingPoolDonationAmountError: "",
  useNadabotSybil: isUpdate
    ? potDetail.sybil_wrapper_provider == DEFAULT_SYBIL_WRAPPER_PROVIDER
    : true,
  usePotlockRegistry: isUpdate ? potDetail.registry_provider == DEFAULT_REGISTRY_PROVIDER : true,
  latestSourceCodeCommitHash: "",
  deploymentSuccess: false,
});

if (!isUpdate && !state.latestSourceCodeCommitHash) {
  const res = fetch("https://api.github.com/repos/PotLock/core/commits");
  if (res.ok && res.body.length > 0) {
    State.update({
      latestSourceCodeCommitHash: res.body[0].sha,
    });
  }
}

const getPotDetailArgsFromState = () => {
  const args = {
    owner: state.owner,
    admins: state.admins.filter((admin) => !admin.remove).map((admin) => admin.accountId),
    chef: state.chef || null,
    pot_name: state.name,
    pot_description: state.description,
    max_projects: parseInt(state.maxProjects) || null,
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
    referral_fee_matching_pool_basis_points: parseInt(
      (state.referrerFeeMatchingPoolPercent * 100).toFixed(0)
    ),
    referral_fee_public_round_basis_points: parseInt(
      (state.referrerFeePublicRoundPercent * 100).toFixed(0)
    ),
    chef_fee_basis_points: parseInt((state.chefFeePercent * 100).toFixed(0)),
    source_metadata: isUpdate
      ? null
      : {
          // TODO: think about the best way to handle this so that it keeps up to date with the latest source code
          version: CURRENT_SOURCE_CODE_VERSION,
          commit_hash: state.latestSourceCodeCommitHash,
          link: SOURCE_CODE_LINK,
        },
  };
  return args;
};

// console.log("state; ", state);

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
  const deployArgs = getPotDetailArgsFromState();
  console.log("deployArgs: ", deployArgs);

  Near.asyncView(potFactoryContractId, "calculate_min_deployment_deposit", {
    args: deployArgs,
  }).then((amount) => {
    // console.log("amount: ", amount);
    const amountYoctos = Big(amount).plus(Big("20000000000000000000000")); // add extra 0.02 NEAR as buffer
    const args = { pot_args: deployArgs };
    if (state.customHandle) {
      args.pot_handle = state.customHandle;
    }
    const transactions = [
      {
        contractName: potFactoryContractId,
        methodName: "deploy_pot",
        deposit: amountYoctos,
        args,
        gas: ONE_TGAS.mul(300),
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
      PotFactorySDK.asyncGetPots().then((pots) => {
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
  const updateArgs = getPotDetailArgsFromState();
  // console.log("updateArgs: ", updateArgs);
  const depositFloat = JSON.stringify(updateArgs).length * 0.00003;
  const deposit = Big(depositFloat).mul(Big(10).pow(24));
  const transactions = [
    {
      contractName: potId,
      methodName: "admin_dangerously_set_pot_config",
      deposit: Big(0.1).mul(Big(10).pow(24)),
      deposit,
      args: { update_args: updateArgs },
      gas: ONE_TGAS.mul(100),
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
  let isValid = validateNearAddress(state.admin);
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
    // console.log("admins: ", admins);
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

const userIsOwner = context.accountId === potDetail.owner;
const userIsAdmin = isUpdate && potDetail.admins.includes(context.accountId);
const isAdminOrGreater = userIsOwner || userIsAdmin;

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
    <FormSectionContainer>
      {FormSectionLeft("Pot details", "")}
      <FormSectionRightDiv>
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
            disabled: isUpdate ? !userIsOwner : true,
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
            allowRemove: isUpdate ? userIsOwner : true,
            handleRemoveAccount: handleRemoveAdmin,
          }}
        />
        {(!isUpdate || userIsOwner) && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "tertiary",
              text: "Add admins",
              style: { width: "fit-content" },
              onClick: () => State.update({ isAdminsModalOpen: true }),
            }}
          />
        )}
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
            disabled: isUpdate ? !isAdminOrGreater : false,
          }}
        />
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Custom handle (optional - will slugify name by default)",
            placeholder: "e.g. my-pot-handle",
            value: state.customHandle,
            onChange: (customHandle) => State.update({ customHandle, customHandleError: "" }),
            validate: () => {
              // **CALLED ON BLUR**
              const suffix = `.${potFactoryContractId}`;
              const fullAddress = `${state.customHandle}${suffix}`;
              let customHandleError = "";
              if (fullAddress.length > 64) {
                customHandleError = `Handle must be ${64 - suffix.length} characters or less`;
              } else {
                const valid = validateNearAddress(fullAddress);
                customHandleError = valid
                  ? ""
                  : `Invalid handle (can only contain lowercase alphanumeric symbols +  _ or -)`;
              }
              State.update({
                customHandleError,
              });
            },
            error: state.customHandleError,
            disabled: isUpdate,
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
            disabled: isUpdate ? !isAdminOrGreater : false,
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
              disabled: isUpdate ? !isAdminOrGreater : false,
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
              disabled: isUpdate ? !isAdminOrGreater : false,
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
              // const now = Date.now();
              const now = new Date().getTime();
              const applicationStartDate = new Date(state.applicationStartDate).getTime();
              const applicationEndDate = new Date(state.applicationEndDate).getTime();
              const valid =
                applicationStartDate > now &&
                (!applicationEndDate || applicationStartDate < applicationEndDate);
              State.update({
                applicationStartDateError: valid ? "" : "Invalid application start date",
              });
            },
            error: state.applicationStartDateError,
            disabled: isUpdate ? !isAdminOrGreater : false,
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
            disabled: isUpdate ? !isAdminOrGreater : false,
          }}
        />
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
            disabled: isUpdate ? !isAdminOrGreater : false,
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
            disabled: isUpdate ? !isAdminOrGreater : false,
          }}
        />
        <Row>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Optional: Min matching pool donation amount (in NEAR)",
              placeholder: "0",
              value: state.minMatchingPoolDonationAmount,
              onChange: (amountNear) => {
                State.update({ minMatchingPoolDonationAmount: amountNear });
              },
              validate: () => {
                // **CALLED ON BLUR**
              },
              error: state.referrerFeeMatchingPoolPercentError,
              disabled: isUpdate ? !isAdminOrGreater : false,
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
              disabled: isUpdate ? !isAdminOrGreater : false,
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
              disabled: isUpdate ? !isAdminOrGreater : false,
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
            disabled: isUpdate ? !isAdminOrGreater : false,
          }}
        />
      </FormSectionRightDiv>
    </FormSectionContainer>
    <FormSectionContainer>
      {FormSectionLeft("Project Registration", "")}
      <FormSectionRightDiv>
        <Row>
          <Checkbox>
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
                disabled: isUpdate ? !isAdminOrGreater : false,
              }}
            />
            <Label htmlFor="sybilSelector">
              Require approval on PotLock registry (recommended)
            </Label>
          </Checkbox>
        </Row>
      </FormSectionRightDiv>
    </FormSectionContainer>
    <FormSectionContainer>
      {FormSectionLeft("Donor Sybil Resistance", "")}
      <FormSectionRightDiv>
        <Row>
          <Checkbox>
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
                disabled: isUpdate ? !isAdminOrGreater : false,
              }}
            />
            <Label htmlFor="sybilSelector">🤖 nada.bot human verification (recommended)</Label>
          </Checkbox>
        </Row>
        <Row style={{ justifyContent: "flex-end", marginTop: "36px" }}>
          {!isUpdate && isAdminOrGreater && (
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
          {((isUpdate && isAdminOrGreater) || !isUpdate) && (
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
          )}
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
        accountIds: state.admins.map((admin) => admin.accountId),
        unitText: "admin",
      }}
    />
  </FormBody>
);
