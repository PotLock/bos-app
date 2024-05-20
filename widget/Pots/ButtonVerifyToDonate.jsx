const { ownerId } = props;

return (
  <Widget
    src={`${ownerId}/widget/Components.Button`}
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
