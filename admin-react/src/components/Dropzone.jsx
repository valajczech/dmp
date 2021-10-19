import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../style/components/Dropzone.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Images, imagePreview } from "../helpers/images";
class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
    };
  }
  openFileDialog = () => {
    document.querySelector("#upload-input").click();
  }
  uploadChange = () => {
    const currentFiles = document.querySelector("#upload-input").files;
    if(currentFiles.length == 0 ) {
      // handle no locally uploaded files
      // todo
    } else {
      console.log(currentFiles);
      for(const file of currentFiles) {
        // check whether the file is image type
        if(Images.Meta.isImage(file)) {
          // create Image Preview component ready for upload
        } else {
          alert("Some of your files are not a image!")
        }
      }
    }
  }
  startUpload = () => {
    this.setState({
      isUploading: true,
    });
    // Dummy
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  };
  render() {
    return (
      <div className="dropzone">
        <div className="upload-dropzone" onClick={this.openFileDialog}>
          <span>
            <strong>Klikněte k nahrání jednoho nebo více obrázků</strong>
          </span>
        </div>
        <div className="uploader" onClick={this.startUpload}>
          <button disabled={this.state.isUploading ? true : false}>
            Začít nahrávat
          </button>
        </div>
        <div className="uploaded">
          <div className="imgreel">
            <p>Reel of uploaded images</p>
          </div>
        </div>
        <input type="file" id="upload-input" multiple onChange={this.uploadChange} accept="image/*"/>
        <div className={this.state.isUploading ? "status" : "status hidden"}>
          <FaCloudUploadAlt />
          <span>Nahrávání</span>
        </div>
      </div>
    );
  }
}

export default Dropzone;
