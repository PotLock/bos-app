return ({ env }) => {
  const contractId =
    env === "staging" ? "potfactory.staging.potlock.near" : "v1.potfactory.potlock.near";

  const PotFactorySDK = {
    getContractId: () => contractId,
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    getPots: () => {
      return Near.view(contractId, "get_pots", {});
    },
    asyncGetPots: () => {
      return Near.asyncView(contractId, "get_pots", {});
    },
    getProtocolConfig: () => {
      return Near.view(contractId, "get_protocol_config", {});
    },
    canUserDeployPot: (accountId) => {
      const config = PotFactorySDK.getConfig();
      if (config) {
        return !config.require_whitelist || config.whitelisted_deployers.includes(accountId);
      }
    },
  };
  return PotFactorySDK;
};
