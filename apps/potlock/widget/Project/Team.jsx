const { ownerId } = props;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
`;

const TeamMembersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
`;

const TeamMemberItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;
  :hover {
    text-decoration: none;
    .profile-image img {
      filter: grayscale(0%);
    }
  }
  .profile-image {
    width: 180px;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      filter: grayscale(100%);
      transition: 300ms ease-in-out;
    }
  }
  @media screen and (max-width: 768px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }
`;

const TeamMemberAccountId = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 400;
`;

const imageWidthPx = 129;

const Col1 = styled.div`
  display: flex;
  width: 30%;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Col2 = styled.div`
  display: flex;
  width: 70%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileImg = ({ teamMember }) => (
  <Widget
    src="mob.near/widget/ProfileImage"
    props={{
      accountId: teamMember,
      imageClassName: "",
      style: {},
      thumbnail: false,
      tooltip: true,
    }}
  />
);

return (
  <Container>
    <Col1>
      <Title>Team members</Title>
    </Col1>
    <Col2>
      <TeamMembersContainer>
        {!props.team.length ? (
          <div>No team members to display</div>
        ) : (
          props.team.map((teamMember) => {
            if (teamMember.match(/.near/i).length > 0) {
              return (
                <TeamMemberItem
                  href={props.hrefWithParams(`?tab=profile&accountId=${teamMember}`)}
                  target="_blank"
                >
                  <ProfileImg teamMember={teamMember} />
                  <TeamMemberAccountId>@{teamMember}</TeamMemberAccountId>
                </TeamMemberItem>
              );
            }
          })
        )}
      </TeamMembersContainer>
      {/* </Column> */}
    </Col2>
  </Container>
);
