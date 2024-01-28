const donationContractId = "donate.potlock.near";
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${0.8 + 50}px;
  padding-right: 32px;
  // padding-right: 500px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding-right: 8px;
  }
`;

const ModalContainer = styled.div`
  width: 500px;
  padding: 24px 0px;
  background: white;
  border-radius: 10px;
  box-shadow: 20px 20px 32px -4px rgba(93, 93, 93, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-height: 80vh;
  max-width: 90vw;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0px;
  padding-right: 20px;
  background: #fafafa;
  border-radius: 6px;
  justify-content: center;
  align-items: flex-start;
  gap: 173px;
  display: inline-flex;
`;

const CloseHeader = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CloseButton = styled.div`
  width: 14px;
  height: 14px;
  font-size: 25px;
  font-weight: 300;
  color: rgba(112, 107, 107, 0.8);
  cursor: pointer;
`;

const ModalHeaderText = styled.div`
  text-align: center;
  color: #292929;
  font-size: 20px;
  font-family: Mona Sans;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: inline-flex;
`;

const ContentMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-top: -5px;
`;

const ContentMediaImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 24px;
`;
const ContentMediaText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const TextDecMedia = styled.div`
  color: var(--Neutral-950, #292929);
  font-feature-settings: "ss01" on, "salt" on;

  /* Title/small/14px:semibold */
  font-family: "Mona Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
`;

const TextDesMedia = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: var(--Neutral-500, #7b7b7b);
  font-feature-settings: "ss01" on, "salt" on;
  text-overflow: ellipsis;

  /* Body/Medium/14px:regular */
  font-family: "Mona Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

const FormAmountHeader = styled.div`
  display: flex;
  align-items: baseline;
  align-self: stretch;
  margin-bottom: -20px;
`;

const LabelAmount = styled.label`
  color: var(--Neutral-950, #292929);
  font-feature-settings: "ss01" on, "salt" on;

  /* Label/Large/14px:Medium */
  font-family: "Mona Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
`;

const FormInputAmount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid var(--Neutral-200, #dbdbdb);
  border-radius: 6px;
`;

const CboxSelect = styled.select`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 25px;
  border: none;
  width: 100px;
  background: #fff;
  outline: none;
`;
const CboxSelectOption = styled.option`
  color: var(--Neutral-950, #292929);
  font-feature-settings: "salt" on;
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;
const FormInput = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  border-radius: 6px;
  border-left: 1px solid var(--Neutral-200, #dbdbdb);
  background: #fff;
  width: 100%;
  height: 100%;
  outline: none;
`;
const AmountInput = styled.input`
  flex: 1 0 0;
  color: var(--Neutral-500, #7b7b7b);
  text-align: left;
  font-feature-settings: "ss01" on, "salt" on, "liga" off;

  /* Label/Large/14px:regular */
  font-family: "Mona Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  border: none;
  padding: 5px 10px;
  width: 100%;
  outline: none;
`;

const SubTitleBalance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  margin-top: -10px;
`;

const LabelPrice = styled.label`
  color: var(--Neutral-500, #7b7b7b);
  text-align: right;
  font-feature-settings: "ss01" on, "salt" on;
  /* Label/Medium/11px:regular */
  font-family: "Mona Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 145.455% */
`;

const LabelBalance = styled.label`
  color: var(--Neutral-500, #7b7b7b);
  text-align: right;
  font-feature-settings: "ss01" on, "salt" on;

  /* Label/Medium/11px:regular */
  font-family: "Mona Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 145.455% */
`;

const BreakDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const BreakDownButton = styled.button`
  display: flex;
  padding: 10px 0px;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
  outline: none;
  background: none;
  border: none;
`;

const TextBreakDown = styled.div`
  color: var(--Neutral-950, #292929);
  text-align: right;
  font-feature-settings: "ss01" on, "salt" on;

  /* Label/Large/14px:Medium */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const IconBreakDown = styled.img`
  width: 18px;
  height: 18px;
`;

const ContentBreakDown = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--Neutral-100, #f0f0f0);
  background: var(--Colors-Grey-SystemWhite, #fff);
`;

const FormContentBreakDown = styled.div`
  display: flex;
  height: 22px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const TextFormBreakDown = styled.div`
  color: var(--Neutral-500, #7b7b7b);
  font-feature-settings: "ss01" on, "salt" on, "liga" off;

  /* Label/Large/14px:regular */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const AmountBreakDown = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
`;

const IconNearBreakDown = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  filter: grayscale(120%);
`;
const TextNote = styled.div`
  width: 100%;
  height: 1px;
  display: flex;
  border-top: 1px solid var(--Neutral-200, #dbdbdb);
  padding-top: 40px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;
const IconNear = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 28px;
  filter: grayscale(120%);
  margin-top: -5px;
`;
const ButtonNote = styled.button`
  color: var(--Neutral-950, #292929);
  font-feature-settings: "ss01" on, "salt" on;

  /* Label/Large/14px:Medium */
  font-family: "Mona Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  outline: none;
  background: none;
  border: none;
  margin-left: 10px;
`;

const FooterModal = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const DonateButton = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: var(--Primary-600, #dd3345);

  /* Button/main shadow */
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  outline: none;
  border: none;
  color: #fff;
  &:hover {
    background: #fef6ee;
    color: #000000;
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

State.init({
  isModalDonationOpen: false,
  isModalDonationSucessOpen: false,
});
const [amount, setAmount] = useState("");
const [isBreakDown, setIsBreakDown] = useState(true);

const MIN_REQUIRED_DONATION_AMOUNT_PER_PROJECT = 0.1;

const ModalDonate = ({ isOpen, onClose, children }) => {
  if (!isOpen) return "";
  return (
    <Modal onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Modal>
  );
};
const getBalance = () => {
  const res = fetch(`https://api.nearblocks.io/v1/account/${context.accountId}`);

  if (!(res && res.body)) return "...";

  const native_balance = res.body.account[0].amount / 1e24;
  const unspendable_balance = 0.05 + res.body.account[0].storage_usage / 1e5;
  const spendable_balance = native_balance - unspendable_balance;
  return spendable_balance.toFixed(4);
};

const getPriceUSD = () => {
  //https://api.nearblocks.io/v1/stats
  const res = fetch(`https://api.nearblocks.io/v1/stats`, { mode: "cors" });
  return res.body.stats[0].near_price;
};

const handleChangeBreakDown = () => {
  setIsBreakDown(() => !isBreakDown);
};

//console.log("modal donation", props);

const handleDonate = () => {
  props.setAmount(amount);
  props.setProjectId(props.projectId);
  const transactions = [];
  const amountFloat = parseFloat(amount);
  const amountIndivisible = new Big(amountFloat).mul(new Big(10).pow(24));
  const donateContractArgs = {};
  donateContractArgs.recipient_id = props.projectId;
  transactions.push({
    contractName: donationContractId,
    methodName: "donate",
    args: donateContractArgs,
    deposit: amountIndivisible.toString(),
  });
  Near.call(transactions);
};

//console.log("donation", props);
return (
  <>
    <ModalDonate
      isOpen={props.isModalDonationOpen ? props.isModalDonationOpen : state.isModalDonationOpen}
      onClose={
        props.onDonationClose
          ? props.onDonationClose
          : () => State.update({ isModalDonationOpen: false })
      }
    >
      <ModalHeader>
        <ModalHeaderText>Donate to project</ModalHeaderText>
        <CloseHeader>
          <CloseButton
            onClick={() => {
              state.isModalDonationOpen == true
                ? State.update({ isModalDonationOpen: false })
                : props.onClose();
            }}
          >
            X
          </CloseButton>
        </CloseHeader>
      </ModalHeader>
      <ModalBody>
        <ContentMedia>
          <ContentMediaImage
            src={
              "https://s3-alpha-sig.figma.com/img/2904/4a98/c665dea3b9c1a581bc3d2b1411ec025c?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyqVTGJVWiNxiw9HtmAFLN3zTBDPbsCvMP7q~JgM-EBCXkYCUj47hYdK~x-fMkAxZFxEFdVO3VZjUR7S6lCJxVUkhNu981Ldf1V3gVLqj2QGIv4g-e-cCRUoq2GFEnKApsWmbZFiwVnv0WLvbmqvVPgE9LCuu3BYP7EbwHq-Fnq8uzU1ol9a6R4wa3XkJd4SjTXtVRDEXWWPI0~5P40bSV~Ts986gq1228s8GT5C3IPJ2Ji56IE3UcKHSwXbKnMdHi2pn2M13EU89WQZv1yoGqMPpNAeEpcJ2GATzClZizV4dvBLt5GfdbCQ3ul0-edu4wx48vktvknnnSpFvrqOVw__"
            }
            alt={"logo"}
          />
          <ContentMediaText>
            <TextDecMedia>DecntralMedia</TextDecMedia>
            <TextDesMedia>
              Seamless infrastructure for hosting hybrid crypto events good registry and figure out
              who you supported after
            </TextDesMedia>
          </ContentMediaText>
        </ContentMedia>
        <FormAmountHeader>
          <LabelAmount>Amount</LabelAmount>
        </FormAmountHeader>
        <FormInputAmount>
          <CboxSelect>
            <CboxSelectOption>NEAR</CboxSelectOption>
          </CboxSelect>
          <FormInput>
            <AmountInput
              type={"number"}
              placeholder={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </FormInput>
        </FormInputAmount>
        <SubTitleBalance>
          <LabelPrice>1 NEAR = ${Number(getPriceUSD()).toFixed(2)}</LabelPrice>
          <LabelBalance>
            Account balance: {getBalance().toString()}
            <IconNear
              src={
                "https://s3-alpha-sig.figma.com/img/8cc9/7cfb/5a58fb149e537ae5ea03b9d97cd11c2a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQbfzhPe~lml8Lk-A27HSS2mhwQhpvaZL3-Nsoj7qtiKgQCX~galYPrQYHI59dSCLAjyomlBiGm0GJNI8~YwL43CVOqaptW0HHgliMo2fs0lmGpfBPEYWiPexu-NtpbdLwkAObem4CE2Wmjk4CysTx2f4mBVc43gcjvxiv2tuPcyVnjTZ7ByCe2qjQvs-D01YTmfP7n~nGtnVWCYqcHZ26pXq9FaN3Ssse6dNedBQWFMM~2UQej3p5dUXgqGDhfYxMABsjemVA1SrMJAFMYK1ZyE5k~MOnWtytWh~jgYvXXKUWSKRmP1aXMdHfBkVIAHoRI7rSnA7IhECie8lvUu6Q__"
              }
              alt={"Icon Near"}
            />
          </LabelBalance>
        </SubTitleBalance>
        <BreakDownContainer>
          <BreakDownButton onClick={handleChangeBreakDown}>
            <TextBreakDown>{!isBreakDown ? "Hide breakdown" : "Show breakdown"}</TextBreakDown>
            {isBreakDown ? (
              <IconBreakDown
                src={"https://cdn.icon-icons.com/icons2/1883/PNG/512/caretsymbol_120671.png"}
                alt={"icon breakdown"}
              />
            ) : (
              <IconBreakDown
                src={"https://cdn.icon-icons.com/icons2/1883/PNG/512/downarrow_120663.png"}
                alt={"icon breakdown"}
              />
            )}
          </BreakDownButton>
          {!isBreakDown && (
            <ContentBreakDown>
              <FormContentBreakDown>
                <TextFormBreakDown>Project allocation (95%)</TextFormBreakDown>
                <AmountBreakDown>
                  {amount <= 0.1 ? (amount * 0.95).toFixed(3) : (amount * 0.95).toFixed(2)}
                  <IconNearBreakDown
                    src={
                      "https://s3-alpha-sig.figma.com/img/8cc9/7cfb/5a58fb149e537ae5ea03b9d97cd11c2a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQbfzhPe~lml8Lk-A27HSS2mhwQhpvaZL3-Nsoj7qtiKgQCX~galYPrQYHI59dSCLAjyomlBiGm0GJNI8~YwL43CVOqaptW0HHgliMo2fs0lmGpfBPEYWiPexu-NtpbdLwkAObem4CE2Wmjk4CysTx2f4mBVc43gcjvxiv2tuPcyVnjTZ7ByCe2qjQvs-D01YTmfP7n~nGtnVWCYqcHZ26pXq9FaN3Ssse6dNedBQWFMM~2UQej3p5dUXgqGDhfYxMABsjemVA1SrMJAFMYK1ZyE5k~MOnWtytWh~jgYvXXKUWSKRmP1aXMdHfBkVIAHoRI7rSnA7IhECie8lvUu6Q__"
                    }
                    alt={"logo near amount"}
                  />
                </AmountBreakDown>
              </FormContentBreakDown>
              <FormContentBreakDown>
                <TextFormBreakDown>Protocol fees (5%)</TextFormBreakDown>
                <AmountBreakDown>
                  {amount <= 0.1 ? (amount * 0.05).toFixed(3) : (amount * 0.05).toFixed(2)}
                  <IconNearBreakDown
                    src={
                      "https://s3-alpha-sig.figma.com/img/8cc9/7cfb/5a58fb149e537ae5ea03b9d97cd11c2a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQbfzhPe~lml8Lk-A27HSS2mhwQhpvaZL3-Nsoj7qtiKgQCX~galYPrQYHI59dSCLAjyomlBiGm0GJNI8~YwL43CVOqaptW0HHgliMo2fs0lmGpfBPEYWiPexu-NtpbdLwkAObem4CE2Wmjk4CysTx2f4mBVc43gcjvxiv2tuPcyVnjTZ7ByCe2qjQvs-D01YTmfP7n~nGtnVWCYqcHZ26pXq9FaN3Ssse6dNedBQWFMM~2UQej3p5dUXgqGDhfYxMABsjemVA1SrMJAFMYK1ZyE5k~MOnWtytWh~jgYvXXKUWSKRmP1aXMdHfBkVIAHoRI7rSnA7IhECie8lvUu6Q__"
                    }
                    alt={"logo near amount"}
                  />
                </AmountBreakDown>
              </FormContentBreakDown>
              <FormContentBreakDown>
                <TextFormBreakDown>Referral fees (0%)</TextFormBreakDown>
                <AmountBreakDown>
                  0
                  <IconNearBreakDown
                    src={
                      "https://s3-alpha-sig.figma.com/img/8cc9/7cfb/5a58fb149e537ae5ea03b9d97cd11c2a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQbfzhPe~lml8Lk-A27HSS2mhwQhpvaZL3-Nsoj7qtiKgQCX~galYPrQYHI59dSCLAjyomlBiGm0GJNI8~YwL43CVOqaptW0HHgliMo2fs0lmGpfBPEYWiPexu-NtpbdLwkAObem4CE2Wmjk4CysTx2f4mBVc43gcjvxiv2tuPcyVnjTZ7ByCe2qjQvs-D01YTmfP7n~nGtnVWCYqcHZ26pXq9FaN3Ssse6dNedBQWFMM~2UQej3p5dUXgqGDhfYxMABsjemVA1SrMJAFMYK1ZyE5k~MOnWtytWh~jgYvXXKUWSKRmP1aXMdHfBkVIAHoRI7rSnA7IhECie8lvUu6Q__"
                    }
                    alt={"logo near amount"}
                  />
                </AmountBreakDown>
              </FormContentBreakDown>
            </ContentBreakDown>
          )}
        </BreakDownContainer>
        <TextNote>
          <ButtonNote>
            <Icon
              src={
                "https://as2.ftcdn.net/v2/jpg/03/85/70/05/1000_F_385700599_zHy52k8yhKZcD3VHpkWJI1P6bSMahlnW.jpg"
              }
              alt={"icon"}
            />
            Add Note
          </ButtonNote>
        </TextNote>
        <FooterModal>
          <AddToCartButton
            onClick={(e) => {
              e.preventDefault();
              if (existsInCart) {
                props.removeProjectsFromCart([props.projectId]);
              } else {
                props.addProjectsToCart([
                  {
                    id: props.projectId,
                    amount: "1",
                    ft: "NEAR",
                  },
                ]);
                if (props.showModal) {
                  props.onClose();
                  props.setIsCartModalOpen(true);
                }
              }
            }}
          >
            Add to cart
          </AddToCartButton>
          <DonateButton onClick={handleDonate}>Donate</DonateButton>
        </FooterModal>
      </ModalBody>
    </ModalDonate>
    <Widget
      src={`${props.ownerId}/widget/Components.ModalDonationSuccess`}
      props={{
        ...props,
        transactionHashes: props.transactionHashes,
        onClose: () => State.update({ isModalDonationOpen: false }),
        onOpen: () => State.update({ isModalDonationOpen: true }),
        onDonation: {
          priceNear: Number(getPriceUSD()).toFixed(2),
        },
      }}
    />
  </>
);
