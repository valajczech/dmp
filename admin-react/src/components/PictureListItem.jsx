import React from "react";
import "../style/components/PictureListItem.css";
import {
  FaHeart,
  FaImage,
  FaTimes,
  FaInfo,
  FaFolder,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { HiFolderAdd } from "react-icons/hi";
import date from "date-and-time";
import { Storage } from "../helpers/storage";
import { Images } from "../helpers/images";

import emmiter from "../utils/EventEmitter";
import { Collections } from "../helpers/collections";
import emitter from "../utils/EventEmitter";
import { Link } from "react-router-dom";

class PictureListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
      isBeingDeleted: false,
      nameInputChanged: false,
      descInputChanged: false,
      data: props,
    };
    this.newNameInput = React.createRef();
    this.newDescInput = React.createRef();
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
  updateEditables = () => {
    let newName = String(this.newNameInput.current.value);
    let newDesc = String(this.newDescInput.current.value);

    Images.Image.Update.name(this.props.id, newName, this.props.name);
    Images.Image.Update.description(
      this.props.id,
      newDesc,
      this.props.description
    );
    this.setState({
      nameInputChanged: false,
      descInputChanged: false,
    });
    emitter.emit("updateEssentialData");
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
          <span id="size">
            {Images.Meta.returnFileSize(this.props.size) || "?"}
          </span>
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
        ></td>
      </tr>
    );
  }
}

export default PictureListItem;



/*
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
                      <div id="editable">
                        <input
                          ref={this.newNameInput}
                          onChange={() => {
                            this.setState({ nameInputChanged: true });
                          }}
                          autoComplete="off"
                          type="text"
                          className="value"
                          placeholder={this.props.name}
                          id="newNameInput"
                        />
                        <FaEdit
                          className={
                            this.state.nameInputChanged ? "changed" : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="dataset">
                      <span id="title">Popis</span>
                      <div id="editable">
                        <textarea
                          ref={this.newDescInput}
                          id="newDescInput"
                          onChange={() => {
                            this.setState({ descInputChanged: true });
                          }}
                          rows="7"
                          type="text"
                          className="value"
                          placeholder={this.props.description || "Neuvedeno"}
                        />
                        <FaEdit
                          className={
                            this.state.descInputChanged ? "changed" : ""
                          }
                        />
                      </div>
                    </div>
                    <div className="save">
                      <div
                        className={
                          this.state.nameInputChanged ||
                          this.state.descInputChanged
                            ? "saveBtn ableToSaveWrapper"
                            : "saveBtn"
                        }
                        onClick={() => {
                          // Update the description in the db
                          this.updateEditables();
                        }}
                      >
                        <FaSave
                          className={
                            this.state.nameInputChanged ||
                            this.state.descInputChanged
                              ? "ableToSave"
                              : ""
                          }
                          disabled={
                            this.state.nameInputChanged ||
                            this.state.descInputChanged
                              ? false
                              : true
                          }
                        />
                      </div>
                    </div>
                    <div className="dataset" id="divider">
                      <span id="title">Velikost</span>
                      <span id="value">
                        {Images.Meta.returnFileSize(this.props.size) ||
                          "Neuvedeno"}
                      </span>
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
                      this.setState({ isBeingDeleted: true });
                      Images.Image.delete(
                        this.state.data.id,
                        this.props.src
                      ).then(() => {
                        emitter.emit("updateEssentialData");
                      });
                    }}
                  >
                    <FaTimes />
                    <span>
                      {this.state.isBeingDeleted ? "Deleting..." : "Delete"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>


*/