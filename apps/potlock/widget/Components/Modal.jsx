const ModalOverlay = styled.div`
  position: fixed;
  padding: 0 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 30vh;
  z-index: 1000;
`;

const ModalContent = styled.div`
  border-radius: 6px;
  width: 100%;
  max-width: 600px;
  padding: 24px 24px 18px 24px;
  background: white;
  border: 1px rgba(41, 41, 41, 0.4) solid;
  display: flex;
  flex-direction: column;
`;

const overlayStyle = props.overlayStyle || {};
const contentStyle = props.contentStyle || {};

State.init({
  isModalOpen: false,
});

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return "";

  return (
    <ModalOverlay onClick={onClose} style={overlayStyle}>
      <ModalContent onClick={(e) => e.stopPropagation()} style={contentStyle}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

return (
  <Modal
    isOpen={props.hasOwnProperty("isModalOpen") ? props.isModalOpen : state.isModalOpen}
    onClose={
      props.hasOwnProperty("onClose") ? props.onClose : () => State.update({ isModalOpen: false })
    }
  >
    {props.children}
  </Modal>
);
