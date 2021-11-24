import React from "react";
import "../style/components/ImagePreview.css"

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      _file: this.props.data._file,
      _tempid: this.props.data._tempId,
      _local_src: this.props.data._local_src,
      size: this.props.data.size,
      type: this.props.data.type,
    };
  }
  render() {
    return (
      <div className="image-preview">
        <span>DELETE</span>
        <img src={this.state._local_src} alt="" />
      </div>
    );
  }
}

export default ImagePreview;
