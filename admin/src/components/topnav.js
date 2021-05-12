// COMPONENT

import "../css/components/topnav.css";
import date from "date-and-time";
import { Popup } from "./popup";
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
    `;
    
    const popup = new Popup("user");
    popup.spawn();

    const userBtn = document.querySelector("#user-btn");
    userBtn.addEventListener("click", () => {
     popup.toggleView();
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
