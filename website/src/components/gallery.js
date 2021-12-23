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
    this.total = imageArray.length - 1;
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
          ? `<p>Prozatím žádné fotky</p>`
          : `<img
      class="gallery-image"  src=${
        this._rawImageArray[this.currentIndex].imageSrc
      } height="400px" />`
      }
    </div>
    <div class="control" id="next">
      <span class="typcn typcn-chevron-right" id="arrow"></span>
    </div>
  </div>
  </div>

    `;

    let image = this.querySelector(".gallery-image");
    let imageWrapper = this.querySelector(".images");

    console.log(this.total);
    this.querySelector("#prev").onclick = () => {
      this.currentIndex - 1 < 0 ? "" : (this.currentIndex -= 1);
      console.log(this.currentIndex, "of", this.total);

      imageWrapper.classList.add("fade");
      image.setAttribute(
        "src",
        this._rawImageArray[this.currentIndex].imageSrc
      );
      setTimeout(() => {
        imageWrapper.classList.remove("fade");
      }, 1000);
    };
    this.querySelector("#next").onclick = () => {
      this.currentIndex + 1 > this.total ? "" : (this.currentIndex += 1);
      console.log(this.currentIndex, "of", this.total);

      imageWrapper.classList.add("fade");

      image.setAttribute(
        "src",
        this._rawImageArray[this.currentIndex].imageSrc
      );
      setTimeout(() => {
        imageWrapper.classList.remove("fade");
        console.log("1");
      }, 1000);
    };
  }
}
customElements.define("image-gallery", Gallery);
