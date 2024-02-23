// get donations
const { potId, potDetail, formatDate } = props;
const { ownerId, SUPPORTED_FTS, ToDo } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {},
  ToDo: "",
};

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

const { payouts, base_currency, all_paid_out, cooldown_end_ms } = potDetail;

const columns = ["Project", "Amount"];

return (
  <>
    {all_paid_out ? (
      <div style={{ fontWeight: "500" }}>All projects have been paid out</div>
    ) : cooldown_end_ms ? (
      <div>
        Projects will be paid out after cooldown period completes on {formatDate(cooldown_end_ms)}
      </div>
    ) : null}
    <ToDo>Add total donations & total unique donor count for each row</ToDo>
    <RowOuter>
      {columns.map((column, index) => (
        <TitleText key={index}>{column}</TitleText>
      ))}
    </RowOuter>
    {payouts.map((payout, index) => {
      const { amount, id, paid_at, project_id } = payout;
      const totalPayoutAmount = SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(amount);

      return (
        <RowOuter key={index}>
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
              {totalPayoutAmount} {base_currency.toUpperCase()}
            </RowText>
          </RowInner>
        </RowOuter>
      );
    })}
    <ToDo>Add pagination</ToDo>
  </>
);
