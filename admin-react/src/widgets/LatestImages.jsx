import React, { Component } from "react";
import { FaHeart, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Images } from "../helpers/images";
import { Storage } from "../helpers/storage";
import "../style/widgets/LatestImages.css";

class LatestImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.setState({ data: Storage.Images.get() });
  }
  render() {
    //TODO:
    //! Max 5
    return (
      <div className="latest-images">
        <div className="header-controls">
          <h3>Nedávné fotografie</h3>
          <Link to="/pictures">
            <span className="see-all">Vše</span>
          </Link>
        </div>
        <div className="list">
          {this.state.data.length == 0 ? (
            <span id="list-empty">
              Prozatím nejsou nahrány žádné fotografie
            </span>
          ) : (
            this.state.data.slice(0, 5).map((img) => {
              return (
                <div className="image-wrapper widget" key={img.id}>
                  <div className="name">
                    <FaImage />
                    <span>{img.name}</span>
                  </div>
                  <div className="metadata">
                    <span>
                      {" "}
                      {img.total_likes} <FaHeart />{" "}
                    </span>
                    <span>{Images.Meta.returnFileSize(img.size)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default LatestImages;

/**
 * 
 * {this.state.data.slice(0, 5).map((img) => {
            return (
              <div className="image-wrapper widget" key={img.id}>
                <div className="name">
                  <FaImage />
                  <span>{img.name}</span>
                </div>
                <div className="metadata">
                  <span>
                    {" "}
                    {img.total_likes} <FaHeart />{" "}
                  </span>
                  <span>{Images.Meta.returnFileSize(img.size)}</span>
                </div>
              </div>
            );
          })}
 */
