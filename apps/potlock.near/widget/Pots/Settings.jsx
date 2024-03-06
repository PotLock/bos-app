// get settings
return (
  <>
    <Widget
      src={"${config/account}/widget/Pots.NavOptionsMobile"}
      props={{
        ...props,
      }}
    />
    <Widget
      src={"${config/account}/widget/Pots.ConfigForm"}
      props={{
        ...props,
      }}
    />
  </>
);
