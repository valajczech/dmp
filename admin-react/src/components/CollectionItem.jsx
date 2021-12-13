import React from "react";
import { FaTrash } from "react-icons/fa";
import emmiter from "../utils/EventEmitter";
import "../style/components/CollectionItem.css";
import { Storage } from "../helpers/storage";
import { Collections } from "../helpers/collections";
import { Link } from "react-router-dom";
class CollectionItem extends React.Component {
  constructor(props) {
    super(props);
  }
  removeThisCollection = () => {
    // Removes this collection from the db and emits a delete event to CollectionsPage
    emmiter.emit("updateEssentialData");
    Collections.delete(this.props.id, this.props.title);
  };

  render() {
    return (
      <div className="collection-item">
        <div className="collection-preview-image">
          {this.props.images[0] != undefined ? (
            <Link to={`/collections/${this.props.id}`}>
              <img id="img" src={this.props.images[0].imageSrc} />
            </Link>
          ) : (
            <div id="img"></div>
          )}
        </div>
        <div className="collection-meta">
          <div className="data">
            <span id="name">{this.props.title}</span>
            <span id="total">
              {this.props.total > 0
                ? "Celkem: " + this.props.total + " položek"
                : "Zatím žádné položky"}
            </span>
          </div>
          <div className="controls">
            <button id="delete" onClick={this.removeThisCollection}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionItem;
