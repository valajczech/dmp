import { UrlLinks } from "./misc";
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
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// Refs
const collectionsRef = collection(db, "albums");

export const Collections = {
  Get: {
    detailedCollectionList: async () => {
      let res = new Array();
      const query = await getDocs(collectionsRef);
      query.forEach((doc) => {
        res.push(doc.data());
      });
      return res;
    },
  },
  createNew: async (data) => {
    let timeId = Date.now().toString();
    await setDoc(
      doc(db, "albums", timeId),
      collectionConverter.toFirestore(data, timeId)
    );
  },
  delete: async (collectionID) => {
    await deleteDoc(doc(db, "albums", collectionID));
  },
  Collection: {
    addImage: async (collectionId, imageId, imageSrc) => {
      // Adds image ref to collections connectedImages array
      await updateDoc(doc(db, "albums", collectionId), {
        connectedImages: arrayUnion({
          imageId: imageId,
          imageSrc: imageSrc,
        }),
      });
    },
    removeImage: async (collectionId, imageId) => {
      // Removes image ref from collections connectedImages array
   
    },
  },
};

const collectionConverter = {
  fromFirestore: {},
  toFirestore: (data, id) => {
    return {
      id: id,
      name: data.collectionName,
      url: UrlLinks.toUrl(data.collectionName),
      connectedImages: [],
    };
  },
};
