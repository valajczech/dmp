export const UrlLinks = {
  toUrl: (string) => {
    return String(string).toLowerCase().trim().replaceAll(" ", "-");
  },
  toText: (url) => {
    return String(url).toUpperCase().trim().replaceAll("-", " ");
  },
};
