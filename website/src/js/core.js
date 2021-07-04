// Core functions for frontdend

//TODO: handle all error cases!
// Imports
import firebase from "firebase";
import "regenerator-runtime";

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
  static async saveCollectionsToLocalStorage() {
    localStorage.removeItem("Collections");
    let list = await this.getCollectionsList();
    Storage.saveToStorage(list);
  }
  static async getCollection(collectionURL) {
    //? Maybe should be refactored
    let query = await db
      .collection("albums")
      .doc(collectionURL)
      .get()
      .catch((err) => {
        console.error(err);
      });
    return query.data();
  }
}
export class Images {
  static imageLoop(arr, imgElementSrcAttr) {
    // Forever iterate through image array and set it as src attribute of image
    let count = 0;
    console.log("arr:", arr);
    // Set first image
    imgElementSrcAttr.setAttribute("src", arr[0].imgURL);
    //! TODO: perform transition effect
    setInterval(() => {
      if (count < arr.length) {
        imgElementSrcAttr.setAttribute("src", arr[count].imgURL);
        count += 1;
      } else {
        count = 0;
      }
    }, 2000);
  }
}
export class Storage {
  static saveToStorage(item) {
    localStorage.setItem("Collections", JSON.stringify(item));
  }
  static async getCollectionsFromStorage() {
    // console.log("here:", await JSON.parse(localStorage.getItem("Collections")));
    return await JSON.parse(localStorage.getItem("Collections"));
  }
}

export class UrlLinks {
  static transformToURL(string) {
    return new String(string).toLowerCase().trim().replaceAll(" ", "-");
  }
}
