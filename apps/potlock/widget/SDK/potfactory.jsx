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
    getProtocolConfig: () => {
      return Near.view(contractId, "get_protocol_config", {});
    },
  };
  return PotFactorySDK;
};
