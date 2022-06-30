export const sanitize = (str) =>
  str
    .toString()
    .toLowerCase()
    .replace(/([^a-z0-9.]+)/gi, "-"); // Only allow numbers and aplhanumeric.
