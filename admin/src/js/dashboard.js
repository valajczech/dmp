// Imports
import "../css/components/leftmenu.css";
import "../css/dashboard.css";
import { Analytics, Collections, Images } from "./core";
// Variables

// DOM Variables
let totalVisitorsEl = document.querySelector("#total_visitors");
let totalCollectionsEl = document.querySelector("#total_collections");
let totalPhotosEl = document.querySelector("#total_photos");
let mostLikesPhotoEl = document.querySelector(".most-liked");
// Main event
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Basic analytics
    totalVisitorsEl.innerText = await Analytics.Visitors.getTotal();
    totalCollectionsEl.innerText = await Collections.getTotalNumOfCollections();
    totalPhotosEl.innerText = await Images.getTotalNumberOfImages();

    // Most liked photos
    let mostLikedImage = await Analytics.Likes.getMostLikedImage();
    let mostLikedWrapper = document.createElement("div");
    mostLikedWrapper.innerHTML = `
    <div class="image-wrapper">
      <img src=${mostLikedImage.imgURL} />
    </div>
    <div class="info-wrapper">
      <p>${mostLikedImage.imgName}</p>
      <p>${mostLikedImage.total_likes}</p>
    </div>
    `;
    mostLikesPhotoEl.appendChild(mostLikedWrapper);
  } catch (error) {
  }
});
