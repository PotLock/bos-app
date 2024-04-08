const { registration } = props;

const [toggle, setToggle] = useState(false);

const statuses = {
  Graylisted: {
    background: "#C7C7C7",
    text: "GRAYLISTED: needs further review, unsure if project qualifies on public goods",
    textColor: "#525252",
    toggleColor: "#FFFFFF",
  },
  Rejected: {
    background: "#DD3345",
    text: "REJECTED: this project was denied on public goods registry",
    textColor: "#FEF6EE",
    toggleColor: "#C7C7C7",
  },
  Pending: {
    background: "#F0CF1F",
    text: "PENDING: this project has yet to be approved",
    textColor: "#292929",
    toggleColor: "#7B7B7B",
  },
  Blacklisted: {
    background: "#292929",
    text: "BLACKLISTED:  this project has been removed for violating terms",
    textColor: "#F6F5F3",
    toggleColor: "#C7C7C7",
  },
  Unregistered: {
    background: "#DD3345",
    text: "UNREGISTERED: This account has not registered as a public good",
    textColor: "#F6F5F3",
    toggleColor: "#C7C7C7",
  },
};
const registrationStatus = registration ? statuses[registration.status] : statuses.Unregistered;

const Banner = styled.div`
  width: 100%;
  background: ${registrationStatus.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  backdrop-filter: blur(150px);
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BannerText = styled.div`
  text-align: center;
  color: ${registrationStatus.textColor};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  cursor: ${registration.admin_notes ? "pointer" : "default"};
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Toggle = styled.span`
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 22px;
  color: ${registrationStatus.toggleColor};
  white-space: nowrap;
  margin-left: 0.5rem;

  svg {
    width: 12px;
    transition: all 300ms ease-in-out;
    path {
      fill: ${registrationStatus.toggleColor};
      stroke: ${registrationStatus.toggleColor};
    }
  }
  &.active svg {
    rotate: 180deg;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    svg {
      width: 8px;
    }
  }
`;

const Notes = styled.div`
  overflow: hidden;
  transition: all 300ms ease-in-out;
  font-size: 12px;
  font-style: italic;
  color: ${registrationStatus.toggleColor};
  max-height: 0;
  text-transform: uppercase;
  max-width: 1270px;
  &.active {
    max-height: 80px;
    margin-top: 12px;
  }
`;

return (
  <Banner>
    <Row>
      <BannerText onClick={() => (registration.admin_notes ? setToggle(!toggle) : "")}>
        {registrationStatus.text}
        {registration.admin_notes && (
          <Toggle className={`${toggle ? "active" : ""}`}>
            (See {toggle ? "Less" : "Why"})
            <svg
              className={`${toggle ? "active" : ""}`}
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.59 0.294922L6 4.87492L1.41 0.294922L0 1.70492L6 7.70492L12 1.70492L10.59 0.294922Z"
                fill="#C7C7C7"
              />
            </svg>
          </Toggle>
        )}
      </BannerText>
    </Row>
    {registration.admin_notes && (
      <Notes className={`${toggle ? "active" : ""}`}>Admin notes: {registration.admin_notes}</Notes>
    )}
  </Banner>
);
