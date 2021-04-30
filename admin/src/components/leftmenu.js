import "../css/components/leftmenu.css";
class Leftmenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = 
    `
    <div class="top-panel">
    <img src="https://raw.githubusercontent.com/Orexin/orexin-web/master/src/img/logos/logo-white-sm.png" alt="">
  </div>
  <div class="menu-area" id="main-menu">
    <span>HLAVNÍ</span>
    <div class="action">
      <span class="typcn typcn-camera"></span>
      <p>Upload</p>
    </div>
    <div class="action">
      <span class="typcn typcn-image"></span>
      <p>Collections</p>
    </div>
    <div class="action">
      <span class="typcn typcn-chart-bar"></span>
      <p>Analytics</p>
    </div>
    <div class="action">
      <span class="typcn typcn-group"></span>
      <p>Users</p>
    </div>
    <div class="action">
      <span class="typcn typcn-info"></span>
      <p>About</p>
    </div>
  </div>
  <div class="bottom-area">
    <span id="toggleWidth" class="typcn typcn-arrow-back"></span>
  </div>
    `;

    const lmenu = document.querySelector('leftmenu-wrapper');
    const toggler = document.querySelector('.bottom-area');
    toggler.addEventListener('click', () => {
        lmenu.classList.toggle('smol');
    })
  }
}

customElements.define("leftmenu-wrapper", Leftmenu);
