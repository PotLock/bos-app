const { ownerId } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
};

const { nearToUsd } = VM.require("potlock.near/widget/utils");

const SvgIcon = styled.svg`
  width: 16px;
`;

const NearIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_454_78)">
      <circle cx="8" cy="8" r="7.25" stroke="#292929" stroke-width="1.5" />
      <path
        d="M11.1477 4C10.851 4 10.5763 4.15333 10.421 4.406L8.74866 6.88867C8.72453 6.92441 8.71422 6.96772 8.71967 7.01051C8.72511 7.05329 8.74594 7.09264 8.77826 7.1212C8.81057 7.14976 8.85218 7.1656 8.89531 7.16574C8.93844 7.16589 8.98015 7.15034 9.01266 7.122L10.6587 5.69467C10.6683 5.68598 10.6802 5.68028 10.6931 5.67828C10.7059 5.67628 10.719 5.67806 10.7308 5.6834C10.7426 5.68875 10.7526 5.69742 10.7596 5.70836C10.7665 5.7193 10.7702 5.73203 10.77 5.745V10.215C10.77 10.2287 10.7658 10.2421 10.7579 10.2534C10.7501 10.2646 10.7389 10.2732 10.726 10.2778C10.7131 10.2825 10.6991 10.2831 10.6858 10.2795C10.6726 10.2758 10.6608 10.2682 10.652 10.2577L5.67667 4.30167C5.59667 4.20709 5.49701 4.1311 5.38463 4.079C5.27226 4.0269 5.14987 3.99994 5.026 4H4.85233C4.62628 4 4.40949 4.0898 4.24964 4.24964C4.0898 4.40949 4 4.62628 4 4.85233V11.1477C4 11.3333 4.06061 11.5139 4.17263 11.6619C4.28465 11.81 4.44194 11.9174 4.6206 11.9679C4.79926 12.0184 4.98952 12.0091 5.16245 11.9416C5.33538 11.874 5.48152 11.7519 5.57867 11.5937L7.251 9.111C7.27513 9.07525 7.28544 9.03194 7.27999 8.98916C7.27455 8.94637 7.25372 8.90703 7.22141 8.87846C7.18909 8.8499 7.14748 8.83407 7.10435 8.83392C7.06122 8.83377 7.01951 8.84932 6.987 8.87766L5.341 10.3053C5.33134 10.3139 5.31939 10.3195 5.3066 10.3215C5.29381 10.3234 5.28074 10.3216 5.26898 10.3162C5.25721 10.3108 5.24726 10.3021 5.24034 10.2912C5.23342 10.2803 5.22983 10.2676 5.23 10.2547V5.784C5.22997 5.77027 5.23418 5.75687 5.24206 5.74563C5.24993 5.73438 5.26109 5.72584 5.274 5.72117C5.28691 5.71651 5.30094 5.71594 5.31419 5.71955C5.32743 5.72315 5.33924 5.73076 5.348 5.74133L10.3227 11.698C10.4847 11.8893 10.7227 11.9997 10.9733 12H11.147C11.373 12.0001 11.5898 11.9104 11.7498 11.7507C11.9097 11.591 11.9997 11.3744 12 11.1483V4.85233C11.9999 4.62631 11.9101 4.40956 11.7503 4.24974C11.5904 4.08992 11.3737 4.00009 11.1477 4Z"
        fill="#292929"
      />
    </g>
    <defs>
      <clipPath id="clip0_454_78">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  border-bottom: 2px solid #dbdbdb;
  background: #fff;
  input {
    padding: 0.75rem 1rem;
    flex: 1;
    background: transparent;
    border: none;
    border-radius: 0;
    &:focus {
      box-shadow: none;
    }
  }
  .usd-amount {
    padding-right: 12px;
    color: #7b7b7b;
    display: flex;
    align-items: center;
    border-right: 1px solid #dbdbdb;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  span {
    font-weight: 500;
  }
`;

const PotDenominatio = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 1rem;
  .text {
    font-weight: 500;
  }
`;

const Dropdown = ({ selectedDenomination, denominationOptions, updateState }) => (
  <DropdownWrapper>
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        noLabel: true,
        placeholder: "",
        options: denominationOptions,
        value: {
          text: selectedDenomination.text,
          value: selectedDenomination.value,
        },
        onChange: ({ value }) => {
          updateState({
            selectedDenomination: denominationOptions.find((option) => option.value === value),
          });
        },
        containerStyles: {
          width: "auto",
        },
        inputStyles: {
          border: "none",
          boxShadow: "none",
          width: "auto",
          padding: "12px 16px",
          height: "100%",
          color: "#292929",
        },
        iconLeft: selectedDenomination.icon ? (
          <img src={selectedDenomination.icon} style={{ height: "16px", width: "16px" }} />
        ) : (
          <NearIcon />
        ),
      }}
    />
  </DropdownWrapper>
);

const AmountInput = (props) => {
  const { value, HandleAmoutChange, donationType, denominationOptions, selectedDenomination } =
    props;
  return (
    <Container>
      <input
        type="text"
        value={value}
        placeholder="0"
        onChange={(e) => HandleAmoutChange(e.target.value)}
        name="amount"
      />
      <div className="usd-amount">
        {" "}
        {nearToUsd && selectedDenomination.value === "NEAR"
          ? `~$ ${(nearToUsd * value).toFixed(2)}`
          : ""}
      </div>
      {donationType === "pot" || denominationOptions.length === 1 ? (
        <PotDenominatio>
          <NearIcon />
          <div className="text">{denominationOptions[0].text}</div>
        </PotDenominatio>
      ) : (
        <Dropdown {...props} />
      )}
    </Container>
  );
};

return { AmountInput };
