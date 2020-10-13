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
  var hours = newDate.getHours();
  var minutes = newDate.getMinutes();
  hours = hours <= 9 ? "0" + hours : hours;
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  var time = hours + ":" + minutes;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return militaryToAmPm(time) + " " + newDate.toDateString(options);
};

export const LocalTimeToUTC = (localTime) => {
  var date = new Date();
  var offsetInHours = date.getTimezoneOffset() / 60;
  var hours = localTime.split(":")[0];
  var hoursInUTC = (parseInt(hours) + offsetInHours) % 24;
  return hoursInUTC + ":" + localTime.split(":")[1];
};

export const LocalDateToUTC = (date) => {
  return date.toISOString();
};

export const UTCTimeToLocal = (utcTime) => {
  var date = new Date();
  var utcHours = utcTime.split(":")[0];
  var utcMinutes = utcTime.split(":")[1];
  var offsetInHours = date.getTimezoneOffset() / 60;
  var hoursInLocal = (24 + parseInt(utcHours) - offsetInHours) % 24;
  return militaryToAmPm(hoursInLocal + ":" + utcMinutes);
};

export const militaryToAmPm = (militaryTime) => {
  var hour = militaryTime.split(":")[0];
  var minutes = militaryTime.split(":")[1];
  var suffix = hour >= 12 ? "PM" : "AM";
  if(hour > 0 && hour <= 12)
  {
    hour = hour;
  }
  else if(hour - 12)
  {
    hour -= 12;
  }
  else if(hour == 0)
  {
    hour = 12;
  }
  return hour + ":" + minutes + " " + suffix;
};
