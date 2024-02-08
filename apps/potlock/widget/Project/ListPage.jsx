const { ownerId, userIsRegistryAdmin } = props;

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px 64px 24px 64px;

  @media screen and (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #2e2e2e;
  font-family: Mona-Sans;
`;

const ProjectsCount = styled.div`
  color: #7b7b7b;
  font-size: 24px;
  font-weight: 400;
  margin-left: 32px;

  @media screen and (max-width: 768px) {
    margin-left: 16px;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0px 64px 96px 64px;
  // background: #fafafa;

  @media screen and (max-width: 768px) {
    margin-top: 200px;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
`;

const Hero = styled.img`
  width: 100%;
  height: 100%;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const InfoCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  margin: 40px 0;
  gap: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    // justify-content: center;
  }
`;

const projects = useMemo(
  () =>
    userIsRegistryAdmin
      ? props.registeredProjects
      : props.registeredProjects.filter((project) => project.status === "Approved"),
  [props.registeredProjects, userIsRegistryAdmin]
);

const [totalDonations, totalDonors] = useMemo(() => {
  if (!props.donations) {
    return ["", "", ""];
  }
  let totalDonations = new Big("0");
  let donors = {};
  props.donations.forEach((donation) => {
    const totalAmount = new Big(donation.total_amount);
    const referralAmount = new Big(donation.referrer_fee || "0");
    const protocolAmount = new Big(donation.protocol_fee || "0");
    totalDonations = totalDonations.plus(totalAmount.minus(referralAmount).minus(protocolAmount));
    donors[donation.donor_id] = true;
  });
  return [totalDonations.div(1e24).toNumber().toFixed(2), Object.keys(donors).length];
}, [props.donations]);

return (
  <>
    <HeroContainer>
      <Hero src={HERO_BACKGROUND_IMAGE_URL} alt="hero" />
      <Widget
        src={`${ownerId}/widget/Components.Header`}
        props={{
          title1: "Transforming",
          title2: "Funding for Public Goods",
          description:
            "Discover impact projects, donate directly, or get automatic referral fees for raising donations",
          centered: true,
          containerStyle: {
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            marginBottom: "24px",
            background:
              "radial-gradient(80% 80% at 40.82% 50%, white 25%, rgba(255, 255, 255, 0) 100%)",
          },
          // buttonPrimary: (
          //   <Widget
          //     src={`${ownerId}/widget/Components.Button`}
          //     props={{
          //       type: "primary",
          //       text: "Explore projects",
          //       disabled: false,
          //       style: { padding: "16px 24px" },
          //     }}
          //   />
          // ),
          buttonSecondary: (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                text: "Create project",
                disabled: false,
                href: props.hrefWithEnv(`?tab=createproject`),
                style: { padding: "16px 24px" },
              }}
            />
          ),
          // TODO: refactor this
          children: totalDonations && (
            <InfoCardsContainer>
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: props.nearToUsd
                    ? `$${(totalDonations * props.nearToUsd).toFixed(2)}`
                    : `${totalDonations} N`,
                  infoTextSecondary: "Total Contributed",
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: totalDonors,
                  infoTextSecondary: "Unique Donors",
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.InfoCard`}
                props={{
                  infoTextPrimary: props.donations ? props.donations.length : "-",
                  infoTextSecondary: "Donations",
                }}
              />
            </InfoCardsContainer>
          ),
        }}
      />
    </HeroContainer>
    <ProjectsContainer>
      <Widget
        src={`${ownerId}/widget/Components.ListSection`}
        props={{
          ...props,
          items: projects,
        }}
      />
    </ProjectsContainer>
  </>
);
