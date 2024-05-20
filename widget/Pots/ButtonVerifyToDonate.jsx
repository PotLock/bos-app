return (
  <Widget
    src={"${config_account}/widget/Components.Button"}
    props={{
      ...props,
      type: "primary",
      text: "Verify to Donate",
      style: props.style || {},
      href: props.href,
      target: "_blank",
    }}
  />
);
