// Get the current date in the local time zone
const currentDate = new Date();

// Calculate the time zone offset in milliseconds
let localTimeZoneOffsetMinutes = currentDate.getTimezoneOffset();
localTimeZoneOffsetMinutes = localTimeZoneOffsetMinutes * 60 * 1000;

const oneDayTime = 24 * 60 * 60 * 1000;
const currentTimestamp = new Date().getTime();

const yesterday = currentTimestamp - oneDayTime;
const lastWeek = currentTimestamp - oneDayTime * 7;
const lastMonth = currentTimestamp - oneDayTime * 30;

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

const _address = (address, max) => {
  const limit = max || 10;
  if (address.length > limit) return address.slice(0, limit) + "...";
  else return address;
};

const reverseArr = (input) => {
  var ret = new Array();
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
};

const calcNetDonationAmount = (donation) => {
  const lastDonationAmount = Big(
    donation.total_amount - (donation.referrer_fee || 0) - (donation.protocol_fee || 0)
  ).div(Big(1e24));
  return parseFloat(lastDonationAmount);
};

const filterByDate = (filter, donation) => {
  switch (filter) {
    case "day":
      if (donation.donated_at_ms > yesterday) return true;
      return false;
    case "week":
      if (donation.donated_at_ms > lastWeek) return true;
      return false;
    case "month":
      if (donation.donated_at_ms > lastMonth) return true;
      return false;
    case "all":
      return true;

    default:
      return true;
  }
};

return {
  getTimePassed,
  filterByDate,
  _address,
  reverseArr,
  calcNetDonationAmount,
};
