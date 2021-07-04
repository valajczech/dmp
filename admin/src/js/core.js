// Main (core) functions

//TODO: handle all error cases!
// Imports

import firebase from "firebase";
import "regenerator-runtime/runtime.js";

require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyDaAIrhvH2h6IfWzeYtO0xkUxP5NOd9Bm8",
  authDomain: "dmp-bures.firebaseapp.com",
  projectId: "dmp-bures",
  storageBucket: "dmp-bures.appspot.com",
  messagingSenderId: "58363618586",
  appId: "1:58363618586:web:18b6f64d4b44fd7abd38a3",
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
      collectionList.push(doc.data().albumURL);
    });

    return collectionList;
  }

  static async getDetailedCollectionList() {
    let detailedCollectionList = [];
    let query = await db
      .collection("albums")
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
      .doc(UrlLinks.transformToURL(newAlbumName_ToCreate))
      .set({
        albumName: newAlbumName_ToCreate,
        connectedImages: [],
        albumURL: UrlLinks.transformToURL(newAlbumName_ToCreate),
      })
      .catch((error) => {
        console.error(error);
      });
  }
  static async referenceImageInAlbum(album, image) {
    // To each referenced album doc add imageURL of connected img
    await db
      .collection("albums")
      .doc(UrlLinks.transformToURL(album))
      .update({
        connectedImages: firebase.firestore.FieldValue.arrayUnion(image),
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
      .doc(UrlLinks.transformToURL(albumName))
      .delete()
      .catch((error) => {
        console.error(error);
      });
  }
}

export class UrlLinks {
  static transformToURL(string) {
    return new String(string).toLowerCase().trim().replaceAll(" ", "-");
  }
  static transformToText(string) {
    return new String(string).toUpperCase().trim().replaceAll("-", " ");
  }
}
