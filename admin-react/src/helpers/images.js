import { db } from "../firebase";
import {
  doc,
  collection,
  deleteDoc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import date from "date-and-time";
import { Collections } from "./collections";

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
      } else if (number >= 1048576 && number < 1073741824) {
        return (number / 1048576).toFixed(1) + "MB";
      } else if (number >= 1073741824) {
        return (number / 1073741824).toFixed(1) + "GB";
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
    mostLikedImage: async () => {
      let res = new Array();
      let q = await getDocs(query(imagesRef, orderBy("total_likes", "desc"), limit(1)));
      q.forEach((img) => {
        res.push(img.data());
      });
      return res[0];
    },
  },
  Image: {
    addCollection: async (colId, colName, imgId) => {
      // Adds collection to image collections array
      await updateDoc(doc(db, "uploadedPictures", imgId), {
        collections: arrayUnion({
          id: colId,
          name: colName,
        }),
      });
    },
    delete: async (imgId, imgSrc) => {
      // Delete img from Firestore
      // Delete img from Storage
      const storage = getStorage();
      const storageRef = ref(storage, "gs://dmp-bures.appspot.com/" + imgId);
      try {
        await deleteObject(storageRef);
        await deleteDoc(doc(db, "uploadedPictures", imgId));
      } catch (error) {
        console.error(error);
      }
      //TODO: Delete IMG from every collection it was in
      const q = query(
        collection(db, "albums"),
        where("connectedImages", "array-contains", {
          imageId: imgId,
          imageSrc: imgSrc,
        })
      );
      let snap = await getDocs(q);
      snap.forEach(async (item) => {
        await updateDoc(doc(db, "albums", item.id), {
          connectedImages: arrayRemove({
            imageId: imgId,
            imageSrc: imgSrc,
          }),
        });
      });
    },
    Update: {
      downloadURL: async (imgId, downloadURL) => {
        // This function is used when uploading the image to the storage bcs I wansnt able to get
        // imgId and download URL at the same time so thats why this function exists.
        // Take a look at implementation and you'll understand.
        await updateDoc(doc(db, "uploadedPictures", imgId), {
          url: downloadURL,
        });
      },
      name: async (imgId, newName, oldName) => {
        await updateDoc(doc(db, "uploadedPictures", imgId), {
          name: newName || oldName,
        });
      },
      description: async (imgId, newDesc, oldDesc) => {
        await updateDoc(doc(db, "uploadedPictures", imgId), {
          description: newDesc || oldDesc,
        });
      },
    },
    removeCollection: async (colId, colName, imgId) => {
      // Removes collection from image collections array
      await updateDoc(doc(db, "uploadedPictures", imgId), {
        collections: arrayRemove({
          id: colId,
          name: colName,
        }),
      });
    },
    uploadToFirestore: async (data) => {
      const newImageRef = doc(imagesRef);
      await setDoc(newImageRef, {
        id: newImageRef.id,
        name: data.name,
        description: "",
        size: data.size,
        type: data.type,
        url: "",
        uploadDate: date.format(new Date(), "ddd, MMM DD YYYY"),
        total_likes: 0,
        collections: [],
      });

      return newImageRef.id;
    },
  },
};