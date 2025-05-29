export const dateFormatter = (date: Date | number | undefined) =>
  new Intl.DateTimeFormat("en-US").format(date);
