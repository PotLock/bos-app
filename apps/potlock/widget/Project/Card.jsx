const { potId, potDetail } = props;
const { ipfsUrlFromCid } = VM.require("potlock.near/widget/utils") || { ipfsUrlFromCid: () => "" };
const { ownerId, NADA_BOT_URL } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADA_BOT_URL: "",
};
const { getTagsFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTagsFromSocialProfileData: () => [],
};
const donationContractId = "donate.potlock.near";
// console.log("props in Card: ", props);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  margin-left: auto;
  margin-right: auto;
  // height: 500px;
  pointer-events: auto;
`;

const HeaderContainer = styled.a`
  padding-left: 16px;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const backgroundStyleHeightPx = 168;

const BackgroundImageContainer = styled.div`
  svg {
    position: absolute;
    top: ${backgroundStyleHeightPx / 2}px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0; // Start with the image invisible
    transition: opacity 0.3s;
    z-index: 2; // Ensure the image is on top
    pointer-events: none;
  }
`;

const ProfileImageContainer = styled.div`
  transform: translateY(138px);
  width: 40px;
  height: 40px;
  position: absolute;

  img {
    width: 40px;
    height: 40px;
  }

  &:hover {
    cursor: pointer;

    &:after {
      background-color: rgba(45.9, 45.9, 45.9, 0.4); // Dark overlay with 40% opacity on hover
    }

    svg {
      opacity: 1; // Make the image visible on hover
    }
  }
`;

const Info = styled.a`
  display: flex;
  flex-direction: column;
  margin-top: 176px;
  padding: 16px 24px;
  gap: 16px;
  flex: 1;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2e2e2e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
  word-wrap: break-word;
`;

const DonationsInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  border-top: 1px #f0f0f0 solid;
`;

const DonationsInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const DonationButton = styled.button`
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

const Amount = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #292929;
  line-height: 24px;
`;

const AmountDescriptor = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #525252;
  word-wrap: break-word;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 1.1px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
  color: #2e2e2e;
`;

State.init({
  donateModal: {
    isOpen: false,
    recipientId: null,
    referrerId: null,
    potId: null,
    potDetail: null,
    successfulDonation: null,
  },
});

const openDonateModal = () => {
  State.update({
    donateModal: {
      isOpen: true,
      recipientId: projectId,
      referrerId: null,
      potId: null,
      potDetail: null,
      successfulDonation: null,
    },
  });
};

const projectId = props.project.id || props.projectId;
const profile = Social.getr(`${projectId}/profile`);

if (!profile) return "";

const MAX_DESCRIPTION_LENGTH = 80;

const { name, description, plCategories } = profile;
// const name = profile?.name || "No name";
// const description = profile?.description || "No description";
// const category = profile?.category || "No category";

const donationsForProject =
  Near.view(
    potId || donationContractId,
    potId ? "get_donations_for_project" : "get_donations_for_recipient",
    potId ? { project_id: projectId } : { recipient_id: projectId }
  ) || [];

// console.log(donationsForProject);

const [totalAmount, totalDonors] = useMemo(() => {
  if (!donationsForProject) return [null, null];
  const donors = [];
  let totalDonationAmount = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    totalDonationAmount = totalDonationAmount.plus(new Big(donation.total_amount));
  }
  return [
    props.nearToUsd
      ? (props.nearToUsd * totalDonationAmount.div(1e24).toNumber()).toFixed(2)
      : totalDonationAmount.div(1e24).toNumber().toFixed(2),
    donors.length,
  ];
}, [donationsForProject]);

const projectUrl = props.hrefWithParams(`?tab=project&projectId=${projectId}`);

const getImageSrc = (image) => {
  const defaultImageUrl =
    "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
  if (!image) return defaultImageUrl;
  const { url, ipfs_cid } = image;
  if (ipfs_cid) {
    return ipfsUrlFromCid(ipfs_cid);
  } else if (url) {
    return url;
  }
  return defaultImageUrl;
};

const backgroundImageStyle = {
  objectFit: "cover",
  left: 0,
  top: 0,
  height: "168px",
  borderRadius: "6px 6px 0px 0px",
  pointerEvents: "none",
};

const profileImageStyle = {
  width: "40px",
  height: "40px",
  position: "absolute",
  bottom: "-10px",
  left: "14px",
  pointerEvents: "none",
};

const tags = getTagsFromSocialProfileData(profile);

return (
  <Card key={projectId}>
    <HeaderContainer href={projectUrl} className="pt-0 position-relative">
      <BackgroundImageContainer>
        {profile.backgroundImage?.nft ? (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.backgroundImage,
              alt: "background",
              className: "position-absolute w-100",
              style: backgroundImageStyle,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
            }}
          />
        ) : (
          <img
            className="position-absolute w-100"
            style={backgroundImageStyle}
            src={getImageSrc(profile.backgroundImage)}
            alt="background"
          />
        )}
      </BackgroundImageContainer>
      <ProfileImageContainer
        class="profile-picture d-inline-block"
        // profileImageTranslateYPx={props.profileImageTranslateYPx}
        // profileImageTranslateYPxMobile={props.profileImageTranslateYPxMobile}
      >
        {profile.image?.nft ? (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.image,
              alt: "avatar",
              className: "rounded-circle w-100 img-thumbnail d-block",
              style: profileImageStyle,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
            }}
          />
        ) : (
          <img
            className="rounded-circle w-100 img-thumbnail d-block"
            style={profileImageStyle}
            src={getImageSrc(profile.image)}
            alt="avatar"
          />
        )}
      </ProfileImageContainer>
    </HeaderContainer>
    <Info href={projectUrl}>
      <Title>{name}</Title>
      <SubTitle>
        {description.length > MAX_DESCRIPTION_LENGTH
          ? description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          : description}
      </SubTitle>
      {!tags.length ? (
        "No tags"
      ) : (
        <Tags>
          {tags.map((tag, tagIndex) => (
            <Tag key={tagIndex}>{tag}</Tag>
          ))}
        </Tags>
      )}
    </Info>
    <DonationsInfoContainer>
      <DonationsInfoItem>
        <Amount>{props.nearToUsd ? `$${totalAmount}` : `${totalAmount} N`}</Amount>
        <AmountDescriptor>Raised</AmountDescriptor>
      </DonationsInfoItem>
      {props.allowDonate && (
        <DonationButton
          onClick={(e) => {
            e.preventDefault();
            openDonateModal();
          }}
          disabled={!context.accountId}
        >
          {context.accountId ? "Donate" : "Sign in to donate"}
        </DonationButton>
      )}
      {/* <Widget
        src={`${ownerId}/widget/Components.Button`}
        props={{
          type: "secondary",
          text: "Donate",
          onClick: () => {
            props.openDonateToProjectModal(projectId);
          },
        }}
      /> */}
      {/* <DonationsInfoItem>
        <Title>{totalDonors || totalDonors === 0 ? totalDonors : "-"}</Title>
        <SubTitle>{totalDonors === 1 ? "Donor" : "Donors"}</SubTitle>
      </DonationsInfoItem> */}
    </DonationsInfoContainer>
    {/* {props.allowDonate && (
      <Widget
        src={`${ownerId}/widget/Cart.AddToCart`}
        props={{
          ...props,
          projectId,
          style: {
            borderRadius: "0px 0px 6px 6px",
            boxShadow: "0px",
            border: "0px",
          },
          stopPropagation: true,
          showModal: false,
        }}
      />
    )} */}
    {props.requireVerification && (
      <Widget
        src={`${ownerId}/widget/Pots.ButtonVerifyToDonate`}
        props={{
          ...props,
          style: {
            borderRadius: "0px 0px 6px 6px",
            boxShadow: "0px",
            border: "0px",
          },
          href: NADA_BOT_URL,
        }}
      />
    )}
    {state.donateModal.isOpen && (
      <Widget
        src={`${ownerId}/widget/Project.ModalDonation`}
        loading={""}
        props={{
          ...props,
          isModalOpen: state.donateModal.isOpen,
          onClose: () =>
            State.update({
              donateModal: {
                isOpen: false,
                recipientId: null,
                referrerId: null,
                potId: null,
                potDetail: null,
              },
            }),
          openDonationModalSuccess: (donation) => {
            State.update({
              donateModal: {
                isOpen: false,
                recipientId: null,
                referrerId: null,
                potId: null,
                potDetail: null,
              },
              successfulDonation: donation,
            });
          },
          recipientId: state.donateModal.recipientId,
          referrerId: props.referrerId,
          potId,
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
  </Card>
);
