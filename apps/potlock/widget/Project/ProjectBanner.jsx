const Banner = styled.div`
  width: 100%;
  background: ${project.status === "Pending" ? "#E6B800" : "#dd3345"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 8px;
  border-radius: 4px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BannerAlertSvg = styled.svg`
  width: 18px;
  @media screen and (max-width: 768px) {
    width: 14px;
  }
`;
return (
  <Banner>
    <Row>
      <BannerAlertSvg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        aria-hidden="true"
        // width="18px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        ></path>
      </BannerAlertSvg>
      <BannerText>This project status is {project.status} and has not been approved.</BannerText>
    </Row>
    {project.review_notes && (
      <BannerText style={{ fontStyle: "italic" }}>
        Admin review notes: {project.review_notes}
      </BannerText>
    )}
  </Banner>
);
