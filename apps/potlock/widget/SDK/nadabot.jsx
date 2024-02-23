// TODO: we should move this to be owned by nadabot.near
return ({ env }) => {
  const contractId = env === "staging" ? "v1.staging.nadabot.near" : "v1.nadabot.near";

  return {};
};
