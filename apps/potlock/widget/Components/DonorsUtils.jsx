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
const lastYear = currentTimestamp - oneDayTime * 365;

const getTimePassed = (timestamp, abbreviate) => {
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
    time = !abbreviate ? `${daysPassed} day${daysPassed === 1 ? "" : "s"}` : `${daysPassed}d`;
  } else if (hoursPassed > 0) {
    time = !abbreviate ? `${hoursPassed} hour${hoursPassed === 1 ? "" : "s"}` : `${hoursPassed}h`;
  } else if (minutesPassed > 0) {
    time = !abbreviate
      ? `${minutesPassed} minute${minutesPassed === 1 ? "" : "s"}`
      : `${minutesPassed}m`;
  } else {
    time = !abbreviate
      ? `${secondsPassed} second${secondsPassed === 1 ? "" : "s"}`
      : `${secondsPassed}s`;
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
  const donateAt = donation.donated_at_ms || donation.donated_at;

  switch (filter) {
    case "day":
      if (donateAt > yesterday) return true;
      return false;
    case "week":
      if (donateAt > lastWeek) return true;
      return false;
    case "month":
      if (donateAt > lastMonth) return true;
      return false;
    case "year":
      if (donateAt > lastYear) return true;
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
