const Container = styled.div`
  padding: 16px 32px 40px;
  svg {
    display: block;
    cursor: pointer;
    width: 14px;
    transition: all 300ms ease-in-out;
    margin: 5px 0;
    margin-left: auto;
    &:hover {
      rotate: 90deg;
    }
  }
  .title {
    margin-bottom: 1rem;
    font-size: 16px;
    color: #7b7b7b;
    font-weight: 600;
    span {
      font-weight: 600;
      color: #292929;
    }
  }
  .reason {
    font-size: 14px;
    color: #7b7b7b;
  }
`;

const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const { onClose, successFlag } = props;

return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      onClose: (e) => {
        e.stopPropagation();
      },
      contentStyle: {
        padding: "0px",
      },
      children: (
        <Container>
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClose}>
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#7B7B7B"
            />
          </svg>
          <div className="title">
            <span> {successFlag.address} </span> has been flagged
          </div>
          <div className="reason">{successFlag.reason}</div>
        </Container>
      ),
    }}
  />
);
