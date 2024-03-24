import moment from "moment";

export const formatLocalTime = (utcTime) => {
  const localTime = moment.utc(utcTime).local();
  return localTime.format("h:mm ddd, MMM D");
};
