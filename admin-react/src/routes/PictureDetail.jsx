import React from "react";
import { Link } from "react-router-dom";
import "../style/routes/PictureDetail.css";

import { FaTimes, FaInfo, FaFolder, FaEdit, FaSave } from "react-icons/fa";

// Helpers
import { Images } from "../helpers/images";
import { Storage } from "../helpers/storage";
import { Collections } from "../helpers/collections";

import emitter from "../utils/EventEmitter";
import BackButton from "../components/BackButton";

// TODO:
// 1. Build the DOM structure [x]
// 2. Style it properly [x]
// 3. Clean up the  PictureListItem component
// 4. Figure out a way how to get the correct image based on props.id

class PictureDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureId: this.props.match.params.id,
      pictureObject: Storage.Images.getSpecific(this.props.match.params.id),
      isBeingEdited: false,
      isBeingDeleted: false,
      nameInputChanged: false,
      descInputChanged: false,
      collectionPopupOn: false,
    };
    this.newNameInput = React.createRef();
    this.newDescInput = React.createRef();
  }
  updateEssentialData = async () => {
    // Correctly update local Images
    this.setState({ data: await Images.Get.detailedImageList() }, () => {
      Storage.Images.set(this.state.data);
    });
    // Correctly update local collections
    Storage.Collections.set(await Collections.Get.detailedCollectionList());

    this.forceUpdate();
  };

  updateEditables = () => {
    let newName = String(this.newNameInput.current.value);
    let newDesc = String(this.newDescInput.current.value);

    Images.Image.Update.name(
      this.state.pictureObject.id,
      newName,
      this.state.pictureObject.name
    );
    Images.Image.Update.description(
      this.state.pictureObject.id,
      newDesc,
      this.state.pictureObject.description
    );
    this.setState({
      nameInputChanged: false,
      descInputChanged: false,
    });
    emitter.emit("updateEssentialData");
  };
  updateEssentialData = async () => {
    // Correctly update local Images
    this.setState({ data: await Images.Get.detailedImageList() }, () => {
      Storage.Images.set(this.state.data);
    });
    // Correctly update local collections
    Storage.Collections.set(await Collections.Get.detailedCollectionList());
    this.setState({
      pictureObject: Storage.Images.getSpecific(this.state.pictureId),
    });
    this.forceUpdate();
  };
  render() {
    return (
      <div className="picture-detail">
        <div className="top-controls">
          <BackButton />
        </div>
        <div className="picture-content">
          <div className="image-wrapper">
            <div className="image">
              <img alt="" src={this.state.pictureObject.url} />
            </div>
            <div className="collection-tags">
              <div className="selected">
                {this.state.pictureObject.collections.map((col) => {
                  return (
                    <span
                      key={col.id}
                      className="tag"
                      onClick={async () => {
                        // Update the doc in db
                        Images.Image.removeCollection(
                          col.id,
                          col.name,
                          this.state.pictureObject.id
                        );
                        // Add this image to according collection
                        Collections.Collection.removeImage(
                          col.id,
                          this.state.pictureObject.id,
                          this.state.pictureObject.url
                        );

                        // Update the local data
                        this.updateEssentialData();
                      }}
                    >
                      <FaTimes />
                      <span>{col.name}</span>
                    </span>
                  );
                })}
              </div>
              <div className="add-new">
                <button
                  onClick={() => {
                    this.setState({ collectionPopupOn: true });
                    console.log(this.state.collectionPopupOn);
                  }}
                >
                  <span>
                    <FaFolder />
                    Přidat
                  </span>
                </button>
                <div
                  className={
                    this.state.collectionPopupOn
                      ? "col-wrapper open"
                      : "col-wrapper"
                  }
                >
                  <div className="content">
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
                          !this.state.pictureObject.collections.includes({
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
                                  this.state.pictureId
                                );
                                // Add this image to according collection
                                Collections.Collection.addImage(
                                  col.id,
                                  this.state.pictureId,
                                  this.state.pictureObject.url
                                );
                                // Update the local data
                                this.updateEssentialData();
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
          </div>
          <div className="metadata-wrapper">
            <div className="data-content">
              <div className="header">
                <span>
                  <FaInfo />
                  Info
                </span>
                <div className="published">
                  <span>{this.state.pictureObject.uploadDate}</span>
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
                      placeholder={this.state.pictureObject.name}
                      id="newNameInput"
                    />
                    <FaEdit
                      className={this.state.nameInputChanged ? "changed" : ""}
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
                      placeholder={
                        this.state.pictureObject.description || "Neuvedeno"
                      }
                    />
                    <FaEdit
                      className={this.state.descInputChanged ? "changed" : ""}
                    />
                  </div>
                </div>
                <div className="save">
                  <div
                    className={
                      this.state.nameInputChanged || this.state.descInputChanged
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
                  <span id="title">Velikost </span>
                  <span id="value">
                    {Images.Meta.returnFileSize(
                      this.state.pictureObject.size
                    ) || "Neuvedeno"}
                  </span>
                </div>

                <div className="dataset">
                  <span id="title">Počet lajků </span>
                  <span id="value">
                    {this.state.pictureObject.total_likes || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="footer">
              <Link to="/pictures">
                <button
                  onClick={async () => {
                    this.setState({ isBeingDeleted: true });
                    Images.Image.delete(
                      this.state.pictureObject.id,
                      this.state.pictureObject.url
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PictureDetail;
