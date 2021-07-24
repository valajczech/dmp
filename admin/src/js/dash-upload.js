// IMPORT
import "../css/dash-upload.css";
import { imagePreview } from "../components/imgPreview.js";
import "regenerator-runtime/runtime.js";

// Input
const dropzone = document.querySelector(".upload-input");
// Image preview
const preview = document.querySelector(".images");
// No items uploaded msg
const para = document.querySelector(".para");

/*Array for locally uplaoded images*/
let locallyUploaded = [];

// Firebase init
import firebase from "firebase";
import "firebase/firebase-storage";
require("firebase/firestore");

import { Collections, db, UrlLinks } from "./core";

class Upload {
  static isFileImage(file) {
    // Determine whether uploaded file is image filetype
    if (file["type"].split("/")[0] === "image") {
      return true;
    } else return false;
  }
  static openFileDialog() {
    // So you can upload images using fileDialog
    dropzone.click();
  }
  static returnFileSize(number) {
    // Returns filesize.... wow didnt expect that
    if (number < 1024) {
      return number + "bytes";
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }
  static uploadToStorage() {
    // Take all items from locallyUploaded array and upload them to Firebase Storage
    //! Get blob file from blob URL and after uploading revoke it for memory management
    let existingAlbums = [];
    if (locallyUploaded.length >= 1) {
      locallyUploaded.forEach((img) => {
        const ref = firebase.storage().ref();
        const name = img.name;
        let src = img.src;
        const metadata = {
          contentType: img.type,
        };
        const task = ref.child(name).put(src, metadata);
        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            // SUCCESS!
            URL.revokeObjectURL(img.DOMsrc);
            //! Upload info about image to db/uploadedPictures
            let rawAlbums = [];
            img.albums.forEach((album) => {
              rawAlbums.push(UrlLinks.transformToURL(album));
            });
            db.collection("uploadedPictures")
              .add({
                imgName: name,
                imgURL: url,
                imgAlbums: rawAlbums,
              })
              .then(async (docRef) => {
                console.log("Document written with ID: ", docRef.id); // ID to be referenced in DB/albums/album/connectedImages
                //! Reference image in albums collection and if some doesnt exist yet, create it.
                existingAlbums = await Collections.getCollectionsList(); //existing albums is undefined
                console.log("existingAlbums@73:", existingAlbums);
                // List of albums from Firestore
                img.albums.forEach(async (album) => {
                  if (existingAlbums.includes(album)) {
                    // Album set on img exists, so reference this image in said album
                    await Collections.referenceImageInAlbum(album, {
                      imgName: name,
                      imgURL: url
                    });
                  }
                });
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          })
          .catch(console.error);
      });
      // After everything uploaded, clear the array
      locallyUploaded = [];
    } else {
      alert("There is nothing to upload, select some files!");
    }
  }
  static removePreviewImage(name) {
    locallyUploaded = locallyUploaded.filter((img) => img.name !== name);
    this.updatePreviewList();
  }
  static updatePreviewList() {
    // Remove all children in preview DOM
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    // Append those who stayed in locallyUploaded
    if (locallyUploaded.length >= 1) {
      locallyUploaded.forEach((img) => {
        preview.appendChild(img);
      });
    } else if (locallyUploaded.length == 0) {
      preview.style.display = "none";
      para.style.display = "block";
    }
    // Select all buttons
    // DELETE BUTTONS
    let deleteBtns = document.querySelectorAll("#action-delete");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // dataset is returning correctly in string
        this.removePreviewImage(btn.dataset.name);
      });
    });
  }
}

/*? GLOBAL WINDOW "on-" FUNCTIONS bcuz they are not global by default ?*/
document.querySelector(".upload-dropzone").addEventListener("click", () => {
  Upload.openFileDialog();
});
window.openFileDialog = () => {
  Upload.openFileDialog();
};
window.upload = async () => {
  await Upload.uploadToStorage();
};
window.uploadChange = () => {
  // Function that handles uploading, renaming and deleting items from upload zone
  const curFiles = dropzone.files;
  // Show preview only if there are actualy some images to show
  if (curFiles.length == 0) {
    preview.style.display = "none";
  } else {
    // Loop through currently uploaded files
    for (const file of curFiles) {
      if (Upload.isFileImage(file)) {
        preview.style.display = "flex";
        para.style.display = "none";

        let previewImage = new imagePreview(
          file.name,
          file,
          URL.createObjectURL(file),
          Upload.returnFileSize(),
          file.type
        );

        locallyUploaded.push(previewImage);
      } else {
        alert("Some of your files is not a image!");
      }
    }
  }
  Upload.updatePreviewList();
};

// Just to hide those ugly scrollbars, will be Splide later
document.addEventListener("DOMContentLoaded", () => {
  preview.style.display = "none";
});
