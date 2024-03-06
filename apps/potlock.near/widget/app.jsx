const config = {
  theme: {
    // add key values to define colors
    // "--main-color": "blue",
    // "--secondary-color": "red",
    // background: "var(--main-color)",
    // color: "var(--secondary-color)",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget src="${config/account}/widget/Components.Nav" props={props} />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      home: {
        path: "${config/account}/widget/Project.ListPage",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: true,
      },
      createproject: {
        path: "${config/account}/widget/Project.Create",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      editproject: {
        path: "${config/account}/widget/Project.Create",
        blockHeight: "final",
        init: {
          edit: true,
          ...props,
        },
      },
      project: {
        path: "${config/account}/widget/Project.Detail",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      projects: {
        path: "${config/account}/widget/Project.ListPage",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      cart: {
        path: "${config/account}/widget/Cart.Checkout",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      feed: {
        path: "${config/account}/widget/Components.Feed",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      pots: {
        path: "${config/account}/widget/Pots.Home",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      deploypot: {
        path: "${config/account}/widget/Pots.Deploy",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      pot: {
        path: "${config/account}/widget/Pots.Detail",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      donors: {
        path: "${config/account}/widget/Components.Donors",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      profile: {
        path: "${config/account}/widget/Profile.Detail",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
    },
  },
};

const Root = styled.div`
  position: relative;
  min-height: 100vh;

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
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Regular.woff)
        format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 500;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-Medium.woff)
        format("woff");
  }
  @font-face {
    font-family: mona-sans;
    font-style: normal;
    font-weight: 600;
    src: local("Mona-Sans"),
      url(https://fonts.cdnfonts.com/s/91271/Mona-Sans-SemiBold.woff)
        format("woff");
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
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
