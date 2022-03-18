import { UrlLinks } from "./misc";
import { db } from "../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Refs
const collectionsRef = collection(db, "albums");

export const Collections = {
  Get: {
    detailedCollectionList: async () => {
      let res = [];
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
  delete: async (collectionID, collectionName) => {
    // Delete collections itself
    await deleteDoc(doc(db, "albums", collectionID));
    // Delete this collection from img albums array containing this collection
    const q = query(
      collection(db, "uploadedPictures"),
      where("imgAlbums", "array-contains", {
        id: collectionID,
        name: collectionName,
      })
    );

    let snap = await getDocs(q);
    snap.forEach(async (item) => {
      await updateDoc(doc(db, "uploadedPictures", item.id), {
        imgAlbums: arrayRemove({
          id: collectionID,
          name: collectionName,
        }),
      });
    });

    /*
    
    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    
    */
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
    removeImage: async (collectionId, imgId, imgSrc) => {
      // Removes image ref from collections connectedImages array
      await updateDoc(doc(db, "albums", collectionId), {
        connectedImages: arrayRemove({
          imageId: imgId,
          imageSrc: imgSrc,
        }),
      });
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
