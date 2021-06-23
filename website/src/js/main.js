// MAIN STYLE
import "../css/main.css";

// OTHER STUFF
import "typicons.font/src/font/typicons.css";

// COMPONENTS
import "../components/navbar";
import "../components/menu";
import "../components/footer";
import "../components/preloader";

// CORE FUNCTIONS
import { Storage, Collections } from "../js/core";
import { async } from "regenerator-runtime";

function init() {
  // Functions thanks to which we get collection list
  // On every init of the webpage
  Collections.saveCollectionsToLocalStorage();
};

// Load them up!
init();
