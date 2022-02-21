// COMPONENT

// Imports
import { Collections, Storage, UrlLinks } from "../js/core";
import "../css/components/menu.css";
import { async } from "regenerator-runtime";
// Variables
// DOM Variables
class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // Get correct albums to work with
    //collections = await Storage.getCollectionsFromStorage();
    //this.collections = collections;

    // Build basic layout of the menu
    this.innerHTML = `
    <div class="menu-content">
      <ul class="menu-list">
        <li><a class="menulink" href="/prologue">Úvodem</a></li>
        <li><a class="menulink" id="latest" href="/latest">Nejnovější</a></li>
        <li id="collections-dropdown">
        <p class="menulink" >Soubory<p>
          <div class="collections hidden">
          <!-- Autoinjected -->
          </div>
        </li>
        <li><a class="menulink" href="/exhibitions">Výstavy</a></li>
        <li><a class="menulink" href="/bio">Biografie</a></li>
        <li><a class="menulink" href="/contact">Kontakt</a></li>
        </ul>
    </div>
    `;

    // try {
    //   this.collections = Storage.getCollectionsFromStorage();
    //   const list = this.querySelector(".collections");
    //   this.collections.forEach((item) => {
    //     if (item.id == "1642016809701") {
    //       // Add this under the 'nejnovejsi route'
    //       this.querySelector("#latest").setAttribute(
    //         "href",
    //         `collection?collectionId=${item.id}`
    //       );
    //       return;
    //     } else if (item.id == "1642100551696") {
    //       return;
    //       }
    //     let albumDOM = document.createElement("li");
    //     albumDOM.innerHTML = `
    //     <a class="menulink" href="collection?collectionId=${item.id}">${item.name}</a>
    //     `;
    //     list.appendChild(albumDOM);
    //   });
    // } catch (error) {
    //   console.error(err);
    // }

    this.querySelector("#collections-dropdown").onclick = () => {
      this.querySelector(".collections").classList.toggle("hidden");
    };
  }
}

customElements.define("menu-wrapper", Menu);
