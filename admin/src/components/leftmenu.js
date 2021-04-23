import "../css/components/leftmenu.css";

class Leftmenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

    <div class="inner">
    <ul>
      <li>
        <span class="typcn typcn-camera"></span>
        <a href="#">Add Photo</a>
      </li>
    </ul>
  </div>
    `;
  }
}

customElements.define("leftmenu-wrapper", Leftmenu);
