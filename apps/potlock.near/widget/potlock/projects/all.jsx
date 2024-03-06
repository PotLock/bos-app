// filter registry contract for overlap // redocard so not included
return (
  <Widget
    src={`${config/account}/widget/potlock.projects.listPage`}
    props={{
      descriptor: "projects",
      urlProps: props.urlProps,
      entity: "projects",
      filters: [
        "vertical",
        "readiness",
        "size",
        "integration",
        "dev",
        "stage",
        "distribution",
      ],
      renderItem: (accountId) => (
        <Widget
          src={`${config/account}/widget/potlock.projects.projectCard`}
          props={{
            accountId,
          }}
        />
      ),
    }}
  />
);
