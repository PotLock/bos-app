const nearToUsd = useCache(
  () =>
    asyncFetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(
      (res) => {
        if (res.ok) {
          return res.body.near.usd;
        }
      }
    ),
  "nearToUsd"
);

const yoctosToUsd = (amount) => {
  return nearToUsd ? "~$" + new Big(amount).mul(nearToUsd).div(1e24).toNumber().toFixed(2) : null;
};

return { yoctosToUsd };
