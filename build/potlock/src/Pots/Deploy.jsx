const ownerId = "potlock.near";
const potFactoryContractId = "potfactory1.tests.potlock.near"; // TODO: update to production address when contract is deployed to prod

const DEFAULT_REGISTRY_PROVIDER = "registry.potlock.near";
const DEFAULT_SYBIL_WRAPPER_PROVIDER = "sybil.potlock.near";
const DEFAULT_PROTOCOL_CONFIG_PROVIDER = potFactoryContractId;
const CURRENT_SOURCE_CODE_VERSION = "0.1.0";
const SOURCE_CODE_LINK = "https://github.com/PotLock/core"; // for use in contract source metadata
const POT_CODE_LINK = "https://github.com/PotLock/core/tree/main/contracts/pot"; // for directing user to view source code for Pot

Big.PE = 100;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 175px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 48px;
`;

const HeaderTitle = styled.div`
  color: #292929;
  font-size: 60px;
  font-weight: 400;
  line-height: 72px;
  word-wrap: break-word;
  font-family: Lora;
`;

const HeaderDescription = styled.div`
  color: #292929;
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  text-align: center;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 260px 68px 32px 68px;
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

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
  width: 100%;
  padding: 24px;
  gap: 24px;
`;

State.init({
  owner: context.accountId,
  ownerError: "",
  name: "",
  nameError: "",
  description: "",
  descriptionError: "",
  referrerFeeMatchingPoolBasisPoints: "",
  referrerFeeMatchingPoolBasisPointsError: "",
  referrerFeePublicRoundBasisPoints: "",
  referrerFeePublicRoundBasisPointsError: "",
  //   protocolFeeBasisPoints: "",
  //   protocolFeeBasisPointsError: "",
  applicationStartDate: "",
  applicationStartDateError: "",
  applicationEndDate: "",
  applicationEndDateError: "",
  matchingRoundStartDate: "",
  matchingRoundStartDateError: "",
  matchingRoundEndDate: "",
  matchingRoundEndDateError: "",
  chef: "",
  chefError: "",
  chefFeeBasisPoints: "",
  chefFeeBasisPointsError: "",
  maxProjects: "",
  maxProjectsError: "",
  latestSourceCodeCommitHash: "",
  deploymentSuccess: false,
});

const MAX_DESCRIPTION_LENGTH = 320;

const userIsWhitelisted = props.QF_WHITELISTED_ACCOUNTS.includes(context.accountId);

if (!userIsWhitelisted) return "Unauthorized";

if (!state.latestSourceCodeCommitHash) {
  const res = fetch("https://api.github.com/repos/PotLock/core/commits");
  console.log("res: ", res);
  if (res.ok && res.body.length > 0) {
    State.update({
      latestSourceCodeCommitHash: res.body[0].sha,
    });
  }
}

// TODO: GET PROTOCOL FEES FROM POTFACTORY CONTRACT AND SET ON STATE & DISPLAY IN FORM AS READ-ONLY INPUTS

const handleDeploy = () => {
  // create deploy pot args
  const deployArgs = {
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
  console.log("deployargs: ", deployArgs);

  Near.asyncView(potFactoryContractId, "calculate_min_deployment_deposit", {
    args: deployArgs,
  }).then((amount) => {
    const amountYoctos = Big(amount).plus(Big("20000000000000000000000")); // add extra 0.02 NEAR as buffer
    const transactions = [
      {
        contractName: potFactoryContractId,
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
      Near.asyncView(potFactoryContractId, "get_pots", {}).then((pots) => {
        console.log("pots: ", pots);
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

console.log("state: ", state);

const convertToUTCTimestamp = (localDateTime) => {
  if (!localDateTime) {
    return;
  }
  return new Date(localDateTime).getTime();
};

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
  <Container>
    {props.deploymentSuccess || state.deploymentSuccess ? (
      <SuccessContainer>
        <HeaderTitle>Deployment Successful!</HeaderTitle>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "View all pots",
            style: props.style || {},
            href: `?tab=pots`,
          }}
        />
      </SuccessContainer>
    ) : (
      <>
        <HeaderContent>
          <HeaderTitle>Deploy Pot</HeaderTitle>
          <HeaderDescription>
            Create a profile for your impact project to receive direct donations, qualify for
            funding rounds, join NEAR's accelerator, and get discovered across social platforms.
          </HeaderDescription>
          <a href={POT_CODE_LINK} target="_blank">
            View code
          </a>
        </HeaderContent>
        <FormBody>
          <props.ToDo>Add validation to all fields (currently only %'s are validated)</props.ToDo>

          <FormDivider />
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
                <Widget
                  src={`${ownerId}/widget/Components.Button`}
                  props={{
                    type: "primary",
                    text: "Deploy",
                    style: props.style || {},
                    onClick: handleDeploy,
                  }}
                />
              </Row>
            </FormSectionRightDiv>
          </FormSectionContainer>
        </FormBody>
      </>
    )}
  </Container>
);
