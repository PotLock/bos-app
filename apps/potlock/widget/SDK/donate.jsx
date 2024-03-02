return ({ env }) => {
  const contractId = "donate.potlock.near";

  const DonateSDK = {
    getContractId: () => contractId,
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    getDonations: () => {},
    getDonationsForRecipient: () => {},
    getDonationsForProject: (projectId) => {},
    getDonationsForDonor: () => {},
  };
  return DonateSDK;
};
