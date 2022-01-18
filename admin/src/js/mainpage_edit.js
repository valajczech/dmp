// IMPORTS
import { async } from "regenerator-runtime";
import "../css/mainpage_edit.css";
import { Images, MainPageSlideshow } from "../js/core";

// Variables
var slideshow_interval;
var allImages = [];

// DOM Variables
let fetchedImagesWrapper = document.querySelector(".fetched-images-wrapper");
let intervalInput = document.querySelector("#interval_input");
let noImagesWarning = document.querySelector(".info-warning-preloader");
let saveIntervalBtn = document.querySelector("#submitInterval");

// Functions
function generateFetchedImageDOM(imageSourceObject, targetParentElement) {
  let imageDOM = document.createElement("div");
  imageDOM.classList.add("fetched-image");
  if (imageSourceObject.isInMainpageSlideshow) {
    imageDOM.classList.add("image-selected");
  }
  imageDOM.innerHTML = `<img src=${imageSourceObject.src} />`;

  targetParentElement.appendChild(imageDOM);

  // Add eventListener for adding/removing this image to/from the slideshow
  imageDOM.onclick = () => {
    if (imageDOM.classList.contains("image-selected")) {
      // This image is already selected so we want to remove it
      imageDOM.classList.remove("image-selected");
      MainPageSlideshow.remove(imageSourceObject);
    } else {
      // This image is not selected so do it
      imageDOM.classList.add("image-selected");
      MainPageSlideshow.add(imageSourceObject);
    }
  };
}

// Fetch existing slideshow images and settings and set them to local vars
(async function () {
  // Self invoking functions for fetching the data immedeately

  // Get the interval
  slideshow_interval = await MainPageSlideshow.getSlideshowInterval();
  intervalInput.value = slideshow_interval;

  allImages = await Images.getDetailedImageList();
  // Get already selected images

  if (allImages.length > 0) {
    noImagesWarning.style.display = "none";
    allImages.forEach((image) => {
      generateFetchedImageDOM(image, fetchedImagesWrapper);
    });
  } else {
    noImagesWarning.style.display = "block";
    noImagesWarning.innerHTML =
      " <h3>There are no images to be selected.\n Upload some!</h3>";
  }
})();


saveIntervalBtn.onclick = async () => {
  if(intervalInput.value > 0 ) {
    await MainPageSlideshow.setSlideshowInterval(intervalInput.value);
  } else {
    alert("Please enter a number.");
  }
}