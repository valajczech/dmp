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

// Helpers
import { Images } from "../js/core";
var swiper;

function removeAllText(element) {
  // loop through all the nodes of the element
  var nodes = element.childNodes;

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    // if it's a text node, remove it
    if (node.nodeType == Node.TEXT_NODE) {
      node.parentNode.removeChild(node);

      i--; // have to update our incrementor since we just removed a node from childNodes
    }

    // if it's an element, repeat this process
    else if (node.nodeType == Node.ELEMENT_NODE) {
      removeAllText(node);
    }
  }
}

export class Gallery extends HTMLElement {
  /**
   * @param {[]} imageArray Constructor takes array of items to display
   */

  constructor(imageArray, periodic, showDescription) {
    super();
    this._rawImageArray = imageArray;
    this.currentIndex = 0;
    this.total = imageArray.length;

    showDescription == undefined || showDescription == false
      ? (this.showDescription = false)
      : (this.showDescription = true);
    if (periodic == undefined || periodic == false || periodic == null) {
      this.periodic = false;
    } else if (periodic == true) {
      this.periodic = true;
    }
  }
  connectedCallback() {
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
          // Jesus I want to write this using jsx and Gatsby
          return `
            <div class="swiper-slide">
            <div class="swiper-img">
              <img
                src="${item.imageSrc}"
              />
            </div>
            ${
              this.showDescription
                ? `<div class="metadata">
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
          </div>`
                : ``
            }
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

    //! SWIPER
    Swiper.use([Navigation, Pagination]);
    swiper = new Swiper(".swiper", {
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
      });
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
        document
          .querySelectorAll(".text-content")
          [swiper.activeIndex].classList.toggle("modal-open");
        // e.target.parentNode.classList.toggle("modal-open");
        e.target.classList.toggle("toggle-rotated");
      };
    });
    // Add likes on click
    this.querySelectorAll("#like-heart").forEach((el) => {
      el.onclick = (e) => {
        console.log("yeet");
      };
    });

    // Keyboard shortcuts
    window.onkeydown = (e) => {
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
    if (this.periodic == true) {
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
    }

    let wrapper = document.querySelector(".swiper-wrapper");
    removeAllText(wrapper);

    // Tooltips
    tippy("#thumbnail-img", {
      content: "Klikněte pro otevření galerie!",
      placement: "bottom",
    });
  }
  openFromLatest(imgId) {
    var desiredImage = this._rawImageArray.findIndex(
      (img) => img.imageId == imgId
    );
    swiper.slideTo(desiredImage);
    document.querySelector("#modal").classList.add("open");
  }
  closeFromLatest() {
    document.querySelector("#modal").classList.remove("open");
  }
}

customElements.define("image-gallery", Gallery);
