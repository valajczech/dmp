// This file manipulates with URL query params using which
// we show correct album

// Imports
import { async } from "regenerator-runtime";
import "../css/collections.css";
import { Collections, Images } from "./core";
import { Gallery } from "../components/gallery";

// Variables
let desiredCollection = new URL(document.location).searchParams.get(
  "collection"
);
let imageList = new Array();

// DOM Variables
const collectionNameDOM = document.querySelector(".collectionName");
const galleryPreview = document.querySelector(".gallery");
const galleryPreviewItem = document.querySelector(".gallery-preview-item");

document.addEventListener("DOMContentLoaded", async () => {
  if (!desiredCollection) {
    // Illegal state
    //! BUG: when relocating to index.html, menu collection adding doesnt work
    window.location.replace("/");
  } else {
    galleryPreview.style.display = "flex";
    // Fetch desired collection info and connectedImages
    // and then add them to gallery
    await Collections.getCollection(desiredCollection)
      .catch((err) => {
        console.error(err);
        galleryPreview.style.display = "none";
        return result;
      })
      
      .then((result) => {
        imageList = result;
        // Set the name in DOM
        collectionNameDOM.innerText = result.albumName;
        result.connectedImages.forEach(async (doc) => {
          imageList.push(await Images.getImage(doc.imgDocID));
        });

        // Generate previewImage, onclick open LighGallery
        if (result.itemCount < 1) {
          // There are no connected Images
          galleryPreview.innerHTML = "<h3>There are no images yet!</h3>";
        }
      })
      .then(() => {
        console.log("wat: ", imageList);
        // Create and append gallery to the DOM using Gallery component
        galleryPreview.appendChild(new Gallery(imageList));
      });
  }
});

/*

*/
