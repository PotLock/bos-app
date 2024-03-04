return ({ env }) => {
  const contractId = "donate.potlock.near";

  const DonateSDK = {
    getContractId: () => contractId,
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    asyncGetConfig: () => {
      return Near.asyncView(contractId, "get_config", {});
    },
    getDonations: (fromIndex, limit) => {
      return Near.view(contractId, "get_donations", {
        from_index: fromIndex || null,
        limit: limit || null,
      });
    },
    asyncGetDonations: (fromIndex, limit) => {
      return Near.asyncView(contractId, "get_donations", {
        from_index: fromIndex || null,
        limit: limit || null,
      });
    },
    getDonationsForRecipient: (recipientId) => {
      return Near.view(contractId, "get_donations_for_recipient", { recipient_id: recipientId });
    },
    asyncGetDonationsForRecipient: (recipientId) => {
      return Near.asyncView(contractId, "get_donations_for_recipient", {
        recipient_id: recipientId,
      });
    },
    getDonationsForProject: (projectId) => {},
    getDonationsForDonor: (donorId) => {
      return Near.view(contractId, "get_donations_for_donor", { donor_id: donorId });
    },
    asyncGetDonationsForDonor: (donorId) => {
      return Near.asyncView(contractId, "get_donations_for_donor", { donor_id: donorId });
    },
  };
  return DonateSDK;
};
