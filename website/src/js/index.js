// IMPORTS
import "../css/index.css";
import "../css/components/gallery.css"
import { Images } from "../js/core";
// DOM Variables
const galleryPreview = document.querySelector(".gallery-first-item");
const galleryPreviewItem = document.querySelector(".gallery-preview-item");

// Variables
let fetchedImages = [];
// Fetch this page specific images, and them display them in a image gallery

(async function () {
  // Self invoking functions for fetching the data immedeately
  fetchedImages = await Images.getSlideshowImages();
  try {
    Images.imageLoop(fetchedImages, galleryPreviewItem);
  } catch (error) {
    console.log(error);
    // There are no connected Images
    galleryPreview.innerHTML = "<h3>There are no images yet!</h3>";
  }
})();

/*
try {
  Images.imageLoop(fetchedImages, galleryPreviewItem);
  console.log(fetchedImages);
} catch (error) {
  console.log(error);
  // There are no connected Images
  galleryPreview.innerHTML = "<h3>There are no images yet!</h3>";
}
*/
