// Helper functions for manipulation with localStorage data
export const Storage = {
  clear: () => {
    localStorage.clear();
  },
  Images: {
    clear: () => localStorage.removeItem("Images"),
    get: () => {},
    set: (imageList) => {
      localStorage.setItem("Images", JSON.stringify(imageList));
    },
  },
  Collections: {
    clear: () => localStorage.removeItem("Collections"),
    get: () => {},
    set: (collectionList) => {
      localStorage.setItem("Collections", JSON.stringify(collectionList));
    },
  },
  Analytics: {
    clear: () => localStorage.removeItem("Analytics"),
    get: () => {
      return localStorage.getItem("Analytics");
    },
    set: (analyticsObject) => {
      localStorage.setItem("Analytics", JSON.stringify(analyticsObject));
    },
  },
};
