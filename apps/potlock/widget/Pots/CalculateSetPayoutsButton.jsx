// * QF/CLR logic taken from https://github.com/gitcoinco/quadratic-funding/blob/master/quadratic-funding/clr.py *

const { potId, potDetail } = props;
const { ONE_TGAS, ownerId } = VM.require("potlock.near/widget/constants") || {
  ONE_TGAS: 0,
  ownerId: "",
};
const convertDonationsToProjectContributions = (donations) => {
  const projectContributionsList = [];
  for (const d of donations) {
    const amount = new Big(d.total_amount);
    const val = [d.project_id, d.donor_id, amount];
    projectContributionsList.push(val);
  }
  return projectContributionsList;
};

const handleCalculateAndSetPayouts = () => {
  // get all public donations (TODO: ADD PAGINATION (ok without until 500+ donations))
  Near.asyncView(potId, "get_public_round_donations", {})
    .then((donations) => {
      // first, flatten the list of donations into a list of contributions
      const projectContributions = convertDonationsToProjectContributions(donations);

      // take the flattened list of contributions and aggregate
      // the amounts contributed by each user to each project.
      // create a dictionary where each key is a projectId and its value
      // is another dictionary of userIds and their aggregated contribution amounts.
      const contributions = {};
      for (const [proj, user, amount] of projectContributions) {
        if (!contributions[proj]) {
          contributions[proj] = {};
        }
        contributions[proj][user] = Big(contributions[proj][user] || 0).plus(amount);
      }

      // calculate the total overlapping contribution amounts between pairs of users for each project.
      // create a nested dictionary where the outer keys are userIds and the inner keys are also userIds,
      // and the inner values are the total overlap between these two users' contributions.
      // type PairTotals = { [key: UserId]: { [key: UserId]: YoctoBig } };
      const pairTotals = {};
      for (const contribz of Object.values(contributions)) {
        for (const [k1, v1] of Object.entries(contribz)) {
          if (!pairTotals[k1]) {
            pairTotals[k1] = {};
          }
          for (const [k2, v2] of Object.entries(contribz)) {
            if (!pairTotals[k1][k2]) {
              pairTotals[k1][k2] = Big(0);
            }
            pairTotals[k1][k2] = pairTotals[k1][k2].plus(v1.times(v2).sqrt());
          }
        }
      }

      // Compute the CLR (Contribution Matching) amount for each project
      // using the aggregated contributions, the total overlaps between user pairs,
      // a threshold value, and the total pot available for matching.
      // Then, calculate the matching amount for each project using the quadratic formula
      // and returns a list of objects containing the projectId, the number of contributions,
      // the total contributed amount, and the matching amount.
      const threshold = Big("25000000000000000000000000"); // TODO: play around with adjusting this value
      const totalPot = Big(potDetail.matching_pool_balance);
      let bigtot = Big(0);
      const totals = [];
      for (const [proj, contribz] of Object.entries(contributions)) {
        let tot = Big(0);
        let _num = 0;
        let _sum = Big(0);

        for (const [k1, v1] of Object.entries(contribz)) {
          _num += 1;
          _sum = _sum.plus(v1);
          for (const [k2, v2] of Object.entries(contribz)) {
            // if (k2 > k1) { // TODO: potentially add this "if" statement back in, not sure of its purpose as the values being compared are account IDs. Originally taken from Gitcoin's CLR logic (see link at top of file)
            const sqrt = v1.times(v2).sqrt();
            tot = tot.plus(sqrt.div(pairTotals[k1][k2].div(threshold)));
            // }
          }
        }
        bigtot = bigtot.plus(tot);
        totals.push({
          id: proj,
          number_contributions: _num,
          contribution_amount_str: _sum.toString(),
          matching_amount_str: tot.toString(),
        });
      }
      console.log("totals: ", totals);

      // if we reach saturation, we need to normalize
      if (bigtot.gte(totalPot)) {
        console.log("NORMALIZING");
        for (const t of totals) {
          t.matching_amount_str = Big(t.matching_amount_str).div(bigtot).times(totalPot).toFixed();
        }
      }

      // create payouts to send to Pot
      const payouts = totals.map((t) => {
        return {
          project_id: t.id,
          amount: t.matching_amount_str,
        };
      });
      console.log("payouts: ", payouts);

      // set payouts on Pot
      const args = {
        payouts,
      };
      const transactions = [
        {
          contractName: potId,
          methodName: "chef_set_payouts",
          deposit: "0",
          args,
          gas: ONE_TGAS.mul(100),
        },
      ];
      Near.call(transactions);
      // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
      // <---- EXTENSION WALLET HANDLING ----> TODO: IMPLEMENT
      //   // poll for updates
      //   const pollIntervalMs = 1000;
      //   // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
      //   const pollId = setInterval(() => {
      //     Near.asyncView(potId, "get_applications", {}).then((applications) => {
      //       const application = applications.find(
      //         (application) => application.project_id === context.accountId
      //       );
      //       if (application) {
      //         clearInterval(pollId);
      //         State.update({ applicationSuccess: true });
      //       }
      //     });
      //   }, pollIntervalMs);
    })
    .catch((e) => {
      console.log("error getting donations: ", e);
      // TODO: handl error in UI
    });
};

return (
  <Widget
    src={`${ownerId}/widget/Components.Button`}
    props={{
      type: "primary",
      text: "Calculate & Set Payouts",
      onClick: handleCalculateAndSetPayouts,
    }}
  />
);
