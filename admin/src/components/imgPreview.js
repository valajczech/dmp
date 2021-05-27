/*

WARNING: THIS PIECE OF CODE REQUIRES REFACTOR AND OPTIMIZATION!
like a hell of refactoring
*/
// COMPONENT
// IMPORTS
import "../css/components/imgPreview.css";
import { ImageManipulations } from "../js/core";
export class imagePreview extends HTMLElement {
  constructor(name, src, fileSize) {
    super();
    this.name = name;
    this.src = src;
    this.albums = ["default"]; //Can be changed using changeAlbum function!
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
      <div class="header">
        <h3>Rename Image</h3>
        <button class="fancy-btn" id="closeRenameDialog">X</button>
      </div>
      <div class="name-manipulation">
        <input class="rename-input input" placeholder="New name" type="text" />
        <button class="fancy-btn" id="renameSubmit">Rename</button>
      </div>
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
        <div class="album-prompt">
          <input class="new-album-input input" placeholder="New album" type="text" />
          <button class="fancy-btn" id="newAlbumSubmit">Create New Album</button>
        </div>
        <div class="albums">
          <!--Existing albums are injected here-->
        </div>
      </div>
    </div>
  </div>
    `;

    let rename = this.querySelector(".rename");
    let changeAlbum = this.querySelector(".change-album");
    let albumsWrapper = this.querySelector(".albums");

    /* RENAME IMAGE */
    this.querySelector("#action-rename").addEventListener("click", () => {
      this.showRenamedialog();
    });
    /* SET IMAGE'S ALBUM */
    this.querySelector("#action-set-album").addEventListener("click", () => {
      this.showAlbumDialog();
    });

    // Dialog maniplations

    // Close rename dialog btn
    let closeRenameBtn = this.querySelector("#closeRenameDialog");
    closeRenameBtn.onclick = () => {
      rename.style.display = "none";
      let renameBtns = document.querySelectorAll("#action-rename");

      // undisable all rename btns
      renameBtns.forEach((btn) => {
        btn.disabled = false;
      });
    };
    // Close album dialog btn
    let closeAlbumBtn = this.querySelector("#closeAlbumDialog");
    closeAlbumBtn.onclick = () => {
      // get clicked checkboxes to determine added albums
      let checks = albumsWrapper.querySelectorAll("#albumCheck");
      checks.forEach((check) => {
        if (check.checked) {
          this.addAlbum(check.value);
        }
      });
      console.log(this.albums);

      // Hide all stuff
      albumsWrapper.style.display = "none";
      changeAlbum.style.display = "none";
      albumsWrapper.innerHTML = "";

      let albumBtns = document.querySelectorAll("#action-set-album");
      // undisable all album btns
      albumBtns.forEach((btn) => {
        btn.disabled = false;
      });

      let prompt = this.querySelector(".album-prompt");
      let list = this.querySelector(".albums");

      this.querySelector("#newAlbum").innerText = "New Album";
      list.style.display = "none";
      prompt.style.display = "flex";
    };
    // New album btn
    let newAlbumBtn = this.querySelector("#newAlbum");
    newAlbumBtn.onclick = () => {
      // show newAlbumPrompt and hide existing album list

      let prompt = this.querySelector(".album-prompt");
      let list = this.querySelector(".albums");

      newAlbumBtn.innerText = "Back";
      list.style.display = "none";
      prompt.style.display = "flex";

      let nameInput = this.querySelector('.new-album-input');
      let submitBtn = this.querySelector('#newAlbumSubmit')
      submitBtn.onclick = () => {
        ImageManipulations.updateColectionList(nameInput.value);
      }
    };
  }

  addAlbum(albumName) {
    if (!this.albums.includes(albumName)) {
      this.albums.push(albumName);
    }
  }

  // Do some refactor down there after please
  showRenamedialog() {
    let rarea = document.querySelector(".rename");
    let renameBtns = document.querySelectorAll("#action-rename");

    // Toggling
    if (rarea.style.display == "block") {
      rarea.style.display = "none";
      // undisable all rename btns
      renameBtns.forEach((btn) => {
        btn.disabled = false;
      });
    } else {
      rarea.style.display = "block";
      // disable all rename btns
      renameBtns.forEach((btn) => {
        btn.disabled = true;
      });
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
        // undisable all rename btns
        renameBtns.forEach((btn) => {
          btn.disabled = false;
        });
      };
    }
  }
  showAlbumDialog() {
    // Get a list of existing album so you cannot add to non existing one
    let list = ImageManipulations.getCollectionsList();

    let album_area = this.querySelector(".change-album");
    let albumParentEl = this.querySelector(".albums");
    let albumBtns = document.querySelectorAll("#action-set-album");

    if (album_area.style.display == "block") {
      album_area.style.display = "none";
      albumParentEl.style.display = "none";
      // undisable all album btns
      albumBtns.forEach((btn) => {
        btn.disabled = false;
      });
    } else {
      album_area.style.display = "block";
      albumParentEl.style.display = "block";
      // disable all album btns
      albumBtns.forEach((btn) => {
        btn.disabled = true;
      });
      // For each album in list create a input div
      if (list.length > 0) {
        list.forEach((item) => {
          let album = document.createElement("div");
          album.classList.add("album");
          // Add some kind of check whether this album is already set
          // and if so, check this checkbox
          if (this.albums.includes(item)) {
            album.innerHTML = `
            <input type="checkbox" checked value=${item} id="albumCheck">
            <p>${item}<p>
          `;
          } else {
            album.innerHTML = `
            <input type="checkbox" value=${item} id="albumCheck">
            <p>${item}<p>
          `;
          }
          albumParentEl.appendChild(album);
        });
      } else {
        albumParentEl.innerHTML =
          "<p>There are no albums yet. You can create one.</p>";
      }
    }
  }
}

customElements.define("img-preview", imagePreview);
