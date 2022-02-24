// This file manipulates with URL query params using which
// we show correct album

// Imports
import { async } from "regenerator-runtime";
import "../css/collections.css";
import { Collections, Images, Storage } from "./core";
import { Gallery } from "../components/gallery";

// Variables
let collectionId = new URL(document.location).searchParams.get("collectionId");
let collectionObject = Storage.getSpecific(collectionId);
const galleryWrapper = document.querySelector("#gallery-wrapper");

document.querySelector(".collectionName").innerText = collectionObject.name;
galleryWrapper.appendChild(new Gallery(collectionObject.images,true, true));
