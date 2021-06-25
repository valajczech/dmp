// This file manipulates with URL query params using which
// we show correct album

// Imports
import "../css/collections.css";

// Variables
let desiredCollection = new URL(document.location).searchParams.get(
  "collection"
);

// DOM Variables