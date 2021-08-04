// Imports
import "../css/components/leftmenu.css";
import "../css/dashboard.css";
import { Analytics, Collections, Images } from "./core";
// Variables

// DOM Variables
let totalVisitorsEl = document.querySelector("#total_visitors");
let totalCollectionsEl = document.querySelector("#total_collections");
let totalPhotosEl = document.querySelector("#total_photos");
// Main event
document.addEventListener("DOMContentLoaded", async () => {
  try {
    totalVisitorsEl.innerText = await Analytics.Visitors.getTotal();
    totalCollectionsEl.innerText = await Collections.getTotalNumOfCollections();
    totalPhotosEl.innerText = await Images.getTotalNumberOfImages();
  } catch (error) {
  }
});
