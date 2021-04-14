import "../css/components/navbar.css";

class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <a href="/">    <img src="http://www.milanbures.cz/frontend/html/img/logo_cerna.png"></img
    </a>
    `;
  }
}

customElements.define("navbar-wrapper", Navbar);
