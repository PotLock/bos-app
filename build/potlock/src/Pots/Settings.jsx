// get settings
const { ownerId, potId, potDetail } = props;

const isUpdate = !!potDetail;

const userIsAdminOrGreater =
  (isUpdate && potDetail.owner === context.accountId) ||
  potDetail.admins.includes(context.accountId);

if (isUpdate && !userIsAdminOrGreater) {
  return (
    <>
      {Object.entries(potDetail).map(([k, v], index) => {
        return (
          <div key={index}>
            {k}: {v}
          </div>
        );
      })}
    </>
  );
}

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
