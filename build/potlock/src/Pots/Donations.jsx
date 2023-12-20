// get donations
const { potId } = props;

const donations = Near.view(potId, "get_donations", {});

if (!donations) return "Loading...";

return <div>{donations.length} Donations</div>;
