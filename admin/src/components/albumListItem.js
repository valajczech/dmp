import "../css/components/albumListItem.css";
import { Collections, Images } from "../js/core";

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
      <div class="album-actions">
        <button class="show-album-content fancy-btn">Show</button>
        <button class="add-album-content fancy-btn">Add/Remove</span></button>
        <!--<button class="edit-album-content fancy-btn">Edit</span></button>-->
      </div>
    </div>
    `;

    //! Main events

    // Show album content
    this.querySelector(".show-album-content").onclick = () => {
      // Build a imageWrapper
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
      // Event for closing this previewWrapper
      imagePreviewWrapper.querySelector("#closePreviewDialog").onclick = () => {
        document.body.removeChild(document.getElementById(this.docID));
      };

      // Append connected images to the wrapper
      if (this.connectedImages.length > 0) {
        this.connectedImages.forEach((img) => {
          let imageDOM = document.createElement("div");
          imageDOM.classList.add("collectionImageWrapper");
          imageDOM.innerHTML = `
          <img src="${img.imgURL}" class="collectionImage"></img>
  
          `;
          imagePreviewWrapper
            .querySelector(".albumsConnectedImages")
            .appendChild(imageDOM);
        });
      } else {
        imagePreviewWrapper.querySelector(".albumsConnectedImages").innerHTML =
          "<p>There are no images at the moment!</p>";
      }

      //
    };

    // Add album content
    this.querySelector(".add-album-content").onclick = async () => {
      // Build allImagesWrapper
      let imagePreviewWrapper = document.createElement("div");
      imagePreviewWrapper.classList.add("allImagesWrapper");
      imagePreviewWrapper.setAttribute("id", this.docID);
      imagePreviewWrapper.innerHTML = `
      <div class="controls">
        <button id="closePreviewDialog" class="fancy-btn"><span class="typcn typcn-delete"></span></button>
      </div>
      <div class="allFetchedImages">
        <!-- Images auto injected-->
      </div>
      `;
      document.body.appendChild(imagePreviewWrapper);

      // Event for closing this previewWrapper
      imagePreviewWrapper.querySelector("#closePreviewDialog").onclick = () => {
        document.body.removeChild(document.getElementById(this.docID));
      };

      // Get already selected images
      let allImages = await Images.getDetailedImageList();

      // Set the wrapper for appending images
      let allImagesWrapper = document.querySelector(".allFetchedImages");
      if (allImages.length > 0) {
        //noImagesWarning.style.display = "none";
        allImages.forEach((image) => {
          let imageDOM = document.createElement("div");
          imageDOM.classList.add("collectionImageWrapper");
          imageDOM.innerHTML = `
          <img class="collectionImage" src=${image.src} />
          `;

          if (image.albums.includes(this.docID)) {
            //! bug doesnt work
            // This image is already selected
            imageDOM.classList.add("image-selected");
          }
          allImagesWrapper.appendChild(imageDOM);

          imageDOM.onclick = async () => {
            // ADD / REMOVE this image when clicking on it
            if (imageDOM.classList.contains("image-selected")) {
              // Remove this image
              imageDOM.classList.remove("image-selected");
              await Collections.removeImageFromAlbum(image, {
                docID: this.docID,
                albumName: this.albumName
              })
            } else {
              imageDOM.classList.add("image-selected");
              await Collections.referenceImageInAlbum(this.docID, image);
              await Images.addImageAlbum(image.docID, this.docID);
            }
          };
        });
      } else {
        /*noImagesWarning.style.display = "block";
        noImagesWarning.innerHTML =
          " <h3>There are no images to be selected.\n Upload some!</h3>";
        */
      }
    };

    // Edit album content
    this.querySelector(".edit-album-content").onclick = () => {};

  }
}

customElements.define("album-item", albumListItem);
