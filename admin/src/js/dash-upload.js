// IMPORT
import "../css/dash-upload.css";
import firebase from "firebase";
import "firebase/firebase-storage";

import { imagePreview } from "../components/imgPreview.js";
import {ImageManipulations} from "../js/core"
// Input
const dropzone = document.querySelector(".upload-input");
// Image preview
const preview = document.querySelector(".images");
// No items uploaded msg
const para = document.querySelector(".para");

/*Array for locally uplaoded images*/
let locallyUploaded = [];

// Firebase config
var firebaseConfig = {
  projectId: "dmp-bures",
  storageBucket: "gs://dmp-bures.appspot.com",
};

firebase.initializeApp(firebaseConfig);

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
    console.log("Uploading functionality is not ready yet!");
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
window.upload = () => {
  Upload.uploadToStorage();
};
window.openFileDialog = () => {
  Upload.openFileDialog();
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
          URL.createObjectURL(file),
          Upload.returnFileSize(file)
        );

        locallyUploaded.push(previewImage);
      } else {
        alert("Some of your files is not a image!");
      }
    }
  }
  Upload.updatePreviewList();
};
/* I love git merging */

// Just to hide those ugly scrollbars, will be Splide later
document.addEventListener("DOMContentLoaded", () => {
  preview.style.display = "none";
});

/*Git is a great thing, you just have to understand it*/
