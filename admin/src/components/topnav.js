import "../css/components/topnav.css";
import date from "date-and-time";
let {getName} = require('../js/main')

class Topnav extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <div>
    <div class="left">
      <p>Dobrý den, Milan!</p>
    </div>
    <div class="middle">
      <p id="realTime"></p>
    </div>
  </div>
    `;
  }
}

setInterval(()=> {
  let x = date.format(new Date(), "HH:mm ddd, MMM DD YYYY")
  document.querySelector('#realTime').innerHTML = x;
},500)


customElements.define("topnav-wrapper", Topnav);
