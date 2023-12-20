// get projects
const { potId } = props;

const projects = Near.view(potId, "get_approved_applications", {});

if (!projects) return "Loading...";

return <div>{projects.length} Projects</div>;
