// COMPONENT

import "../css/components/imgPreview.css";

export class imagePreview extends HTMLElement {
  constructor(name, src, type, fileSize) {
    super();
    this.name = name;
    this.src = src;
    this.type = type;
    this.fileSize = fileSize;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
    <img src=${this.src} alt="">
  </div>
  <div class="actions">
    <p>Rename</p>
    <p>Delete</p>
  </div>
    `;
  }
  imgRename() {
    this.name = "NewRandomName";
  }
}

customElements.define("img-preview", imagePreview);
