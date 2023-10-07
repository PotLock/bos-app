const ownerId = "potlock.near";

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Not logged inn!",
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
  font-size: 16;
  // font-family: Mona-Sans;
  font-weight: 400;
  word-wrap: break-word;
`;

// const FormSectionRightItem = style.div`
//   margin: 0 0 24px 0;
// `;

State.init({
  name: "",
  nameError: "",
  // accountId: "",
  // accountIdError: "",
  // verticals: [],
  // verticalsError: "",
  // productType: [],
  // productTypeError: "",
  category: null,
  categoryError: "",
  // dev: null,
  // devError: "",
  // tagline: "",
  // taglineError: "",
  description: "",
  descriptionError: "",
  // tags: [],
  // tagsError: "",
  website: "",
  websiteError: "",
  twitter: "",
  twitterError: "",
  telegram: "",
  telegramError: "",
  github: "",
  githubError: "",
  // geo: "",
  // geoError: "",
  // team: null,
  // teamError: "",
  // accountsWithPermissions: [],
  // accountsWithPermissionsIsFetched: false,
  // oss: null,
  // ossError: "",
});

const FormSectionLeft = (title, description, isRequired) => {
  return (
    <FormSectionLeftDiv>
      <FormSectionTitle>{title}</FormSectionTitle>
      <FormSectionDescription>{description}</FormSectionDescription>
      <FormSectionIsRequired style={{ color: isRequired ? "#DD5633" : "#7B7B7B" }}>
        {isRequired ? "Required" : "Optional"}
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

console.log("isCreateProjectDisabled: ", isCreateProjectDisabled);

return (
  <Container>
    <Banner>
      <BannerImage
        src="https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
        alt="banner"
      />
      <ProfileImage
        src="https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u"
        alt="profile"
      />
    </Banner>
    <FormBody>
      <FormDivider />
      <FormSectionContainer>
        {FormSectionLeft(
          "Project details",
          "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
          true
        )}
        {/* <FormSectionLeft
          title="Project details"
          description="Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat."
          isRequired={true}
        /> */}
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
                { text: "NFT", value: "nft" },
                { text: "DAO", value: "dao" },
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
        {/* <FormSectionLeft
          title="Project details"
          description="Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat."
          isRequired={true}
        /> */}
        <FormSectionRightDiv>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Twitter",
              placeholder: "Twitter handle",
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
              placeholder: "Telegram URL",
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
              placeholder: "GitHub username",
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
            src={`${ownerId}/widget/Buttons.Red`}
            props={{
              text: "Create new project",
              disabled: isCreateProjectDisabled,
            }}
          />
          <div style={{ marginBottom: "24px" }} />
        </FormSectionRightDiv>
      </FormSectionContainer>
    </FormBody>
  </Container>
);
