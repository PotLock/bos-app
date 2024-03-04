const { id, review_notes, status, totalAmount } = props;
const { getTagsFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTagsFromSocialProfileData: () => [],
};
const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";
const cardData = Social.getr(`${id}/profile`);

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getDonationsForRecipient: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const donationsForProject = DonateSDK.getDonationsForRecipient(id);

const Card = styled.a`
  display: flex;
  flex-direction: column;
  width: 408px;
  border-radius: 2px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #292929;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 340px;
  }
  min-height: 429px;
  margin-left: auto;
  margin-right: auto;
  height: max-content;
  overflow: hidden;
`;

const CardBody = styled.div`
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const CardImage = styled.img`
  height: 150px;
  min-height: 150px;
  width: 100%;
  object-fit: cover;
`;

const CardTitle = styled.div`
  color: #292929;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardDescription = styled.div`
  color: #292929;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  flex-grow: 1;
`;

const CardTag = styled.div`
  color: #292929;
  width: max-content;
  white-space: nowrap;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px -1px 0px 0px #c7c7c7 inset, 0px 0px 0px 0.5px #c7c7c7;
  border: 1px solid #c7c7c7;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const CardTagContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardAvatar = styled.img`
  position: absolute;
  top: -20px;
  left: 24px;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: 3px solid #fff;
`;

const CardFooter = styled.div`
  border-top: 1px solid #000;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalDonate = styled.div`
  color: #292929;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const DonationButton = styled.button`
  padding: 12px 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  background: #fef6ee;
  border-radius: 6px;
  border: none;
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  &:hover {
    background: #dd3345;
    color: #fff;
  }
`;

const AddToCartButton = styled.button`
  border: none;
  background: none;
  color: #dd3345;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  padding: 12px 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const getCategory = (category) => {
  switch (category) {
    case "social-impact":
      return "Social Impact";
    case "non-profit":
      return "Non Profit";
    case "climate":
      return "Climate";
    case "public-good":
      return "Public Good";
    case "de-sci":
      return "Desci";
    case "open-source":
      return "Open Source";
    case "community":
      return "Community";
    case "education":
      return "Education";
  }
};

const projectUrl = props.hrefWithParams(`?tab=project&projectId=${id}`);

const tags = getTagsFromSocialProfileData(cardData);

return (
  <>
    <Card href={projectUrl}>
      <CardImage
        src={
          cardData && cardData?.backgroundImage && cardData?.backgroundImage?.ipfs_cid
            ? `${IPFS_BASE_URL}${cardData.backgroundImage.ipfs_cid}`
            : "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
        }
        alt="background"
      />
      <CardBody>
        <CardAvatar
          src={
            cardData && cardData?.image && cardData?.image?.ipfs_cid
              ? `${IPFS_BASE_URL}${cardData.image.ipfs_cid}`
              : "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
          }
          alt="avatar"
        />
        <CardTitle>{cardData?.name}</CardTitle>
        <CardDescription>
          {cardData && cardData?.description.length > 60
            ? cardData.description.slice(0, 70) + "..."
            : cardData.description}
        </CardDescription>
        <CardTagContainer>
          {tags.map((tag) => (
            <CardTag key={tag}>{tag}</CardTag>
          ))}
        </CardTagContainer>
      </CardBody>
      <CardFooter>
        <TotalDonate>
          ${totalAmount(donationsForProject)} <span style={{ fontWeight: 400 }}>Raised</span>
        </TotalDonate>
        <ButtonGroup>
          <AddToCartButton
            onClick={(e) => {
              e.preventDefault();
              if (existsInCart) {
                props.removeProjectsFromCart([props.id]);
              } else {
                props.addProjectsToCart([
                  {
                    id: props.id,
                    amount: "1",
                    ft: "NEAR",
                    referrerId: props.referrerId,
                  },
                ]);
                if (props.showModal) {
                  props.setIsCartModalOpen(true);
                }
              }
            }}
          >
            Add to cart
          </AddToCartButton>
          <DonationButton
            onClick={(e) => {
              e.preventDefault();
              props.openDonateToProjectModal(props.id);
            }}
          >
            Donate
          </DonationButton>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </>
);
