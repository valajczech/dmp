import React from "react";
import "../style/components/PictureListItem.css";
import { FaHeart, FaImage, FaTimes } from "react-icons/fa";
import LazyLoad from "react-lazyload";
// dummy image
import dummy from "../assets/images/BuresTestImage4.jpg";
class PictureListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
    };
  }

  openEditDialog = () => {
    if (!this.state.isBeingEdited) {
      this.setState({ isBeingEdited: true });
    } else {
      return;
    }
  };
  closeEditDialog = () => {
    this.setState({ isBeingEdited: false });
  };
  render() {
    return (
      <tr className="picture-list-item" onClick={this.openEditDialog}>
        <td>
          <span>
            <FaImage />
            {this.props.name}
          </span>
        </td>
        <td>
          <span id="size">{this.props.size}</span>
        </td>
        <td>
          <span id="likes">
            {this.props.likes}
            <FaHeart />
          </span>
        </td>
        <td>
          <span id="date">{this.props.lastModified}</span>
        </td>
        <td
          className={
            this.state.isBeingEdited ? "edit-dialog" : "edit-dialog hidden"
          }
        >
          <div className="top-controls">
            <button onClick={this.closeEditDialog}>
              <FaTimes />
            </button>
          </div>
          <div className="content">
            <p>{this.props.name}</p>
            <img src={this.props.src} alt="" height={300} width={300} />
          </div>
        </td>
      </tr>
    );
  }
}

export default PictureListItem;
