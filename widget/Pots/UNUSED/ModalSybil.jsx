const { isModalOpen, onClose } = props;
const { NADA_BOT_URL, ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADA_BOT_URL: "",
};
const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const CLOSE_ICON_URL =
  IPFS_BASE_URL + "bafkreifyg2vvmdjpbhkylnhye5es3vgpsivhigkjvtv2o4pzsae2z4vi5i";
const ERROR_ICON_URL =
  IPFS_BASE_URL + "bafkreicqarojxk6jhdtsk2scfsmnigqpxjfgar6om4wlhn5xmqbbu74u5i";
const IMAGE_URL = IPFS_BASE_URL + "bafkreidwashbfmlr7qo2yoqcfdsqi4ouisgt6h6jwxymz53v2f7hhoy75a";

const ModalHeader = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f6f5f3;
`;

const ModalHeaderText = styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  color: #292929;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ModalContent = styled.div`
  padding: 16px 20px 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ContentHeaderText = styled.div`
  margin-left: 24px;
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  color: #525252;
  font-family: "Lora";
`;

const ContentDescriptionText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
`;

const ErrorSpan = styled.span`
  color: #dd3345;
`;

const BoldSpan = styled.span`
  font-weight: 600;
`;

const Image = styled.img`
  width: 100px;
  max-height: 245px;
  margin: 0px 32px;
`;

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      isModalOpen,
      onClose,
      children: (
        <>
          <ModalHeader>
            <div></div>
            <ModalHeaderText>Verify Via Nada.bot</ModalHeaderText>
            <Icon cursor={"pointer"} src={CLOSE_ICON_URL} onClick={onClose} />
          </ModalHeader>
          <ModalContent>
            <Row>
              <Icon style={{ width: "35px", height: "35px" }} src={ERROR_ICON_URL} />
              <ContentHeaderText>
                You Are <ErrorSpan>Not verified</ErrorSpan>
              </ContentHeaderText>
            </Row>
            <Row>
              <ContentDescriptionText>
                To donate to a project via this pot, you need to get verified from{" "}
                <BoldSpan>Nada.bot</BoldSpan>
              </ContentDescriptionText>
            </Row>
            <Image src={IMAGE_URL} />
            <Row style={{ alignItems: "flex-end" }}>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  href: NADA_BOT_URL,
                  target: "_blank",
                  type: "primary",
                  text: "Get Verified Now",
                  //   style: {
                  //     width: "300px",
                  //   },
                }}
              />
            </Row>
          </ModalContent>
        </>
      ),
    }}
  />
);
