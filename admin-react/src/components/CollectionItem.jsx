import React from "react";
import { FaTimes } from "react-icons/fa";
import emmiter from "../utils/EventEmitter";
import "../style/components/CollectionItem.css";
import { Storage } from "../helpers/storage";
import { Collections } from "../helpers/collections";
class CollectionItem extends React.Component {
  constructor(props) {
    super(props);
  }
  removeThisCollection = () => {
    // Removes this collection from the db and emits a delete event to CollectionsPage
    emmiter.emit("CollectionDelete");
    Collections.delete(this.props.id);
  };

  render() {
    return (
      <div className="collectionItem">
        <div className="top-controls">
          <button onClick={this.removeThisCollection}>
            <FaTimes />
          </button>
        </div>
        <div className="data">
          <span id="title">{this.props.title}</span>
          <span id="total">{`Celkem ${this.props.total || "🤷🏽‍♂️"} fotek`}</span>
        </div>
        <div className="controls">
          <button id="show">Show</button>
          <button id="remove">Remove</button>
        </div>
      </div>
    );
  }
}

export default CollectionItem;
