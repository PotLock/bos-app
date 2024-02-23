return ({ env }) => {
  const contractId = env === "staging" ? "registry.staging.potlock.near" : "registry.potlock.near";
  return {};
};
