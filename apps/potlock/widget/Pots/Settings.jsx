// get settings
const { ownerId } = props;

return (
  <>
    <Widget
      src={`${ownerId}/widget/Pots.ConfigForm`}
      props={{
        ...props,
      }}
    />
  </>
);
