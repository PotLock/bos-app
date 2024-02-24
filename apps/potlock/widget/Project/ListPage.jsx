const { tab, yoctosToUsd } = props;
const { DONATION_CONTRACT_ID, ownerId } = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
  ownerId: "",
};
const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

const headerTitleFontSizePx = 88;

const HeaderContainer = styled.div`
  width: 100%;
  // background: #fffaf4;
  // background: white;
  padding: 80px 64px;

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderTitle = styled.div`
  color: #2e2e2e;
  font-size: ${headerTitleFontSizePx}px;
  font-weight: 500;
  word-wrap: break-word;
  position: relative;
  text-align: center;
  z-index: 1;
  position: relative;
  font-family: "Lora";
  ${loraCss}

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeaderDescription = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 400;
  word-wrap: break-word;
  max-width: 866px;
  text-align: center;
  margin-top: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
`;

const Underline = styled.div`
  position: absolute;
  top: ${headerTitleFontSizePx - 40}px;
  left: -40px;
  z-index: -1;

  @media (max-width: 768px) {
    top: 30px;
    left: -30px;
`;
const containerStyle = props.containerStyle ?? {};

const showStats = !props.tab || props.tab == "projects";

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

  // @media screen and (max-width: 768px) {
  //   margin-top: 200px;
  // }
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;

  @media screen and (max-width: 768px) {
    min-height: 600px;
  }
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

const Button = styled.button`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #dd3345;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const ButtonRegisterProject = styled.a`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #fef6ee;
  overflow: hidden;
  box-shadow: 0px -2.700000047683716px 0px #4a4a4a inset;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: #2e2e2e;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

const StatsTitle = styled.div`
  color: #292929;
  font-size: 44px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 30px;
    font-weight: 500;
    gap: 5px;
  }
`;

const StatsSubTitle = styled.div`
  color: #525252;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

State.init({
  isModalOpen: false,
  successfulDonation: null,
});

const [totalDonation, setTotalDonation] = useState(0);
const [totalDonated, setTotalDonated] = useState(0);

Near.asyncView(DONATION_CONTRACT_ID, "get_config", {}).then((result) => {
  const lastDonationAmount = props.yoctosToUsd(result.net_donations_amount);
  setTotalDonated(lastDonationAmount);
  setTotalDonation(result.total_donations_count);
});

const donateRandomly = () => {
  State.update({
    isModalOpen: true,
    successfulDonation: null,
  });
};

const PotlockRegistrySDK = VM.require("potlock.near/widget/SDK.registry");
const registry = PotlockRegistrySDK({ env: props.env });

const projects = registry.getProjects() || [];

if (!registry.isRegistryAdmin(context.accountId)) {
  projects = projects.filter((project) => project.status === "Approved");
}

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

const handleDonateRandomly = (e) => {
  e.preventDefault();
  props.openDonateToProjectModal();
};

const containerStyleHeader = {
  position: "absolute",
  height: "100%",
  top: 0,
  left: 0,
  marginBottom: "24px",
  background: "radial-gradient(80% 80% at 40.82% 50%, white 25%, rgba(255, 255, 255, 0) 100%)",
};

return (
  <>
    <HeroContainer>
      <Hero src={HERO_BACKGROUND_IMAGE_URL} alt="hero" />
      {/* <Widget
        src={`${ownerId}/widget/Components.Header`}
        props={{
          ...props,
          ownerId,
          tab,
          yoctosToUsd,
          title1: "Transforming",
          title2: "Funding for Public Goods",
          description:
            "Discover impact projects, donate directly, & participate in funding rounds.",
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
          buttonPrimary: (
            <Widget
              src={`${ownerId}/widget/Project.ButtonDonateRandomly`}
              props={{
                ...props,
              }}
            />
          ),
          buttonSecondary: (
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "secondary",
                text: "Register Your Project",
                disabled: false,
                href: props.hrefWithParams(`?tab=createproject`),
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
      /> */}
      <HeaderContainer style={containerStyleHeader}>
        <HeaderContent>
          <HeaderTitle>
            Transforming
            <Underline>
              <svg
                width="340"
                height="42"
                viewBox="0 0 340 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.29967 39C-14.0566 35.9491 49.9788 32.436 71.4774 30.6444C151.734 23.9564 232.915 20.5161 312.9 15"
                  stroke="#DD3345"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M31.2997 27C9.94337 23.9491 73.9788 20.436 95.4774 18.6444C175.734 11.9564 256.915 8.51608 336.9 3"
                  stroke="#DD3345"
                  stroke-width="5"
                  stroke-linecap="round"
                />
              </svg>
            </Underline>
          </HeaderTitle>
          <HeaderTitle>Funding for Public Goods</HeaderTitle>
          <HeaderDescription>
            Discover impact projects, donate directly, & participate in funding rounds.
          </HeaderDescription>
        </HeaderContent>

        <ButtonsContainer>
          {/* <Widget
            src={`${ownerId}/widget/Project.ButtonDonateRandomly`}
            props={{
              ...props,
            }}
          /> */}
          <Button onClick={donateRandomly}>Donate Randomly</Button>
          {state.isModalOpen && (
            <Widget
              src={`${ownerId}/widget/Project.ModalDonation`}
              props={{
                ...props,
                isModalOpen: state.isModalOpen,
                onClose: () =>
                  State.update({
                    isModalOpen: false,
                  }),
                openDonationModalSuccess: (donation) => {
                  State.update({
                    isModalOpen: false,
                    successfulDonation: donation,
                  });
                },
              }}
            />
          )}
          {state.successfulDonation && (
            <Widget
              src={`${ownerId}/widget/Project.ModalSuccess`}
              props={{
                ...props,
                successfulDonation: state.successfulDonation,
                isModalOpen: state.successfulDonation != null,
                onClose: () =>
                  State.update({
                    successfulDonation: null,
                  }),
              }}
            />
          )}
          {/* <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              text: "Register Your Project",
              disabled: false,
              href: props.hrefWithParams(`?tab=createproject`),
              style: { padding: "16px 24px" },
            }}
          /> */}
          <ButtonRegisterProject href={"?tab=createproject"}>
            Register Your Project
          </ButtonRegisterProject>
        </ButtonsContainer>
        <Stats>
          <StatsTitle>
            {totalDonated || "-"}
            <StatsSubTitle>Donated</StatsSubTitle>
          </StatsTitle>
          <StatsTitle>
            {totalDonation || "-"}
            <StatsSubTitle>Donations</StatsSubTitle>
          </StatsTitle>
        </Stats>
      </HeaderContainer>
    </HeroContainer>
    <ProjectsContainer>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          ...props,
          items: projects,
          renderItem: (project) => {
            return (
              <Widget
                src={`${ownerId}/widget/Project.Card`}
                loading={
                  <div
                    style={{
                      width: "355px",
                      height: "455px",
                      borderRadius: "12px",
                      background: "white",
                      boxShadow: "0px -2px 0px #dbdbdb inset",
                      border: "1px solid #dbdbdb",
                    }}
                  />
                }
                props={{
                  ...props,
                  // potId,
                  projectId: project.id,
                  allowDonate: true,
                  // allowDonate:
                  //   sybilRequirementMet &&
                  //   publicRoundOpen &&
                  //   project.project_id !== context.accountId,
                  // requireVerification: !sybilRequirementMet,
                }}
              />
            );
          },
        }}
      />
    </ProjectsContainer>
  </>
);
