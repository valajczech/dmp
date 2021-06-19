// Imports
import "../css/allImages.css";
import "../css/components/imgPreview.css"
import { imagePreview } from "../components/imgPreview";
import { Collections, Images } from "../js/core";
import { async } from "regenerator-runtime";

// DOM Variables
const imgListDOM = document.querySelector('.allImagesWrapper');
const fetchingText = document.querySelector('.fetching');

//! Events
document.addEventListener("DOMContentLoaded", async () => {
  let imgList = await Images.getDetailedImageList();
  fetchingText.style.display = "none";
  imgList.forEach((img) => {
    let imgDOM = new imagePreview(img.name, img.src, null, null, null);
    imgListDOM.appendChild(imgDOM);
  });
});
