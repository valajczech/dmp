import "../css/components/albumListItem.css";
import { Collections } from "../js/core";
import { imagePreview } from "../components/imgPreview";

export class albumListItem extends HTMLElement {
  constructor(albumName, connectedImages, numOfImages, docID) {
    super();
    this.albumName = albumName;
    this.connectedImages = connectedImages;
    this.numOfImages = numOfImages;
    this.docID = docID;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="top-actions">
      <button id="deleteThisAlbum"><span class="typcn typcn-delete"></span></button>
      <button id="renameThisAlbum" style="display: none"><span class="typcn typcn-edit"></span></button>
    </div>
    <div class="album-content">
      <h3>${this.albumName}</h3>
      <p>Total ${this.numOfImages} images</p>
      <div class="show">
        <button class="show-album-content"><span class="typcn typcn-eye"></span></button>
      </div>
    </div>
    `;

    // Show content of a album (images)
    this.querySelector(".show-album-content").onclick = () => {
      let listOfImages = this.connectedImages;
      // Create suitable wrapper for all the images
      let imagePreviewWrapper = document.createElement("div");
      imagePreviewWrapper.classList.add("imagePreviewWrapper");
      imagePreviewWrapper.setAttribute("id", this.docID);
      imagePreviewWrapper.innerHTML = `
      <div class="controls">
        <h2>${this.albumName}</h2>
        <button id="closePreviewDialog" class="fancy-btn"><span class="typcn typcn-delete"></span></button>
      </div>
      <div class="albumsConnectedImages">
      <!-- Images auto injected-->
      </div>
      `;

      document.body.appendChild(imagePreviewWrapper);

      if (listOfImages.length > 0) {
        listOfImages.forEach((element) => {
          let imageDOM = document.createElement("div");
          imageDOM.classList.add("collectionImageWrapper");
          imageDOM.innerHTML = `
          <img src="${element}" class="collectionImage"></img>
  
          `;
          imagePreviewWrapper
            .querySelector(".albumsConnectedImages")
            .appendChild(imageDOM);
        });
      } else {
        imagePreviewWrapper.querySelector('.albumsConnectedImages').innerHTML =  "<p>There are no images at the moment!</p>";
      }

      // Close it
      imagePreviewWrapper.querySelector("#closePreviewDialog").onclick = () => {
        document.body.removeChild(document.getElementById(this.docID));
      };
    };
  }
}

customElements.define("album-item", albumListItem);
