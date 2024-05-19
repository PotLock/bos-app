const { ownerId, NADABOT_HUMAN_METHOD } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADABOT_HUMAN_METHOD: "",
};

const { VerifyInfo } = VM.require(`potlock.near/widget/ModalDonation.Banners`) || {
  VerifyInfo: () => {},
  Alert: () => {},
};

const { nearToUsd } = VM.require("potlock.near/widget/utils");

const { Checks } = VM.require(`potlock.near/widget/ModalDonation.Checks`) || {
  Checks: () => {},
};

const { AmountInput } = VM.require(`potlock.near/widget/ModalDonation.AmountInput`) || {
  AmountInput: () => {},
};

const { _address } = VM.require(`potlock.near/widget/Components.DonorsUtils`) || {
  _address: (address) => address,
};

const { Alert } = VM.require(`potlock.near/widget/ModalDonation.Banners`) || {
  Alert: () => {},
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  @media only screen and (max-width: 480px) {
    padding: 0 1.125rem;
  }
`;
const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const CurrentBalance = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  .amount-alert {
    color: #e54141;
  }
  .balance {
    display: flex;
    gap: 0.5rem;
    div:last-of-type {
      color: #7b7b7b;
    }
  }
`;

const TotalAmount = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
  .label {
    color: #7b7b7b;
  }
  .amount {
    font-weight: 600;
    .usd {
      color: #7b7b7b;
    }
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Projects = styled.div`
  padding: 8px 0;
  border-top: 1px solid #ebebeb;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 238px;
  overflow-y: scroll;
  .project {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 0.5rem 2rem;
    transition: 300ms ease-in-out;
    &:hover,
    &.selected {
      background: rgba(235, 235, 235, 0.24);
      .check {
        border-color: #dd3345;
        svg {
          display: block;
        }
      }
    }
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
  .check {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid #c7c7c7;
    border-radius: 50%;
    svg {
      display: none;
      width: 12px;
    }
    &.selected {
      border-color: #dd3345;
      svg {
        display: block;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .project {
      padding: 0.5rem 1.125rem;
    }
  }
`;

const ProjectAmount = styled.div`
  margin-left: auto;
  position: relative;
  display: flex;
  border-radius: 6px;
  background: rgb(246, 245, 243);
  box-shadow: rgb(255, 255, 255) 0px 1px 0px 0px, rgba(41, 41, 41, 0.1) 0px 0px 4px 0px,
    rgba(41, 41, 41, 0.1) 0px 2px 4px -1px inset, rgba(41, 41, 41, 0.1) 0px 8px 16px -4px inset;
  input {
    padding: 10px 16px;
    padding-right: 46px;
    text-align: right;
    width: 120px;
    background: transparent;
    border: none;
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    width: 16px;
  }
`;

const Button = styled.div`
  display: flex;
  margin-top: 4rem;
  margin-bottom: 0.5rem;
  padding: 0 2rem;
  button {
    padding: 12px 16px;
    width: 100%;
    font-weight: 500;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 2rem;
  }
`;

const ProfileImg = ({ profile }) => (
  <Widget
    src={`${ownerId}/widget/Project.ProfileImage`}
    props={{
      profile,
      style: {},
    }}
  />
);

const donationTypes = [
  {
    label: "Auto",
    info: "(allocate funds evenly across multiple projects)",
    val: "auto",
    disabled: false,
  },
  {
    label: "Manual",
    info: "(manually specify amount for each project)",
    val: "manual",
    disabled: false,
  },
];

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const FormPot = (props) => {
  const {
    amount,
    amountError,
    DENOMINATION_OPTION,
    updateState,
    selectedDenomination,
    donationType,
    ftBalance,
    hrefWithParams,
    selectedProjects,
    NADABOT_CONTRACT_ID,
  } = props;

  const projects = props.projects ?? [];
  const projectHegiht = 58;
  const projectsContaienrHegiht = projects.length > 4 ? 234 : projectHegiht * projects.length;

  const HandleAmoutChange = (amount) => {
    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
    if (amount === ".") amount = "0.";
    updateState({ amount, amountError: "" });
    // error if amount is greater than balance
    if (amount > ftBalance) {
      updateState({ amountError: "You don’t have enough balance to complete this transaction." });
    } else if (parseFloat(amount) < 0.1) {
      updateState({ amountError: "Minimum donation is 0.1 NEAR" });
    }
  };

  const handleAddProject = (project) => {
    const updatedProjects = selectedProjects;
    if (selectedProjects[project] === "") {
      delete updatedProjects[project];
    } else {
      updatedProjects[project] = "";
    }

    updateState({
      selectedProjects: updatedProjects,
    });
  };

  const totalAmountAllocated = 0;
  Object.values(selectedProjects).forEach(
    (amount) => (totalAmountAllocated += parseFloat(amount || 0))
  );
  totalAmountAllocated = totalAmountAllocated.toFixed(1);

  const handleProjectAmount = (project, amount) => {
    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
    if (amount === ".") amount = "0.";

    const updatedProjects = selectedProjects;
    updatedProjects[project] = amount;

    const totalAmount = 0;
    Object.values(updatedProjects).forEach((amount) => (totalAmount += parseFloat(amount)));

    if (totalAmount > ftBalance && ftBalance !== null) {
      updateState({ amountError: "You don’t have enough balance to complete this transaction." });
    } else if (parseFloat(amount) < 0.1 && parseFloat(amount) !== 0) {
      updateState({ amountError: "Minimum donation is 0.1 NEAR" });
    } else {
      updateState({ amountError: "" });
    }

    updateState({
      selectedProjects: updatedProjects,
    });
  };

  const isUserHumanVerified = Near.view(NADABOT_CONTRACT_ID, NADABOT_HUMAN_METHOD, {
    account_id: accountId,
  });

  const needsToVerify = isUserHumanVerified === false;

  return (
    <Form>
      <Content>
        <Label>How do you want to allocate funds?</Label>
        <Checks
          options={donationTypes}
          value={donationType}
          onClick={(val) => {
            console.log("donationType", val);

            updateState({
              selectedProjects: {},
              donationType: val,
            });
          }}
        />
        {donationType === "auto" && (
          <>
            <Label
              style={{
                marginTop: "1.5rem",
              }}
            >
              Amount
            </Label>
            <AmountInput
              value={amount}
              donationType={donationType}
              HandleAmoutChange={HandleAmoutChange}
              updateState={updateState}
              denominationOptions={DENOMINATION_OPTION}
              selectedDenomination={selectedDenomination}
            />
          </>
        )}
        <CurrentBalance>
          {ftBalance && (
            <div className="balance">
              <div>
                {ftBalance} <span> {selectedDenomination.text} </span>
              </div>
              <div>available</div>
            </div>
          )}
          {donationType === "manual" && (
            <TotalAmount>
              <div className="label">Total amount allocated</div>
              <div className="amount">
                {totalAmountAllocated}

                <span>NEAR</span>

                {nearToUsd && (
                  <span className="usd">
                    ~$
                    {nearToUsd}
                  </span>
                )}
              </div>
            </TotalAmount>
          )}
        </CurrentBalance>
        {amountError && <Alert error={amountError} />}
        {needsToVerify && <VerifyInfo />}
      </Content>
      <Projects style={{ height: projectsContaienrHegiht + "px" }}>
        {projects.map(({ project_id }) => {
          const profile = Social.getr(`${project_id}/profile`);

          return (
            <div
              className={`project ${selectedProjects[project_id] === "" ? "selected" : ""}`}
              style={{
                cursor: donationType == "auto" ? "pointer" : "default",
              }}
              key={project_id}
              onClick={() => (donationType == "auto" ? handleAddProject(project_id) : {})}
            >
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
              {donationType === "manual" ? (
                <ProjectAmount>
                  <input
                    className="amount"
                    type="text"
                    placeholder="0.00"
                    onChange={(e) => handleProjectAmount(project_id, e.target.value)}
                  />
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  </svg>
                </ProjectAmount>
              ) : (
                <div className="check">
                  <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_468_92)">
                      <path d="M1 5.1618L4 8.16197L11.1621 1" stroke="#DD3345" stroke-width="2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_468_92">
                        <rect width="12" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </Projects>
      <Button>
        <Widget
          src={`${ownerId}/widget/Components.Button`}
          props={{
            type: "primary",
            disabled:
              isEmpty(selectedProjects) ||
              (donationType === "auto"
                ? amountError || parseFloat(amount) === 0 || !amount
                : totalAmountAllocated > ftBalance ||
                  amountError ||
                  parseFloat(totalAmountAllocated) === 0),
            text: "Proceed to donate",
            onClick: () => {
              if (donationType === "auto") updateState({ currentPage: "confirmPot" });
              else {
                updateState({ currentPage: "confirmPot", amount: totalAmountAllocated });
              }
            },
          }}
        />
      </Button>
    </Form>
  );
};

return {
  FormPot,
};
