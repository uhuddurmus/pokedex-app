

export const Capitalize = (s?: string) => {
  if (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return "";
};
