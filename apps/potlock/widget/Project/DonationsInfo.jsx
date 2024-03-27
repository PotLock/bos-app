const { accountId, projectId, donations } = props;

const { ownerId, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
};

const { nearToUsd, nearToUsdWithFallback } = VM.require("potlock.near/widget/utils") || {
  nearToUsd: 1,
  nearToUsdWithFallback: () => "",
};

const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);
const [successfulDonation, setSuccessfulDonation] = useState(false);

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getDonationsForRecipient: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  border-radius: 10px;
  border: 1px solid #f4b37d;
  border-bottom-width: 3px;
  background: #fef6ee;
  margin-left: auto;
  .donations-info {
    display: flex;
    gap: 4px;
    flex-direction: column;
    .amount {
      font-weight: 500;
      font-size: 2.5rem;
      line-height: 1;
      font-family: "Lora";
    }
    .donors {
      font-size: 14px;
      span {
        font-weight: 600;
      }
    }
  }
  .btn-wrapper {
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    > div,
    button {
      padding: 10px 0;
      width: 160px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    .donations-info .amount {
      font-size: 2rem;
    }
    .btn-wrapper {
      > div,
      button {
        width: 100%;
      }
    }
  }
`;

const donationsForProject = DonateSDK.getDonationsForRecipient(props.projectId);

// Get total donations & Unique donors count
const [totalDonationAmountNear, uniqueDonors] = useMemo(() => {
  let totalNear = Big(0);
  const uniqueDonors = [...new Set(donations.map((donation) => donation.donor_id))];
  donations.forEach((donation) => {
    if (donation.ft_id === "near" || donation.base_currency === "near") {
      totalNear = totalNear.plus(Big(donation.total_amount || donation.amount));
    }
  });
  const totalDonationAmountNear = SUPPORTED_FTS["NEAR"].fromIndivisible(totalNear.toString());

  return [totalDonationAmountNear, uniqueDonors?.length];
}, [donations]);

return (
  <Container>
    <div className="donations-info">
      <div className="amount">{nearToUsdWithFallback(totalDonationAmountNear)}</div>
      <div className="donors">
        Raised from <span> {uniqueDonors}</span> donor{uniqueDonors === 1 ? "" : "s"}
      </div>
    </div>
    <div className="btn-wrapper">
      <Widget
        src={`${ownerId}/widget/Components.Button`}
        props={{
          type: "primary",
          text: "Donate",
          onClick: () => setIsModalDonationOpen(true),
        }}
      />
      <Widget src={`${ownerId}/widget/Project.FollowButton`} props={{ accountId: projectId }} />
    </div>

    <Widget
      src={`${ownerId}/widget/Project.ModalDonation`}
      props={{
        ...props,
        isModalOpen: isModalDonationOpen,
        onClose: () => setIsModalDonationOpen(false),
        recipientId: props.projectId,
        referrerId: props.referrerId,
        openDonateToProjectModal: () => setIsModalDonationOpen(true),
        openDonationModalSuccess: (donation) => {
          setIsModalDonationOpen(false);
          State.update({
            successfulDonation: donation,
          });
        },
        // potId: state.donateToProjectModal.potId, // TODO: add this in if project is in a pot?
      }}
    />
    {successfulDonation && (
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
  </Container>
);
