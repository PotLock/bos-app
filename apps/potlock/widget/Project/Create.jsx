const ownerId = "potlock.near";

return (
  <>
    <Widget
      src={`${ownerId}/widget/Components.Header`}
      props={{
        title1: "Create new project",
        description:
          "Create a profile for your impact project to receive direct donations, qualify for funding rounds, join NEAR's accelerator, and get discovered across social platforms.",
        centered: false,
        containerStyle: {
          background: "#FEF6EE",
        },
      }}
    />
    <Widget src={`${ownerId}/widget/Project.CreateForm`} />
  </>
);
