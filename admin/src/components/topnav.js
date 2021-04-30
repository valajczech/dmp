import "../css/components/topnav.css";
import date from "date-and-time";
let { getName } = require("../js/main");

class Topnav extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

    <div class="topnav">
    <div class="left">
      <h2>Dashboard</h2>
    </div>
    <div class="date">
      <p id="realTime"></p>
    </div>
    <div class="user">
      <span class="typcn typcn-user" id="user-btn"></span> <!---This will be a img later-->
    </div>
  </div>
  
  <div class="popup" id="user-popup">
    hi
  </div>
    `;

    const userBtn = document.querySelector("#user-btn");
    const userPopup = document.querySelector("#user-popup");
    userBtn.addEventListener("click", () => {
      userPopup.classList.toggle("popped");
    });
  }
}

setInterval(() => {
  let x = date.format(new Date(), "HH:mm ddd, MMM DD YYYY");
  try {
    document.querySelector("#realTime").innerHTML = x;
  } catch (error) {
    return;
  }
}, 500);

customElements.define("topnav-wrapper", Topnav);
