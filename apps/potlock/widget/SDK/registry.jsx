return ({ env }) => {
  const contractId = env === "staging" ? "registry.staging.potlock.near" : "registry.potlock.near";

  const RegistrySDK = {
    getContractId: () => contractId,
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    isRegistryAdmin: (accountId) => {
      const config = RegistrySDK.getConfig();
      return config.admins && config.admins.includes(accountId);
    },
    getProjects: () => {
      return Near.view(contractId, "get_projects", {});
    },
    getProjectById: (projectId) => {
      return Near.view(contractId, "get_project_by_id", { project_id: projectId });
    },
    asyncGetProjectById: (projectId) => {
      return Near.asyncView(contractId, "get_project_by_id", { project_id: projectId });
    },
    isProjectApproved: (projectId) => {
      const project = RegistrySDK.getProjectById(projectId);
      return project && project.status === "Approved";
    },
    isUserRegistryAdmin: (accountId) => {
      return RegistrySDK.isRegistryAdmin(accountId);
    },
  };
  return RegistrySDK;
};
