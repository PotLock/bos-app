const ProjectOptions = (props) => [
  {
    label: "Home",
    id: "home",
    disabled: false,
    source: `${props.ownerId}/widget/Project.About`,
    href: props.hrefWithEnv(`?tab=project&id=${props.projectId}&nav=home`),
  },
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: `${props.ownerId}/widget/Project.Feed`,
    href: props.hrefWithEnv(`?tab=project&id=${props.projectId}&nav=feed`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${props.ownerId}/widget/Components.DonorsTrx`,
    href: props.hrefWithEnv(`?tab=project&id=${props.projectId}&nav=donations`),
  },
  {
    label: "Pots",
    id: "pots",
    disabled: true,
  },
  {
    label: "Attestations",
    id: "attestations",
    disabled: true,
  },
  {
    label: "Funding Raised",
    id: "funding",
    disabled: true,
  },
];

const ProfileOptions = (props) => [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: `${props.ownerId}/widget/Project.Feed`,
    href: props.hrefWithEnv(`?tab=profile&id=${props.accountId}&nav=feed`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: `${props.ownerId}/widget/Components.DonorsTrx`,
    href: props.hrefWithEnv(`?tab=profile&id=${props.accountId}&nav=donations`),
  },
  {
    label: "Widgets",
    id: "widgets",
    disabled: false,
    source: "mob.near/widget/LastWidgets",
    href: props.hrefWithEnv(`?tab=profile&id=${props.accountId}&nav=widgets`),
  },
];

return {
  ProjectOptions,
  ProfileOptions,
};
