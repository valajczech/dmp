import "../css/components/navbar.css";

class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div>
    <a href="/">
      <img
        src="http://www.milanbures.cz/frontend/html/img/logo_cerna.png"
        alt=""
      />
    </a>
  </div>
  <div id="burger">
  <span id="right"></span>
  <span id="midline"></span>
  <span id="left"></span>
  </div>
  <menu-wrapper id="sliderMenu"></menu-wrapper>
    `;

    const burgerButton = document.querySelector("#burger");
    const slider = document.querySelector('#sliderMenu')
    const mainContent = document.querySelector('.main');

    burgerButton.addEventListener("click", () => {
      burgerButton.classList.toggle('open');
      slider.classList.toggle('slider-shown');
     //mainContent.classList.toggle('blurred')
    });

    document.addEventListener('scroll', () => {
      slider.classList.remove('slider-shown');
      burgerButton.classList.remove('open')
    })
  }
}

customElements.define("navbar-wrapper", Navbar);
