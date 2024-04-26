const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getApprovedApplications: () => {},
  getPublicRoundDonations: () => {},
  getFlaggedAccounts: () => {},
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: fit-content;
  margin-bottom: 1.5rem;
  div:first-of-type {
    font-weight: 600;
  }
`;

const SearchBar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 0.5px solid #292929;
  margin-bottom: 0.5rem;
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    font-size: 14px;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 12px 16px 12px 3rem;
    border: none;
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    svg {
      left: 1rem;
    }

    input {
      padding: 8px 24px 8px 54px;
    }
  }
`;

const [searchTerm, setSearchTerm] = useState("");
const [filteredProjects, setFilteredProjects] = useState([]);
const [projects, setProjects] = useState(null);
const [flaggedAddresses, setFlaggedAddresses] = useState(null);
const [payouts, setPayouts] = useState(null);

// get projects
const { ownerId, potId, potDetail, allDonations } = props;
const { calculatePayouts, getTagsFromSocialProfileData, getTeamMembersFromSocialProfileData } =
  VM.require("potlock.near/widget/utils") || {
    calculatePayouts: () => {},
    getFlaggedAccounts: () => {},
    getTagsFromSocialProfileData: () => [],
    getTeamMembersFromSocialProfileData: () => [],
  };

if (!projects) {
  PotSDK.asyncGetApprovedApplications(potId).then((projects) => {
    setProjects(projects);
    setFilteredProjects(projects);
  });
}

if (!projects) return <div class="spinner-border text-secondary" role="status" />;

const { public_round_start_ms, public_round_end_ms, referral_fee_public_round_basis_points } =
  potDetail;

const now = Date.now();
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;

if (!flaggedAddresses) {
  PotSDK.getFlaggedAccounts(potDetail, potId)
    .then((data) => {
      const listOfFlagged = [];
      data.forEach((adminFlaggedAcc) => {
        const addresses = Object.keys(adminFlaggedAcc.potFlaggedAcc);
        listOfFlagged.push(...addresses);
      });
      setFlaggedAddresses(listOfFlagged);
    })
    .catch((err) => console.log("error getting the flagged accounts ", err));
}

if (!payouts) {
  if (allDonations.length && flaggedAddresses)
    calculatePayouts(allDonations, potDetail.matching_pool_balance, flaggedAddresses)
      .then((payouts) => {
        setPayouts(payouts ?? []);
      })
      .catch((err) => {
        console.log("error while calculating payouts ", err);
        setPayouts([]);
      });
}

const searchByWords = (searchTerm) => {
  if (projects.length) {
    searchTerm = searchTerm.toLowerCase().trim();
    setSearchTerm(searchTerm);
    const updatedProjects = projects.filter((project) => {
      const profile = Social.getr(`${id}/profile`);
      const fields = [
        project.project_id,
        project.status,
        profile.description,
        profile.name,
        getTagsFromSocialProfileData(profile).join(" "),
        getTeamMembersFromSocialProfileData(profile).join(" "),
      ];
      return fields.some((item) => (item || "").toLowerCase().includes(searchTerm.toLowerCase()));
    });
    setFilteredProjects(updatedProjects);
  }
};

return (
  <Container>
    <Title>
      <div>Projects</div>
      <div>{filteredProjects?.length}</div>
    </Title>

    <SearchBar>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.81641 8.69141H9.22391L9.01391 8.48891C9.74891 7.63391 10.1914 6.52391 10.1914 5.31641C10.1914 2.62391 8.00891 0.441406 5.31641 0.441406C2.62391 0.441406 0.441406 2.62391 0.441406 5.31641C0.441406 8.00891 2.62391 10.1914 5.31641 10.1914C6.52391 10.1914 7.63391 9.74891 8.48891 9.01391L8.69141 9.22391V9.81641L12.4414 13.5589L13.5589 12.4414L9.81641 8.69141ZM5.31641 8.69141C3.44891 8.69141 1.94141 7.18391 1.94141 5.31641C1.94141 3.44891 3.44891 1.94141 5.31641 1.94141C7.18391 1.94141 8.69141 3.44891 8.69141 5.31641C8.69141 7.18391 7.18391 8.69141 5.31641 8.69141Z"
          fill="#7B7B7B"
        />
      </svg>
      <input
        type="text"
        placeholder="Search projects"
        onChange={(e) => searchByWords(e.target.value)}
        className="search-input"
      />
    </SearchBar>
    <Widget
      src={`${ownerId}/widget/Project.ListSection`}
      props={{
        ...props,
        shouldShuffle: true,
        maxCols: 3,
        items: filteredProjects,
        responsive: [
          {
            breakpoint: 1200,
            items: 2,
          },
          {
            breakpoint: 870,
            items: 1,
          },
        ],
        renderItem: (project) => {
          return (
            <Widget
              src={`${ownerId}/widget/Project.Card`}
              loading={<CardSkeleton />}
              props={{
                ...props,
                potDetail,
                projects,
                projectId: project.project_id,
                allowDonate: publicRoundOpen && project.project_id !== context.accountId,
                potRferralFeeBasisPoints: referral_fee_public_round_basis_points,
                payoutDetails: payouts[project.project_id] || {
                  donorCount: 0,
                  matchingAmount: "0",
                  totalAmount: "0",
                },
              }}
            />
          );
        },
      }}
    />
  </Container>
);
