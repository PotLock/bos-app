const { ownerId } = props;

const SidebarContainer = styled.div`
  width: 15%;
  padding-left: 1rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

return (
  <SidebarContainer>
    <Widget
      src={`${ownerId}/widget/Components.NavOptions`}
      props={{
        ...props,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Project.Linktree`}
      props={{
        ...props,
      }}
    />
  </SidebarContainer>
);
