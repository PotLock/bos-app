const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getApprovedApplications: () => {},
  getPublicRoundDonations: () => {},
};

// Card Skeleton - Loading fallback
const loadingSkeleton = styled.keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const CardSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 447px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  animation-name: ${loadingSkeleton};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const HeaderSkeleton = styled.div`
  display: block;
  width: 100%;
  height: 168px;
  background: #eee;
`;

const ProfileImageSkeleton = styled.div`
  background: #e0e0e0;
  margin-left: 32px;
  transform: translateY(148px);
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 999px;
`;

const TitleSkeleton = styled.div`
  width: 120px;
  height: 24px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const DescriptionSkeleton = styled.div`
  width: 83%;
  height: 48px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const TagSkeleton = styled.div`
  background: #eee;
  border-radius: 4px;
  height: 34px;
  width: 110px;
  margin: 24px;
`;

const FooterItemSkeleton = styled.div`
  width: 150px;
  height: 40px;
  background: #eee;

  @media screen and (max-width: 390px) {
    width: 100px;
  }
`;

const DonationsInfoContainerSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  border-top: 1px #f0f0f0 solid;
`;

const DonationsInfoItemSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const CardSkeleton = () => (
  <CardSkeletonContainer>
    <HeaderSkeleton />
    <ProfileImageSkeleton />
    <TitleSkeleton />
    <DescriptionSkeleton />
    <TagSkeleton />
    <DonationsInfoContainerSkeleton>
      <DonationsInfoItemSkeleton>
        <FooterItemSkeleton />
      </DonationsInfoItemSkeleton>
      <DonationsInfoItemSkeleton>
        <FooterItemSkeleton />
      </DonationsInfoItemSkeleton>
    </DonationsInfoContainerSkeleton>
  </CardSkeletonContainer>
);

// get projects
const { ownerId, potId, potDetail, sybilRequirementMet } = props;
const { calculatePayouts } = VM.require("potlock.near/widget/utils") || {
  calculatePayouts: () => {},
};
const projects = PotSDK.getApprovedApplications(potId);

if (!projects) return <div class="spinner-border text-secondary" role="status" />;

const { public_round_start_ms, public_round_end_ms } = potDetail;

const now = Date.now();
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;

const allDonationsForPot = PotSDK.getPublicRoundDonations(potId) || [];

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
        shouldShuffle: true,
        maxCols: 2,
        items: projects,
        renderItem: (project) => {
          return (
            <Widget
              src={`${ownerId}/widget/Project.Card`}
              loading={<CardSkeleton />}
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
