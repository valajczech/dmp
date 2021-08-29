// Main (core) functions

// TODO: handle all error cases!
//! Note: After the final release, please spend some time with refactoring and
//! code optimization and readability, because this is quite the mess and
//! could be done better. Thanks. -- valajczech

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
  static async getTotalNumberOfImages() {
    let query = await db
      .collection("uploadedPictures")
      .get()
      .catch((err) => {
        console.error(err);
      });
    return query.docs.length;
  }
  static async getAllImageUrls() {
    // Returns URL of every uploaded image, so it can be appended to the DOM
    let imgList = [];
    let query = await db.collection("uploadedPictures").get();
    query.forEach((img) => {
      imgList.push(img.data().imgURL);
    });
    return imgList;
  }
  static async getDetailedImageList() {
    let imgList = [];
    let query = await db.collection("uploadedPictures").get();
    query.forEach((img) => {
      imgList.push({
        docID: img.id,
        name: img.data().imgName,
        description: img.data().imgDescription,
        src: img.data().imgURL,
        albums: img.data().imgAlbums,
        isInMainpageSlideshow: img.data().isInMainpageSlideshow,
        uploadDate: img.data().uploadDate,
      });
    });
    return imgList;
  }

  static async updateImageNameAndDesc(docID, newName, newDesc) {
    db.collection("uploadedPictures")
      .doc(docID)
      .update({
        imgName: newName,
        imgDescription: newDesc,
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async addImageAlbum(docID, albumName) {
    await db
      .collection("uploadedPictures")
      .doc(docID)
      .update({
        imgAlbums: firebase.firestore.FieldValue.arrayUnion(albumName),
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
export class Collections {
  static async getTotalNumOfCollections() {
    let query = await db
      .collection("albums")
      .get()
      .catch((err) => {
        console.error(err);
      });
    return query.docs.length;
  }
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
    //! TODO: add dateTime info about the album
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
        connectedImages: firebase.firestore.FieldValue.arrayUnion({
          imgDocID: image.docID,
          imgName: image.name,
          imgURL: image.src,
        }),
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
  static async removeImageFromAlbum(imageObject, albumObject) {
    console.log("the id:", imageObject);
    await db
      .collection("albums")
      .doc(albumObject.docID)
      .update({
        connectedImages: firebase.firestore.FieldValue.arrayRemove({
          imgDocID: imageObject.docID,
          imgName: imageObject.name,
          imgURL: imageObject.src,
        }),
      })
      .catch((err) => {
        console.error(err);
      });
    await db
      .collection("uploadedPictures")
      .doc(imageObject.docID)
      .update({
        imgAlbums: firebase.firestore.FieldValue.arrayRemove(albumObject.docID),
      })
      .catch((err) => {
        console.error(err);
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

export class Users {
  static async login(email, password) {
    // Login (sign up) existing users into the system
    //! TODO: rewrite this so client can use only username and doesnt have to use email!
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = firebase.auth().currentUser;
        // Set currentUser so we can use it in user popup
        localStorage.setItem("currentUser", JSON.stringify(user.email));
        window.location.replace("/dashboard");
        // ...
      })
      .catch((error) => {
        //!(todo) HANDLE THIS !!!
        /*var errorCode = error.code;
        var errorMessage = error.message; */
        console.log(
          "This user either doesnt exist or provided credentials are wrong"
        );
        alert("You have entered wrong credentials!");
      });
  }
  static async logout() {
    // User logout function
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("currentUser", JSON.stringify(""));
        window.location.replace("/");
      });
  }
  static attachAuthObserver() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // Redirect based on location when signed in
        if (window.location.pathname == "/") {
          window.location.replace("/dashboard");
        }
      } else {
        if (window.location.pathname != "/") {
          window.location.replace("/");
        }
      }
    });
  }
}

export class MainPageSlideshow {
  static async add(imageObjectReference) {
    /* await db
      .collection("settings")
      .doc("mainpage_slideshow")
      .update({
        selected_images:
          firebase.firestore.FieldValue.arrayUnion(imageObjectReference),
      })
      .catch((err) => {
        console.error(err);
      });*/
    // Set the `isInMainpageSlideshow` to true
    await db
      .collection("uploadedPictures")
      .doc(imageObjectReference.docID)
      .update({
        isInMainpageSlideshow: true,
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async remove(imageObjectReference) {
    // Remove either previously selected image from slideshow.
    //! BUG, it doesnt remove the imageObject from the array in `mainpage_slideshow` doc
    /* await db
      .collection("settings")
      .doc("mainpage_slideshow")
      .update({
        selected_images: 
          firebase.firestore.FieldValue.arrayRemove(imageObjectReference.src),
      })
      .catch((err) => {
        console.error(err);
      });*/
    // Set the `isInMainpageSlideshow` to false
    await db
      .collection("uploadedPictures")
      .doc(imageObjectReference.docID)
      .update({
        isInMainpageSlideshow: false,
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async getSlideshowInterval() {
    return await (
      await db.collection("settings").doc("mainpage_slideshow").get()
    ).data().image_interval;
  }
  static async setSlideshowInterval(interval) {
    await db
      .collection("settings")
      .doc("mainpage_slideshow")
      .update({
        image_interval: Number(interval),
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
export const Analytics = {
  Visitors: {
    getTotal: async () => {
      // Get total number of all time visitors
      let query = await db
        .collection("analytics")
        .doc("visitors")
        .get()
        .catch((err) => {
          console.error(err);
        });
      return query.data().total;
    },
  },
  Likes: {
    getMostLikedImage: async () => {
      let query = await db
        .collection("uploadedPictures")
        .where("total_likes", "!=", "undefined")
        .orderBy("total_likes", "desc")
        .get()
        .catch((error) => {
          console.error(error);
        });
      return {
        imgName: query.docs[0].data().imgName,
        imgURL: query.docs[0].data().imgURL,
        total_likes: query.docs[0].data().total_likes,
      };
    },
  },
};
