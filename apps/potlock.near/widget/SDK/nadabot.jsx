const contractId = "${alias/nadabotContractId}";

const NadaBotSDK = {
  getContractId: () => contractId,
  isHuman: (accountId) => {
    return Near.view(contractId, "is_human", { account_id: accountId });
  },
};

return NadaBotSDK;
