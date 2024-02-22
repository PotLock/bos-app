const { Router } = VM.require("devs.near/widget/Router") || {
  Router: () => <></>,
};

const Root = styled.div``;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const App = ({
  routes,
  Layout,
  basePath,
  page,
  defaultPage,
  debug,
  depth,
  ...passProps
}) => {
  if (!page) page = Object.keys(routes)[0] || defaultPage;

  function NavLink({ to, children }) {
    // Determine the parameter name based on depth
    let param;

    switch (
      depth // we could determine depth from current path
    ) {
      case 1: // take baseUrl and router param prop
        param = "page";
        break;
      case 2:
        param = "tab";
        break;
      case 3:
        param = "view";
        break;
      default:
        param = "page";
        break;
    }

    // Construct the currentPath dynamically based on depth
    const currentPath = (a) =>
      `/${basePath}${depth === 1 ? "?" : "&"}${param}=${a}`;

    return (
      <Link key={`${currentPath(to)}`} to={`${currentPath(to)}`}>
        {children}
      </Link>
    ); // maybe we replace with href?
  }

  return (
    <Root key={basePath}>
      <Container>
        <Layout
          page={page}
          routes={routes}
          NavLink={NavLink}
          {...routerProps}
          {...props}
          Outlet={(p) => (
            <Router
              debug={debug}
              basePath={basePath}
              active={page}
              routes={routes}
              passProps={p}
              depth={depth ?? 1}
              PageNotFound={() => <p>404 Not Found</p>} // routes[404]
            />
          )}
        />
      </Container>
    </Root>
  );
};

return { App };
