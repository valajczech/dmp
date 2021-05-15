// COMPONENT

import "../css/components/imgPreview.css";

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
    <div class="actions">
    <button id="action-rename" data-name=${this.name}>
      <span class="typcn typcn-edit"></span>
    </button>
    <button id="action-delete" data-name=${this.name}>
      <span class="typcn typcn-delete-outline"></span>
    </button>
    <button id="action-set-album" data-name=${this.name}>
      <span class="typcn typcn-folder-add"></span>
    </button>
  </div>
  <img src="${this.src}" alt="" />
  <div class="rename-area">
    <input type="text">
    <button>Rename</button>
  </div>
    `;
    this.querySelector("#action-rename").addEventListener("click", () => {
      this.rename();
    });
  }

  rename() {
    let rarea = this.querySelector(".rename-area");
    if (rarea.style.display == "block") {
      rarea.style.display = "none";
    } else {
      rarea.style.display = "block";

      let input = rarea.querySelector("input");
      let submit = rarea.querySelector("button");

      submit.onclick = () => {
        let newName = input.value;
        console.log(newName);
        if (newName != "") {
          this.name = newName;
        } else {
          alert("New name cannot be empty!");
        }
        rarea.style.display = "none";
      };
    }
  }
  changeAlbum(albumName) {
    this.album = albumName;
  }
}

customElements.define("img-preview", imagePreview);
