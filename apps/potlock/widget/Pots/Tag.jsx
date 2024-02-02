const { backgroundColor, borderColor, textColor, text } = props;

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor || "#ffffff"};
  border: 1px solid ${borderColor || "#000000"};
  //   width: 100%;
  //   height: 100%;
  text-align: center;
  padding: 6px 8px;
  border-radius: 4px;
`;

const TagText = styled.span`
  color: ${textColor || "#000000"};
  font-size: 14px;
`;

return (
  <TagContainer>
    <TagText>{text}</TagText>
  </TagContainer>
);
