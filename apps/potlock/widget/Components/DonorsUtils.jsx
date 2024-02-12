// Get the current date in the local time zone
const currentDate = new Date();

// Calculate the time zone offset in milliseconds
let localTimeZoneOffsetMinutes = currentDate.getTimezoneOffset();
localTimeZoneOffsetMinutes = localTimeZoneOffsetMinutes * 60 * 1000;

const currentTimestamp = new Date().getTime();

const getTimePassed = (timestamp) => {
  // Calculate the difference in milliseconds
  const timePassed = currentTimestamp - timestamp;

  // Convert milliseconds to seconds, minutes, hours, etc.
  const secondsPassed = Math.floor(timePassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);

  let time = 0;

  // Display the time passed conditionally
  if (daysPassed > 0) {
    time = `${daysPassed} days`;
  } else if (hoursPassed > 0) {
    time = `${hoursPassed} hours`;
  } else if (minutesPassed > 0) {
    time = `${minutesPassed} minutes`;
  } else {
    time = `${secondsPassed} seconds`;
  }
  return time;
};

const _address = (address, max, limit) => {
  if (address.length > max || 20) return address.slice(0, limit || 10) + "...";
  else return address;
};

const reverseArr = (input) => {
  var ret = new Array();
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
};

const calcDonations = (donation) => {
  const lastDonationAmount = Big(
    donation.total_amount - (donation.referrer_fee || 0) - (donation.protocol_fee || 0)
  ).div(Big(1e24));
  return parseFloat(lastDonationAmount);
};

return {
  getTimePassed,
  _address,
  reverseArr,
  calcDonations,
};
