const { href } = VM.require("${config/account}/widget/utils") || {
  href: () => {},
};

const ProfileOptions = (props) => [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "{config/account}/widget/Profile.Feed",
    href: href({ params: { tab: "profile", accountId: props.accountId, env: props.env, nav: "feed"}})
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: "{config/account}/widget/Profile.DonationsTable",
    href: href({ params: { tab: "profile", accountId: props.accountId, env: props.env, nav: "donations"}})
  },
  {
    label: "",
    id: "followers",
    disabled: false,
    source: "{config/account}/widget/Profile.FollowTabs",
  },
  {
    label: "",
    id: "following",
    disabled: false,
    source: "{config/account}/widget/Profile.FollowTabs",
  },
];

return {
  ProfileOptions,
};
