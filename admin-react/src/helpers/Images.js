export const Images = {
  Filetype: {
    isImage: (file) => {
      // Determine whether uploaded file is image filetype
      if (file["type"].split("/")[0] === "image") {
        return true;
      } else return false;
    },
  },
};
