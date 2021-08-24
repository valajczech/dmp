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
    let fetchedCollection = new Object(
      await Collections.getCollection(desiredCollection).catch((err) => {
        console.log(err);
        galleryPreview.style.display = "none";
        return;
      })
    );
    // Set the name in DOM
    collectionNameDOM.innerText = fetchedCollection.albumName;
    //console.log(fetchedCollection);
    // Generate previewImage, onclick open LighGallery
    if (fetchedCollection.connectedImages.length < 1) {
      // There are no connected Images
      galleryPreview.innerHTML = "<h3>There are no images yet!</h3>"
    } else {
      //Images.imageLoop(fetchedCollection.connectedImages, galleryPreviewItem);
      // Create and append gallery to the DOM using Gallery component
      
      galleryPreview.appendChild(new Gallery(fetchedCollection.connectedImages))      
    }
      
  }
});

