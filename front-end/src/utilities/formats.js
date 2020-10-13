export const bitsToPs = (bits) => {
  if (typeof bits != "number") {
    return "No Data yet";
  }
  var mbps = bits / 1000000;
  var kbps = bits / 1000;
  const sizes = ["Mbps", "Kbps"];
  return mbps >= 1.0 ? mbps.toFixed(2) + " Mbps" : kbps.toFixed(2) + " Kbps";
};

export const roundByN = (num, n) => {
  if (num > 0) {
    return num.toFixed(n) + " ms";
  }
  return "No Data yet";
};

export const formatDate = (date) => {
  if (date === "") {
    return "No Data Yet";
  }
  if (date !== -1) {
    const options_date = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    date = new Date(date);
    var timeFormat = date.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "2-digit",
    });
    var dateFormat = date.toLocaleDateString(options_date);
    return timeFormat + " " + dateFormat;
  }
  return "";
};

export const formatDateToPathString = (date) => {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const hour = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(date);
  const minute = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(
    date
  );
  const second = new Intl.DateTimeFormat("en", { second: "2-digit" }).format(
    date
  );
  return `${ye}-${mo}-${da} ${hour}:${minute}:${second}`;
};
