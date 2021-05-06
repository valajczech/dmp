import "../css/components/popup.css";

export class Popup extends HTMLElement {
  constructor(type, content) {
    super();

    this.type = type;
    if (this.type == "user") {
      this.content = `
      Hello, I am a login/logout popup
      `;
      this.classList.add('user-popup')
    } else if (this.type == "error") {
      this.content = `
      Error: ${content}
      `;
      this.title = "⛔ An Error has Occured ⛔";
      this.classList.add("error-popup");
    } else if (this.type == "info") {
      this.content = content;
      this.title = "⚠️ Warning ⚠️";
      this.classList.add("info-popup");
    }
    this.isSpawned = false;
    this.isVisible = false;
  }
  connectedCallback() {
    this.innerHTML = `
    <h1>${this.title}</h1>
    <p>${this.content}</p>
    `;
    this.toggleView();
  }
  spawn() {
    document.body.appendChild(this);
    this.isSpawned = true;
  }
  toggleView() {
    if (this.style.display == "none") {
      this.style.display = "block";
      this.isVisible = true;
    } else {
      this.style.display = "none";
      this.isVisible = false;
    }
  }
  despawn() {
    document.body.removeChild(this);
    this.isSpawned = false;
  }
}

customElements.define("pop-up", Popup);
