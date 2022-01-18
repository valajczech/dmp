// COMPONENT

// Imports
import "../css/components/leftmenu.css";
import { Collections, Settings } from "../js/core";

class Leftmenu extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    
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
    
    let isHidden = await Settings.Leftmenu.getState();
    
    const toggler = document.querySelector(".bottom-area");
    
    // Onload set layout
    Leftmenu.applyLayout(isHidden);

    // Change the state  event
    toggler.onclick = async () => {
      isHidden = !isHidden;
      Leftmenu.applyLayout(isHidden);
      await Settings.Leftmenu.toggleState();
    };
  }
  //TODO
  static applyLayout(isHidden) {
    const lmenu = document.querySelector("leftmenu-wrapper");
    const page = document.querySelector(".page");
    if (isHidden) {
      lmenu.classList.add("smol");
      page.style.gridTemplateColumns = "80px 1fr 1fr 1fr";
    } else {
      lmenu.classList.remove("smol");
      page.style.gridTemplateColumns = "200px 1fr 1fr 1fr";
    }
  }
}

customElements.define("leftmenu-wrapper", Leftmenu);
