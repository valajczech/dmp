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
    `;
  }

  rename(newName) {
    this.name = newName;
  }
  changeAlbum(albumName) {
    this.album = albumName;
  }
}

customElements.define("img-preview", imagePreview);
