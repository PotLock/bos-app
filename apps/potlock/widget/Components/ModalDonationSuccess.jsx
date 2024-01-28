const { onDonation } = props;
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
  padding-right: 32px;
  // padding-right: 500px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding-right: 8px;
  }
`;

const ModalContainer = styled.div`
  width: 500px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  //padding-left: 217px;
  padding-right: 20px;
  background: #fafafa;
  border-radius: 6px;
  justify-content: center;
  align-items: flex-start;
  gap: 173px;
  display: inline-flex;
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

const ModalContent = styled.div`
  display: flex;
  padding: 60px 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const ModalContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 9px;
`;

const Text = styled.div`
  color: var(--Neutral-950, #292929);
  text-align: center;
  font-feature-settings: "salt" on;

  /* Headlines/small/32px:regular */
  font-family: Lora;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px; /* 125% */
  letter-spacing: -0.32px;
`;

const TextAmount = styled.div`
  color: var(--Neutral-500, #7b7b7b);
  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;

  /* Body/Medium/14px:regular */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

const iconNear = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  filter: grayscale(120%);
  margin-top: -5px;
`;

const IconSucess = styled.img`
  width: 64px;
  height: 64px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: inline-flex;
`;

const DonateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const TextDonate = styled.div`
  color: var(--Neutral-950, #292929);
  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;

  /* Title/small/14px:semibold */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
`;

const Donor = styled.div`
  display: flex;
  padding: 2px 6px;
  align-items: center;
  gap: 4px;
  border-radius: 32px;
  background: var(--Neutral-100, #f0f0f0);
  margin-left: 10px;
`;

const DonerAvatar = styled.img`
  width: 17px;
  height: 17px;
  border-radius: 17px;
`;

const DonerName = styled.div`
  color: var(--Neutral-950, #292929);
  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;

  /* Title/small/14px:semibold */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
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
  justify-content: center;
  align-items: center;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  magrin-top: 24px;
`;
const DonateAgain = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 6px;
  background: var(--Peach-50, #fef6ee);

  /* Button/main shadow */
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  outline: none;
  border: none;
  &:hover {
    background: #dd3345;
    color: #fff;
  }
`;

const ButtonDonate = styled.a`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 6px;
  background: var(--Peach-50, #fef6ee);

  /* Button/main shadow */
  box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646;
  outline: none;
  border: none;
  text-decoration: none;
  color: #000;
  &:link {
    text-decoration: none;
  }
  &:hover {
    background: #dd3345;
    color: #fff;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 28px 36px;
  with: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  background: var(--Neutral-50, #fafafa);
`;

const ModalFooterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;

const ModalFooterText = styled.div`
  color: var(--Neutral-950, #292929);
  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;

  /* Title/small/14px:semibold */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
  display: flex;
  flex-direction: row;
  padding: 2px 6px;
`;

const FormTxnHash = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 16px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 16px;
`;

const TextTxnHash = styled.div`
  color: var(--Neutral-500, #7b7b7b);
  text-align: center;
  font-feature-settings: "ss01" on, "salt" on;

  /* Body/Medium/14px:regular */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

const TxnHash = styled.a`
  color: var(--Neutral-950, #292929);
  font-feature-settings: "ss01" on, "salt" on;

  /* Body/Medium/14px:regular */
  font-family: "Mona Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;
const linkSocialMedia = styled.a`
  margin-left: 8px;
`;
const IconSocialMedia = styled.img`
  width: 24px;
  height: 24px;
  filter: grayscale(120%);
`;

State.init({
  isModalDonationSucessOpen: false,
  isModalDonationOpen: false,
});
const [isBreakDown, setIsBreakDown] = useState(false);
const amount = props.amount ?? Storage.get("amount");
const projectId = props.donnorProjectId ?? Storage.get("projectId");
const ModalDonate = ({ isOpen, onClose, children }) => {
  if (!isOpen) return "";
  return (
    <Modal onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Modal>
  );
};

const handleChangeBreakDown = () => {
  setIsBreakDown(() => !isBreakDown);
};

return (
  <ModalDonate
    isOpen={
      props.isModalDonationSucessOpen
        ? props.isModalDonationSucessOpen
        : state.isModalDonationSucessOpen
    }
    onClose={
      props.onDonationClose
        ? props.onDonationClose
        : () => State.update({ isModalDonationSucessOpen: false })
    }
  >
    <ModalContent>
      <IconSucess
        src={"https://cdn4.iconfinder.com/data/icons/user-i/66/16-512.png"}
        alt={"logo success"}
      />
      <ModalContext>
        <TextContainer>
          <Text>
            {amount}
            <iconNear
              src={
                "https://s3-alpha-sig.figma.com/img/8cc9/7cfb/5a58fb149e537ae5ea03b9d97cd11c2a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qQbfzhPe~lml8Lk-A27HSS2mhwQhpvaZL3-Nsoj7qtiKgQCX~galYPrQYHI59dSCLAjyomlBiGm0GJNI8~YwL43CVOqaptW0HHgliMo2fs0lmGpfBPEYWiPexu-NtpbdLwkAObem4CE2Wmjk4CysTx2f4mBVc43gcjvxiv2tuPcyVnjTZ7ByCe2qjQvs-D01YTmfP7n~nGtnVWCYqcHZ26pXq9FaN3Ssse6dNedBQWFMM~2UQej3p5dUXgqGDhfYxMABsjemVA1SrMJAFMYK1ZyE5k~MOnWtytWh~jgYvXXKUWSKRmP1aXMdHfBkVIAHoRI7rSnA7IhECie8lvUu6Q__"
              }
              alt={"Icon Near"}
            />
          </Text>
          <TextAmount>{Number(onDonation.priceNear * amount).toFixed(2)} USDT</TextAmount>
        </TextContainer>
        <DonateContainer>
          <TextDonate>Has been donated to</TextDonate>
          <Donor>
            <DonerAvatar
              src={
                "https://s3-alpha-sig.figma.com/img/0dd0/eca3/4f07344bd377bb7dc94622788695208e?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L2UXIsQ94KtwQLR9rDAr6xp0q4dba9vb6YfaMftLoMqosfQaG9gwFVSFegE0stN58oZ6isJABcsyI2V2h9jylJMbLodvTKpnihvAmetY5Ubmc0ZEuHejPnck5GMKP9bS1tZzCRTy8BQkUjgE3GABYwBIW-2vJjf73GhtJWI5iZ2AP9FNJsPTio7cLbqFZ~PoxNztehHRSbZgpedtvVRv0LvdKjoXAIrjRhb2JcPPf2jeeOgxDxKNRP8jJksztS6O-vpgh8L-a2SefrFFuJmu1eCyIdFw3jTdgDa-Uf8QWm0SxFNE9gu726-6ygAUbGAKSMnUI7dR7S5B837T1YP0KQ__"
              }
              alt={"avatar doner"}
            />
            <DonerName>{context.accountId}</DonerName>
          </Donor>
        </DonateContainer>
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
        <ButtonGroup>
          <ButtonDonate href={"?"}>Donate Again</ButtonDonate>
          <ButtonDonate href={"?"}>Explore projects</ButtonDonate>
        </ButtonGroup>
      </ModalContext>
      <ModalFooter>
        <ModalFooterForm>
          <ModalFooterText>
            From
            <Donor>
              <DonerAvatar
                src={
                  "https://s3-alpha-sig.figma.com/img/0dd0/eca3/4f07344bd377bb7dc94622788695208e?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L2UXIsQ94KtwQLR9rDAr6xp0q4dba9vb6YfaMftLoMqosfQaG9gwFVSFegE0stN58oZ6isJABcsyI2V2h9jylJMbLodvTKpnihvAmetY5Ubmc0ZEuHejPnck5GMKP9bS1tZzCRTy8BQkUjgE3GABYwBIW-2vJjf73GhtJWI5iZ2AP9FNJsPTio7cLbqFZ~PoxNztehHRSbZgpedtvVRv0LvdKjoXAIrjRhb2JcPPf2jeeOgxDxKNRP8jJksztS6O-vpgh8L-a2SefrFFuJmu1eCyIdFw3jTdgDa-Uf8QWm0SxFNE9gu726-6ygAUbGAKSMnUI7dR7S5B837T1YP0KQ__"
                }
                alt={"avatar doner"}
              />
              <DonerName>{projectId}</DonerName>
            </Donor>
          </ModalFooterText>
        </ModalFooterForm>
        <FormTxnHash>
          <TextTxnHash>Transaction Hash</TextTxnHash>
          <TxnHash href={`https://nearblocks.io/txns/${props.transactionHashes}`}>
            {props.transactionHashes && props.transactionHashes.slice(0, 10) + "...."}
          </TxnHash>
        </FormTxnHash>
        <SocialMedia>
          <TextTxnHash>
            Share to
            <linkSocialMedia href={"https://web.telegram.org/"} target={"_blank"}>
              <IconSocialMedia
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png"
                }
                alt={"telegram"}
              />
            </linkSocialMedia>
            <linkSocialMedia href={"https://www.linkedin.com/"} target={"_blank"}>
              <IconSocialMedia
                src={
                  "https://static-00.iconduck.com/assets.00/linkedin-icon-1024x1024-net2o24e.png"
                }
                alt={"linkedin"}
              />
            </linkSocialMedia>
            <linkSocialMedia href={"https://twitter.com/"} target={"_blank"}>
              <IconSocialMedia
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png"
                }
                alt={"twitter"}
              />
            </linkSocialMedia>
          </TextTxnHash>
        </SocialMedia>
      </ModalFooter>
    </ModalContent>
  </ModalDonate>
);
