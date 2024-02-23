return ({ env }) => {
  const contractId =
    env === "staging" ? "potfactory.staging.potlock.near" : "v1.potfactory.potlock.near";
  return {};
};
