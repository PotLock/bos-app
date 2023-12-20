// get settings
const { potId } = props;

const config = Near.view(potId, "get_config", {});

if (!config) return "Loading...";

return <div style={{ maxWidth: "80vw", wordWrap: "break-word" }}>{JSON.stringify(config)}</div>;
