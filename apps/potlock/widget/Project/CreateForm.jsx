// TODO:
// 1. pull in data from near.social if it already exists

const ownerId = "potlock.near";
const registryId = "registry1.tests.potlock.near"; // TODO: update when registry is deployed

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const DEFAULT_BANNER_IMAGE_URL =
  IPFS_BASE_URL + "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 72px 64px 72px 64px;
`;

const ProfileImgContainer = styled.div`
  width: 120px;
  height: 120px;
  position: absolute;
  bottom: 0px;
  left: 113px;
  background-color: pink;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  margin-bottom: 132px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid white;
  position: absolute;
  bottom: -60px;
  left: 113px;
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
  // font-family: Mona-Sans;
  font-weight: 600;
  word-wrap: break-word;
`;

const FormSectionDescription = styled.div`
  color: #2e2e2e;
  font-size: 16;
  // font-family: Mona-Sans;
  font-weight: 400;
  word-wrap: break-word;
`;

const FormSectionIsRequired = styled.div`
  font-size: 16px;
  // font-family: Mona-Sans;
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
  profileImageUrl: "",
  profileImageError: "",
  bannerImageCid: "",
  bannerImageError: "",
  socialDataFetched: false,
  socialDataIsFetching: false,
  registeredProjects: null,
  getRegisteredProjectsError: "",
});

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
  // else {
  //   // get media from NFT if present
  //   if (image.nft) {
  //     const { contractId, tokenId } = image.nft;
  //     const contractMetadata = Near.view(contractId, "nft_metadata", {});
  //     console.log("contractMetadata: ", contractMetadata);
  //     if (contractMetadata) {
  //       const baseUri = contractMetadata?.base_uri.endsWith("/")
  //         ? contractMetadata?.base_uri
  //         : `${contractMetadata?.base_uri}/`;
  //       const nft = Near.view(contractId, "nft_token", { token_id: tokenId });
  //       console.log("nft: ", nft);
  //       const nftMedia = nft.metadata.media;
  //       const url = baseUri + nftMedia;
  //       console.log("url: ", url);
  //       return url;
  //       // const res = fetch(url); // fetch to make sure it's a valid URL
  //       // console.log("url res: ", res);
  //       // if (res.ok) {
  //       //   return url;
  //       // }
  //     }
  //   }
  // }
};

// useEffect(() => {
//   if (context.accountId && !state.socialDataFetched && !state.socialDataIsFetching) {
//     State.update({ socialDataIsFetching: true });
//     const socialData = Social.get(`${context.accountId}/profile/**`);
//     if (!socialData) return;
//     // get profile image URL
//     let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
//     if (socialData.image) {
//       const imageUrl = getImageUrlFromSocialImage(socialData.image);
//       if (imageUrl) profileImageUrl = imageUrl;
//     }
//     // get banner image URL
//     let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
//     if (socialData.backgroundImage) {
//       const imageUrl = getImageUrlFromSocialImage(socialData.backgroundImage);
//       if (imageUrl) bannerImageUrl = imageUrl;
//     }
//     // description
//     let description = socialData.description || "";
//     // linktree
//     const linktree = socialData.linktree || {};
//     const twitter = linktree.twitter || "";
//     const telegram = linktree.telegram || "";
//     const github = linktree.github || "";
//     const website = linktree.website || "";
//     // update state
//     State.update({
//       name: socialData?.name || "",
//       description,
//       twitter,
//       telegram,
//       github,
//       website,
//       profileImageUrl,
//       bannerImageUrl,
//       socialDataFetched: true,
//       socialDataIsFetching: false,
//     });
//   }
// }, []);

// useEffect(() => {
//   if (context.accountId && !state.socialDataFetched && !state.socialDataIsFetching) {
//     State.update({ socialDataIsFetching: true });
//     Near.asyncView("social.near", "get", { keys: [`${context.accountId}/profile/**`] })
//       .then((socialData) => {
//         console.log("social data: ", socialData);
//         if (!socialData) return;
//         const profileData = socialData[context.accountId].profile;
//         if (!profileData) return;
//         console.log("profile data: ", profileData);
//         // construct array of promises
//         const promises = [];
//         // get profile image URL
//         let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
//         if (profileData.image) {
//           const profileImage = profileData.image;
//           if (profileImage.url) {
//             profileImageUrl = profileImage.url;
//           } else if (profileImage.ipfs_cid) {
//             profileImageUrl = IPFS_BASE_URL + profileImage.ipfs_cid;
//           } else {
//             // get media from NFT if present
//             if (profileImage.nft) {
//               const { contractId, tokenId } = profileImage.nft;
//               promises.push(Near.asyncView(contractId, "nft_metadata", {}));
//               promises.push(Near.asyncView(contractId, "nft_token", { token_id: tokenId }));
//             }
//           }
//         }
//         // get banner image URL
//         let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
//         if (profileData.backgroundImage) {
//           const backgroundImage = profileData.backgroundImage;
//           if (backgroundImage.url) {
//             bannerImageUrl = backgroundImage.url;
//           } else if (backgroundImage.ipfs_cid) {
//             bannerImageUrl = IPFS_BASE_URL + backgroundImage.ipfs_cid;
//           } else {
//             // get media from NFT if present
//             if (backgroundImage.nft) {
//               const { contractId, tokenId } = backgroundImage.nft;
//               promises.push(Near.asyncView(contractId, "nft_metadata", {}));
//               promises.push(Near.asyncView(contractId, "nft_token", { token_id: tokenId }));
//             }
//           }
//         }
//         console.log("promises: ", promises);
//         // wait for promises to resolve
//         Promise.all(promises)
//           .then((results) => {
//             console.log("results: ", results);
//           })
//           .catch((e) => {
//             console.log("error resolving a promise: ", e);
//           });
//         //   // description
//         //   let description = socialData.description || "";
//         //   // linktree
//         //   const linktree = socialData.linktree || {};
//         //   const twitter = linktree.twitter || "";
//         //   const telegram = linktree.telegram || "";
//         //   const github = linktree.github || "";
//         //   const website = linktree.website || "";
//         //   // update state
//         //   State.update({
//         //     name: socialData?.name || "",
//         //     description,
//         //     twitter,
//         //     telegram,
//         //     github,
//         //     website,
//         //     profileImageUrl,
//         //     bannerImageUrl,
//         //     socialDataFetched: true,
//         //     socialDataIsFetching: false,
//         //   });
//       })
//       .catch((e) => {
//         console.log("error getting near social data: ", e);
//       });
//   }
// }, []);

if (context.accountId && !state.socialDataFetched) {
  // State.update({ socialDataIsFetching: true });
  // const socialData = Social.get(`${context.accountId}/profile/**`);
  Near.asyncView("social.near", "get", { keys: [`${context.accountId}/profile/**`] })
    .then((socialData) => {
      console.log("social data: ", socialData);
      if (!socialData) return;
      const profileData = socialData[context.accountId].profile;
      if (!profileData) return;
      console.log("profile data: ", profileData);
      // get profile image URL
      let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
      if (profileData.image) {
        const imageUrl = getImageUrlFromSocialImage(profileData.image);
        if (imageUrl) profileImageUrl = imageUrl;
      }
      // get banner image URL
      let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
      if (profileData.backgroundImage) {
        const imageUrl = getImageUrlFromSocialImage(profileData.backgroundImage);
        if (imageUrl) bannerImageUrl = imageUrl;
      }
      // description
      let description = profileData.description || "";
      // linktree
      const linktree = profileData.linktree || {};
      const twitter = linktree.twitter || "";
      const telegram = linktree.telegram || "";
      const github = linktree.github || "";
      const website = linktree.website || "";
      // update state
      State.update({
        name: profileData?.name || "",
        description,
        twitter,
        telegram,
        github,
        website,
        profileImageUrl,
        bannerImageUrl,
        socialDataFetched: true,
        // socialDataIsFetching: false,
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
        },
      },
    },
  };
  const registerArgs = { name: state.name, team_members: [] };
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
  ];
  const res = Near.call(transactions);
};

if (!state.socialDataFetched) return <></>;

console.log("state: ", state);

const registeredProject = state.registeredProjects?.find(
  (project) => project.id == context.accountId && project.status == "Approved"
);

return (
  <Container>
    {registeredProject ? (
      <>
        <h1>You've successfully registered!</h1>
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
      </>
    ) : (
      <>
        <Banner>
          <BannerImage src={state.bannerImageUrl} alt="banner" />
          <ProfileImage src={state.profileImageUrl} alt="profile" />
        </Banner>
        <FormBody>
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
              <div style={{ marginBottom: "24px" }} />

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
              <div style={{ marginBottom: "24px" }} />

              <Widget
                src={`${ownerId}/widget/Inputs.Select`}
                props={{
                  label: "Select category *",
                  noLabel: false,
                  placeholder: "Choose category",
                  options: [
                    // Social Impact, NonProfit, Climate, Public Good
                    { text: "Social Impact", value: "nft" },
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
              <div style={{ marginBottom: "24px" }} />
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
              <div style={{ marginBottom: "24px" }} />
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
              <div style={{ marginBottom: "24px" }} />
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
              <div style={{ marginBottom: "24px" }} />
            </FormSectionRightDiv>
          </FormSectionContainer>
        </FormBody>
      </>
    )}
  </Container>
);
