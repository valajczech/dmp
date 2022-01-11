// COMPONENT

// Imports
import { async } from "regenerator-runtime";
import "../css/components/gallery.css";


import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import tippy from "tippy.js"
import 'tippy.js/dist/tippy.css';

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
    // console.log(this._rawImageArray);
    this.innerHTML = `  
    <div class="gallery">
    <div class="thumbnail">
      <img
        src="${this._rawImageArray[this.currentIndex].imageSrc}"
        id="thumbnail-img"
      />
    </div>
  </div>
  <div class="gallery-modal" id="modal">
    <div class="gallery-controls">
      <span class="close" id="close-modal">&times;</span>
    </div>
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        ${this._rawImageArray.map((item) => {
          return `
            <div class="swiper-slide">
            <div class="swiper-img">
              <img
                src="${item.imageSrc}"
              />
            </div>
            <div class="metadata">
              <span class="typcn typcn-arrow-sorted-up up" id="popup-toggle" data-imageID=${item.imageId}></span>
              <div class="text-content">
              <p id="${item.imageId}_name" class="name">Načítání</p>
              <p id="${item.imageId}_desc" class="desc">
                Načítání
              </p>
              <div class="controls">
                <p id="${item.imageId}_total_likes"></p>
                <!---<span id="sharer" class="typcn typcn-export"></span>--->
              </div>
              </div>
            </div>
            </div>
          `;
        })}
      </div>
  
      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev navigation"></div>
      <div class="swiper-button-next navigation"></div>
    </div>
  </div>
    `;

    this._rawImageArray.forEach((obj) => {
      Images.getImage(obj.imageId).then((img) => {
        document.querySelector(`#${obj.imageId}_name`).innerText = String(
          img.name
        );
        document.querySelector(`#${obj.imageId}_desc`).innerText =
          String(img.desc) || "Žádný popis";
        document.querySelector(`#${obj.imageId}_total_likes`).innerHTML =
          `${String(img.totalLikes)} <span id="like-heart" data-id="${
            obj.imageId
          }" class="typcn typcn typcn-heart"></span>` ||
          `0 <span id="like-heart" data-id="${obj.imageId}" class="typcn typcn typcn-heart"></span>`;
        //console.log(img.name);
      });
    });

    //! SWIPER
    Swiper.use([Navigation, Pagination]);
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: false,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    this.querySelector(".thumbnail").onclick = function () {
      document.querySelector("#modal").classList.add("open");
    };
    this.querySelector("#close-modal").onclick = function () {
      document.querySelector("#modal").classList.remove("open");
    };
    // Popup toggle
    this.querySelectorAll("#popup-toggle").forEach((el) => {
      el.onclick = (e) => {
        e.target.parentNode.classList.toggle("modal-open");
        e.target.classList.toggle("toggle-rotated");
      };
    });
    // Add likes on click
    this.querySelectorAll("#like-heart").forEach((el) => {
      el.onclick = (e) => {
        console.log("yeet");
        //Images.addLike(e.target.dataset.id,)
      };
    });

    // Keyboard shortcuts
    window.onkeydown = (e) => {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 27: {
          document.querySelector("#modal").classList.remove("open");
          break;
        }
        case 37: {
          // Previous gallery item
          swiper.slidePrev();
          break;
        }
        case 39: {
          // Next gallery item
          swiper.slideNext();
          break;
        }
      }
    };
    // Periodically change images
    window.setInterval(() => {
      let imageEl = document.querySelector("#thumbnail-img");
      if (this.currentIndex + 1 < this._rawImageArray.length) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
      imageEl.setAttribute(
        "src",
        this._rawImageArray[this.currentIndex].imageSrc
      );
      if (!document.querySelector("#modal").classList.contains("open")) {
        swiper.slideTo(this.currentIndex);
      }
    }, 3000);

    // Tooltips
    tippy("#thumbnail-img", {
      content: "Klikněte pro otevření galerie!",
      placement: "auto",
    });
  }
}

customElements.define("image-gallery", Gallery);

