import React from "react";
import "../style/components/Dropzone.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Images } from "../helpers/images";
import ImagePreview from "./ImagePreview";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import emitter from "../utils/EventEmitter";

let tempData = [];
class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      data: [],
    };
  }
  componentDidMount() {
    emitter.addListener("deleteLocalImage", (payloadId) => {
      tempData = tempData.filter((img) => img._tempId !== payloadId);
      this.setState({ data: tempData });
    });
  }
  openFileDialog = () => {
    document.querySelector("#upload-input").click();
  };
  uploadChange = () => {
    const currentFiles = document.querySelector("#upload-input").files;
    // Check uploaded files types, but only if there are some
    if (currentFiles.length >= 1) {
      for (const file of currentFiles) {
        if (Images.Meta.isImage(file)) {
          // The Image is __image__ xd
          // Create an object and add it to this.state.data
          let tempImage = new Object({
            name: file.name,
            _file: file,
            _tempId: file.lastModified,
            _local_src: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
          });
          tempData.push(tempImage);
        } else {
          alert("Soubor s názvem " + file.name + " není fotografie.");
        }
      }
      this.setState({ data: this.state.data.concat(tempData) });
    }
  };
  startUpload = () => {
    this.setState({
      isUploading: true,
    });

    const storage = getStorage();
    if (this.state.data.length > 0) {
      console.log(this.state.data.length);
      this.state.data.forEach((img) => {
        // Todo: rework the script it saves its ref with ID instead  of name!
        //! BUG: Only uploads src of the first image, it skips it
        // Upload to Firebase Storage
        // Create ref in Firestore

        Images.Image.uploadToFirestore(img).then((docID) => {
          // Upload to storage via the docID
          const storageRef = ref(
            storage,
            "gs://dmp-bures.appspot.com/" + docID
          );
          // Create upload task
          //! uploads only some of selected files
          const uploadTask = uploadBytesResumable(storageRef, img._file).then(
            (snap) => {
              getDownloadURL(snap.ref).then(async (url) => {
                // Set the url in corresponding img doc
                await Images.Image.Update.downloadURL(docID, url).then(() => {
                  this.setState({
                    isUploading: false,
                  });
                  window.location.reload();
                });
              });
            }
          );
        });
      });
    }
  };
  render() {
    return (
      <div className="dropzone">
        <div className="upload-dropzone" onClick={this.openFileDialog}>
          <span>
            <strong>Klikněte k nahrání jednoho nebo více obrázků</strong>
          </span>
        </div>
        <div className="uploaded">
          <div className="imgreel">
            {this.state.data.map((item) => {
              return <ImagePreview key={item._tempId} data={item} />;
            })}
          </div>
        </div>
        <div className="uploader" onClick={this.startUpload}>
          <button
            disabled={
              this.state.isUploading
                ? true
                : false || this.state.data.length > 0
                ? false
                : true
            }
          >
            {this.state.data.length > 0
              ? "Uložit"
              : "Pro uložení něco nejprve nahrajte"}
          </button>
        </div>

        <input
          type="file"
          id="upload-input"
          multiple
          onChange={this.uploadChange}
          accept="image/*"
        />
        <div className={this.state.isUploading ? "status" : "status hidden"}>
          <FaCloudUploadAlt />
          <span>Nahrávání</span>
        </div>
      </div>
    );
  }
}

export default Dropzone;
