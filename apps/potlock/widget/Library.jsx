const { Button, TipOnPotlock } = VM.require("potlock.near/widget/Components.ui.Button") || {
  Button: () => <></>,
  TipOnPotlock: () => <></>,
};

const { Volunteer, Component } = VM.require("potlock.near/widget/Components.Icons") || {
  Volunteer: () => <></>,
  Component: () => <></>,
};

const ButtonPreview = (
  <div>
    <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
      <Button variant="outline">
        <Volunteer />
        Outline
      </Button>
      <Button variant="primary">
        <Volunteer />
        Primary
      </Button>
      <Button variant="standard">
        <Volunteer />
        Standard
      </Button>
      <Button variant="tonal">
        <Volunteer />
        Tonal
      </Button>
      <Button variant="brand-outline">
        <Volunteer />
        Brand Outline
      </Button>
    </div>
    <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
      <Button variant="outline">Outline</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="standard">Standard</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="brand-outline">Brand Outline</Button>
    </div>
  </div>
);

const TipOnPotlockPreview = (
  <div>
    <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
      <TipOnPotlock variant="outline" />
      <TipOnPotlock variant="primary" />
      <TipOnPotlock variant="standard" />
      <TipOnPotlock variant="tonal" />
      <TipOnPotlock variant="brand-outline" />
    </div>
  </div>
);

const components = [
  {
    name: "Button",
    category: "Buttons/Navigation",
    widgetSrc: "potlock.near/widget/Components.ui.Button",
    description: "Button component with four different variants, and icon support.",
    requiredProps: {
      children: "Button Text",
      onClick: "Callback function to handle button click",
    },
    optionalProps: {
      id: "ID of the button",
      variant: "Variant of the button (outline, primary, standard, tonal)",
      className: "Additional classnames for button",
      style: "Additional styles for button",
    },
    preview: ButtonPreview,
    embedCode: `
  const { Button } = VM.require("potlock.near/widget/Components.ui.Button");
  const { Volunteer } = VM.require("potlock.near/widget/Components.Icons");
  
  return (
      <Button
        onClick={(e) => {
          // handle on click
        }}
        variant="outline"
      >
        <Volunteer />
        Donate
      </Button>
  );`,
  },
  {
    name: "Public Goods Legos",
    category: "Buttons/Navigation",
    widgetSrc: "potlock.near/widget/Components.ui.Button",
    description: "Button component with four different variants, and icon support.",
    requiredProps: {
      onClick: "Callback function to handle button click",
    },
    optionalProps: {
      id: "ID of the button",
      variant: "Variant of the button (outline, primary, standard, tonal)",

      className: "Additional classnames for button",
      style: "Additional styles for button",
    },
    preview: TipOnPotlockPreview,
    embedCode: `
  const { TipOnPotlock } = VM.require("potlock.near/widget/Components.ui.Button");
  return (
    <div className="d-flex align-items-center gap-3 mb-3">
    <TipOnPotlock variant="outline" />
    <TipOnPotlock variant="primary" />
    <TipOnPotlock variant="standard" />
    <TipOnPotlock variant="tonal" />
  </div>
  );`,
  },
];
const renderProps = (props, optional) => {
  return Object.entries(props || {}).map(([key, desc]) => {
    return (
      <tr key={key}>
        <td>
          <span className={`code prop-key${optional ? " optional" : ""}`}>{key}</span>
        </td>
        <td className="prop-desc">
          <Markdown text={desc} />
        </td>
      </tr>
    );
  });
};
const renderComponent = (component, index) => {
  const id = component.name.toLowerCase().replace(/ /g, "-");
  return (
    <div className="component">
      <div className="anchor" id={id}>
        <a href={`#${id}`}>
          <h2>{component.name}</h2>
        </a>
        <p>{component.description}</p>
        <h3>Preview</h3>
        {component.preview}
        <h3>Component</h3>
        <div className="d-flex flex-row flex-wrap justify-content-between mb-3">
          <div className="path font-monospace">
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>}
            >
              <Widget
                onClick={() => {
                  clipboard.writeText(props.text).then(() => {
                    State.update({ copied: true });
                    if (props.onCopy) {
                      props.onCopy(props.text);
                    }
                  });
                }}
                src="mob.near/widget/CopyButton"
                props={{
                  text: component.widgetSrc,
                  label: component.widgetSrc,
                }}
              />
            </OverlayTrigger>
          </div>
        </div>
        <h3>Props</h3>
        <table className="props table table-bordered mb-3">
          <thead>
            <tr>
              <th>Key</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {renderProps(component.requiredProps)}
            {renderProps(component.optionalProps, true)}
          </tbody>
        </table>
        <h3>Example</h3>
        <div className="embed-code">
          <Markdown text={`\`\`\`jsx\n${component.embedCode}\n\`\`\``} />
          <div className="embed-copy">
            <Widget
              src="potlock.near/widget/Components.ui.Button"
              props={{
                text: component.embedCode,
                className: "btn btn-outline-light",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const Wrapper = styled.div`
  h2,
  h3,
  label,
  p {
    color: black;
  }
  .component {
    padding: 0.5em 12px;
    padding-bottom: 0;
    margin-bottom: 3em;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    table,
    th,
    td {
      background: #fff;
      color: #000;
    }
    label {
      font-size: 20px;
    }
    .code {
      display: inline-flex;
      line-height: normal;
      border-radius: 0.3em;
      padding: 0 4px;
      border: 1px solid #ddd;
      background: rgba(0, 0, 0, 0.03);
      font-family: var(--bs-font-monospace);
    }
    .path {
    }
    .preview {
      background-color: white;
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 12px;
      pre {
        margin-bottom: 0;
      }
    }
    .props {
      .prop-key {
        background: #f7f7f7;
        border: 1px solid #dddddd;
        color: black;
        border-radius: 8px;
        padding: 2px 4px;
        font-weight: 600;
        &.optional {
          font-weight: 400;
        }
      }
      .prop-desc {
        p {
          margin-bottom: 0;
          color: #000;
        }
      }
    }
    .embed-code {
      position: relative;
      .embed-copy {
        position: absolute;
        top: 18px;
        right: 10px;
      }
    }
  }
`;
const renderMenuItem = (c, i) => {
  const prev = i ? components[i - 1] : null;
  const res = [];
  const id = c.name.toLowerCase().replaceAll(" ", "-");
  res.push(
    <div className="menu-item" key={i}>
      <a href={`#${id}`} className="d-flex align-items-center gap-2">
        <Component />
        {c.name}
      </a>
    </div>
  );
  return res;
};
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  .main {
    grid-column: span 4 / span 4;
  }
  .aside {
    grid-column: span 1 / span 1;
    border-radius: 16px;
    border: 1px solid var(--stroke-color, rgba(154, 127, 127, 0.2));
    background: var(--bg-1, #fff);
    width: 100%;
    min-height: 80vh;
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 1rem;
    .menu-item {
      width: 100%;
      display: flex;
    }
    a {
      all: unset;
      display: inline-flex;
      padding: 8px 12px;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      transition: all 300ms;
      background: var(--button-outline-bg, #fff);
      color: var(--button-outline-color, #000);
      border: 1px solid var(--stroke-color, rgba(154, 127, 127, 0.2)) !important;
      cursor: pointer;
      align-self: stretch;
      width: 100%;
      text-align: left;
      &:hover {
        background: var(--button-outline-hover-bg, #cdcdcd);
        color: var(--button-outline-hover-color, #000);
      }
    }

    svg path {
      fill: #000;
    }
  }
  .top {
    grid-column: span 1 / span 1;
    border-radius: 16px;
    border: 1px solid var(--stroke-color, rgba(154, 127, 127, 0.2));
    background: var(--bg-1, #fff);
    width: 100%;
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 1rem;
    .menu-item {
      width: 100%;
      display: flex;
    }
    a {
      all: unset;
      display: inline-flex;
      padding: 8px 12px;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      transition: all 300ms;
      background: var(--button-outline-bg, #fff);
      color: var(--button-outline-color, #000);
      border: 1px solid var(--stroke-color, rgba(154, 127, 127, 0.2)) !important;
      cursor: pointer;
      align-self: stretch;
      width: 100%;
      text-align: left;
      &:hover {
        background: var(--button-outline-hover-bg, #cdcdcd);
        color: var(--button-outline-hover-color, #000);
      }
    }

    svg path {
      fill: #000;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .aside {
      flex-direction: row;
      border: none;
      overflow-x: auto;
      min-height: auto;
      gap: 2rem;
      .menu-item {
        width: max-content;
        flex-shrink: 0;
        a {
          flex-shrink: 0;
        }
      }
    }
  }
`;
return (
  <Grid className="">
    <div className="aside">
      {components.map((component, index) => renderMenuItem(component, index))}
    </div>
    <Wrapper className="main">
      <div
        style={{
          paddingLeft: "1rem",
        }}
        className="top d-flex justify-content-center"
      >
        <h3
          style={{
            padding: "0",
            margin: 0,
          }}
        >
          Library
        </h3>
      </div>
      {components.map((component, index) => renderComponent(component, index))}
    </Wrapper>
  </Grid>
);
