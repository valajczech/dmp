// COMPONENT

import "../css/components/imgPreview.css";

import { ImageManipulations } from "../js/core";

let sourceImageElement = null;
export class imagePreview extends HTMLElement {
  constructor(name, src, fileSize) {
    super();
    this.name = name;
    this.src = src;
    this.albums = "default"; //Can be changed using changeAlbum function!
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
    `;
    document.querySelector("#action-rename").addEventListener("click", () => {
      this.showRenamedialog();
    });

    document.querySelector("#action-set-album").addEventListener("click", () => {
      this.showAlbumDialog();
      sourceImageElement = this.dataset.name;
    });
  }

  addAlbum(albumName) {
    this.albums = [... albumName];
  }

  // Do some refactor down there after please
  showRenamedialog() {
    let rarea = document.querySelector(".rename");
    let pageWrapper = document.querySelector('.page')
    if (rarea.style.display == "block") {
      rarea.style.display = "none";
      pageWrapper.classList.remove('blurred')
    } else {
      rarea.style.display = "block";
      pageWrapper.classList.add('blurred')
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
        pageWrapper.classList.remove('blurred');
      };
    }
  }
  showAlbumDialog() {
    // Get a list of existing album so you cannot add to non existing one
    
    let list = ImageManipulations.getCollectionsList();

    let album_area = document.querySelector('.change-album');
    let pageWrapper = document.querySelector('.page');
    let albumParentEl = document.querySelector('.albums')
    if(album_area.style.display == "block") {
      album_area.style.display = "none";
      pageWrapper.classList.remove('blurred');
    } else {
      album_area.style.display = "block";
      pageWrapper.classList.add('blurred');

      //Code for selecting or adding albums (collections)
      if(list.length != 0) {
        list.forEach(item => {
          let itemDOM = document.createElement("div");
          itemDOM.classList.add("album");
          itemDOM.innerHTML = 
          `
          <div class="album">
           <input type="checkbox" name=${item} value=${item} id= "album-checkbox"/>
           <p>${item}</p>
          </div>
          `
          ;
          albumParentEl.appendChild(itemDOM);
        })
      } else {
        albumParentEl.innerHTML = "<p>There are no albums yet. You can create one.</p>"
      }

    }
  }
}


// Dialog maniplations
let rename = document.querySelector('.rename');
let page = document.querySelector('.page')
let changeAlbum = document.querySelector('.change-album');
let albumsWrapper = document.querySelector('.albums');

// Close rename dialog btn
let closeRenameBtn = document.querySelector('#closeRenameDialog');
closeRenameBtn.onclick = () => {
  rename.style.display = "none";
  page.classList.remove('blurred');
}
// Close album dialog btn
 let closeAlbumBtn = document.querySelector('#closeAlbumDialog');
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
  page.classList.remove('blurred');
  albumsWrapper.innerHTML = "";
}
// New album btn
let newAlbumBtn = document.querySelector('#newAlbum');
newAlbumBtn.onclick = () => {
  // Show a new album prompt
  
}


customElements.define("img-preview", imagePreview);
