// COMPONENT

// Imports
import { Collections, Storage, UrlLinks } from "../js/core";
import "../css/components/menu.css";
import { async } from "regenerator-runtime";
// Variables
let collections = [];
// DOM Variables
class Menu extends HTMLElement {
  constructor() {
    super();
    this.collections = [];
  }
  async connectedCallback() {
    // Get correct albums to work with
    collections = await Storage.getCollectionsFromStorage();
    this.collections = collections;

    // Build basic layout of the menu
    this.innerHTML = `
    <div class="menu-content">
      <ul class="menu-list">
        <li><a href="/prologue">Úvodem</a></li>
        <li><a href="#">Nejnovější</a></li>
        <li><a href="/exhibitions">Výstavy</a></li>
        <li><a href="/bio">Biografie</a></li>
        <li><a href="/contact">Kontakt</a></li>
        
        <div class="collections">
          <!-- Collections auto injected --->
        </div>

        </ul>
    </div>
    `;

    const menuLists = document.querySelectorAll(".menu-list");
    // Append the to the DOM
    collections.forEach((item) => {
      let albumDOM = document.createElement("li");
      albumDOM.innerHTML = `
      <a href="collection?collection=${UrlLinks.transformToURL(item)}">${item}</a>
      `;

      menuLists.forEach((domNode) => {
        domNode.appendChild(albumDOM);
      });
    });
  }
}

customElements.define("menu-wrapper", Menu);
