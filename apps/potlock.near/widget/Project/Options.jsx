const { href } = VM.require("${config/account}/widget/utils") || {
  href: () => {},
};

const ProjectOptions = (props) => [
  {
    label: "Home",
    id: "home",
    disabled: false,
    source: "${config/account}/widget/Project.About",
    href: href({ params: { tab: "project", projectId: props.projectId, referralId: props.referralId, env: props.env, nav: "home"}})
  },
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "${config/account}/widget/Profile.Feed",
    href: href({ params: { tab: "project", projectId: props.projectId, referralId: props.referralId, env: props.env, nav: "feed"}})
  },
  {
    label: "Pots",
    id: "pots",
    disabled: false,
    source: "${config/account}/widget/Project.Pots",
    href: href({ params: { tab: "project", projectId: props.projectId, referralId: props.referralId, env: props.env, nav: "pots"}})
  },
  // {
  //   label: "Attestations",
  //   id: "attestations",
  //   disabled: true,
  // },
  {
    label: "Funding raised",
    id: "funding",
    disabled: false,
    source: "${config/account}/widget/Profile.DonationsTable",
    href: href({ params: { tab: "project", projectId: props.projectId, referralId: props.referralId, env: props.env, nav: "funding"}})
  },
  {
    label: "",
    id: "followers",
    disabled: false,
    source: "${config/account}/widget/Profile.FollowTabs",
  },
  {
    label: "",
    id: "following",
    disabled: false,
    source: "${config/account}/widget/Profile.FollowTabs",
  },
];

return {
  ProjectOptions,
};
