return ({ env }) => {
  const contractId = "donate.potlock.near";

  const PotlockDonateSDK = {
    getContractId: () => contractId,
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    getDonations: () => {},
    getDonationsForRecipient: () => {},
    getDonationsForProject: (projectId) => {},
    getDonationsForDonor: () => {},
  };
  return PotlockDonateSDK;
};
