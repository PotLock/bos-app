// get projects
const { ownerId, potId, potDetail, sybilRequirementMet } = props;
const { calculatePayouts } = VM.require("potlock.near/widget/utils") || {
  calculatePayouts: () => {},
};
const projects = Near.view(potId, "get_approved_applications", {});

if (!projects) return <div class="spinner-border text-secondary" role="status" />;

const { public_round_start_ms, public_round_end_ms } = potDetail;

const now = Date.now();
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;

const allDonationsForPot = Near.view(potId, "get_public_round_donations", {}) || [];

const payouts = useMemo(() => {
  if (allDonationsForPot.length)
    return calculatePayouts(allDonationsForPot, potDetail.matching_pool_balance);
}, [allDonationsForPot]);

return (
  <>
    <Widget
      src={`${ownerId}/widget/Pots.NavOptionsMobile`}
      props={{
        ...props,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Project.ListSection`}
      props={{
        ...props,
        maxCols: 2,
        items: projects,
        renderItem: (project) => {
          return (
            <Widget
              src={`${ownerId}/widget/Project.Card`}
              loading={
                <div
                  style={{
                    width: "320px",
                    height: "500px",
                    borderRadius: "12px",
                    background: "white",
                    boxShadow: "0px -2px 0px #464646 inset",
                    border: "1px solid #292929",
                  }}
                />
              }
              props={{
                ...props,
                potId,
                projectId: project.project_id,
                allowDonate:
                  sybilRequirementMet &&
                  publicRoundOpen &&
                  project.project_id !== context.accountId,
                requireVerification: !sybilRequirementMet,
                payoutDetails: payouts[project.project_id],
              }}
            />
          );
        },
      }}
    />
  </>
);
