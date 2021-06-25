// This file manipulates with URL query params using which
// we show correct album

// Imports
import { async } from "regenerator-runtime";
import "../css/collections.css";
import { Collections } from "./core";

// Variables
let desiredCollection = new URL(document.location).searchParams.get(
  "collection"
);

// DOM Variables
const collectionNameDOM = document.querySelector(".collectionName");

document.addEventListener("DOMContentLoaded", async () => {
  if (!desiredCollection) {
    // Illegal state
    //! BUG: when relocating to index.html, menu collection adding doesnt work
    window.location.replace("/");
  } else {
    // Fetch desired collection info and connectedImages
    // and then add them to gallery
    let fetchedCollection = new Object(
      await Collections.getCollection(desiredCollection)
    );
    // Set correct collection name
    collectionNameDOM.innerHTML = fetchedCollection.albumName;
   
    // Let's work with gallery!

    //! test if it works 
    /*const content = document.querySelector('.text');
    fetchedCollection.connectedImages.forEach(element => {
      let imgDOM = document.createElement('img');
      imgDOM.setAttribute('src', element);
      imgDOM.style.height = "150px";
      imgDOM.style.width = "150px";
      content.appendChild(imgDOM);
    });*/ 

  }
});
