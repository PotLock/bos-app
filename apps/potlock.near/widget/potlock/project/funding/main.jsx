// add funding infromation like progress bar
const fundingToDate = props.fundingToDate ?? 0; // should pull from funding contracts
return (
  <div>
    <h2>Funding Information</h2>
    <p>Funding to Date: {fundingToDate}</p>
  </div>
);
