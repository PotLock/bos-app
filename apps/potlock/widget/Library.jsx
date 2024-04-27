const { Button, TipOnPotlock } = VM.require("potlock.near/widget/Components.ui.Button") || {
  Button: () => <></>,
  TipOnPotlock: () => <></>,
};
// states
const [checked, setChecked] = useState(false);
const ButtonPreview = (
  <div>
    <div className="d-flex align-items-center gap-3 mb-3">
      <Button variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
        Outline
      </Button>
      <Button variant="primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
        Primary
      </Button>
      <Button variant="standard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
        Standard
      </Button>
      <Button variant="tonal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
        Tonal
      </Button>
      <Button variant="brand-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
        Brand Outline
      </Button>
    </div>
    <div className="d-flex align-items-center gap-3 mb-3">
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
    <div className="d-flex align-items-center gap-3 mb-3">
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
  return (
      <Button
        onClick={(e) => {
          if (props.disabled || !props.onClick) return;
          if (props.stopPropagation) e.stopPropagation();
          e.preventDefault();
          props.onClick(e);
        }}
        style={{ ...props.style }}
        target={props.target}
        variant="outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.375 9.5625C14.6925 7.455 16.875 5.4825 16.875 3.7875C16.875 2.4 15.7875 1.3125 14.4 1.3125C13.62 1.3125 12.8625 1.68 12.375 2.25C11.88 1.68 11.13 1.3125 10.35 1.3125C8.9625 1.3125 7.875 2.4 7.875 3.7875C7.875 5.4825 10.0575 7.455 12.375 9.5625ZM10.35 2.8125C10.68 2.8125 11.0175 2.97 11.235 3.225L12.375 4.5675L13.515 3.225C13.7325 2.97 14.07 2.8125 14.4 2.8125C14.955 2.8125 15.375 3.2325 15.375 3.7875C15.375 4.6275 13.845 6.165 12.375 7.53C10.905 6.165 9.375 4.62 9.375 3.7875C9.375 3.2325 9.795 2.8125 10.35 2.8125Z"
            fill="#DBDBDB"
          />
          <path
            d="M14.625 11.8125H13.125C13.125 10.9125 12.5625 10.1025 11.7225 9.7875L7.1025 8.0625H1.125V16.3125H5.625V15.2325L10.875 16.6875L16.875 14.8125V14.0625C16.875 12.8175 15.87 11.8125 14.625 11.8125ZM2.625 14.8125V9.5625H4.125V14.8125H2.625ZM10.8525 15.12L5.625 13.6725V9.5625H6.8325L11.1975 11.19C11.4525 11.2875 11.625 11.535 11.625 11.8125C11.625 11.8125 10.1325 11.775 9.9 11.7L8.115 11.1075L7.6425 12.5325L9.4275 13.125C9.81 13.2525 10.2075 13.32 10.6125 13.32H14.625C14.9175 13.32 15.18 13.4925 15.3 13.74L10.8525 15.12Z"
            fill="#DBDBDB"
          />
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.35199 1H10.6497C10.7929 1 10.903 1 10.9987 1.01042C11.4235 1.05593 11.8181 1.25185 12.1111 1.56281C12.4042 1.87376 12.5764 2.27925 12.5966 2.70605C12.9787 2.82125 13.3143 3.05502 13.5547 3.37354C13.7952 3.69207 13.928 4.07882 13.9341 4.47786C14.3255 4.59507 14.6634 4.78065 14.9395 5.07888C15.3641 5.53795 15.4956 6.10251 15.5008 6.76279C15.5054 7.39768 15.3927 8.19991 15.2521 9.19554L14.9656 11.2233C14.8562 12.002 14.767 12.635 14.6283 13.1305C14.4831 13.6495 14.2688 14.076 13.8729 14.4042C13.4796 14.7298 13.0134 14.8698 12.4625 14.9362C11.9292 15 11.2585 15 10.4244 15H6.57729C5.7425 15 5.0718 15 4.53915 14.9362C3.98761 14.8698 3.52138 14.7298 3.12808 14.4042C2.73217 14.076 2.51794 13.6488 2.37273 13.1305C2.23403 12.635 2.14482 12.002 2.03478 11.2226L1.74892 9.19554C1.60892 8.19926 1.49496 7.39768 1.50017 6.76279C1.50538 6.10251 1.63692 5.53795 2.06147 5.07888C2.33757 4.78065 2.67487 4.59572 3.06622 4.47786C3.07249 4.07885 3.20552 3.69218 3.44608 3.37378C3.68664 3.05538 4.02224 2.82175 4.40436 2.7067C4.42446 2.27979 4.59659 1.87414 4.88965 1.56305C5.1827 1.25196 5.57736 1.05595 6.00231 1.01042C6.09803 1 6.20808 1 6.35068 1M4.0651 4.3066C4.66808 4.25581 5.4065 4.25581 6.29664 4.25581H10.7037C11.5932 4.25581 12.3316 4.25581 12.9352 4.3066C12.8902 4.10719 12.7786 3.92906 12.6188 3.80148C12.459 3.67391 12.2606 3.6045 12.0562 3.60465H4.94482C4.5092 3.60465 4.15561 3.9107 4.0664 4.3066M10.8951 1.98195C11.2533 2.01972 11.5365 2.2867 11.6062 2.62791H5.39608C5.43063 2.45861 5.51815 2.3047 5.64599 2.18845C5.77383 2.0722 5.93534 1.99965 6.10715 1.9813C6.14361 1.9774 6.19571 1.97674 6.37868 1.97674H10.623C10.8053 1.97674 10.8574 1.9774 10.8945 1.9813M2.77906 5.74177C2.97636 5.52884 3.27264 5.38754 3.84892 5.3107C4.43561 5.23256 5.22157 5.23191 6.33375 5.23191H10.6679C11.7801 5.23191 12.566 5.23321 13.1527 5.3107C13.729 5.38754 14.0253 5.52884 14.2226 5.74177C14.4153 5.95014 14.5202 6.2334 14.5241 6.76995C14.528 7.32344 14.4264 8.05274 14.2792 9.09851L14.0038 11.052C13.8879 11.8731 13.8071 12.4409 13.688 12.8668C13.5727 13.277 13.4379 13.4952 13.2498 13.6508C13.059 13.8097 12.8024 13.9113 12.3459 13.966C11.8778 14.022 11.2663 14.0226 10.3925 14.0226H6.6092C5.73533 14.0226 5.12389 14.022 4.65571 13.966C4.19989 13.9106 3.94268 13.8097 3.75189 13.6514C3.56371 13.4952 3.42892 13.2764 3.31366 12.8668C3.1945 12.4409 3.11375 11.8731 2.99785 11.052L2.7224 9.09851C2.57524 8.0534 2.47366 7.32344 2.47757 6.76995C2.48147 6.2334 2.58631 5.94949 2.77906 5.74177Z"
            fill="white"
          />
        </svg>{" "}
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
