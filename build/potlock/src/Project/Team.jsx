const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border-top: 1px #c7c7c7 solid;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    // align-items: flex-start;
    // overflow-x: auto;
    // max-width: 100vw;
  }
`;

const Column = styled.div`
  padding-top: 16px;
  // border-top: 1px #c7c7c7 solid;
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
  // font-family: Mona-Sans;
`;

const TeamMembersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    overflow-x: auto;
    // flex-wrap: nowrap; // Prevent wrapping on mobile, enable scrolling instead
  }
`;

const TeamMemberItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const TeamMemberAccountId = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 400;
  // font-family: Mona-Sans;
`;

const imageWidthPx = 129;

const ImageContainer = styled.div`
  width: ${imageWidthPx + 7}px;
  height: ${imageWidthPx + 7}px;
  border-radius: 50%;
  border: 4px #dd3345 solid;
`;

const Col1 = styled.div`
  display: flex;
  width: 25%;
  padding-top: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Col2 = styled.div`
  display: flex;
  width: 75%;
  padding-top: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

// props.team = [
//   "plugrel.near",
//   "kurodenjiro.near",
//   "lachlan.near",
//   "root.near",
//   "plugrel.near",
//   "kurodenjiro.near",
//   "lachlan.near",
//   "root.near",
// ];

return (
  <Container>
    {/* <Column className="col-3"> */}
    {/* <Column> */}
    <Col1>
      <Title>Team members</Title>
    </Col1>
    {/* </Column> */}
    {/* <Column className="col-9"> */}
    {/* <Column> */}
    <Col2>
      <TeamMembersContainer>
        {props.team.map((teamMember) => {
          return (
            <TeamMemberItem
              href={`https://near.social/mob.near/widget/ProfilePage?accountId=${teamMember}`}
              target="_blank"
            >
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: teamMember,
                  style: {
                    width: `${imageWidthPx}px`,
                    height: `${imageWidthPx}px`,
                    border: `4px #dd3345 solid`,
                    borderRadius: "50%",
                  },
                  className: "mb-2",
                  imageClassName: "rounded-circle w-100 h-100 d-block",
                  thumbnail: false,
                  tooltip: true,
                }}
              />
              <TeamMemberAccountId>@{teamMember}</TeamMemberAccountId>
            </TeamMemberItem>
          );
        })}
      </TeamMembersContainer>
      {/* </Column> */}
    </Col2>
  </Container>
);
