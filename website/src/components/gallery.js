// COMPONENT

// Imports
import { async } from "regenerator-runtime";
import "../css/components/gallery.css";
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
    this.currentIndex = 1;
    this.total = imageArray.length;
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="gallery">
      <div class="thumbnail">
        
        <img id="thumbnail-image" src="${
          this._rawImageArray[this.currentIndex].imageSrc
        }"
        />  
      </div>
      <div id="myModal" class="modal">
  <span class="close cursor" id="close-modal"}">&times;</span>
  <div class="modal-content">
    ${this._rawImageArray.map((img) => {
      return `<div class="mySlides">
        <div class="image">
          <p id="name" style="color: white"></p>
          <img src="${img.imageSrc}" style="width: auto; max-height: 80vh">
          <div class="popup">
            <span class="typcn typcn-chevron-right up" id="popup-toggle"></span>
            <div class="popup-content hidden">
              <p class="label">Popisek</p>
              <p id="desc"></p>
              <div class="controls">
                <p id="total_likes"> <span id="like-heart" class="typcn typcn typcn-heart"></span></p>
                <span id="sharer" class="typcn typcn-export"></span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    })}
    <!-- Next/previous controls -->
    <a class="prev" id="prev" ">&#10094;</a>
    <a class="next" id="next" ">&#10095;</a>
    </div>

    <!-- Thumbnail image controls -->
  </div>
</div>

    </div>
    `;

    // get slides and append corresponding data to them
    this._rawImageArray.forEach((obj, index) => {
      Images.getImage(obj.imageId).then((image) => {
          this.querySelectorAll("#name")[index].innerText = image.name;
        this.querySelectorAll("#desc")[index].innerText =
          image.desc || "Bez popisku";
        this.querySelectorAll("#total_likes")[index].innerHTML =
        `
        <div clas="total-likes">
          ${image.totalLikes}
          <span class="typcn typcn-heart"></span>
        </div>
        `
      });
    });

    // Tooltips
    tippy('#thumbnail-image', {
      content: 'Klikněte pro otevření galerie!',
      placement: 'auto'
    });
    tippy('#total_likes', {
      content: "Lajkněte tuto fotku!",
      placement: 'left'
    })
    tippy('#sharer', {
      content: "Sdílet",
      placement: 'right'
    })

    this.querySelector("#thumbnail-image").onclick = () => {
      this.openModal();
    };
    this.querySelector("#close-modal").onclick = () => {
      this.closeModal();
    };
    this.querySelector("#prev").onclick = () => {
      this.plusSlides(-1);
    };
    this.querySelector("#next").onclick = () => {
      this.plusSlides(1);
    };
    this.querySelectorAll("#popup-toggle").forEach((el) => {
      el.addEventListener("click", () => {
        this.querySelectorAll("#popup-toggle")[
          this.currentIndex
        ].classList.toggle("up");
        this.querySelectorAll(".popup-content")[
          this.currentIndex
        ].classList.toggle("hidden");
      });
    });
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Escape":
          if (
            !this.querySelectorAll(".popup-content")[
              this.currentIndex
            ].classList.contains("hidden")
          ) {
            this.querySelectorAll("#popup-toggle")[
              this.currentIndex
            ].classList.remove("up");
            this.querySelectorAll(".popup-content")[
              this.currentIndex
            ].classList.add("hidden");
          }
          break;
      }
    });
  }

  plusSlides(n) {
    this.showSlides((this.currentIndex += n));
    this.querySelectorAll(".popup-content").forEach((el) => {
      el.classList.add("hidden");
    });
  }
  openModal() {
    document.getElementById("myModal").style.display = "block";
    this.showSlides(this.currentIndex);
  }

  closeModal() {
    document.getElementById("myModal").style.display = "none";
    this.currentIndex = 1;
  }

  showSlides(n) {
    var i;
    var slides = this.getElementsByClassName("mySlides");
    var dots = this.getElementsByClassName("demo");
    if (n > slides.length - 1) {
      this.currentIndex = 0;
    }
    if (n < 0) {
      this.currentIndex = slides.length - 1;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
    }
    slides[this.currentIndex].style.display = "flex";
  }
}
customElements.define("image-gallery", Gallery);

