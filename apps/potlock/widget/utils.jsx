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
    return `https://ipfs.near.social/ipfs/${cid}`;
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
};
