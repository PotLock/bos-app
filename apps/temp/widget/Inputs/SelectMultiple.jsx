const { label, options, onChange, placeholder, selected } = props;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  // font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

return (
  <Container>
    {label && <Label>{label}</Label>}
    <Typeahead
      options={options}
      multiple
      onChange={onChange}
      placeholder={placeholder}
      selected={selected}
    />
  </Container>
);
