const { profile, projectId } = props;
const { getTagsFromSocialProfileData } = VM.require("potlock.near/widget/utils") || {
  getTagsFromSocialProfileData: () => [],
};
const Tags = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 600px;
`;

const Tag = styled.span`
  color: #292929;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 2px;
  background: #ebebeb;
  box-shadow: 0px -1px 0px 0px #dbdbdb inset, 0px 0px 0px 0.5px #dbdbdb;
`;

const tags = props.tags ?? getTagsFromSocialProfileData(profile);
if (!tags.length) return "No tags";

return (
  <Tags>
    {projectId && projectId.endsWith(".sputnik-dao.near") && <Tag>DAO</Tag>}
    {tags.map((tag, tagIndex) => (
      <Tag key={tagIndex}>{tag}</Tag>
    ))}
  </Tags>
);
