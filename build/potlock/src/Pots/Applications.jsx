// get applications
const { potId } = props;

const applications = Near.view(potId, "get_applications", {});

if (!applications) return "Loading...";

return <div>{applications.length} Applications</div>;
