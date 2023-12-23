// get donations
const { ownerId, potId, potDetail } = props;

const donations = Near.view(potId, "get_public_round_donations", {});

if (!donations) return "Loading...";

const TitleText = styled.div`
  color: #3d3d3d;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

const RowOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
  //   gap: 92px;
  border-bottom: 1px #f0f0f0 solid;
  width: 100%;
`;

const RowInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const RowText = styled.div`
  color: #525252;
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
  width: 100%;
`;

const daysAgo = (timestamp) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const differenceInTime = now - pastDate;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
};

const { base_currency } = potDetail;

const columns = ["Project", "Donor", "Amount", "Message", "Date"];

return (
  <>
    <props.ToDo>Add messages from donations?</props.ToDo>
    <RowOuter>
      {columns.map((column, index) => (
        <TitleText key={index}>{column}</TitleText>
      ))}
    </RowOuter>
    {donations.map((donation, index) => {
      const { project_id, message, donor_id, total_amount, donated_at } = donation;
      const totalDonationAmount =
        props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total_amount);

      return (
        <RowOuter key={index}>
          <RowInner>
            <Widget
              src={`${ownerId}/widget/Project.ProfileImage`}
              props={{
                ...props,
                accountId: donor_id,
                imageWrapperStyle: {
                  height: "32px",
                  width: "32px",
                },
              }}
            />
            <RowText>{donor_id}</RowText>
          </RowInner>
          <RowInner>
            <Widget
              src={`${ownerId}/widget/Project.ProfileImage`}
              props={{
                ...props,
                accountId: project_id,
                imageWrapperStyle: {
                  height: "32px",
                  width: "32px",
                },
              }}
            />
            <RowText>{project_id}</RowText>
          </RowInner>
          <RowInner>
            <RowText>
              {totalDonationAmount} {base_currency.toUpperCase()}
            </RowText>
          </RowInner>
          <RowInner>
            <RowText>{props.daysAgo(donated_at)}</RowText>
          </RowInner>
        </RowOuter>
      );
    })}
  </>
);
