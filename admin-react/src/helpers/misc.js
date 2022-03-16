export const UrlLinks = {
  toUrl: (string) => {
    return new String(string).toLowerCase().trim().replaceAll(" ", "-");
  },
  toText: (url) => {
    return new String(url).toUpperCase().trim().replaceAll("-", " ");
  },
};
