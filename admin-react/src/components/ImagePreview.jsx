import React from "react";
import { FaTrash } from "react-icons/fa";
import "../style/components/ImagePreview.css";
// Helpers
import emitter from "../utils/EventEmitter";

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      _file: this.props.data._file,
      _tempId: this.props.data._tempId,
      _local_src: this.props.data._local_src,
      size: this.props.data.size,
      type: this.props.data.type,
    };
  }
  deleteImg = () => {
    emitter.emit("deleteLocalImage", this.state._tempId);
  };
  render() {
    return (
      <div className="image-preview">
        <img src={this.state._local_src} alt="" />
        <span id="delete-local-image" onClick={this.deleteImg}>
          <FaTrash />
          Smazat
        </span>
      </div>
    );
  }
}

export default ImagePreview;
