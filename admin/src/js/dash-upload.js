import "../css/dash-upload.css";
import firebase from "firebase/app";
import "firebase/firebase-storage";

const dropzone = document.querySelector(".upload-input");
const uploadPreview = document.querySelector(".images");

// Firebase config
var firebaseConfig = {
  projectId: "dmp-bures",
  storageBucket:"gs://dmp-bures.appspot.com",
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
    const name = +new Date() + "-" + file.name;
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
window.uploadsChange = () => {
  for (var file in dropzone.files) {
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    uploadPreview.appendChild(img);
  }
};
