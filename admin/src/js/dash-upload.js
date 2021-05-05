import "../css/dash-upload.css";
import firebase from 'firebase/app';

const dropzone = document.querySelector(".upload-dropzone");


// TODO : refactor this mess
class Upload {
  static uploadDragHandler(ev) {
    console.log("Items dropped !");
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log("... file[" + i + "].name = " + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log(
          "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
        );
      }
    }
  }
  static uploadClickHandler(ev) {
    console.log("Yeet!");
  }

  static dragOverHandler(ev) {
    console.log("File(s) in drop zone");
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  static uploadToStorage() {

  }
}

document.addEventListener("DOMContentLoaded", (ev) => {
  // Event listeners bcuz wouldnt work in HTML
  dropzone.addEventListener("click", (ev) => {
    Upload.uploadClickHandler(ev);
  });
  dropzone.addEventListener("drop", (ev) => {
    Upload.uploadDragHandler(ev);
  });
  dropzone.addEventListener("dragover", (ev) => {
    Upload.dragOverHandler(ev);
  });
});

// Event Listeners do not work bcuz theyre not global
// U gotta maske them global like this:
window.upload = () => {
  Upload.uploadToStorage();
}
