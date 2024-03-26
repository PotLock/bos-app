const { href } = VM.require("devs.near/widget/lib.url") || {
  href: () => {},
};

const ModalOverlay = styled.div`
  position: fixed;
  padding: 0 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  border-radius: 6px;
  width: 100%;
  max-width: 600px;
  padding: 24px 24px 18px 24px;
  background: white;
  border: 1px rgba(41, 41, 41, 0.4) solid;
  display: flex;
  flex-direction: column;
`;

const Modal = ({ Trigger, Content }) => {
  Trigger = Trigger ?? (() => <></>);
  Content = Content ?? (() => <></>);

  return (
    <Widget
      src={"devs.near/widget/Modal"}
      props={{
        Trigger: Trigger,
        ModalOverlay: ModalOverlay,
        ModalContainer: ModalContainer,
        Content: Content,
      }}
    />
  );
};

return { Modal };
