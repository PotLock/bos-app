// get settings
console.log("props in Pots.Settings", props);
const { ownerId, potId, potDetail } = props;

const isUpdate = !!potDetail;

const userIsAdminOrGreater =
  (isUpdate && potDetail.owner === context.accountId) ||
  potDetail.admins.includes(context.accountId);

console.log("potDetail", potDetail);
console.log("userIsAdminOrGreater", userIsAdminOrGreater);

if (isUpdate && !userIsAdminOrGreater) {
  return (
    <>
      {Object.entries(potDetail).map(([k, v], index) => {
        if (k === "payouts") return null;
        console.log("k", k);
        console.log("v", v);
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
