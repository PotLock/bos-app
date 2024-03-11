const { textToCopy, customStyle } = props;
const [copied, setCopid] = useState(false);

const Icon = styled.svg`
  cursor: pointer;
  height: 20px;
  transition: scale 200ms ease-in-out;
  ${customStyle || ""}
  :hover {
    scale: 1.1;
  }
`;

return copied ? (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.8002 10.9L1.6002 6.69999L0.200195 8.09999L5.8002 13.7L17.8002 1.69999L16.4002 0.299988L5.8002 10.9Z"
      fill="#151A23"
    />
  </svg>
) : (
  <Icon
    onClick={() => {
      clipboard.writeText(textToCopy);
      setCopid(true);
      setTimeout(() => {
        setCopid(false);
      }, 2000);
    }}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5 0H6.5C5.4 0 4.5 0.9 4.5 2V14C4.5 15.1 5.4 16 6.5 16H15.5C16.6 16 17.5 15.1 17.5 14V2C17.5 0.9 16.6 0 15.5 0ZM15.5 14H6.5V2H15.5V14ZM0.5 13V11H2.5V13H0.5ZM0.5 7.5H2.5V9.5H0.5V7.5ZM7.5 18H9.5V20H7.5V18ZM0.5 16.5V14.5H2.5V16.5H0.5ZM2.5 20C1.4 20 0.5 19.1 0.5 18H2.5V20ZM6 20H4V18H6V20ZM11 20V18H13C13 19.1 12.1 20 11 20ZM2.5 4V6H0.5C0.5 4.9 1.4 4 2.5 4Z"
      fill="#7B7B7B"
    />
  </Icon>
);
