let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));

// check if obk is empty
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function getSocialProfile(keys) {
  return Near.asyncView("social.near", "get", {
    keys,
  });
}

return {
  getConfig: (potId) => {
    return Near.view(potId, "get_config", {});
  },
  asyncGetConfig: (potId) => {
    return Near.asyncView(potId, "get_config", {});
  },
  isUserPotAdminOrGreater: (potId, accountId) => {
    const config = Near.view(potId, "get_config", {});
    if (config) {
      return config.owner === accountId || config.admins.includes(accountId);
    }
  },
  isRoundActive: (potId) => {
    return Near.asyncView(potId, "is_round_active", {});
  },
  getMatchingPoolDonations: (potId) => {
    // TODO: paginate
    return Near.view(potId, "get_matching_pool_donations", {});
  },
  asyncGetMatchingPoolDonations: (potId) => {
    return Near.asyncView(potId, "get_matching_pool_donations", {});
  },
  getPublicRoundDonations: (potId, args) => {
    return Near.view(potId, "get_public_round_donations", {
      ...(args || {}),
    });
  },
  asyncGetPublicRoundDonations: (potId, args) => {
    return Near.asyncView(potId, "get_public_round_donations", {
      ...(args || {}),
    });
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
  asyncGetApplicationByProjectId: (potId, projectId) => {
    return Near.asyncView(potId, "get_application_by_project_id", { project_id: projectId });
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
  getPayoutsChallenges: (potId) => {
    return Near.view(potId, "get_payouts_challenges", {});
  },
  challengePayouts: (potId, reason) => {
    const depositFloat = reason.length * 0.00003 + 0.003;
    const transaction = {
      contractName: potId,
      methodName: "challenge_payouts",
      args: { reason },
      deposit: Big(depositFloat).mul(Big(10).pow(24)),
      gas: "300000000000000",
    };
    Near.call([transaction]);
  },
  adminUpdatePayoutsChallenge: (potId, challengerId, notes, shouldResolveChallenge) => {
    const depositFloat = notes.length * 0.00003;
    const transaction = {
      contractName: potId,
      methodName: "admin_update_payouts_challenge",
      args: { challenger_id: challengerId, notes, resolve_challenge: shouldResolveChallenge },
      deposit: Big(depositFloat).mul(Big(10).pow(24)),
      gas: "300000000000000",
    };
    Near.call([transaction]);
  },
  chefSetPayouts: (potId, payouts) => {
    const transaction = {
      contractName: potId,
      methodName: "chef_set_payouts",
      args: { payouts },
      deposit: "1",
      gas: "300000000000000",
    };
    Near.call([transaction]);
  },
  adminProcessPayouts: (potId) => {
    const transaction = {
      contractName: potId,
      methodName: "admin_process_payouts",
      args: {},
      deposit: "1",
      gas: "300000000000000",
    };
    Near.call([transaction]);
  },
  getFlaggedAccounts: (potDetail, potId) => {
    const roles = ["owner", "admins", "chef"];

    const allUsers = {};
    roles.forEach((role) => {
      const users = potDetail[role];
      if (typeof users === "object") {
        users.forEach((user) => {
          allUsers[user] = role === "admins" ? "admin" : role;
        });
      } else {
        allUsers[users] = role;
      }
    });

    const flaggedAccounts = [];
    const socialKeys = Object.keys(allUsers).map((user) => `${user}/profile/**`);

    return new Promise((resolve, reject) => {
      getSocialProfile(socialKeys)
        .then((profiles) => {
          Object.entries(profiles).forEach(([user, { profile }]) => {
            console.log(profiles);
            const pLBlacklistedAccounts = JSON.parse(profile.pLBlacklistedAccounts || "{}");
            const potFlaggedAcc = pLBlacklistedAccounts[potId] || {};
            if (!isEmpty(potFlaggedAcc)) {
              flaggedAccounts.push({
                flaggedBy: user,
                role: allUsers[user],
                potFlaggedAcc,
              });
            }
          });
          resolve(flaggedAccounts);
        })
        .catch((error) => {
          console.error("Error fetching social profiles:", error);
          reject(error);
        });
    });
  },
};
