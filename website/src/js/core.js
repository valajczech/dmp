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
    return {
      albumName: query.data().albumName,
      albumURL: query.data().albumURL,
      connectedImages: query.data().connectedImages,
      itemCount: query.data().connectedImages.length
    }
  }
}
export class Images {
  static async getSlideshowInterval() {
    return await (
      await db.collection("settings").doc("mainpage_slideshow").get()
    ).data().image_interval;
  }
  static async addLike(imgObject) {
    console.log(imgObject);
    await db
      .collection("uploadedPictures")
      .doc(imgObject.imgDocID)
      .update({
        total_likes: firebase.firestore.FieldValue.increment(1),
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async removeLike(imageObject) {
    await db
      .collection("uploadedPictures")
      .doc(imageObject.imgDocID)
      .update({
        total_likes: firebase.firestore.FieldValue.increment(-1),
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async imageLoop(arr, imgElementSrcAttr) {
    let interval = await this.getSlideshowInterval();
    // Forever iterate through image array and set it as src attribute of image
    let count = 0;
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
    }, interval * 1000);
  }
  static async getSlideshowImages() {
    // Returns URL of every uploaded image, so it can be appended to the DOM
    let imgList = [];
    let query = await db.collection("uploadedPictures").get();
    query.forEach((img) => {
      if (img.data().isInMainpageSlideshow) {
        imgList.push({
          imgURL: img.data().imgURL,
        });
      }
    });
    return imgList;
  }
  /**
   * Returns specific image info
   * @param {string} imageID DocID from the Firebase Firestore ollection
   * @returns {object} Object with the following properties: imgName, imgDesc, imgSrc
   */
  static async getImage(imageID) {
    let query = await db
      .collection("uploadedPictures")
      .doc(imageID)
      .get()
      .catch((err) => console.error(err));
    return {
      imgName: query.data().imgName,
      imgDesc: query.data().imgDescription,
      imgSrc: query.data().imgURL,
      totalLikes: query.data().total_likes,
    };
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

// So this is a namespace, is it better than classes or not?
// Probably yes, but I'll have to rewrite the whole project :D
export const Analytics = {
  Visitors: {
    addNew: async function () {
      let query = await db
        .collection("analytics")
        .doc("visitors")
        .update({
          total: firebase.firestore.FieldValue.increment(1),
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
