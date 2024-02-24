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

const yoctosToUsd = (amount) => {
  return nearToUsd ? "~$" + new Big(amount).mul(nearToUsd).div(1e24).toNumber().toFixed(2) : null;
};
const nearToUsdWithFallback = (amountNear) => {
  return nearToUsd ? "~$" + (amountNear * nearToUsd).toFixed(2) : amountNear + " NEAR";
};
const yoctosToUsdWithFallback = (amountYoctos) => {
  return nearToUsd
    ? "~$" + new Big(amountYoctos).mul(nearToUsd).div(1e24).toNumber().toFixed(2)
    : new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + " NEAR";
};
const formatDate = (timestamp) => {
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
};
const daysAgo = (timestamp) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const differenceInTime = now - pastDate;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays === 0
    ? "< 1 day ago"
    : `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
};
const daysUntil = (timestamp) => {
  const now = new Date();
  const futureDate = new Date(timestamp);
  const differenceInTime = futureDate - now;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}`;
};
const getTagsFromSocialProfileData = (profileData) => {
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
};
const getTeamMembersFromSocialProfileData = (profileData) => {
  if (!profileData) return [];
  const team = profileData.plTeam
    ? JSON.parse(profileData.plTeam)
    : profileData.team
    ? Object.entries(profileData.team)
        .filter(([_, v]) => v !== null)
        .map(([k, _]) => k)
    : [];
  return team;
};
const doesUserHaveDaoFunctionCallProposalPermissions = (policy) => {
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
};
const basisPointsToPercent = (basisPoints) => {
  return basisPoints / 100;
};
const ipfsUrlFromCid = (cid) => {
  return `${IPFS_BASE_URL}${cid}`;
};
const yoctosToNear = (amountYoctos, abbreviate) => {
  return new Big(amountYoctos).div(1e24).toNumber().toFixed(2) + (abbreviate ? " N" : " NEAR");
};
const validateNearAddress = (address) => {
  const NEAR_ACCOUNT_ID_REGEX = /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;
  let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
  // Additional ".near" check for IDs less than 64 characters
  if (address.length < 64 && !address.endsWith(".near")) {
    isValid = false;
  }
  return isValid;
};
const validateEVMAddress = (address) => {
  // Check if the address is defined and the length is correct (42 characters, including '0x')
  if (!address || address.length !== 42) {
    return false;
  }
  // Check if the address starts with '0x' and contains only valid hexadecimal characters after '0x'
  const re = /^0x[a-fA-F0-9]{40}$/;
  return re.test(address);
};
const validateGithubRepoUrl = (url) => {
  // Regular expression to match the GitHub repository URL pattern
  // This regex checks for optional "www.", a required "github.com/", and then captures the username and repo name segments
  const githubRepoUrlPattern =
    /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
  return githubRepoUrlPattern.test(url);
};

return {
  formatDate,
  daysAgo,
  daysUntil,
  getTagsFromSocialProfileData,
  getTeamMembersFromSocialProfileData,
  doesUserHaveDaoFunctionCallProposalPermissions,
  basisPointsToPercent,
  ipfsUrlFromCid,
  yoctosToNear,
  validateNearAddress,
  validateEVMAddress,
  validateGithubRepoUrl,
  yoctosToUsd,
  nearToUsdWithFallback,
  yoctosToUsdWithFallback,
};
