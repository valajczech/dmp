import React from "react";
import { FaTimes } from "react-icons/fa";
import "../style/components/CollectionItem.css";

class CollectionItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="collectionItem">
        <div className="top-controls">
          <button>
            <FaTimes />
          </button>
        </div>
        <div className="data">
          <span id="title">{this.props.title}</span>
          <span id="total">{`Total ${this.props.total ||"🤷🏽‍♂️"} images`}</span>
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
