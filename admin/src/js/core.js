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
    // Get all already existing albums from Firestore
    let collectionList = [];
    let query = await db
      .collection("albums")
      .where("albumName", "!=", " ")
      .get()
      .catch((err) => {
        console.log(err);
      });
    query.docs.forEach((doc) => {
      collectionList.push(doc.data().albumName);
    });

    return collectionList;
  }
  static updateColectionList(newAlbumName) {
    // Create and add newAlbumName to the collection list from Firestore
    db.collection("albums")
      .doc(newAlbumName)
      .set({
        albumName: newAlbumName,
        connectedImages: [],
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //! bug - doesnt load new imageURL properly
  static async referenceImageInAlbum(album, imageURL) {
    // To each referenced album doc add imageURL of connected img
    console.log("update here: ", album);
    await db
      .collection("albums").doc(album).update({
        connectedImages: firebase.firestore.FieldValue.arrayUnion(imageURL)
      })
  }
}

