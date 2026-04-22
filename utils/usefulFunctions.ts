export const getLocalDateTimeString = (timestamp?: number): string => {
  let date: Date;

  if (timestamp === undefined) {
    date = new Date();
  } else if (!timestamp) {
    return '';
  } else {
    date = new Date(timestamp);
  }

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};
