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

const visitorsDocRef = doc(db, "analytics", "visitors");
const imagesRef = collection(db, "uploadedPictures");
const collectionsRef = collection(db, "albums");

export const Analytics = {
  getSummaryData: async () => {
    return {
      total_visitors: await Analytics.Visitors.getTotal(),
      total_collections:
        await Analytics.Collections.getTotalNumberOfCollections(),
      total_images: await Analytics.Images.getTotalNumberOfImages(),
    };
  },
  Visitors: {
    getTotal: async () => {
      return await (await getDoc(visitorsDocRef)).data().total;
    },
  },
  Likes: {
    getMostLikedImage: async () => {
      let res = new Array();
      let q = query(
        imagesRef,
        where("total_likes", "!=", "undefined"),
        orderBy("total_likes", "desc"),
        limit(1)
      );
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // TODO: create a object converter
        // I'll build this when I'm on image manipulation
        res.push({
          imgName: doc.data().imgName,
          imgURL: doc.data().imgURL,
          totalLikes: doc.data().total_likes,
        });
      });
      return res;
    },
  },
  Images: {
    getTotalNumberOfImages: async () => {
      return await (
        await getDocs(imagesRef)
      ).size;
    },
    getTotalSize: async () => {
      let total = new Number();
      const q = query(collection(db, "uploadedPictures"));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        //? Handle that the size is represented by a string
        //? Can look like so: "15MB" but also "14.5KB"  - need to handle this!
        //! Or just rewrite the upload script so it represents raw value
        //! And then just  convert it using Images.Meta.returnFileSze()
        //! I'll do that.
        let newSizeRecord = doc.data().size; //debug
        total = total + doc.data().size;
      });
      return total;
    },
  },
  Collections: {
    getTotalNumberOfCollections: async () => {
      return await (
        await getDocs(collectionsRef)
      ).size;
    },
  },
};
