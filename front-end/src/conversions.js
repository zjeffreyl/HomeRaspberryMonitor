export const minutesToString = (minutes) => {
  var hourInMinutes = 60;
  var hours = minutes / hourInMinutes;
  if (hours >= 1) {
    return hours + " hours";
  } else {
    return minutes + " minutes";
  }
};

export const timeToIntegerMinutes = (line) => {
  var number = parseInt(line.split(" ")[0]);
  var unit = line.split(" ")[1];
  switch (unit) {
    case "minutes":
      return number;
    case "hour":
    case "hours":
      return number * 60;
    case "day":
    case "days":
      return number * 60 * 24;
    default:
      return 0;
  }
};

export const UTCDefaultToLocalTimeZone = (time) => {
  var date = new Date(time);
  var offset = date.getTimezoneOffset();
  var newDate = new Date(date.getTime() - offset * 60 * 1000); //date conversion
  var year = newDate.getFullYear();
  var month = newDate.getMonth() + 1;
  var num_date = newDate.getDate();
  var hours = newDate.getHours();
  var minutes = newDate.getMinutes();
  hours = hours <= 9 ? "0" + hours : hours;
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  var dash = "-";
  return `${year}${dash}${
    month < 10 ? `0${month}` : `${month}`
  }${dash}${num_date} ${hours}:${minutes}`;
};

export const LocalTimeToUTC = (time) => {
  var date = new Date();
  var offsetInHours = date.getTimezoneOffset() / 60;
  var hours = time.split(":")[0];
  var hoursInUTC = (parseInt(hours) + offsetInHours) % 24;
  return hoursInUTC + ":" + time.split(":")[1];
};
export const getLocalTime = (date) => {
  console.log(date);
  return date.toLocaleTimeString([], { hour: "2-digit", minutes: "2-digit" });
};
