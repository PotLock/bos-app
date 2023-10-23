const ownerId = "potlock.near";
const registryId = "registry.potlock.near"; // TODO: update when registry is deployed

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
// const DEFAULT_BANNER_IMAGE_URL =
//   IPFS_BASE_URL + "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
// const DEFAULT_PROFILE_IMAGE_URL =
//   IPFS_BASE_URL + "bafkreifel4bfm6hxmklcsqjilk3bhvi3acf2rxqepcgglluhginbttkyqm";
const ADD_TEAM_MEMBERS_ICON_URL =
  IPFS_BASE_URL + "bafkreig6c7m2z2lupreu2br4pm3xx575mv6uvmuy2qkij4kzzfpt7tipcq";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";

const NEAR_ACCOUNT_ID_REGEX = /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;

const MAX_TEAM_MEMBERS_DISPLAY_COUNT = 5;

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to create a new project!",
      }}
    />
  );
}

const imageHeightPx = 120;
const profileImageTranslateYPx = 220;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 72px 64px 72px 64px;
`;

const LowerBannerContainer = styled.div`
  position: absolute;
  bottom: -210px;
  left: 0px;
  display: flex;
  align-items: stretch; /* Ensuring child elements stretch to full height */
  justify-content: space-between;
  width: 100%;
`;

const LowerBannerContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 190px;
`;

const LowerBannerContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end; /* Pushes TeamContainer to the bottom */
  flex: 1;
  // background: yellow;
`;

const TeamContainer = styled.div`
  width: 200px;
  height: 30px;
  // background: green;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  // gap: -40px;
`;

const AddTeamMembers = styled.a`
  margin: 0px 0px 16px 36px;
  cursor: pointer;
  color: #dd3345;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
  }
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 148px 0 148px;
  width: 100%;
`;

const FormDivider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #ebebeb;
`;

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 160px;
  margin: 48px 0 48px 0;
`;

const FormSectionLeftDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // background-color: yellow;
  gap: 16px;
`;

const FormSectionRightDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // background-color: lightblue;
`;

const FormSectionTitle = styled.div`
  color: #2e2e2e;
  font-size: 16;
  font-weight: 600;
  word-wrap: break-word;
`;

const FormSectionDescription = styled.div`
  color: #2e2e2e;
  font-size: 16;
  font-weight: 400;
  word-wrap: break-word;
`;

const FormSectionIsRequired = styled.div`
  font-size: 16px;
  font-weight: 400;
  word-wrap: break-word;
  position: relative;
`;

const SvgContainer = styled.div`
  position: absolute;
  top: -6;
  left: -26;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
`;

const Space = styled.div`
  height: ${(props) => props.height}px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 30vh;
`;

const ModalContent = styled.div`
  border-radius: 14px;
  // width: 60%;
  padding: 32px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  // z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const ModalHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
`;

const ModalTitle = styled.div`
  font-color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
`;

const ModalDescription = styled.p`
  font-color: #2e2e2e;
  font-size: 16px;
  font-weight: 400;
=`;

const MembersCount = styled.span`
  color: #2e2e2e;
  font-weight: 600;
`;

const MembersText = styled.div`
  color: #7b7b7b;
  font-size: 12px;
  font-weight: 400;
`;

const MembersListItem = styled.div`
  padding: 16px 0px;
  border-top: 1px #f0f0f0 solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RemoveMember = styled.a`
  color: #2e2e2e;
  font-size: 14px;
  font-weight: 600;
  visibility: hidden;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
  }

  ${MembersListItem}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const MembersListItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

const MembersListItemText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
`;

const MoreTeamMembersContainer = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid white;
  border-radius: 50%;
  background: #dd3345;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.zIndex};
  margin-right: -8px;
`;

const MoreTeamMembersText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

State.init({
  name: "",
  nameError: "",
  category: null,
  categoryError: "",
  description: "",
  descriptionError: "",
  website: "",
  websiteError: "",
  twitter: "",
  twitterError: "",
  telegram: "",
  telegramError: "",
  github: "",
  githubError: "",
  socialDataFetched: false,
  socialDataIsFetching: false,
  registeredProjects: null,
  getRegisteredProjectsError: "",
  isModalOpen: false,
  teamMember: "",
  teamMembers: [],
  nearAccountIdError: "",
});

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </ModalOverlay>
  );
};

if (context.accountId && !state.socialDataFetched) {
  Near.asyncView("social.near", "get", { keys: [`${context.accountId}/profile/**`] })
    .then((socialData) => {
      if (!socialData) return;
      const profileData = socialData[context.accountId].profile;
      if (!profileData) return;
      // description
      let description = profileData.description || "";
      // linktree
      const linktree = profileData.linktree || {};
      const twitter = linktree.twitter || "";
      const telegram = linktree.telegram || "";
      const github = linktree.github || "";
      const website = linktree.website || "";
      // team
      const team = profileData.team || {};
      // update state
      State.update({
        name: profileData?.name || "",
        description,
        twitter,
        telegram,
        github,
        website,
        socialDataFetched: true,
        teamMembers: Object.keys(team).map((accountId) => ({
          accountId,
          imageUrl: DEFAULT_PROFILE_IMAGE_URL, // TODO: fetch actual image from near social. or better, move ProfileImage to its own component that handles the social data fetching
        })),
      });
    })
    .catch((e) => {
      console.log("error getting social data: ", e);
      State.update({ socialDataFetched: true });
    });
}

if (context.accountId && !state.registeredProjects) {
  Near.asyncView(registryId, "get_projects", {})
    .then((projects) => {
      State.update({ registeredProjects: projects });
    })
    .catch((e) => {
      console.log("error getting projects: ", e);
      State.update({ getRegisteredProjectsError: e });
    });
}

const isCreateProjectDisabled =
  !state.name ||
  state.nameError ||
  !state.description ||
  state.descriptionError ||
  !state.category ||
  state.categoryError;

const handleCreateProject = (e) => {
  if (isCreateProjectDisabled) return;
  const socialArgs = {
    data: {
      [context.accountId]: {
        profile: {
          name: state.name,
          category: state.category, // TODO: consider changing format of this for consistency with near horizon
          description: state.description,
          linktree: {
            website: state.website,
            twitter: state.twitter,
            telegram: state.telegram,
            github: state.github,
          },
          team: state.teamMembers.reduce((acc, tm) => ({ ...acc, [tm.accountId]: "" }), {}),
        },
      },
    },
  };
  const registerArgs = { name: state.name };
  const transactions = [
    // set data on social.near
    {
      contractName: "social.near",
      methodName: "set",
      deposit: Big(JSON.stringify(socialArgs).length * 16).mul(Big(10).pow(20)),
      args: socialArgs,
    },
    // register project on potlock
    {
      contractName: registryId,
      methodName: "register",
      deposit: Big(JSON.stringify(registerArgs).length * 16).mul(Big(10).pow(20)),
      args: registerArgs,
    },
    // TODO: register on near horizon
  ];
  const res = Near.call(transactions);
};

const registeredProject = state.registeredProjects
  ? state.registeredProjects?.find(
      (project) => project.id == context.accountId && project.status == "Approved"
    )
  : null;

const handleAddTeamMember = () => {
  let isValid = NEAR_ACCOUNT_ID_REGEX.test(state.teamMember);
  // Additional ".near" check for IDs less than 64 characters
  if (state.teamMember.length < 64 && !state.teamMember.endsWith(".near")) {
    isValid = false;
  }
  if (!isValid) {
    State.update({
      nearAccountIdError: "Invalid NEAR account ID",
    });
    return;
  }
  // TODO:
  if (!state.teamMembers.find((tm) => tm.accountId == state.teamMember)) {
    // get data from social.near
    const profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
    const fullTeamMember = {
      accountId: state.teamMember.toLowerCase(),
      imageUrl: profileImageUrl,
    };
    Near.asyncView("social.near", "get", { keys: [`${state.teamMember}/profile/**`] })
      .then((socialData) => {
        if (socialData) {
          const profileData = socialData[state.teamMember].profile;
          if (!profileData) return;
          // get profile image URL
          if (profileData.image) {
            const imageUrl = getImageUrlFromSocialImage(profileData.image);
            if (imageUrl) fullTeamMember.imageUrl = imageUrl;
          }
        }
      })
      .catch((e) => {
        console.log("error getting social data: ", e);
      })
      .finally(() => {
        State.update({
          teamMembers: [...state.teamMembers, fullTeamMember],
          teamMember: "",
          nearAccountIdError: "",
        });
      });
  }
};

const FormSectionLeft = (title, description, isRequired) => {
  return (
    <FormSectionLeftDiv>
      <FormSectionTitle>{title}</FormSectionTitle>
      <FormSectionDescription>{description}</FormSectionDescription>
      <FormSectionIsRequired
        style={{
          color: isRequired ? "#DD5633" : "#7B7B7B",
        }}
      >
        {isRequired ? "Required" : "Optional"}
        {isRequired && (
          <SvgContainer style={{ top: -6, left: -26 }}>
            <svg
              width="117"
              height="31"
              viewBox="0 0 117 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M81.8 3.40116C82.247 3.1908 83.0709 3.13488 82.6 2.60116C81.0461 0.840105 83.0819 0.798833 78.6667 1.22338C65.6302 2.47689 52.5192 4.47997 39.6667 6.95672C31.3106 8.56697 19.0395 10.1936 12.7333 17.09C3.95785 26.6869 29.2286 29.1656 32.9333 29.3567C53.953 30.4413 75.9765 28.9386 96.5111 24.1789C99.8286 23.41 122.546 18.5335 112.733 11.5345C107.621 7.88815 100.796 6.47335 94.7333 5.75672C77.7504 3.74928 60.1141 5.22649 43.2222 7.35671C28.8721 9.16641 14.4138 11.8506 1 17.4012"
                stroke="#2E2E2E"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </SvgContainer>
        )}
      </FormSectionIsRequired>
    </FormSectionLeftDiv>
  );
};

return (
  <Container>
    {!state.socialDataFetched ? (
      <div class="spinner-border text-secondary" role="status" />
    ) : registeredProject ? (
      <Container>
        <h1 style={{ textAlign: "center" }}>You've successfully registered!</h1>
        <ButtonsContainer>
          <Widget
            src={`${ownerId}/widget/Buttons.NavigationButton`}
            props={{
              type: "primary",
              text: "View your project",
              disabled: false,
              href: `?tab=project&projectId=${registeredProject.id}`,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Buttons.NavigationButton`}
            props={{
              type: "secondary",
              text: "View all projects",
              disabled: false,
              href: `?tab=projects`,
            }}
          />
        </ButtonsContainer>
      </Container>
    ) : (
      <>
        <Widget
          src={`${ownerId}/widget/Project.BannerHeader`}
          props={{
            ...props,
            projectId: context.accountId,
            profileImageTranslateYPx,
            containerStyle: {
              paddingLeft: "64px",
            },
            backgroundStyle: {
              objectFit: "cover",
              left: 0,
              top: 0,
              height: "280px",
              borderRadius: "6px",
            },
            imageStyle: {
              width: `${imageHeightPx}px`,
              height: `${imageHeightPx}px`,
            },
            children: (
              <LowerBannerContainer>
                <LowerBannerContainerLeft>
                  <AddTeamMembers onClick={() => State.update({ isModalOpen: true })}>
                    Add team members
                  </AddTeamMembers>
                </LowerBannerContainerLeft>
                <LowerBannerContainerRight>
                  <TeamContainer>
                    {state.teamMembers.length > MAX_TEAM_MEMBERS_DISPLAY_COUNT && (
                      <MoreTeamMembersContainer zIndex={state.teamMembers.length + 1}>
                        <MoreTeamMembersText>{MAX_TEAM_MEMBERS_DISPLAY_COUNT}+</MoreTeamMembersText>
                      </MoreTeamMembersContainer>
                    )}
                    {state.teamMembers
                      .slice(0, MAX_TEAM_MEMBERS_DISPLAY_COUNT)
                      .map((teamMember, idx) => {
                        return (
                          <Widget
                            src="mob.near/widget/ProfileImage"
                            props={{
                              accountId: teamMember.accountId,
                              style: {
                                width: "28px",
                                height: "28px",
                                zIndex: state.teamMembers.length - idx,
                                margin: "0 -8px 0 0",
                                border: "2px solid white",
                                borderRadius: "50%",
                                background: "white",
                              },
                              className: "mb-2",
                              imageClassName: "rounded-circle w-100 h-100 d-block",
                              thumbnail: false,
                              tooltip: true,
                            }}
                          />
                        );
                      })}
                  </TeamContainer>
                </LowerBannerContainerRight>
              </LowerBannerContainer>
            ),
          }}
        />
        <FormBody style={{ padding: `${profileImageTranslateYPx + 40}px 68px` }}>
          <FormDivider />
          <FormSectionContainer>
            {FormSectionLeft(
              "Project details",
              "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
              true
            )}
            <FormSectionRightDiv>
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Project ID *",
                  value: context.accountId,
                  disabled: true,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Project name *",
                  placeholder: "Enter project name",
                  value: state.name,
                  onChange: (name) => State.update({ name }),
                  validate: () => {
                    if (state.name.length < 3) {
                      State.update({ nameError: "Name must be at least 3 characters" });
                      return;
                    }

                    if (state.name.length > 100) {
                      State.update({
                        nameError: "Name must be less than 100 characters",
                      });
                      return;
                    }

                    State.update({ nameError: "" });
                  },
                  error: state.nameError,
                }}
              />
              <Space height={24} />

              <Widget
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  label: "Overview *",
                  placeholder: "Give a short description of your project",
                  value: state.description,
                  onChange: (description) => State.update({ description }),
                  validate: () => {
                    if (state.description.length > 500) {
                      State.update({
                        descriptionError: "Description must be less than 500 characters",
                      });
                      return;
                    }

                    State.update({ descriptionError: "" });
                  },
                  error: state.descriptionError,
                }}
              />
              <Space height={24} />

              <Widget
                src={`${ownerId}/widget/Inputs.Select`}
                props={{
                  label: "Select category *",
                  noLabel: false,
                  placeholder: "Choose category",
                  options: [
                    // Social Impact, NonProfit, Climate, Public Good
                    { text: "Social Impact", value: "social-impact" },
                    { text: "NonProfit", value: "non-profit" },
                    { text: "Climate", value: "climate" },
                    { text: "Public Good", value: "public-good" },
                  ],
                  value: state.category,
                  onChange: (category) =>
                    State.update({
                      category,
                    }),
                  validate: () => {
                    if (!state.category) {
                      State.update({
                        categoryError: "Please select a category",
                      });
                    }
                  },
                  error: state.categoryError,
                }}
              />
            </FormSectionRightDiv>
          </FormSectionContainer>
          <FormDivider />
          <FormSectionContainer>
            {FormSectionLeft(
              "Social links",
              "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
              false
            )}
            <FormSectionRightDiv>
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Twitter",
                  prefix: "twitter.com/",
                  // placeholder: "your-twitter-username",
                  value: state.twitter,
                  onChange: (twitter) => State.update({ twitter }),
                  validate: () => {
                    if (state.twitter.length > 15) {
                      State.update({
                        twitterError: "Invalid Twitter handle",
                      });
                      return;
                    }
                    State.update({ twitterError: "" });
                  },
                  error: state.twitterError,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Telegram",
                  prefix: "t.me/",
                  // placeholder: "your-telegram-id",
                  value: state.telegram,
                  onChange: (telegram) => State.update({ telegram }),
                  validate: () => {
                    // TODO: add validation
                  },
                  error: state.telegramError,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "GitHub",
                  prefix: "github.com/",
                  // placeholder: "your-github-",
                  value: state.github,
                  onChange: (github) => State.update({ github }),
                  validate: () => {
                    // TODO: add validation
                  },
                  error: state.githubError,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Buttons.ActionButton`}
                props={{
                  type: "primary",
                  prefix: "https://",
                  text: "Create new project",
                  disabled: isCreateProjectDisabled,
                  onClick: handleCreateProject,
                }}
              />
              <Space height={24} />
            </FormSectionRightDiv>
          </FormSectionContainer>
        </FormBody>
        <Modal isOpen={state.isModalOpen} onClose={() => State.update({ isModalOpen: false })}>
          <ModalHeader>
            <ModalHeaderLeft>
              <IconContainer>
                <Icon src={ADD_TEAM_MEMBERS_ICON_URL} />
              </IconContainer>
              <ModalTitle>Add team members</ModalTitle>
            </ModalHeaderLeft>
            <Icon
              cursor={"pointer"}
              src={CLOSE_ICON_URL}
              onClick={() => State.update({ isModalOpen: false })}
            />
          </ModalHeader>
          <ModalDescription>Add NEAR account IDs for your team members.</ModalDescription>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              // label: "Project name *",
              placeholder: "NEAR account ID",
              value: state.teamMember,
              onChange: (teamMember) => {
                State.update({ teamMember, nearAccountIdError: "" });
              },
              buttonText: "Add",
              submit: true,
              onClick: handleAddTeamMember,
              handleKeyPress: (e) => {
                if (e.key === "Enter") {
                  handleAddTeamMember();
                }
              },
              error: state.nearAccountIdError,
            }}
          />
          <Space height={24} />
          <MembersText>
            <MembersCount>{state.teamMembers.length} </MembersCount>
            {state.teamMembers.length == 1 ? "member" : "members"}
          </MembersText>
          {state.teamMembers.map((teamMember) => {
            return (
              <MembersListItem>
                <MembersListItemLeft>
                  <Widget
                    src="mob.near/widget/ProfileImage"
                    props={{
                      accountId: teamMember.accountId,
                      style: {
                        width: "40px",
                        height: "40px",
                        margin: "0 -8px 0 0",
                        borderRadius: "50%",
                        background: "white",
                      },
                      imageClassName: "rounded-circle w-100 h-100 d-block",
                      thumbnail: false,
                      tooltip: true,
                    }}
                  />
                  <MembersListItemText>@{teamMember.accountId}</MembersListItemText>
                </MembersListItemLeft>
                <RemoveMember
                  onClick={() =>
                    State.update({
                      teamMembers: state.teamMembers.filter((member) => member != teamMember),
                    })
                  }
                >
                  Remove
                </RemoveMember>
              </MembersListItem>
            );
          })}
        </Modal>
      </>
    )}
  </Container>
);
