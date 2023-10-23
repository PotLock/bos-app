const Container = styled.div`
  margin-top: 48px;
`;

const Column = styled.div`
  padding-top: 16px;
  border-top: 1px #c7c7c7 solid;
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

const team = props.team ?? {};

const imageWidthPx = 129;

const ImageContainer = styled.div`
  width: ${imageWidthPx + 7}px;
  height: ${imageWidthPx + 7}px;
  border-radius: 50%;
  border: 4px #dd3345 solid;
`;

return (
  <Container className="row gx-0 align-items-start w-100">
    <Column className="col-3">
      <Title>Team members</Title>
    </Column>
    <Column className="col-9">
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
    </Column>
  </Container>
);
