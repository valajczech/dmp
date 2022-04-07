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
          let tempImage = {
            name: file.name,
            _file: file,
            _tempId: file.lastModified,
            _local_src: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
          };
          tempData.push(tempImage);
        } else {
          alert("Soubor s názvem " + file.name + " není fotografie.");
        }
      }
      this.setState({ data: this.state.data.concat(tempData) });
    }
  };
  resizeImage = (img) => {
    // Take an image, render it on canvas, resize it and upload it.
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var image = document.createElement("img");

    image.src = img._local_src;
    ctx.drawImage(image, 0, 0);

    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    var width = image.width;
    var height = image.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    return Images.Meta.dataURItoBlob(canvas.toDataURL("image/webp"));    

    // console.log(canvas.toDataURL("image/webp"));
    // return new File(canvas.toDataURL("image/webp"), img.name);
  };
  startUpload = async () => {
    const storage = getStorage();
    if (this.state.data.length > 0) {
      // The base array is not empty, we can proceed with upload
      this.state.data.forEach(async (img) => {
        // Create Firestore doc of the base image
        let imageDocId = await Images.Image.uploadToFirestore(img);
        // Create Storage reference based on docId of the base image
        let storageRef = await ref(
          storage,
          "gs://dmp-bures.appspot.com/" + imageDocId
        );
        let uploadTask = await uploadBytesResumable(storageRef, img._file);
        let imageUrl = await getDownloadURL(uploadTask.ref);

        await Images.Image.Update.downloadURL(imageDocId, imageUrl);

        // Repeat the proccess for thumbnail
        let thumbnailStorageRef = await ref(
          storage,
          "gs://dmp-bures.appspot.com/" + imageDocId + "_thumb"
        );
        let thumbnailTask = await uploadBytesResumable(
          thumbnailStorageRef,
          this.resizeImage(img),
          { contentType: "image/webp" }
        );
        let thumbnailURL = await getDownloadURL(thumbnailTask.ref);
        await Images.Image.Update.thumbnailURL(imageDocId, thumbnailURL);

        this.setState({
          isUploading: false,
        });
        //DEV:
         window.location.replace("/");

        // PROD:
        // window.location.replace("https://dashboard-dmp-bures.web.app/");
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
        <div
          className="uploader"
          onClick={() => {
            this.startUpload();
            this.setState({ isUploading: true });
          }}
        >
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
