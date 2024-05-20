return (
  <>
    <Widget
      src={"${config_account}/widget/Components.Header"}
      props={{
        ...props,
        title1: props.edit ? "Edit your project" : "Create new project",
        description: `${
          props.edit ? "Update your " : "Create a "
        } profile for your impact project to receive direct donations, qualify for funding rounds, join NEAR's accelerator, and get discovered across social platforms.`,
        centered: false,
        containerStyle: {
          background: "#FEF6EE",
        },
      }}
    />
    <Widget src={"${config_account}/widget/Project.CreateForm"} props={props} />
  </>
);
