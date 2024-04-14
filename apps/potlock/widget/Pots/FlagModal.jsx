const BannerBg = (props) => (
  <svg {...props} viewBox="0 0 145 152" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="157.654"
      y="-37"
      width="20"
      height="161.118"
      rx="10"
      transform="rotate(45 157.654 -37)"
      fill="white"
      fill-opacity="0.08"
    />
    <rect
      x="189.654"
      y="-37"
      width="20"
      height="245.972"
      rx="10"
      transform="rotate(45 189.654 -37)"
      fill="white"
      fill-opacity="0.08"
    />
    <rect
      x="221.654"
      y="-37"
      width="20"
      height="164.654"
      rx="10"
      transform="rotate(45 221.654 -37)"
      fill="white"
      fill-opacity="0.08"
    />
    <rect
      x="125.654"
      y="-37"
      width="20"
      height="177.702"
      rx="10"
      transform="rotate(45 125.654 -37)"
      fill="white"
      fill-opacity="0.08"
    />
    <rect
      x="93.6543"
      y="-37"
      width="20"
      height="78.4889"
      rx="10"
      transform="rotate(45 93.6543 -37)"
      fill="white"
      fill-opacity="0.08"
    />
  </svg>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0px 0px 0px 1px rgba(41, 41, 41, 0.1), 0px 8px 12px -4px rgba(41, 41, 41, 0.1),
    0px 20px 32px -10px rgba(41, 41, 41, 0.1), 0px 32px 44px -16px rgba(41, 41, 41, 0.1);
  overflow: hidden;
  border-radius: 6px;
`;

const Banner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 0.5rem;
  overflow: hidden;
  background: #dd3345;
  color: white;
  font-size: 22px;
  .left-pattern {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    transform: translate(-10%, -10%) scaleX(-1);
    pointer-events: none;
  }
  .right-pattern {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    transform: translate(10%, -10%);
    pointer-events: none;
  }
  @media only screen and (max-width: 480px) {
    padding: 1.125rem;
  }
`;
const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 14px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }
  .close-icon {
    margin-left: auto;
    &:hover {
      rotate: 90deg;
    }
  }
  div {
    cursor: pointer;
    display: flex;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
  @media only screen and (max-width: 480px) {
    padding: 1.125rem;
  }
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Limit = styled.div`
  color: #7b7b7b;
  text-align: right;
`;
const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ebebeb;
  background: #f6f5f3;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
  button {
    font-weight: 500;
  }
  .cancel {
    border: none;
    background: none;
    color: #dd3345;
  }
`;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};
const MAX_REASON_LENGTH = 250;
const SOCIAL_CONTRACT_ID = "social.near";
const accountId = context.accountId;

const [reason, setReason] = useState("");
const [reasonErr, setReasonErr] = useState("");

const { onClose, flagAddress, potId, setSuccessFlag } = props;

const onCancel = () => {
  onClose();
  setReason("");
};

const fetchSocialProfile = () => {
  return Near.asyncView(SOCIAL_CONTRACT_ID, "get", { keys: [`${accountId}/profile/**`] });
};

const handleSuccess = () => {
  const flsgSuccess = setInterval(() => {
    fetchSocialProfile().then((profileData) => {
      const profile = profileData[accountId].profile;

      const pLBlacklistedAccounts = JSON.parse(profile.pLBlacklistedAccounts || "{}");
      const potFlaggedAcc = pLBlacklistedAccounts[potId] || {};

      if (potFlaggedAcc[flagAddress]) {
        setSuccessFlag({
          account: flagAddress,
          reason,
        });
        onCancel();
        clearInterval(flsgSuccess);
      }
    });
  }, 1000);

  // Clear the interval after 30 seconds
  setTimeout(() => {
    onCancel();
    clearInterval(flsgSuccess);
  }, 60000);
};

const handleFlag = () => {
  fetchSocialProfile().then((profileData) => {
    const profile = profileData[accountId].profile;

    const pLBlacklistedAccounts = JSON.parse(profile.pLBlacklistedAccounts || "{}");
    const potFlaggedAcc = pLBlacklistedAccounts[potId] || {};
    const socialArgs = {
      data: {
        [accountId]: {
          profile: {
            pLBlacklistedAccounts: JSON.stringify({
              ...pLBlacklistedAccounts,
              [potId]: {
                ...potFlaggedAcc,
                [flagAddress]: reason,
              },
            }),
          },
        },
      },
    };

    const socialTransaction = {
      contractName: SOCIAL_CONTRACT_ID,
      methodName: "set",
      args: socialArgs,
    };

    Near.asyncView(SOCIAL_CONTRACT_ID, "get_account", {
      account_id: accountId,
    }).then((account) => {
      let depositFloat = JSON.stringify(socialArgs).length * 0.00015;
      if (!account) {
        depositFloat += 0.1;
      }
      socialTransaction.deposit = Big(depositFloat).mul(Big(10).pow(24));
      Near.call(socialTransaction);
      handleSuccess();
    });
  });
};

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      onCancel: (e) => {
        e.stopPropagation();
      },
      contentStyle: {
        padding: "0px",
      },
      children: (
        <Container>
          <div>
            <Banner>
              <BannerBg className="left-pattern" />
              <BannerBg className="right-pattern" />
              <HeaderIcons>
                <svg
                  onClick={() => onCancel()}
                  className="close-icon"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                    fill="#FCCFCF"
                  />
                </svg>
              </HeaderIcons>
              Flag {flagAddress}
            </Banner>
          </div>
          <Content>
            <div>
              <Widget
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  label: "Reason",
                  inputRows: 4,
                  inputStyle: {
                    background: "#FAFAFA",
                  },
                  placeholder: `Type description`,
                  value: reason,
                  onChange: (reason) => setReason(reason),
                  validate: () => {
                    if (reason.length > MAX_REASON_LENGTH) {
                      setReasonErr(`Reason must be less than ${MAX_REASON_LENGTH} characters`);
                      return;
                    }
                    setReasonErr("");
                  },
                  error: reasonErr,
                }}
              />
              <Limit>
                {reason.length}/{MAX_REASON_LENGTH}
              </Limit>
            </div>

            <InfoCard>
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                    fill="#7B7B7B"
                  />
                </svg>
              </div>
              <div>
                Flagging this account will remove their donations when calculating payouts for this
                pot
              </div>
            </InfoCard>
            <ButtonsWrapper>
              <button className="cancel" onClick={onCancel}>
                Cancel
              </button>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: "Confirm",
                  disabled: !reason || reasonErr,
                  onClick: handleFlag,
                }}
              />
            </ButtonsWrapper>
          </Content>
        </Container>
      ),
    }}
  />
);
