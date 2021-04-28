import "../css/components/preloader.css";
import "@lottiefiles/lottie-player";

class Preloader extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <lottie-player class="preload-player" src="https://assets4.lottiefiles.com/packages/lf20_yMTq6U/photo.json"  background="transparent"  speed="0.8"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
    `;

    window.onload = () => {
      setTimeout(() => {
        document.querySelector("preloader-wrapper").remove();
      }, 500);
    };
  }
}

customElements.define("preloader-wrapper", Preloader);
