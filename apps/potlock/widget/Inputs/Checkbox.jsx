const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  padding: 0px;
  appearance: checkbox;
  cursor: pointer;
  // TODO: update background color when selected
`;

const Label = styled.label``;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const { id, disabled, checked, onClick } = props;

const containerStyle = props.containerStyle ?? {};
const checkBoxStyle = props.checkBoxStyle ?? {};
const labelStyle = props.labelStyle ?? {};
const error = props.error ?? "";

return (
  <Container style={containerStyle}>
    <CheckBox
      type="checkbox"
      style={checkBoxStyle}
      id={id}
      disabled={disabled}
      checked={checked}
      onClick={onClick}
    />
    {props.label && (
      <Label for={id} style={labelStyle}>
        {props.label}
      </Label>
    )}
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
