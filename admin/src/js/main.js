// Import core style sheet
import "../css/main.css";

// Components
import "../components/leftmenu";
import "../components/topnav";

// Other stuff
import "typicons.font/src/font/typicons.css";
import { Users } from "../js/core";


//! Auth observer
Users.attachAuthObserver();

alert("Tato verze systému je zastaralá. Vydržte prosím, brzy přijde update s novou verzí.");