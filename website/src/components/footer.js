import '../css/components/footer.css'
class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="footer">
    <div class="top">
      2021 &copy; Mgr. Milan Bureš st. 
    </div>
    <div class="orexin-promo">
      Made with 🖤 by <a href="https://orexin.fsik.dev/">Orexin.</a>
    </div>
  </div>
    `;
  }
}

customElements.define("footer-wrapper", Footer);
