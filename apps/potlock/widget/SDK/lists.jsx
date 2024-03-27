return ({ env }) => {
  const contractId = env === "staging" ? "lists.staging.potlock.near" : "lists.potlock.near";
  // const contractId = "lists.staging.potlock.near";
  const potlockRegistryListId = 1;

  const ListsSDK = {
    getContractId: () => contractId,
    getList: (listId) => {
      return Near.view(contractId, "get_list", { list_id: listId });
    },
    getPotlockRegistry: () => {
      return ListsSDK.getList(potlockRegistryListId);
    },
    isRegistryAdmin: (accountId) => {
      const registry = ListsSDK.getPotlockRegistry();
      return registry.admins && registry.admins.includes(accountId);
    },
    getRegistrations: (listId) => {
      return Near.view(contractId, "get_registrations_for_list", {
        list_id: listId || potlockRegistryListId,
      });
    },
    getRegistration: (listId, registrantId) => {
      const registrations = Near.view(contractId, "get_registrations_for_registrant", {
        registrant_id: registrantId,
      });
      if (registrations) {
        const registration = registrations.find(
          (registration) => registration.list_id === (listId || potlockRegistryListId)
        );
        return Near.view(contractId, "get_registration", {
          registration_id: registration.id,
        });
      }
    },
    asyncGetRegistration: (listId, registrantId) => {
      // return Near.asyncView(contractId, "get_project_by_id", { project_id: projectId });
      return Near.asyncView(contractId, "get_registrations_for_registrant", {
        registrant_id: registrantId,
      }).then((registrations) => {
        if (registrations) {
          const registration = registrations.find(
            (registration) => registration.list_id === (listId || potlockRegistryListId)
          );
          return Near.asyncView(contractId, "get_registration", {
            registration_id: registration.id,
          });
        }
      });
    },
    isRegistrationApproved: (listId, registrantId) => {
      const registration = ListsSDK.getRegistration(listId, registrantId);
      return registration && registration.status === "Approved";
    },
  };
  return ListsSDK;
};
