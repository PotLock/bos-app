const { ownerId } = props;
const label = props.label ?? "";
const placeholder = props.placeholder ?? "";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const onBlur = props.onBlur ?? (() => {});
const validate = props.validate ?? (() => {});
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  // flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
`;

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const InputPrefix = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 14px 16px;
  border-right: 1px #f0f0f0 solid;
  color: #7b7b7b;
  font-size: 16px;
  font-weight: 400;
`;

const Input = styled.input`
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  color: #101828;
  width: 100%;
  border-radius: 4px;
`;

const PercentageSign = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.75em;
  color: #7b7b7b;
  font-size: 16px;
  font-weight: 400;
`;

return (
  <Container>
    {label && <Label>{label}</Label>}
    <InputContainer>
      {props.preInputChildren && props.preInputChildren}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        onBlur={(value) => {
          validate();
          if (onBlur) onBlur(value);
        }}
        disabled={!!props.disabled}
        onKeyDown={props.handleKeyPress ?? null}
        style={props.inputStyles || {}}
        name={props.name}
      />
      {props.percent && <PercentageSign>%</PercentageSign>}
      {props.postInputChildren && props.postInputChildren}
    </InputContainer>
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
