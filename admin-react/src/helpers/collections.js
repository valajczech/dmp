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
    await deleteDoc(doc(db, "albums", collectionID))
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
