// COMPONENT

// Imports
import { async } from "regenerator-runtime";
import "../css/components/gallery.css";
import { Images } from "../js/core";

// Variables


export class Gallery extends HTMLElement {
  /**
   * @param {[]} imageArray Constructor takes array of items to display
   */

  constructor(imageArray) {
    super();
    this._imageArray = imageArray;
  }
  connectedCallback() {
    console.log("imgLIST:",this._imageArray);
     // Render the basic layout
      this.innerHTML = `
    <div class="gallery-thumbnail">
      <img src=${this._imageArray[0]} id="gallery-item-thumbnail"/>
    </div>
    <div class="gallery-wrapper hidden">
      <div class="gallery-top-controls">
        <button id="gallery_close"><span class="typcn typcn-times"></span></button>
      </div>
      <div class="gallery-visible-item">
        <div class="gallery-image-wrapper">
          
        </div>
        <div class="gallery-image-controls">
          <button id="gallery-prev-image" class="gallery-control"><span class="typcn typcn-arrow-left-thick"></span></button>
          <button id="gallery-like-image" class="gallery-control"><span class="typcn typcn-heart-outline"></span></button>
          <button id="gallery-next-image" class="gallery-control"><span class="typcn typcn-arrow-right-thick"></span></button>
        </div>
      </div>
      <div class="gallery-image-reel">
        <!-- Image items auto injected -->
      </div>
    </div>
    `;
    //! DOM Variables
  }
  //! Functions
  previousImage() {}
  nextImage() {}
  async toggleLike(imageObject) {}
}

customElements.define("image-gallery", Gallery);
