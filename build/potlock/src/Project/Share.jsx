const copySvg = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    style={{ width: "1em", marginTop: "-0.2em" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="14" rx="2" ry="2" width="14" x="8" y="8" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 0.5em;
`;

State.init({
  copied: false,
});

return (
  <Icon
    // className={props.className ?? "btn btn-outline-primary border-0"}
    onClick={() => {
      clipboard.writeText(props.text).then(() => {
        State.update({ copied: true });
        if (props.onCopy) {
          props.onCopy(props.text);
        }
        setTimeout(() => {
          State.update({ copied: false });
        }, 2000);
      });
    }}
  >
    {state.copied ? (
      <>
        {props.copiedIcon ?? <i className="bi bi-check-lg" />} {props.copiedLabel ?? props.label}
      </>
    ) : (
      <>
        {props.clipboardIcon ?? copySvg} {props.label}
      </>
    )}
  </Icon>
);
