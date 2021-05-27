// Main (core) functions
// Collection list is fetched from Firebase and then loaded into
// collectionList Array.
// `updateCollectionList` updated Firebase list as well as local

// Variables
let collectionList = [];
export class ImageManipulations {
  static getCollectionsList() {
   // Get existing collections from Firebase Firestore
    return collectionList;
  }
  static updateColectionList(newAlbumName) {
    collectionList.push(newAlbumName);
  }
}