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

export class Images {
  static async getAllImageUrls() {
    // Returns URL of every uploaded image, so it can be appended to the DOM
    let imgList = [];
    let query = await db.collection("uploadedPictures").get();
    query.forEach((img) => {
      imgList.push(img.data().imgPath);
    });
    return imgList;
  }
  static async getDetailedImageList() {
    let imgList = [];
    let query = await db.collection("uploadedPictures").get();
    query.forEach((img) => {
      imgList.push({
        name: img.data().imgName,
        src: img.data().imgPath,
      });
    });
    return imgList;
  }
}
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

  static async getDetailedCollectionList() {
    let detailedCollectionList = [];
    let query = await db
      .collection("albums")
      .where("albumName", "!=", " ")
      .get()
      .catch((err) => {
        console.error(err);
      });
    query.docs.forEach((doc) => {
      let uselessCounter = doc.data().connectedImages; // Can I do .lenght in oneliner?
      detailedCollectionList.push({
        albumName: doc.data().albumName,
        connectedImages: doc.data().connectedImages,
        numOfImages: uselessCounter.length,
        docID: doc.id,
      });
    });
    return detailedCollectionList;
  }
  static async updateColectionList(newAlbumName_ToCreate) {
    // Create and add newAlbumName to the collection list from Firestore
    await db
      .collection("albums")
      .doc(newAlbumName_ToCreate)
      .set({
        albumName: newAlbumName_ToCreate,
        connectedImages: [],
      })
      .catch((error) => {
        console.error(error);
      });
  }
  static async referenceImageInAlbum(album, imageURL) {
    // To each referenced album doc add imageURL of connected img
    await db
      .collection("albums")
      .doc(album)
      .update({
        connectedImages: firebase.firestore.FieldValue.arrayUnion(imageURL),
      })
      .catch((error) => {
        console.error(error);
      });
  }
  static async renameAlbum(oldAlbum, newALbumName) {
    // Since we cannot rename docID, in which is albumName stored,
    // workaround is that we clone oldALbum,
    // and create new with same data but new name.
    let oldOne = await db
      .collection("albums")
      .doc(oldAlbum)
      .get()
      .catch((err) => {
        console.error(err);
      });
    // Create a direct copy with new name
    await db
      .collection("albums")
      .doc(newAlbumName)
      .set({
        albumName: newALbumName,
        connectedImages: oldOne.connectedImages,
      })
      .catch((error) => {
        console.error(error);
      });
    // Delete the old album
    await this.deleteAlbum(oldAlbum);
  }
  static async deleteAlbum(albumName) {
    await db
      .collection("albums")
      .doc(albumName)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  }
}
