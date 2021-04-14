import '../css/components/menu.css'

class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="menu-content">
  <ul>
    <li><a href="/">Úvodem</a></li>
    <li><a href="#">Nejnovější</a></li>
    <li><a href="#">Fotografie do 1989</a></li>
    <li><a href="#">Fotografie po 1989</a></li>
    <li><a href="#">Soubory</a></li>
    <li><a href="./bio.html">Biografie</a></li>
    <li><a href="#">Výstavy</a></li>
    <li><a href="#">Kontakt</a></li>
    <li id="langEN"><a href="#">EN</a></li>
  </ul>
</div>
    `;
  }
}

customElements.define("menu-wrapper", Menu);
