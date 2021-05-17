// COMPONENT

import "../css/components/imgPreview.css";

import { ImageManipulations } from "../js/core";
export class imagePreview extends HTMLElement {
  constructor(name, src, fileSize) {
    super();
    this.name = name;
    this.src = src;
    this.album = "default"; //Can be changed using changeAlbum function!
    this.fileSize = fileSize;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
    <div class="actions">
      <button id="action-rename" data-name="${this.name}">
        <span class="typcn typcn-edit"></span>
      </button>
      <button id="action-delete" data-name="${this.name}">
        <span class="typcn typcn-delete-outline"></span>
      </button>
      <button id="action-set-album" data-name="${this.name}">
        <span class="typcn typcn-folder-add"></span>
      </button>
    </div>
    <img src="${this.src}" alt="" />
  </div>
  <div class="edit-area">
    <div class="rename">
      <input class="rename-input" type="text" />
      <button class="fancy-btn" id="renameSubmit">Rename</button>
    </div>
    <div class="change-album">
      <div class="albums">
        <div class="album">
          <input type="radio" />
          <p>Those are</p>
        </div>
        <div class="album">
          <input type="radio" />
          <p>Just</p>
        </div>
        <div class="album">
          <input type="radio" />
          <p>Placeholders</p>
        </div>
      </div>
    </div>
  </div>
    `;
    this.querySelector("#action-rename").addEventListener("click", () => {
      this.rename();
    });

    this.querySelector("#action-set-album").addEventListener("click", () => {
      this.changeAlbum();
    });
  }

  rename() {
    let rarea = this.querySelector(".rename");
    if (rarea.style.display == "block") {
      rarea.style.display = "none";
    } else {
      rarea.style.display = "block";

      let input = rarea.querySelector(".rename-input");
      let submit = rarea.querySelector("#renameSubmit");

      submit.onclick = () => {
        let newName = input.value;
        if (newName != "") {
          this.name = newName;
        } else {
          alert("New name cannot be empty!");
        }
        rarea.style.display = "none";
      };
    }
  }
  changeAlbum() {
    // Get a list of existing album so you cannot add to non existing one
    let list = ImageManipulations.getCollectionsList();
   
  }
}

customElements.define("img-preview", imagePreview);
