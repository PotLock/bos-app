const ProfileOptions = (props) => [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: `${props.ownerId}/widget/Profile.Feed`,
    href: props.hrefWithParams(`?tab=profile&accountId=${props.accountId}&nav=feed`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${props.ownerId}/widget/Project.PotlockFunding`,
    href: props.hrefWithParams(`?tab=profile&accountId=${props.accountId}&nav=donations`),
  },
  {
    label: "",
    id: "followers",
    disabled: false,
    source: `${props.ownerId}/widget/Profile.FollowTabs`,
  },
  {
    label: "",
    id: "following",
    disabled: false,
    source: `${props.ownerId}/widget/Profile.FollowTabs`,
  },
];

return {
  ProfileOptions,
};
