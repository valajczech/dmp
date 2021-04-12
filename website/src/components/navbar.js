import '../css/components/navbar.css'

class Navbar extends HTMLElement {
  constructor() {
    super();

  }
  connectedCallback() {
    this.innerHTML = 
    `
    <img src="http://www.milanbures.cz/frontend/html/img/logo_cerna.png"></img
    `;
  }
}

customElements.define('navbar-wrapper', Navbar);