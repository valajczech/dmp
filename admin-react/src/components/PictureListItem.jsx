import React from "react";
import "../style/components/PictureListItem.css";
import { FaHeart, FaImage, FaTimes, FaInfo, FaFolder } from "react-icons/fa";
import { HiFolderAdd } from "react-icons/hi";
import date from "date-and-time";
import { Storage } from "../helpers/storage";
import { Images } from "../helpers/images";

import emmiter from "../utils/EventEmitter";
import { Collections } from "../helpers/collections";
import emitter from "../utils/EventEmitter";
import { Redirect } from "react-router";

class PictureListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
      collectionPopupOn: false,
      data: props,
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
          <span id="size">{this.props.size || "?"}</span>
        </td>
        <td>
          <span id="likes">
            {this.props.likes || 0}
            <FaHeart />
          </span>
        </td>
        <td>
          <span id="date">
            {date.format(new Date(this.props.lastModified), "MMM DD YYYY")}
          </span>
        </td>
        <td
          className={
            this.state.isBeingEdited ? "edit-dialog" : "edit-dialog hidden"
          }
        >
          <div className="picture-wrapper">
            <div className="top-controls">
              <button onClick={this.closeEditDialog}>
                <FaTimes />
              </button>
            </div>
            <div className="content">
              <div className="content-wrapper">
                <div className="image">
                  <img
                    src={this.state.isBeingEdited ? this.props.src : undefined}
                    width={400}
                    alt=""
                  />
                </div>
                <div className="collection-tags">
                  <div className="selected">
                    {this.props.collections.map((col) => {
                      return (
                        <span
                          key={col.id}
                          className="tag"
                          onClick={async () => {
                            // Update the doc in db
                            Images.Image.removeCollection(
                              col.id,
                              col.name,
                              this.props.id
                            );
                            // Add this image to according collection
                            Collections.Collection.removeImage(
                              col.id,
                              this.props.id,
                              this.props.src
                            );

                            // Update the local data
                            emmiter.emit("updateEssentialData");
                          }}
                        >
                          <FaTimes />
                          <span>{col.name}</span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="tags-control">
                    <button
                      id="addToCollection"
                      onClick={() => {
                        this.setState({
                          collectionPopupOn: !this.state.collectionPopupOn,
                        });
                      }}
                    >
                      <HiFolderAdd />
                      <span>Přidat do alba</span>
                    </button>
                  </div>
                  <div
                    className={
                      this.state.collectionPopupOn
                        ? "collection-add-popup"
                        : "collection-add-popup hidden"
                    }
                  >
                    <div className="col-wrapper">
                      <div className="col-controls">
                        <button
                          onClick={() => {
                            this.setState({ collectionPopupOn: false });
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <span id="col-header">Dostupné alba: </span>
                      <div className="col-data">
                        {Storage.Collections.get().map((col) => {
                          if (
                            !this.props.collections.includes({
                              id: col.id,
                              name: col.name,
                            })
                          ) {
                            return (
                              <div
                                key={col.id}
                                className="col-record"
                                onClick={async () => {
                                  // Update the doc in db
                                  Images.Image.addCollection(
                                    col.id,
                                    col.name,
                                    this.props.id
                                  );
                                  // Add this image to according collection
                                  Collections.Collection.addImage(
                                    col.id,
                                    this.props.id,
                                    this.props.src
                                  );
                                  // Update the local data
                                  emmiter.emit("updateEssentialData");
                                }}
                              >
                                <span className="colToBeSelected">
                                  <FaFolder /> {col.name}
                                </span>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="data">
                <div className="data-content">
                  <div className="header">
                    <span>
                      <FaInfo />
                      Info
                    </span>
                    <div className="published">
                      <span>
                        Nahráno{" "}
                        {date.format(
                          new Date(this.props.lastModified),
                          "MMM DD YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="datasets">
                    <div className="dataset">
                      <span id="title">Název</span>
                      <span id="value">{this.props.name}</span>
                    </div>
                    <div className="dataset">
                      <span id="title">Popis</span>
                      <span id="value">
                        {this.props.description || "Neuvedeno"}
                      </span>
                    </div>
                    <div className="dataset">
                      <span id="title">Velikost</span>
                      <span id="value">{this.props.size || "Neuvedeno"}</span>
                    </div>
                    <div className="dataset">
                      <span id="title">Počet lajků</span>
                      <span id="value">{this.props.likes || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button
                    onClick={async () => {
                      Images.Image.delete(this.state.data.id).then(() => {
                        emitter.emit("updateEssentialData");
                      });
                    }}
                  >
                    <FaTimes />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default PictureListItem;
