const ownerId = "potlock.near";

const { name, description } = props.profile;

const Header = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 600;
  // font-family: Lora;
`;

const About = () => (
  <Widget
    src={`${ownerId}/widget/Project.AboutItem`}
    props={{
      ...props,
      title: "Overview",
      text: description.repeat(100),
    }}
  />
);

return (
  <>
    <Header>About {name}</Header>
    <About />
  </>
);
