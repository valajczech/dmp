// COMPONENT

// Imports
import { async } from "regenerator-runtime";
import "../css/components/gallery.css";

// Helpers
import { Images } from "../js/core";

export class Gallery extends HTMLElement {
  /**
   * @param {[]} imageArray Constructor takes array of items to display
   */

  constructor(imageArray) {
    super();
    this._rawImageArray = imageArray;
    this.currentIndex = 0;
    this.total = imageArray.length;
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="gallery">
  <div class="image-wrapper">
    <div class="control" id="prev">
      <span class="typcn typcn-chevron-left" id="arrow"></span>
    </div>
    <div class="images">
    ${
      this._rawImageArray.length == 0
        ? `<p>No photos yet.</p>`
        : `<img
    src=${this._rawImageArray[this.currentIndex].imageSrc}
    height="400"
    alt=""
    class="gallery-image"
  />`
    }
    </div>
    <div class="control" id="next">
      <span class="typcn typcn-chevron-right" id="arrow"></span>
    </div>
  </div>
</div>
    `;

    this.querySelector("#prev").onclick = () => {
      this.currentIndex - 1 < 0 ? "" : (this.currentIndex -= 1);
      console.log(this.currentIndex);
    };
    this.querySelector("#next").onclick = () => {
      this.currentIndex + 1 > this.total ? "" : (this.currentIndex += 1);
      console.log(this.currentIndex);
    };
  }
}
customElements.define("image-gallery", Gallery);
