const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  padding: 0px;
  appearance: checkbox;
  cursor: pointer;
  // TODO: update background color when selected
`;

const { id, disabled, checked, onClick } = props;
const style = props.style ?? {};

return (
  <CheckBox
    type="checkbox"
    style={style}
    id={id}
    disabled={disabled}
    checked={checked}
    onClick={onClick}
  />
);
