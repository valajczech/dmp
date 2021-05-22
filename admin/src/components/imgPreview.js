// COMPONENT
// IMPORTS
import "../css/components/imgPreview.css";
import { ImageManipulations } from "../js/core";
export class imagePreview extends HTMLElement {
  constructor(name, src, fileSize) {
    super();
    this.name = name;
    this.src = src;
    this.albums = "default"; //Can be changed using changeAlbum function!
    this.fileSize = fileSize;
  }
  connectedCallback() {
    let rename = this.querySelector(".rename");
    let changeAlbum = this.querySelector(".change-album");
    let albumsWrapper = this.querySelector(".albums");

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
      <input class="rename-input" placeholder="New name" type="text" />
      <button class="fancy-btn" id="renameSubmit">Rename</button>
      <button class="fancy-btn" id="closeRenameDialog">X</button>
    </div>
    <div class="change-album">
      <div class="album-actions">
        <h3>Albums</h3>
        <div class="wrapper">
          <div class="new-album">
            <button class="fancy-btn" id="newAlbum">New Album</button>
          </div>
          <button class="fancy-btn" id="closeAlbumDialog">X</button>
        </div>
    </div>
      <div class="wrapper">
        <div class="albums">
          <!--Existing albums are injected here-->
        </div>
      </div>
    </div>
  </div>
    `;
    /* RENAME IMAGE */
    this.querySelector("#action-rename").addEventListener("click", () => {
      this.showRenamedialog();
    });
    /* SET IMAGE'S ALBUM */
    this.querySelector("#action-set-album").addEventListener("click", () => {
      this.showAlbumDialog();
      sourceImageElement = this.dataset.name;
    });

    // Dialog maniplations

    // Close rename dialog btn
    let closeRenameBtn = this.querySelector("#closeRenameDialog");
    closeRenameBtn.onclick = () => {
      rename.style.display = "none";
    };
    // Close album dialog btn
    let closeAlbumBtn = this.querySelector("#closeAlbumDialog");
    closeAlbumBtn.onclick = () => {
      //  let checkBtns = document.querySelectorAll('#album-checkbox');
      //  let list = ImageManipulations.getCollectionsList();

      // add to image's albums property selected albums
      //  checkBtns.forEach(element => {
      //    list.forEach(item => {
      //      if(item == element.value) {

      //      }
      //    })
      //  });

      changeAlbum.style.display = "none";
      albumsWrapper.innerHTML = "";
    };
    // New album btn
    let newAlbumBtn = this.querySelector("#newAlbum");
    newAlbumBtn.onclick = () => {
      // Show a new album prompt
    };
  }

  addAlbum(albumName) {
    this.albums = [...albumName];
  }

  // Do some refactor down there after please
  showRenamedialog() {
    let rarea = document.querySelector(".rename");
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
  showAlbumDialog() {
    // Get a list of existing album so you cannot add to non existing one

    let list = ImageManipulations.getCollectionsList();

    let album_area = document.querySelector(".change-album");
    let albumParentEl = document.querySelector(".albums");
    if (album_area.style.display == "block") {
      album_area.style.display = "none";
    } else {
      album_area.style.display = "block";

      //Code for selecting or adding albums (collections)
      if (list.length != 0) {
        list.forEach((item) => {
          let itemDOM = document.createElement("div");
          itemDOM.classList.add("album");
          itemDOM.innerHTML = `
          <div class="album">
           <input type="checkbox" name=${item} value=${item} id= "album-checkbox"/>
           <p>${item}</p>
          </div>
          `;
          albumParentEl.appendChild(itemDOM);
        });
      } else {
        albumParentEl.innerHTML =
          "<p>There are no albums yet. You can create one.</p>";
      }
    }
  }
}

customElements.define("img-preview", imagePreview);
