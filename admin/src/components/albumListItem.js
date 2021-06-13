import "../css/components/albumListItem.css";

export class albumListItem extends HTMLElement {
  constructor(albumName, connectedImages, numOfImages, docID) {
    super();
    this.albumName = albumName;
    this.connectedImages = connectedImages;
    this.numOfImages = numOfImages;
    this.docID = docID;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="top-actions">
      <input id="selectCheckbox" type="checkbox" value=${this.docID}>
    </div>
    <div class="album-content">
      <h3>${this.albumName}</h3>
      <p>Total ${this.numOfImages} images</p>
      <div class="show">
        <button class="show-album-content"><span class="typcn typcn-eye"></span></button>
      </div>
    </div>
    `;

    // Show content of a album (images)
    this.querySelector(".show-album-content").onclick = () => {
      console.log("to be completed.");
    }
  }
}

customElements.define("album-item", albumListItem);
