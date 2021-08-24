// COMPONENT

// Imports
import "../css/components/leftmenu.css";
import { Collections } from "../js/core";

class Leftmenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<div class="top-panel">
    <img src="https://raw.githubusercontent.com/Orexin/orexin-web/master/src/img/logos/logo-white-sm.png" alt="">
  </div>
  <div class="menu-area" id="main-menu">
    <span>HLAVNÍ</span>
    <a href="/dashboard" class="action">
      <span class="typcn typcn-home"></span>
      <p>Dashboard</p>
    </a>
    <a href="/mainpage_edit" class="action">
      <span class="typcn typcn-star-full-outline"></span>
      <p>Main page</p>
    </a>
    <a href="/photos/upload" class="action">
      <span class="typcn typcn-cloud-storage"></span>
      <p>Upload</p>
    </a>
    <a href="/photos/all" class="action">
      <span class="typcn typcn-camera"></span>
      <p>Pictures</p>
    </a>
    <a href="/collections" class="action">
      <span class="typcn typcn-image"></span>
      <p>Collections</p>
    </a>
    <a href="/about" class="action">
      <span class="typcn typcn-info"></span>
      <p>About</p>
    </a>
  </div>
  <div class="bottom-area">
    <span id="toggleWidth" class="typcn typcn-arrow-left-thick"></span>
  </div>
    `;

    const lmenu = document.querySelector("leftmenu-wrapper");
    const toggler = document.querySelector(".bottom-area");
    const page = document.querySelector(".page");
    toggler.addEventListener("click", () => {
      lmenu.classList.toggle("smol");
      if (lmenu.classList.contains("smol")) {
        page.style.gridTemplateColumns = "80px 1fr 1fr 1fr";
      } else {
        page.style.gridTemplateColumns = "200px 1fr 1fr 1fr";
      }
    });
  }
}

customElements.define("leftmenu-wrapper", Leftmenu);
