const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
  color: #2e2e2e;
`;

if (!props.tags || props.tags.length === 0) return "No tags";

return (
  <Tags>
    {props.tags.map((tag, tagIndex) => (
      <Tag key={tagIndex}>{tag}</Tag>
    ))}
  </Tags>
);
