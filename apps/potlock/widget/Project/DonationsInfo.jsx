const { accountId, projectId } = props;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
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

let RegistrySDK =
  VM.require("potlock.near/widget/SDK.registry") ||
  (() => ({
    isProjectApproved: () => {},
  }));
RegistrySDK = RegistrySDK({ env: props.env });

const projectIsApproved = RegistrySDK.isProjectApproved(projectId);

const loraCss = fetch("https://fonts.cdnfonts.com/css/lora").body;

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
  ${loraCss}
  .donations-info {
    display: flex;
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
    .btn-wrapper {
      > div,
      button {
        width: 100%;
      }
    }
  }
`;

const donationsForProject = DonateSDK.getDonationsForRecipient(props.projectId);

const [totalDonations, totalDonors, totalReferralFees] = useMemo(() => {
  if (!donationsForProject) {
    return ["", ""];
  }
  const donors = [];
  let totalDonationAmount = new Big(0);
  let totalReferralFees = new Big(0);
  for (const donation of donationsForProject) {
    if (!donors.includes(donation.donor_id)) {
      donors.push(donation.donor_id);
    }
    const totalAmount = new Big(donation.total_amount);
    const referralAmount = new Big(donation.referrer_fee || "0");
    const protocolAmount = new Big(donation.protocol_fee || "0");
    totalDonationAmount = totalDonationAmount.plus(
      totalAmount.minus(referralAmount).minus(protocolAmount)
    );
    totalReferralFees = totalReferralFees.plus(referralAmount);
  }
  return [
    totalDonationAmount.div(1e24).toNumber().toFixed(2),
    donors.length,
    totalReferralFees.div(1e24).toNumber().toFixed(2),
  ];
}, [donationsForProject]);

return (
  <Container>
    <div className="donations-info">
      <div className="amount">{nearToUsdWithFallback(totalDonations)}</div>
      <div className="donors">
        Raised from <span> {totalDonors}</span> Donor{totalDonors?.length === 1 ? "" : "s"}
      </div>
    </div>
    <div className="btn-wrapper">
      {projectIsApproved && (
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Donate",
            onClick: () => setIsModalDonationOpen(true),
          }}
        />
      )}
      <Widget src={`${ownerId}/widget/Project.FollowButton`} props={{ accountId: accountId }} />
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
