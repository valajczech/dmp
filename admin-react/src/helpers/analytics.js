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
      total_collections: await Analytics.Collections.getTotalNumberOfCollections(),
      total_images: await Analytics.Images.getTotalNumberOfImages()
    }
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
      return await (await getDocs(imagesRef)).size;
    }
  }, 
  Collections: {
    getTotalNumberOfCollections: async () => {
      return await (await getDocs(collectionsRef)).size;
    }
  }
};

