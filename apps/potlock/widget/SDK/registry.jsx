return ({ env }) => {
  const contractId = env === "staging" ? "registry.staging.potlock.near" : "registry.potlock.near";

  const PotlockRegistrySDK = {
    getConfig: () => {
      return Near.view(contractId, "get_config", {});
    },
    isRegistryAdmin: (accountId) => {
      const config = PotlockRegistrySDK.getConfig();
      return config.admins && config.admins.includes(accountId);
    },
    getProjects: () => {
      return Near.view(contractId, "get_projects", {});
    },
    getProject: (projectId) => {
      const projects = PotlockRegistrySDK.getProjects();
      return projects && projects.find((project) => project.id === projectId);
    },
    isProjectApproved: (projectId) => {
      const project = PotlockRegistrySDK.getProject(projectId);
      return (
        project &&
        project.some((project) => project.id === projectId && project.status === "Approved")
      );
    },
  };
  return PotlockRegistrySDK;
};
