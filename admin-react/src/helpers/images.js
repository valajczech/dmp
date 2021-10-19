import { db } from "../firebase";
import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";

// Refs
const imagesRef = collection(db, "uploadedPictures");

export const Images = {
  Meta: {
    /**
     * @param {*} File File that is uploaded to `input` element
     * @returns {bool} `true` if the file is type of image
     */
    isImage: (file) => {
      // Determine whether uploaded file is image filetype
      if (file["type"].split("/")[0] === "image") {
        return true;
      } else return false;
    },
    /**
     * @returns Size with correct postfix
     */
    returnFileSize: (number) => {
      if (number < 1024) {
        return number + "bytes";
      } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + "KB";
      } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + "MB";
      }
    },
  },
  Get: {
    detailedImageList: async () => {
      let res = new Array();
      let query = await getDocs(imagesRef);
      query.forEach((doc) => {
        res.push(doc.data());
      });
      return res;
    },
  },
};
/*
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {+
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

*/
