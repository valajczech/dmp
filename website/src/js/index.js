// IMPORTS
import "../css/index.css";
import "../css/components/gallery.css"
import { Storage } from "./core";
import { Gallery } from "../components/gallery";

// Variables
let collectionObject = Storage.getSpecific("1642100551696");

// Gallery init
const galleryWrapper = document.querySelector("#gallery-wrapper");

galleryWrapper.appendChild(new Gallery(collectionObject.images, true));

