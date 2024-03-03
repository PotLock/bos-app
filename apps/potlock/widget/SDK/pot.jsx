let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));

return {
  getConfig: (potId) => {
    return Near.view(potId, "get_config", {});
  },
  asyncGetConfig: (potId) => {
    return Near.asyncView(potId, "get_config", {});
  },
  getMatchingPoolDonations: (potId) => {
    // TODO: paginate
    return Near.view(potId, "get_matching_pool_donations", {});
  },
  asyncGetMatchingPoolDonations: (potId) => {
    return Near.asyncView(potId, "get_matching_pool_donations", {});
  },
  getPublicRoundDonations: (potId) => {
    return Near.view(potId, "get_public_round_donations", {});
  },
  asyncGetPublicRoundDonations: (potId) => {
    return Near.asyncView(potId, "get_public_round_donations", {});
  },
  getDonationsForDonor: (potId, accountId) => {
    return Near.view(potId, "get_donations_for_donor", { donor_id: accountId });
  },
  asyncGetDonationsForDonor: (potId, accountId) => {
    return Near.asyncView(potId, "get_donations_for_donor", { donor_id: accountId });
  },
  getDonationsForProject: (potId, projectId) => {
    return Near.view(potId, "get_donations_for_project", { project_id: projectId });
  },
  asyncGetDonationsForProject: (potId, projectId) => {
    return Near.asyncView(potId, "get_donations_for_project", { project_id: projectId });
  },
  getDonationsForRecipient: (potId, recipientId) => {
    return Near.view(potId, "get_donations_for_recipient", { recipient_id: recipientId });
  },
  asyncGetDonationsForRecipient: (potId, recipientId) => {
    return Near.asyncView(potId, "get_donations_for_recipient", { recipient_id: recipientId });
  },
  getApplicationByProjectId: (potId, projectId) => {
    return Near.view(potId, "get_application_by_project_id", { project_id: projectId });
  },
  getApprovedApplications: (potId) => {
    return Near.view(potId, "get_approved_applications", {});
  },
  asyncGetApprovedApplications: (potId) => {
    return Near.asyncView(potId, "get_approved_applications", {});
  },
  getApplications: (potId) => {
    return Near.view(potId, "get_applications", {});
  },
  asyncGetApplications: (potId) => {
    return Near.asyncView(potId, "get_applications", {});
  },
  asyncGetActiveRoundsForProject: (projectId, env) => {
    PotFactorySDK = PotFactorySDK({ env });
    console.log("PotFactorySDK: ", PotFactorySDK);
    const pots = PotFactorySDK.getPots();
    console.log("pots line 64: ", pots);
    const activeRounds = Object.entries(pots).filter(
      ([_id, { approvedProjects, detail }]) => {
        console.log("approvedProjects: ", approvedProjects);
        const { public_round_start_ms, public_round_end_ms } = detail;
        const now = Date.now();
        const approved = approvedProjects.filter((proj) => {
          return (
            proj.project_id === recipientId &&
            public_round_start_ms < now &&
            public_round_end_ms > now
          );
        });
        return approved.length > 0;
      }
    );
    // return Near.view(projectId, "get_active_rounds_for_project", {});
  },
};
