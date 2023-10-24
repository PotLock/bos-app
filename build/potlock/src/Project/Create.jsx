const ownerId = "potlock.near";

return (
  <>
    <Widget
      src={`${ownerId}/widget/Components.Header`}
      props={{
        title1: "Create new project",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
        centered: false,
        containerStyle: {
          background: "#FEF6EE",
        },
      }}
    />
    <Widget src={`${ownerId}/widget/Project.CreateForm`} />
  </>
);
