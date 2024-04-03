const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;
const Amout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  div {
    font-weight: 600;
    font-size: 1rem;
    &:last-of-type {
      color: #7b7b7b;
    }
  }
  img,
  svg {
    width: 20px;
  }
`;
const ConfirmPage = (props) => {
  const { selectedDenomination, amount } = props;

  return (
    <div>
      <div>
        <Label>Total amount</Label>
        <Amout>
          <div>
            {selectedDenomination.icon ? <img src={selectedDenomination.icon} /> : <NearIcon />}
          </div>
          <div>{amount}</div>
        </Amout>
      </div>
    </div>
  );
};

return {
  ConfirmPage,
};
