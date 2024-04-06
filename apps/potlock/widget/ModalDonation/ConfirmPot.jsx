const { ownerId, NADABOT_HUMAN_METHOD, DONATION_CONTRACT_ID } = VM.require(
  "potlock.near/widget/constants"
) || {
  ownerId: "",
  NADABOT_HUMAN_METHOD: "",
  DONATION_CONTRACT_ID: "",
};

const { nearToUsd } = VM.require("potlock.near/widget/utils");

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getConfig: () => {},
  asyncGetDonationsForDonor: () => {},
};
const { _address } = VM.require(`potlock.near/widget/Components.DonorsUtils`) || {
  _address: (address) => address,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
  @media only screen and (max-width: 480px) {
    padding: 1.5rem 1.125rem;
  }
`;

const ContentScrollable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: scroll;
  height: 450px;
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;
const Amout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  span {
    font-weight: 600;
  }
  div {
    font-weight: 600;
    font-size: 1rem;
  }
  .usd-amount {
    color: #7b7b7b;
  }
  .toggle-icon {
    width: 8px;
    display: flex;
    margin-left: auto;
    overflow: hidden;
    svg {
      width: 100%;
      transition: all 300ms ease-in-out;
    }
  }
  img,
  svg {
    width: 20px;
  }
`;

const SvgIcon = styled.svg`
  width: 16px;
`;

const FeesRemoval = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .check {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .label {
    margin-right: 4px;
    margin-left: 8px;
  }
  .address {
    font-weight: 600;
    gap: 4px;
    display: flex;
    align-items: center;
    color: #292929;
    transition: all 300ms;
    &:hover {
      color: #dd3345;
      text-decoration: none;
    }
  }
  .profile-image {
    width: 17px;
    height: 17px;
    display: flex !important;
  }
  @media only screen and (max-width: 480px) {
    .address {
      margin-left: 34px;
      width: 100%;
    }
  }
`;

const Button = styled.div`
  display: flex;
  margin-top: 4rem;
  margin-bottom: 0.5rem;
  button {
    padding: 12px 16px;
    width: 100%;
    font-weight: 500;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 2rem;
  }
`;

const Projects = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #ebebeb;
  background: rgba(235, 235, 235, 0.24);
  transition: all 300ms ease-in-out;
  &.hidden {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
  }
  .project {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    transition: 300ms ease-in-out;
  }
  .profile-image {
    width: 40px;
    height: 40px;
    box-shadow: 0px 0px 1px 0px #a6a6a6 inset;
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-weight: 600;
    }
    .address {
      color: #7b7b7b;
      transition: all 300ms;
      &:hover {
        text-decoration: none;
        color: #dd3345;
      }
    }
  }
`;

const ProjectAmount = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  div {
    font-weight: 600;
  }
  svg {
    width: 16px;
  }
`;

const NearIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_454_78)">
      <circle cx="8" cy="8" r="7.25" stroke="#292929" stroke-width="1.5" />
      <path
        d="M11.1477 4C10.851 4 10.5763 4.15333 10.421 4.406L8.74866 6.88867C8.72453 6.92441 8.71422 6.96772 8.71967 7.01051C8.72511 7.05329 8.74594 7.09264 8.77826 7.1212C8.81057 7.14976 8.85218 7.1656 8.89531 7.16574C8.93844 7.16589 8.98015 7.15034 9.01266 7.122L10.6587 5.69467C10.6683 5.68598 10.6802 5.68028 10.6931 5.67828C10.7059 5.67628 10.719 5.67806 10.7308 5.6834C10.7426 5.68875 10.7526 5.69742 10.7596 5.70836C10.7665 5.7193 10.7702 5.73203 10.77 5.745V10.215C10.77 10.2287 10.7658 10.2421 10.7579 10.2534C10.7501 10.2646 10.7389 10.2732 10.726 10.2778C10.7131 10.2825 10.6991 10.2831 10.6858 10.2795C10.6726 10.2758 10.6608 10.2682 10.652 10.2577L5.67667 4.30167C5.59667 4.20709 5.49701 4.1311 5.38463 4.079C5.27226 4.0269 5.14987 3.99994 5.026 4H4.85233C4.62628 4 4.40949 4.0898 4.24964 4.24964C4.0898 4.40949 4 4.62628 4 4.85233V11.1477C4 11.3333 4.06061 11.5139 4.17263 11.6619C4.28465 11.81 4.44194 11.9174 4.6206 11.9679C4.79926 12.0184 4.98952 12.0091 5.16245 11.9416C5.33538 11.874 5.48152 11.7519 5.57867 11.5937L7.251 9.111C7.27513 9.07525 7.28544 9.03194 7.27999 8.98916C7.27455 8.94637 7.25372 8.90703 7.22141 8.87846C7.18909 8.8499 7.14748 8.83407 7.10435 8.83392C7.06122 8.83377 7.01951 8.84932 6.987 8.87766L5.341 10.3053C5.33134 10.3139 5.31939 10.3195 5.3066 10.3215C5.29381 10.3234 5.28074 10.3216 5.26898 10.3162C5.25721 10.3108 5.24726 10.3021 5.24034 10.2912C5.23342 10.2803 5.22983 10.2676 5.23 10.2547V5.784C5.22997 5.77027 5.23418 5.75687 5.24206 5.74563C5.24993 5.73438 5.26109 5.72584 5.274 5.72117C5.28691 5.71651 5.30094 5.71594 5.31419 5.71955C5.32743 5.72315 5.33924 5.73076 5.348 5.74133L10.3227 11.698C10.4847 11.8893 10.7227 11.9997 10.9733 12H11.147C11.373 12.0001 11.5898 11.9104 11.7498 11.7507C11.9097 11.591 11.9997 11.3744 12 11.1483V4.85233C11.9999 4.62631 11.9101 4.40956 11.7503 4.24974C11.5904 4.08992 11.3737 4.00009 11.1477 4Z"
        fill="#292929"
      />
    </g>
    <defs>
      <clipPath id="clip0_454_78">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

const ProfileImg = ({ accountId, profile }) => (
  <Widget
    src={`${ownerId}/widget/Project.ProfileImage`}
    props={{
      accountId,
      profile,
      style: {},
    }}
  />
);

const CheckBox = ({ id, checked, onClick }) => (
  <Widget
    src={`${ownerId}/widget/Inputs.Checkbox`}
    props={{
      id,
      checked,
      onClick,
    }}
  />
);

const getFeesBasisPoints = (protocolConfig, potDetail) => {
  if (protocolConfig) {
    return [
      protocolConfig.account_id,
      protocolConfig.basis_points,
      potDetail.referral_fee_public_round_basis_points,
    ];
  } else {
    return ["", 0, 0];
  }
};

const pollForDonationSuccess = ({
  projectIds,
  afterTs,
  accountId,
  openDonationSuccessModal,
  potId,
}) => {
  // poll for updates
  const pollIntervalMs = 1000;
  // const totalPollTimeMs = 60000; // consider adding in to make sure interval doesn't run indefinitely
  const pollId = setInterval(() => {
    PotSDK.asyncGetDonationsForDonor(potId, accountId)
      .then((alldonations) => {
        const donations = {};
        for (const donation of alldonations) {
          const { project_id, donated_at_ms, donated_at } = donation;
          if (projectIds.includes(project_id) && (donated_at_ms || donated_at) > afterTs) {
            donations[project_id] = donation;
          }
        }
        if (Object.keys(donations).length === projectIds.length) {
          // display success message
          clearInterval(pollId);
          openDonationSuccessModal(donations);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, pollIntervalMs);
};

const ConfirmPot = (props) => {
  const {
    selectedDenomination,
    bypassProtocolFee,
    bypassChefFee,
    updateState,
    potDetail,
    potId,
    referrerId,
    accountId,
    amount,
    openDonationSuccessModal,
    selectedProjects,
    donationType,
    hrefWithParams,
    toggleAmount,
  } = props;

  const protocolConfigContractId = potDetail.protocol_config_provider.split(":")[0];
  const protocolConfigViewMethodName = potDetail.protocol_config_provider.split(":")[1];
  const protocolConfig =
    protocolConfigContractId && protocolConfigViewMethodName
      ? Near.view(protocolConfigContractId, protocolConfigViewMethodName, {})
      : null;

  const [protocolFeeRecipientAccount, protocolFeeBasisPoints, referralFeeBasisPoints] =
    getFeesBasisPoints(protocolConfig, potDetail);

  const chefFeeBasisPoints = potDetail?.chef_fee_basis_points;

  const donationAmountIndivisible = (num) =>
    Big(num).mul(new Big(10).pow(selectedDenomination.decimals));

  const projectAmount = parseFloat(amount) / Object.keys(selectedProjects).length;

  const autoProjectAmount = donationAmountIndivisible(projectAmount);

  const handleDonate = () => {
    const now = Date.now();

    const successArgs = {
      projectIds: Object.keys(selectedProjects),
      afterTs: now,
      accountId,
      openDonationSuccessModal,
      amount,
      potId,
    };

    const transactions = [];

    Object.keys(selectedProjects).forEach((project) => {
      let amount = 0;
      if (donationType === "auto") {
        amount = autoProjectAmount;
      } else {
        amount = donationAmountIndivisible(selectedProjects[project]);
      }

      if (amount) {
        transactions.push({
          contractName: potId,
          methodName: "donate",
          args: {
            referrer_id: referrerId,
            project_id: project,
            bypass_protocol_fee: bypassProtocolFee,
            ...(bypassChefFee ? { custom_chef_fee_basis_points: 0 } : {}),
          },
          deposit: amount.toFixed(0),
          gas: "300000000000000",
        });
      }
    });

    Near.call(transactions);

    pollForDonationSuccess(successArgs);
  };

  return (
    <Container>
      <ContentScrollable>
        <div>
          <Label>Total amount</Label>
          <Amout
            onClick={() =>
              updateState({
                toggleAmount: !toggleAmount,
              })
            }
          >
            <div>
              {selectedDenomination.icon ? <img src={selectedDenomination.icon} /> : <NearIcon />}
            </div>
            <div>
              {amount} <span>{selectedDenomination.text}</span>
            </div>
            {nearToUsd && <div className="usd-amount">~${(nearToUsd * amount).toFixed(2)}</div>}
            <div className="toggle-icon">
              <svg
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  rotate: !toggleAmount ? "" : "90deg",
                }}
              >
                <path
                  d="M1.70501 0L0.295013 1.41L4.87501 6L0.295013 10.59L1.70501 12L7.70501 6L1.70501 0Z"
                  fill="#7B7B7B"
                />
              </svg>
            </div>
          </Amout>
        </div>
        <Projects className={`${!toggleAmount ? "hidden" : ""}`}>
          {Object.keys(selectedProjects).map((project_id) => {
            const profile = Social.getr(`${project_id}/profile`);

            return selectedProjects[project_id] > 0 || donationType === "auto" ? (
              <div className={`project`} key={project_id}>
                <ProfileImg profile={profile} />
                <div className="info">
                  {profile?.name && <div className="name">{_address(profile?.name, 20)}</div>}
                  <a
                    className="address"
                    href={hrefWithParams(`?tab=project&projectId=${project_id}`)}
                    target="_blank"
                  >
                    {_address(project_id, 20)}
                  </a>
                </div>
                <ProjectAmount>
                  <div>
                    {" "}
                    {donationType === "auto"
                      ? projectAmount < 0.01
                        ? "<0.01"
                        : projectAmount.toFixed(2)
                      : selectedProjects[project_id]}{" "}
                  </div>
                  <NearIcon />
                </ProjectAmount>
              </div>
            ) : (
              ""
            );
          })}
        </Projects>
        <Widget
          src={`${ownerId}/widget/Cart.BreakdownSummary`}
          props={{
            ...props,
            referrerId,
            protocolFeeBasisPoints,
            referralFeeBasisPoints,
            bypassChefFee,
            chef: potDetail?.chef,
            chefFeeBasisPoints,
            totalAmount: amount,
            bypassProtocolFee: bypassProtocolFee,
            ftIcon: selectedDenomination.icon,
          }}
        />
        <FeesRemoval>
          <div className="check">
            <CheckBox
              id="bypassProtocolFeeSelector"
              checked={bypassProtocolFee}
              onClick={(e) => {
                updateState({ bypassProtocolFee: e.target.checked });
              }}
            />

            <div className="label">Remove {protocolFeeBasisPoints / 100 || "-"}% protocol fee</div>
            <a
              href={`https://near.social/mob.near/widget/ProfilePage?accountId=${protocolFeeRecipientAccount}`}
              className="address"
              target="_blank"
            >
              <ProfileImg accountId={protocolFeeRecipientAccount} />

              {protocolFeeRecipientAccount}
            </a>
          </div>
          {potDetail?.chef && chefFeeBasisPoints > 0 && (
            <div className="check">
              <CheckBox
                id="bypassChefFeeSelector"
                checked={bypassChefFee}
                onClick={(e) => {
                  updateState({ bypassChefFee: e.target.checked });
                }}
              />

              <div className="label"> Remove {chefFeeBasisPoints / 100 || "-"}% chef fee</div>
              <a
                href={`https://near.social/mob.near/widget/ProfilePage?accountId=${potDetail?.chef}`}
                className="address"
                target="_blank"
              >
                <ProfileImg accountId={potDetail?.chef} />

                {potDetail?.chef}
              </a>
            </div>
          )}
        </FeesRemoval>
      </ContentScrollable>
      <Button>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            text: "Confirm donation",
            onClick: handleDonate,
          }}
        />
      </Button>
    </Container>
  );
};

return {
  ConfirmPot,
};
