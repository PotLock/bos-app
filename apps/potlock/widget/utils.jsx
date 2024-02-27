const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";
const nearToUsd = useCache(
  () =>
    asyncFetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(
      (res) => {
        if (res.ok) {
          return res.body.near.usd;
        }
      }
    ),
  "nearToUsd"
);

return {
  formatDate: (timestamp) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";

    // Convert hour to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Minutes should be two digits
    const minuteFormatted = minute < 10 ? "0" + minute : minute;

    return `${month} ${day}, ${year} ${hour}:${minuteFormatted}${ampm}`;
  },
  daysAgo: (timestamp) => {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const differenceInTime = now - pastDate;

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays === 0
      ? "< 1 day ago"
      : `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
  },
  daysUntil: (timestamp) => {
    const now = new Date();
    const futureDate = new Date(timestamp);
    const differenceInTime = futureDate - now;

    // Convert time difference from milliseconds to days
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}`;
  },
  getTagsFromSocialProfileData: (profileData) => {
    // first try to get tags from plCategories, then category (deprecated/old format), then default to empty array
    if (!profileData) return [];
    const DEPRECATED_CATEGORY_MAPPINGS = {
      "social-impact": "Social Impact",
      "non-profit": "NonProfit",
      climate: "Climate",
      "public-good": "Public Good",
      "de-sci": "DeSci",
      "open-source": "Open Source",
      community: "Community",
      education: "Education",
    };
    const tags = profileData.plCategories
      ? JSON.parse(profileData.plCategories)
      : profileData.category
      ? [profileData.category.text ?? DEPRECATED_CATEGORY_MAPPINGS[profileData.category] ?? ""]
      : [];
    return tags;
  },
  getTeamMembersFromSocialProfileData: (profileData) => {
    if (!profileData) return [];
    const team = profileData.plTeam
      ? JSON.parse(profileData.plTeam)
      : profileData.team
      ? Object.entries(profileData.team)
          .filter(([_, v]) => v !== null)
          .map(([k, _]) => k)
      : [];
    return team;
  },
  doesUserHaveDaoFunctionCallProposalPermissions: (policy) => {
    // TODO: break this out (NB: duplicated in Project.CreateForm)
    const userRoles = policy.roles.filter((role) => {
      if (role.kind === "Everyone") return true;
      return role.kind.Group && role.kind.Group.includes(context.accountId);
    });
    const kind = "call";
    const action = "AddProposal";
    // Check if the user is allowed to perform the action
    const allowed = userRoles.some(({ permissions }) => {
      return (
        permissions.includes(`${kind}:${action}`) ||
        permissions.includes(`${kind}:*`) ||
        permissions.includes(`*:${action}`) ||
        permissions.includes("*:*")
      );
    });
    return allowed;
  },
  basisPointsToPercent: (basisPoints) => {
    return basisPoints / 100;
  },
  ipfsUrlFromCid: (cid) => {
    return `${IPFS_BASE_URL}${cid}`;
  },
  yoctosToNear: (amountYoctos, abbreviate) => {
    return new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + (abbreviate ? " N" : " NEAR");
  },
  validateNearAddress: (address) => {
    const NEAR_ACCOUNT_ID_REGEX = /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;
    let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
    // Additional ".near" check for IDs less than 64 characters
    if (address.length < 64 && !address.endsWith(".near")) {
      isValid = false;
    }
    return isValid;
  },
  validateEVMAddress: (address) => {
    // Check if the address is defined and the length is correct (42 characters, including '0x')
    if (!address || address.length !== 42) {
      return false;
    }
    // Check if the address starts with '0x' and contains only valid hexadecimal characters after '0x'
    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(address);
  },
  validateGithubRepoUrl: (url) => {
    // Regular expression to match the GitHub repository URL pattern
    // This regex checks for optional "www.", a required "github.com/", and then captures the username and repo name segments
    const githubRepoUrlPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubRepoUrlPattern.test(url);
  },
  nearToUsd,
  yoctosToUsd: (amount) => {
    return nearToUsd ? "~$" + new Big(amount).mul(nearToUsd).div(1e24).toNumber().toFixed(2) : null;
  },
  nearToUsdWithFallback: (amountNear) => {
    return nearToUsd ? "~$" + (amountNear * nearToUsd).toFixed(2) : amountNear + " NEAR";
  },
  yoctosToUsdWithFallback: (amountYoctos) => {
    return nearToUsd
      ? "~$" + new Big(amountYoctos).mul(nearToUsd).div(1e24).toNumber().toFixed(2)
      : new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + " NEAR";
  },
  calculatePayouts: (allPotDonations, totalMatchingPool) => {
    // first, flatten the list of donations into a list of contributions
    // const projectContributions = convertDonationsToProjectContributions(allPotDonations);
    const projectContributions = [];
    for (const d of allPotDonations) {
      const amount = new Big(d.total_amount);
      const val = [d.project_id, d.donor_id, amount];
      projectContributions.push(val);
    }
    // take the flattened list of contributions and aggregate
    // the amounts contributed by each user to each project.
    // create a dictionary where each key is a projectId and its value
    // is another dictionary of userIds and their aggregated contribution amounts.
    const contributions = {};
    for (const [proj, user, amount] of projectContributions) {
      if (!contributions[proj]) {
        contributions[proj] = {};
      }
      contributions[proj][user] = Big(contributions[proj][user] || 0).plus(amount);
    }
    console.log("contributions: ", contributions);
    // calculate the total overlapping contribution amounts between pairs of users for each project.
    // create a nested dictionary where the outer keys are userIds and the inner keys are also userIds,
    // and the inner values are the total overlap between these two users' contributions.
    // type PairTotals = { [key: UserId]: { [key: UserId]: YoctoBig } };
    const pairTotals = {};
    for (const contribz of Object.values(contributions)) {
      for (const [k1, v1] of Object.entries(contribz)) {
        if (!pairTotals[k1]) {
          pairTotals[k1] = {};
        }
        for (const [k2, v2] of Object.entries(contribz)) {
          if (!pairTotals[k1][k2]) {
            pairTotals[k1][k2] = Big(0);
          }
          pairTotals[k1][k2] = pairTotals[k1][k2].plus(v1.times(v2).sqrt());
        }
      }
    }
    // Compute the CLR (Contribution Matching) amount for each project
    // using the aggregated contributions, the total overlaps between user pairs,
    // a threshold value, and the total pot available for matching.
    // Then, calculate the matching amount for each project using the quadratic formula
    // and returns a list of objects containing the projectId, the number of contributions,
    // the total contributed amount, and the matching amount.
    const threshold = Big("25000000000000000000000000"); // TODO: play around with adjusting this value
    const totalPot = Big(totalMatchingPool);
    let bigtot = Big(0);
    const totals = [];
    for (const [proj, contribz] of Object.entries(contributions)) {
      let tot = Big(0);
      let _num = 0;
      let _sum = Big(0);
      for (const [k1, v1] of Object.entries(contribz)) {
        _num += 1;
        _sum = _sum.plus(v1);
        for (const [k2, v2] of Object.entries(contribz)) {
          // if (k2 > k1) { // TODO: potentially add this "if" statement back in, not sure of its purpose as the values being compared are account IDs. Originally taken from Gitcoin's CLR logic (see link at top of file)
          const sqrt = v1.times(v2).sqrt();
          tot = tot.plus(sqrt.div(pairTotals[k1][k2].div(threshold)));
          // }
        }
      }
      bigtot = bigtot.plus(tot);
      totals.push({
        id: proj,
        number_contributions: _num,
        contribution_amount_str: _sum.toFixed(0),
        matching_amount_str: tot.toFixed(0),
      });
    }
    console.log("totals: ", totals);
    // if we reach saturation, we need to normalize
    if (bigtot.gte(totalPot)) {
      console.log("NORMALIZING");
      for (const t of totals) {
        t.matching_amount_str = Big(t.matching_amount_str).div(bigtot).times(totalPot).toFixed(0);
      }
    }
    const payouts = totals.reduce((acc, t) => {
      acc[t.id] = {
        matchingAmount: t.matching_amount_str,
        donorCount: t.number_contributions,
      };
      return acc;
    }, {});
    return payouts;
  },
};
