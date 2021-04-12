class Footer extends HTMLElement {
  constructor() {
    super();

  }
  connectedCallback() {
    this.innerHTML = 
    `
    hehe imma foote brrrrr
    `;
  }
}

customElements.define('footer-wrapper', Footer);