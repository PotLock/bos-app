const accountId = props.accountId ?? context.accountId ?? "potlock.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

initState({ amount: 0.1 });

const donate = () => {
  Near.call(accountId, "donate", {}, "30000000000000", state.amount * 1e24);
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const Wrapper = styled.div`
  .donate-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

return (
  <Wrapper>
    <button className="donate-button" onClick={donate}>
      Donate
    </button>
  </Wrapper>
);
