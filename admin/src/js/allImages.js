// Imports
import "../css/allImages.css";
import { Collections, Images } from "../js/core";
import { async } from "regenerator-runtime";

// DOM Variables
const imgListDOM = document.querySelector(".allImagesWrapper");
const fetchingText = document.querySelector(".fetching");

//! Events
document.addEventListener("DOMContentLoaded", async () => {
  let imgList = await Images.getDetailedImageList();
  fetchingText.style.display = "none";
  imgList.forEach((img) => {
    let imgDOM = new imageElement(
      img.docID,
      img.name,
      img.description,
      img.src,
      img.albums,
      img.uploadDate
    );
    imgListDOM.appendChild(imgDOM);
  });
});

// Class for appending new Image to the DOM
class imageElement extends HTMLElement {
  constructor(docID, name, description, src, albums, uploadDate) {
    super();
    (this.docID = docID), (this.name = name);
    this.description = description;
    this.src = src;
    this.albums = albums;
    this.uploadDate = uploadDate;
  }
  toggleActions(actions) {
    if (actions.style.display == "block") {
      actions.style.display = "none";
    } else {
      actions.style.display = "block";
    }
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="image-wrapper">
        <button class="fancy-btn" id="btn_edit">Edit</button>
      <div class="image-src">
        <img src=${this.src}/>
      </div>
    </div>
    <div class="image-actions">
      <div class="name-desc">
        <div class="action-input">
          <p>Name</p>
          <input type="text" name="image_name" id="image_name" class="text-input" value=${
            this.name
          } />
        </div>
        <div class="action-input">
          <p>Description</p>
          <textarea type="text" id="image_description" rows="15" class="text-input">${
            this.description || "There is no description yet. Write some!"
          }</textarea>
        </div>
      </div>
      <button class="fancy-btn" id="actions_image_submit">Save</button>
      <button class="fancy-btn" id="actions_close">Close</button>
    </div>
    `;

    //! onclick event listener for showing `image-actions`
    let actions = this.querySelector(".image-actions");

    // Open actions menu
    this.querySelector("#btn_edit").onclick = () => {
      this.toggleActions(actions);
    };

    // Close actions menu after submiting
    this.querySelector("#actions_image_submit").onclick = async () => {
      //! Save it!
      let newName = this.querySelector("#image_name").value;
      let newDesc =
        this.querySelector("#image_description").value ==
        "There is no description yet. Write some!"
          ? null
          : this.querySelector("#image_description").value;

      await Images.updateImageNameAndDesc(this.docID, newName, newDesc);

      this.toggleActions(actions);
    };

    // Close actions menu using "Close" button
    this.querySelector("#actions_close").onclick = () => {
      this.toggleActions(actions);
    };
  }
}

customElements.define("image-element", imageElement);
