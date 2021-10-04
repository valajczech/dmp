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
  async connectedCallback() {
    // Get correct albums to work with
    //collections = await Storage.getCollectionsFromStorage();
    //this.collections = collections;

    // Build basic layout of the menu
    this.innerHTML = `
    <div class="menu-content">
      <ul class="menu-list">
        <li><a class="menulink" href="/prologue">Úvodem</a></li>
        <li><a class="menulink" href="#">Nejnovější</a></li>
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

    try {
      this.collections = await Storage.getCollectionsFromStorage();
      const list = this.querySelector(".collections");
      this.collections.forEach((item) => {
        let albumDOM = document.createElement("li");
        albumDOM.innerHTML = `
        <a class="menulink" href="collection?collection=${UrlLinks.transformToURL(
          item
        )}">${item}</a>
        `;
        list.appendChild(albumDOM);
        console.log(albumDOM);
      });
    } catch (error) {
      console.error(err);
    }

    this.querySelector("#collections-dropdown").onclick = () => {
      this.querySelector(".collections").classList.toggle("hidden");
    };
  }
}

customElements.define("menu-wrapper", Menu);
