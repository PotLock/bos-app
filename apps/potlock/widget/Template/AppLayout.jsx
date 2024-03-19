const loraCss = fetch(
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
).body;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  // padding: 3em;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  border-top: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--base-white, #fff);
`;

const Theme = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;

  * {
    font-family: "Mona-Sans";
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 400;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Regular.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 500;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Medium.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 600;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-SemiBold.woff) format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 700;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Bold.woff) format("woff");
  }

  a {
    text-decoration: none;

    &:hover: {
      text-decoration: none;
    }
  }

  ${loraCss}
`;

const { Layout } = VM.require("devs.near/widget/Layout") ?? {
  Layout: ({ children }) => <div>{children}</div>,
};
function AppLayout({ children, blocks }) {
  const { Header, Footer } = blocks;
  return (
    <Theme>
      <Layout variant="standard" blocks={{ Header, Footer }}>
        <Content>{children}</Content>
      </Layout>
    </Theme>
  );
}

return { Layout: AppLayout };
