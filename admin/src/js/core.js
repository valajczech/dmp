// Main (core) functions

// Imports

import firebase from "firebase";
import "regenerator-runtime/runtime.js";

require("firebase/firestore");
var firebaseConfig = {
  projectId: "dmp-bures",
  storageBucket: "gs://dmp-bures.appspot.com",
};

firebase.initializeApp(firebaseConfig);
export var db = firebase.firestore();

export class Collections {
  static async getCollectionsList() {
    let collectionList = [];
    let query = await db
      .collection("albums")
      .where("albumName", "!=", " ")
      .get();
    query.docs.forEach((doc) => {
      collectionList.push(doc.data().albumName);
    });

    return collectionList;
  }
  static updateColectionList(newAlbumName) {
    // Add newAlbumName to the collection list
    db.collection("albums")
      .add({
        albumName: newAlbumName,
        connectedImages: [],
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //! bug - doesnt load new imageURL properly
  static referenceImageInAlbum(album, imageURL) {
    db.collection("albums")
      .doc(album)
      .set({
        name: album,
        connectedImages: [...imageURL], // Here
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
