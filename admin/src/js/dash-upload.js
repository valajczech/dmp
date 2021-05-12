import "../css/dash-upload.css";
import firebase from "firebase/app";
import "firebase/firebase-storage";

import { imagePreview } from "../components/imgPreview";

// Input
const dropzone = document.querySelector(".upload-input");
// Image preview
const preview = document.querySelector(".images");
// No items uploaded msg
const para = document.querySelector(".para");

// Firebase config
var firebaseConfig = {
  projectId: "dmp-bures",
  storageBucket: "gs://dmp-bures.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// TODO : refactor this mess
class Upload {
  // Determine wheter selected file is a image type
  static isFileImage(file) {
    if (file["type"].split("/")[0] === "image") {
      return true;
    } else return false;
  }

  // Function to "upload uploaded files to Fireabase Storage"
  static uploadToStorage() {
    // TODO: rewrite this function for all files in the input storage
    const ref = firebase.storage().ref();
    const file = dropzone.files[0];
    const name = +new Date();
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        // document.querySelector("#image").src = url;
      })
      .catch(console.error);

    dropzone.value = "";
  }

  //Function for uploading files using click (and then opening openFileDialog)
  static openFileDialog() {
    dropzone.click();
  }
}

// Event Listeners do not work bcuz theyre not global
// U gotta maske them global like this:
window.upload = () => {
  Upload.uploadToStorage();
};
window.openFileDialog = () => {
  Upload.openFileDialog();
};

/*Preview script - needs refactor*/

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}

window.uploadsChange = () => {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  const curFiles = dropzone.files;
  if (curFiles.length === 0) {
    preview.style.display = "none";
  } else {
    // Loop tru currently uploaded files
    for (const file of curFiles) {
      if (Upload.isFileImage(file)) {
        preview.style.display = "flex";
        para.style.display = "none";
        let img_prev = new imagePreview(
          file.name,
          URL.createObjectURL(file),
          file.type,
          returnFileSize(file)
        );
        preview.appendChild(img_prev);
      } else {
        alert("Well something went wrong");
      }
    }
  }
};
// Just to hide those ugly scrollbars
document.addEventListener("DOMContentLoaded", () => {
  preview.style.display = "none";
});
