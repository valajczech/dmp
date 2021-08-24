

// COMPONENT

//Imports
import "../css/components/gallery.css";
import { Images } from "../js/core";

export class Gallery extends HTMLElement {
  constructor(imgSrcArr) {
    super();
    this.imgSrcArr = imgSrcArr;
    this.currentImgIndex = 0;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="gallery-thumbnail">
      <img src=${
        this.imgSrcArr[this.currentImgIndex].imgURL
      } id="gallery-item-thumbnail"/>
    </div>
    <div class="gallery-wrapper hidden">
      <div class="gallery-top-controls">
        <button id="gallery_close"><span class="typcn typcn-times"></span></button>
      </div>
      <div class="gallery-visible-item">
        <div class="gallery-image-wrapper">
          <img id="gallery-current-image" src=${
            this.imgSrcArr[this.currentImgIndex].imgURL
          } />
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
    const g_wrapper = this.querySelector(".gallery-wrapper");
    const close_gallery = this.querySelector("#gallery_close");
    const current_image = this.querySelector("#gallery-current-image");
    const likeButton = this.querySelector("#gallery-like-image");
    const imageReel = this.querySelector(".gallery-image-reel");

    //! Event Listeners
    // Load Event
    // Append every image to the image reel area;
    this.imgSrcArr.forEach((imgObj) => {
      let imageDOM = document.createElement("div");
      imageDOM.innerHTML = `
           <img src=${imgObj.imgURL}/>
           `;
      imageDOM.classList.add("gallery-image-small");
      imageReel.appendChild(imageDOM);
    });
    // Open Gallery event
    this.querySelector("#gallery-item-thumbnail").onclick = () => {
      g_wrapper.classList.toggle("hidden");
      this.currentImgIndex = 0;
      this.updateCurrentImage();
    };
    // Close Gallery event
    close_gallery.onclick = () => {
      g_wrapper.classList.toggle("hidden");
    };
    // Doubleclick to like image
    current_image.ondblclick = async () => {
      await this.toggleLike(this.currentImgIndex);
    };
    // Like image using button
    likeButton.onclick = async () => {
      await this.toggleLike(this.currentImgIndex);
    };
    // Previous Image Button Event
    this.querySelector("#gallery-prev-image").onclick = () => {
      this.previousImage();
    };
    // Next Image Button Event
    this.querySelector("#gallery-next-image").onclick = () => {
      this.nextImage();
    };
    // Key Events
    document.addEventListener("keydown", (e) => {
      if (!g_wrapper.classList.contains("hidden")) {
        switch (e.code) {
          case "Escape":
            g_wrapper.classList.toggle("hidden");
            break;
          case "ArrowLeft":
            this.previousImage();
            break;
          case "ArrowRight":
            this.nextImage();
            break;
          default:
            break;
        }
      }
    });
  }

  //! Functions
  // Change to previous image
  previousImage() {
    // current index - 1 has to be equal or bigger than 0
    if (this.currentImgIndex - 1 >= 0) {
      this.currentImgIndex -= 1;
      this.updateCurrentImage();
    } else {
      return;
    }
  }
  // Change to next image
  nextImage() {
    // current index + 1 has to be equal or lower than arr lenght
    if (this.currentImgIndex + 1 <= this.imgSrcArr.length - 1) {
      this.currentImgIndex += 1;
      this.updateCurrentImage();
    } else {
      return;
    }
  }
  updateCurrentImage() {
    this.querySelector("#gallery-current-image").setAttribute(
      "src",
      this.imgSrcArr[this.currentImgIndex].imgURL
    );

    // Update the like button accordingly
    if (this.imgSrcArr[this.currentImgIndex].isLikedByUser) {
      this.querySelector(
        "#gallery-like-image"
      ).innerHTML = `<span class="typcn typcn-heart-full-outline"></span>`;
    } else {
      this.querySelector(
        "#gallery-like-image"
      ).innerHTML = `<span class="typcn typcn-heart-outline"></span>`;
    }
  }
  // Like if not liked, unlike if liked
  async toggleLike(currentImgIndex) {
    if (this.imgSrcArr[currentImgIndex].isLikedByUser) {
      this.imgSrcArr[currentImgIndex].isLikedByUser = false;
      await Images.removeLike(this.imgSrcArr[currentImgIndex]);
      // Change the button style
      this.querySelector(
        "#gallery-like-image"
      ).innerHTML = `<span class="typcn typcn-heart-outline"></span>`;
    } else {
      this.imgSrcArr[currentImgIndex].isLikedByUser = true;
      await Images.addLike(this.imgSrcArr[currentImgIndex]);
      // Change the button style
      this.querySelector(
        "#gallery-like-image"
      ).innerHTML = `<span class="typcn typcn-heart-full-outline"></span>`;
    }
  }
}

customElements.define("image-gallery", Gallery);
