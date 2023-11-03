const ownerId = "potlock.near";
const donationContractId = "donation.tests.potlock.near"; // TODO: update to donate.potlock.near after testing

const Card = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30%;
  min-width: 320px;
  border-radius: 7px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

// const Banner = styled.div`
//   position: relative;
//   width: 100%;
//   height: 168;
//   margin-bottom: 30px;
// `;

// const BannerImage = styled.img`
//   width: 100%;
//   height: 100%;
//   //   border-radius: 6px;
// `;

// const ProfileImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   border: 3px solid white;
//   position: absolute;
//   bottom: -20px;
//   left: 60px;
// `;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  padding: 16px 24px;
  gap: 16px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2e2e2e;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
  word-wrap: break-word;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
  color: #2e2e2e;
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

const MAX_DESCRIPTION_LENGTH = 120;

const { id, bannerImageUrl, profileImageUrl, name, description, tags } = props.project;

const donationsForProject = Near.view(donationContractId, "get_donations_for_recipient", {
  recipient_id: id,
});

const [totalAmount, totalDonors] = useMemo(() => {
  if (!donationsForProject) {
    return ["-", "-"];
  }
  const donors = [];
  let totalDonationAmount = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    totalDonationAmount = totalDonationAmount.plus(new Big(donation.total_amount));
  }
  return [(props.nearToUsd * totalDonationAmount.div(1e24).toNumber()).toFixed(2), donors.length];
}, [donationsForProject]);

return (
  <Card href={`?tab=project&projectId=${id}`} key={id}>
    <Widget
      src={`${ownerId}/widget/Project.BannerHeader`}
      props={{
        ...props,
        projectId: id,
        profile,
        profileImageTranslateYPx: 168,
        containerStyle: {
          paddingLeft: "16px",
        },
        backgroundStyle: {
          objectFit: "cover",
          left: 0,
          top: 0,
          height: "168px",
          borderRadius: "6px 6px 0px 0px",
        },
        imageStyle: {
          width: "40px",
          height: "40px",
          position: "absolute",
          bottom: "-10px",
          left: "14px",
        },
      }}
    />
    <Info>
      <Title>{name}</Title>
      <SubTitle>
        {description.length > MAX_DESCRIPTION_LENGTH
          ? description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          : description}
      </SubTitle>
      <Widget
        src={`${ownerId}/widget/Project.Tags`}
        props={{
          ...props,
          tags,
        }}
      />
    </Info>
    <DonationsInfoContainer>
      <DonationsInfoItem>
        <Title>{totalDonors}</Title>
        <SubTitle>{totalDonors === 1 ? "Donor" : "Donors"}</SubTitle>
      </DonationsInfoItem>
      <DonationsInfoItem>
        <Title>${totalAmount}</Title>
        <SubTitle>Raised</SubTitle>
      </DonationsInfoItem>
    </DonationsInfoContainer>
  </Card>
);
