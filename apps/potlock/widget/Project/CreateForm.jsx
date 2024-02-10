const { ownerId, REGISTRY_CONTRACT_ID } = props;
const HORIZON_CONTRACT_ID = "nearhorizon.near";
const SOCIAL_CONTRACT_ID = "social.near";

Big.PE = 100;
const FIFTY_TGAS = "50000000000000";
const THREE_HUNDRED_TGAS = "300000000000000";
const MIN_PROPOSAL_DEPOSIT = "100000000000000000000000"; // 0.1N

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const DEFAULT_BANNER_IMAGE_CID = "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreifel4bfm6hxmklcsqjilk3bhvi3acf2rxqepcgglluhginbttkyqm";

const MAX_TEAM_MEMBERS_DISPLAY_COUNT = 5;

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/Components.InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to create a new project!",
      }}
    />
  );
}

const existingHorizonProject = Near.view(HORIZON_CONTRACT_ID, "get_project", {
  account_id: context.accountId,
});

const projects = Near.view(REGISTRY_CONTRACT_ID, "get_projects", {});

const imageHeightPx = 120;
const profileImageTranslateYPx = 220;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 72px 64px 72px 64px;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;

const LowerBannerContainer = styled.div`
  position: absolute;
  bottom: -250px;
  left: 0px;
  display: flex;
  align-items: stretch; /* Ensuring child elements stretch to full height */
  justify-content: space-between;
  width: 100%;

  // background: green;

  @media screen and (max-width: 768px) {
    bottom: -310px;
  }
`;

const LowerBannerContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 190px;
  // background: yellow;

  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const LowerBannerContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end; /* Pushes TeamContainer to the bottom */
  flex: 1;
`;

// const TeamContainer = styled.div`
//   width: 200px;
//   height: 30px;
//   // background: green;
//   margin-bottom: 16px;
//   display: flex;
//   flex-direction: row;
//   // gap: -40px;
// `;

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
  padding: 260px 68px 32px 68px;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 320px 32px 32px 32px;
  }
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
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

const InputPrefix = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 14px 16px;
  border-right: 1px #f0f0f0 solid;
  color: #7b7b7b;
  font-size: 16px;
  font-weight: 400;
  box-shadow: 0px -2px 0px rgba(93, 93, 93, 0.24) inset;
`;

State.init({
  isDao: false,
  daoAddressTemp: "", // used while input is focused
  daoAddress: "", // set on input blur
  daoAddressError: "",
  backgroundImage: {
    ipfs_cid: DEFAULT_BANNER_IMAGE_CID,
  },
  profileImage: "",
  name: "",
  nameError: "",
  originalCategories: [], // to keep track of removals
  categories: [],
  categoriesError: "",
  description: "",
  descriptionError: "",
  publicGoodReason: "",
  publicGoodReasonError: "",
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
  registrationSuccess: false,
  showAlert: false,
  alertMessage: "",
});

// console.log("state in create form: ", state);

const CATEGORY_MAPPINGS = {
  // "social-impact": "Social Impact",
  // "non-profit": "NonProfit",
  // climate: "Climate",
  // "public-good": "Public Good",
  // "de-sci": "DeSci",
  // "open-source": "Open Source",
  // community: "Community",
  // education: "Education",
  SOCIAL_IMPACT: "Social Impact",
  NON_PROFIT: "NonProfit",
  CLIMATE: "Climate",
  PUBLIC_GOOD: "Public Good",
  DE_SCI: "DeSci",
  OPEN_SOURCE: "Open Source",
  COMMUNITY: "Community",
  EDUCATION: "Education",
  _deprecated: {
    "social-impact": "SOCIAL_IMPACT",
    "non-profit": "NON_PROFIT",
    climate: "CLIMATE",
    "public-good": "PUBLIC_GOOD",
    "de-sci": "DE_SCI",
    "open-source": "OPEN_SOURCE",
    community: "COMMUNITY",
    education: "EDUCATION",
  },
};

const accountId = props.projectId
  ? props.projectId
  : state.isDao
  ? state.daoAddress
  : context.accountId;
const policy = Near.view(accountId, "get_policy", {});

const userHasPermissions = useMemo(() => {
  if (!policy) return true;
  // TODO: break this out (NB: duplicated in Project.CreateForm)
  const userRoles = policy.roles.filter((role) => {
    if (role.kind === "Everyone") return true;
    return role.kind.Group && role.kind.Group.includes(context.accountId);
  });
  const kind = "call";
  const action = "AddProposal";
  // Check if the user is allowed to perform the action
  const allowed = userRoles.some(({ permissions }) => {
    return (
      permissions.includes(`${kind}:${action}`) ||
      permissions.includes(`${kind}:*`) ||
      permissions.includes(`*:${action}`) ||
      permissions.includes("*:*")
    );
  });
  return allowed;
}, [policy]);

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

const setSocialData = (accountId, shouldSetTeamMembers) => {
  Near.asyncView("social.near", "get", { keys: [`${accountId}/profile/**`] })
    .then((socialData) => {
      // console.log("socialData: ", socialData);
      if (!socialData || !socialData[accountId].profile) {
        State.update({
          socialDataFetched: true,
          name: "",
          originalCategories: [],
          categories: [],
          description: "",
          website: "",
          twitter: "",
          telegram: "",
          github: "",
          teamMembers: [],
        });
        return;
      }
      const profileData = socialData[accountId].profile;
      const backgroundImage = profileData.backgroundImage;
      const profileImage = profileData.image || "";
      const description = profileData.description || "";
      const publicGoodReason = profileData.potlockPublicGoodReason || "";
      let categories = [];
      if (profileData.potlockCategories) {
        categories = profileData.potlockCategories;
      } else if (profileData.category) {
        // old/deprecated version
        if (typeof profileData.category == "string") {
          const availableCategory =
            CATEGORY_MAPPINGS[CATEGORY_MAPPINGS._deprecated[profileData.category]];
          if (availableCategory) {
            categories.push(availableCategory);
          }
        }
      }
      const linktree = profileData.linktree || {};
      const twitter = linktree.twitter || "";
      const telegram = linktree.telegram || "";
      const github = linktree.github || "";
      const website = linktree.website || "";
      const team = profileData.team || {};
      // update state
      const stateUpdates = {
        backgroundImage,
        profileImage,
        name: profileData?.name || "",
        description,
        publicGoodReason,
        originalCategories: categories,
        categories,
        twitter,
        telegram,
        github,
        website,
        socialDataFetched: true,
      };
      if (backgroundImage) {
        stateUpdates.backgroundImage = backgroundImage;
      }
      if (shouldSetTeamMembers) {
        stateUpdates.teamMembers = Object.entries(team)
          .filter(([_accountId, value]) => value !== null)
          .map(([accountId, _]) => ({
            accountId,
            imageUrl: DEFAULT_PROFILE_IMAGE_URL, // TODO: fetch actual image from near social. or better, move ProfileImage to its own component that handles the social data fetching
          }));
      }
      State.update(stateUpdates);
    })
    .catch((e) => {
      console.log("error getting social data: ", e);
      State.update({ socialDataFetched: true });
    });
};

useEffect(() => {
  if (state.isDao && state.daoAddress) {
    setSocialData(state.daoAddress, true);
  } else if (!state.isDao && context.accountId && !state.socialDataFetched) {
    setSocialData(context.accountId, true);
  }
}, [state.socialDataFetched, state.isDao, state.daoAddress, context.accountId]);

if (context.accountId && !state.registeredProjects) {
  Near.asyncView(REGISTRY_CONTRACT_ID, "get_projects", {})
    .then((projects) => {
      State.update({ registeredProjects: projects });
    })
    .catch((e) => {
      console.log("error getting projects: ", e);
      State.update({ getRegisteredProjectsError: e });
    });
}

const isCreateProjectDisabled =
  state.daoAddressError ||
  !state.name ||
  state.nameError ||
  !state.description ||
  state.descriptionError ||
  !state.publicGoodReason ||
  state.publicGoodReasonError ||
  !state.categories.length ||
  state.categoriesError;

const handleCreateOrUpdateProject = (e) => {
  if (isCreateProjectDisabled) return;
  const daoAddressValid = state.isDao ? props.validateNearAddress(state.daoAddress) : true;
  if (!daoAddressValid) {
    State.update({
      daoAddressError: "Invalid NEAR account ID",
    });
    return;
  }

  const formattedCategories = state.categories.reduce((acc, cur) => {
    acc[cur] = "";
    return acc;
  }, {});
  // if the user removed a category, we need to remove it from the formattedCategories by setting its value to null
  state.originalCategories.forEach((category) => {
    if (!formattedCategories.hasOwnProperty(category)) {
      formattedCategories[category] = null;
    }
  });
  const socialArgs = {
    data: {
      [accountId]: {
        // basic profile details
        profile: {
          name: state.name,
          potlockCategories: formattedCategories,
          description: state.description,
          potlockPublicGoodReason: state.publicGoodReason,
          linktree: {
            website: state.website,
            twitter: state.twitter,
            telegram: state.telegram,
            github: state.github,
          },
          team: state.teamMembers.reduce(
            (acc, tm) => ({ ...acc, [tm.accountId]: tm.remove ? null : "" }),
            {}
          ),
        },
        // follow & star Potlock
        index: {
          star: {
            key: {
              type: "social",
              path: `${ownerId}/widget/Index`,
            },
            value: {
              type: "star",
            },
          },
          notify: {
            key: ownerId,
            value: {
              type: "star",
              item: {
                type: "social",
                path: `${ownerId}/widget/Index`,
              },
            },
          },
        },
        graph: {
          star: {
            [ownerId]: {
              widget: {
                Index: "",
              },
            },
          },
          follow: {
            [ownerId]: "",
          },
        },
      },
    },
  };
  if (state.backgroundImage) {
    socialArgs.data[accountId].profile.backgroundImage = state.backgroundImage;
  }
  if (state.profileImage) {
    socialArgs.data[accountId].profile.image = state.profileImage;
  }
  const potlockRegistryArgs = {};
  const horizonArgs = { account_id: state.isDao ? state.daoAddress : context.accountId };

  // first, we have to get the account from social.near to see if it exists. If it doesn't, we need to add 0.1N to the deposit
  Near.asyncView(SOCIAL_CONTRACT_ID, "get_account", {
    account_id: state.isDao ? state.daoAddress : context.accountId,
  }).then((account) => {
    const socialTransaction = {
      contractName: SOCIAL_CONTRACT_ID,
      methodName: "set",
      args: socialArgs,
    };
    let depositFloat = JSON.stringify(socialArgs).length * 0.00003;
    if (!account) {
      depositFloat += 0.1;
    }
    socialTransaction.deposit = Big(depositFloat).mul(Big(10).pow(24));

    // instantiate transactions array that we will be passing to Near.call()
    let transactions = [socialTransaction];

    // if this is a creation action, we need to add the registry and horizon transactions
    if (!props.edit) {
      transactions.push(
        // register project on potlock
        {
          contractName: REGISTRY_CONTRACT_ID,
          methodName: "register",
          deposit: Big(0.05).mul(Big(10).pow(24)),
          args: potlockRegistryArgs,
        }
      );
      if (!existingHorizonProject) {
        transactions.push(
          // register on NEAR Horizon
          {
            contractName: HORIZON_CONTRACT_ID,
            methodName: "add_project",
            args: horizonArgs,
          }
        );
      }
    }

    // if it is a DAO, we need to convert transactions to DAO function call proposals
    if (state.isDao) {
      const clonedTransactions = JSON.parse(JSON.stringify(transactions));
      transactions = clonedTransactions.map((tx) => {
        const action = {
          method_name: tx.methodName,
          gas: FIFTY_TGAS,
          deposit: tx.deposit ? tx.deposit.toString() : "0",
          args: Buffer.from(JSON.stringify(tx.args), "utf-8").toString("base64"),
        };
        return {
          ...tx,
          contractName: state.daoAddress,
          methodName: "add_proposal",
          args: {
            proposal: {
              description: props.edit
                ? "Update project on Potlock (via NEAR Social)"
                : "Create project on Potlock (3 steps: Register information on NEAR Social, register on Potlock, and register on NEAR Horizon)",
              kind: {
                FunctionCall: {
                  receiver_id: tx.contractName,
                  actions: [action],
                },
              },
            },
          },
          deposit: policy.proposal_bond || MIN_PROPOSAL_DEPOSIT,
          gas: THREE_HUNDRED_TGAS,
        };
      });
    }
    Near.call(transactions);
    // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
    // <---- EXTENSION WALLET HANDLING ---->
    // poll for updates
    const pollIntervalMs = 1000;
    // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
    const pollId = setInterval(() => {
      Near.asyncView(REGISTRY_CONTRACT_ID, "get_project_by_id", {
        project_id: context.accountId,
        // TODO: implement pagination (should be OK without until there are 500+ donations from this user)
      }).then((_project) => {
        // won't get here unless project exists
        clearInterval(pollId);
        State.update({ registrationSuccess: true });
      });
    }, pollIntervalMs);
  });
};

if (props.projectId) {
  Near.asyncView(props.projectId, "get_policy", {}).then((policy) => {
    if (policy) {
      State.update({
        isDao: true,
        daoAddress: props.projectId,
        daoAddressTemp: props.projectId,
      });
    }
  });
}

const registeredProject = useMemo(() => {
  return state.registeredProjects
    ? state.registeredProjects?.find(
        (project) => project.id == (state.isDao ? state.daoAddress : context.accountId)
      )
    : null;
}, [state.registeredProjects, state.isDao, state.daoAddress]);

// console.log("registeredProject: ", registeredProject);

const proposals = Near.view(state.daoAddress, "get_proposals", {
  from_index: 0,
  limit: 1000,
});

const proposalInProgress = useMemo(() => {
  if (!state.isDao || !state.daoAddress || !proposals) return false;
  return proposals?.find((proposal) => {
    return (
      proposal.status == "InProgress" &&
      proposal.kind.FunctionCall?.receiver_id == REGISTRY_CONTRACT_ID &&
      proposal.kind.FunctionCall?.actions[0]?.method_name == "register"
    );
  });
}, [state, proposals]);

const handleAddTeamMember = () => {
  let isValid = props.validateNearAddress(state.teamMember);
  if (!isValid) {
    State.update({
      nearAccountIdError: "Invalid NEAR account ID",
    });
    return;
  }
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
        console.log("full team member: ", fullTeamMember);
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

if (props.edit && (!registeredProject || !userHasPermissions)) {
  return <h3 style={{ textAlign: "center", paddingTop: "32px" }}>Unauthorized</h3>;
}

const uploadFileUpdateState = (body, callback) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then(callback);
};

return (
  <Container>
    {!state.socialDataFetched || !projects ? (
      <div class="spinner-border text-secondary" role="status" />
    ) : proposalInProgress ? (
      <Container
        style={{
          padding: "32px 16px",
          justifyContent: "center",
          alignItems: "center",
          wordWrap: "break-word",
        }}
      >
        <h1 style={{ textAlign: "center" }}>You have a DAO proposal in progress.</h1>
        <h5 style={{ wordWrap: "break-word", textAlign: "center" }}>
          Please come back once voting on your proposal has been completed.
        </h5>
        <div
          style={{
            fontStyle: "italic",
            fontFamily: "sans-serif",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          NB: This proposal consists of 3 steps (individual proposals): Register information on NEAR
          Social, register on Potlock, and register on NEAR Horizon.
        </div>
        <a
          target="_blank"
          href={`https://near.org/sking.near/widget/DAO.Page?daoId=${state.daoAddress}&tab=proposal&proposalId=${proposalInProgress.id}`}
          style={{ marginTop: "16px" }}
        >
          View DAO Proposal
        </a>
      </Container>
    ) : !props.edit && (registeredProject || state.registrationSuccess) ? (
      <>
        <h1 style={{ textAlign: "center" }}>You've successfully registered!</h1>
        <ButtonsContainer>
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: "View your project",
              disabled: false,
              href: props.hrefWithEnv(
                `?tab=project&projectId=${registeredProject?.id || context.accountId}`
              ),
            }}
          />
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "secondary",
              text: "View all projects",
              disabled: false,
              href: props.hrefWithEnv(`?tab=projects`),
            }}
          />
        </ButtonsContainer>
      </>
    ) : (
      <>
        <Widget
          src={`${ownerId}/widget/Project.BannerHeader`}
          props={{
            ...props,
            projectId: state.isDao && state.daoAddress ? state.daoAddress : context.accountId, // TODO: consider updating to use dao address if available, but will look weird bc no DAOs prob have a banner image on near social
            backgroundStyle: {
              objectFit: "cover",
              left: 0,
              top: 0,
              height: "280px",
            },
            // allowEdit: true,
            backgroundImage: state.backgroundImage,
            profileImage: state.profileImage,
            bgImageOnChange: (files) => {
              if (files) {
                uploadFileUpdateState(files[0], (res) => {
                  const ipfs_cid = res.body.cid;
                  State.update({ backgroundImage: { ipfs_cid } });
                });
              }
            },
            profileImageOnChange: (files) => {
              if (files) {
                uploadFileUpdateState(files[0], (res) => {
                  const ipfs_cid = res.body.cid;
                  State.update({ profileImage: { ipfs_cid } });
                });
              }
            },
            children: (
              <LowerBannerContainer>
                <LowerBannerContainerLeft>
                  <AddTeamMembers onClick={() => State.update({ isModalOpen: true })}>
                    {state.teamMembers.length > 0
                      ? "Add or remove team members"
                      : "Add team members"}
                  </AddTeamMembers>
                </LowerBannerContainerLeft>
                <LowerBannerContainerRight>
                  <Widget
                    src={`${ownerId}/widget/Components.AccountsStack`}
                    props={{
                      accountIds: state.teamMembers
                        .filter((teamMember) => !teamMember.remove)
                        .map((tm) => {
                          console.log("tm: ", tm);
                          return tm.accountId;
                        }),
                      sendToBack: state.isModalOpen,
                    }}
                  />
                </LowerBannerContainerRight>
              </LowerBannerContainer>
            ),
          }}
        />
        <FormBody>
          <FormDivider />
          <FormSectionContainer>
            {FormSectionLeft(
              "Project details",
              "Give an overview of your project including background details and your mission.",
              true
            )}
            <FormSectionRightDiv>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "masterSelector",
                  checked: state.isDao,
                  onClick: (e) => {
                    State.update({ isDao: e.target.checked });
                    if (!e.target.checked) {
                      setSocialData(context.accountId);
                    } else {
                      if (state.daoAddress) {
                        setSocialData(state.daoAddress);
                      }
                    }
                  },
                  label: "Register as DAO",
                  disabled: props.edit,
                  containerStyle: {
                    marginBottom: "24px",
                  },
                }}
              />
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: state.isDao ? "DAO address *" : "Project ID *",
                  value: state.isDao ? state.daoAddressTemp : context.accountId,
                  disabled: !state.isDao,
                  onChange: (daoAddress) =>
                    State.update({ daoAddressTemp: daoAddress.toLowerCase(), daoAddressError: "" }),
                  validate: () => {
                    // **CALLED ON BLUR**
                    if (state.isDao) {
                      const isValid = props.validateNearAddress(state.daoAddressTemp);
                      if (!isValid) {
                        State.update({
                          daoAddressError: "Invalid NEAR account ID",
                        });
                        return;
                      }
                      const NO_PERMISSIONS_ERROR = "You do not have required roles for this DAO";
                      Near.asyncView(state.daoAddressTemp, "get_policy", {})
                        .then((policy) => {
                          // console.log("policy: ", policy);
                          // State.update({ registeredProjects: projects });
                          // Filter the user roles
                          // TODO: break this out (duplicated in Project.Body)
                          const userRoles = policy.roles.filter((role) => {
                            if (role.kind === "Everyone") return true;
                            return role.kind.Group && role.kind.Group.includes(context.accountId);
                          });
                          const kind = "call";
                          const action = "AddProposal";
                          // Check if the user is allowed to perform the action
                          const allowed = userRoles.some(({ permissions }) => {
                            return (
                              permissions.includes(`${kind}:${action}`) ||
                              permissions.includes(`${kind}:*`) ||
                              permissions.includes(`*:${action}`) ||
                              permissions.includes("*:*")
                            );
                          });
                          if (!allowed) {
                            State.update({
                              daoAddressError: NO_PERMISSIONS_ERROR,
                            });
                          } else {
                            // add all council roles to team (but not current user)
                            const councilRole = policy.roles.find(
                              (role) => role.name === "council"
                            );
                            const councilTeamMembers = (councilRole?.kind?.Group || []).map(
                              (tm) => ({ accountId: tm })
                            );
                            State.update({
                              daoAddress: state.daoAddressTemp,
                              teamMembers: councilTeamMembers,
                            });
                          }
                        })
                        .catch((e) => {
                          console.log("error getting DAO policy: ", e);
                          State.update({
                            daoAddressError: NO_PERMISSIONS_ERROR,
                          });
                        });
                      setSocialData(state.daoAddressTemp, false);
                    }
                    State.update({ daoAddressError: "" });
                  },
                  error: state.isDao ? state.daoAddressError : "",
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
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  label: "Reason for considering yourself a public good *",
                  placeholder: "Type response",
                  value: state.publicGoodReason,
                  onChange: (publicGoodReason) => State.update({ publicGoodReason }),
                  validate: () => {
                    if (state.publicGoodReason.length > 500) {
                      State.update({
                        publicGoodReasonError: "Response must be less than 500 characters",
                      });
                      return;
                    }

                    State.update({ publicGoodReasonError: "" });
                  },
                  error: state.publicGoodReasonError,
                }}
              />
              <Space height={24} />

              <Widget
                src={`${ownerId}/widget/Inputs.SelectMultiple`}
                props={{
                  label: "Select category (select multiple) *",
                  placeholder: "Choose category",
                  options: Object.values(CATEGORY_MAPPINGS).filter((el) => typeof el === "string"),
                  onChange: (categories) => {
                    State.update({
                      categories,
                    });
                  },
                  selected: state.categories,
                }}
              />
            </FormSectionRightDiv>
          </FormSectionContainer>
          <FormDivider />
          <FormSectionContainer>
            {FormSectionLeft(
              "Social links",
              "Add your project social links to so supporters can connect with you directly.",
              false
            )}
            <FormSectionRightDiv>
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Twitter",
                  preInputChildren: <InputPrefix>twitter.com/</InputPrefix>,
                  inputStyles: { borderRadius: "0px 4px 4px 0px" },
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
                  preInputChildren: <InputPrefix>t.me/</InputPrefix>,
                  inputStyles: { borderRadius: "0px 4px 4px 0px" },
                  value: state.telegram,
                  onChange: (telegram) => State.update({ telegram }),
                  validate: () => {
                    // TODO: add validation?
                  },
                  error: state.telegramError,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "GitHub",
                  preInputChildren: <InputPrefix>github.com/</InputPrefix>,
                  inputStyles: { borderRadius: "0px 4px 4px 0px" },
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
                src={`${ownerId}/widget/Inputs.Text`}
                props={{
                  label: "Website",
                  preInputChildren: <InputPrefix>https://</InputPrefix>,
                  inputStyles: { borderRadius: "0px 4px 4px 0px" },
                  value: state.website,
                  onChange: (website) => State.update({ website }),
                  validate: () => {
                    // TODO: add validation
                  },
                  error: state.websiteError,
                }}
              />
              <Space height={24} />
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  prefix: "https://",
                  text: props.edit
                    ? state.isDao
                      ? "Add proposal to update project"
                      : "Update your project"
                    : state.isDao
                    ? "Add proposal to create project"
                    : "Create new project",
                  disabled: isCreateProjectDisabled,
                  onClick: handleCreateOrUpdateProject,
                }}
              />
              <Space height={24} />
            </FormSectionRightDiv>
          </FormSectionContainer>
        </FormBody>
        <Widget
          src={`${ownerId}/widget/Components.ModalMultiAccount`}
          props={{
            ...props,
            isModalOpen: state.isModalOpen,
            onClose: () => State.update({ isModalOpen: false }),
            titleText: "Add team members",
            descriptionText: "Add NEAR account IDs for your team members.",
            inputValue: state.teamMember,
            onInputChange: (teamMember) => {
              State.update({ teamMember, nearAccountIdError: "" });
            },
            handleAddAccount: handleAddTeamMember,
            handleRemoveAccount: (accountId) => {
              State.update({
                teamMembers: state.teamMembers.map((tm) => {
                  if (tm.accountId == accountId) {
                    return { ...tm, remove: true };
                  }
                  return tm;
                }),
              });
            },
            accountError: state.nearAccountIdError,
            accounts: state.teamMembers,
            unitText: "member",
          }}
        />
      </>
    )}
  </Container>
);
