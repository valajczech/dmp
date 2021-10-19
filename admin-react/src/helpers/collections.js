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
const collectionsRef = collection(db, "albums");

export const Collections = {
  Get: {
    detailedCollectionList: async () => {
      let res = new Array();
      const query = await getDocs(collectionsRef);
      query.forEach((doc) => {
        res.push(
          doc.data()
        )
      })
      return res;
    }
  },
};
