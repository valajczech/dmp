import React, { Component } from "react";
import "../style/routes/CollectionDetail.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// Helpers
import { Storage } from "../helpers/storage";

class CollectionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionId: this.props.match.params.id,
      collectionObject: {},
    };
  }
  componentDidMount() {
    this.setState({
      collectionObject: Storage.Collections.getSpecific(
        this.state.collectionId
      ),
    });
  }
  render() {
    return (
      <div className="collection-detail">
        <div className="controls">
          <Link to="/collections">
            <button>
              <FaArrowLeft />
              Zpět
            </button>
          </Link>
        </div>
        <div className="con">
          <span id="name">{this.state.collectionObject.name}</span>
          <div className="list">
            {Storage.Collections.getSpecific(
              this.state.collectionId
            ).connectedImages.map((img) => {
              return (
                <div id="collection-image" key={img.imageId}>
                  <Link to={`/pictures/${img.imageId}`} pro>
                    <img src={img.imageSrc} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionDetail;
