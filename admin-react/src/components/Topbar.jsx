//TODO: force realtime updates on the clock, currently gets stuck on the time of the render

import React, { useContext } from "react";
import { useLocation } from "react-router";
import date from "date-and-time";
import "../style/components/Topbar.css";
import UserPopup from "./popups/UserPopup";

function Topbar() {
  return (
    <div className="topbar">
      <span id="location">{useLocation().pathname}</span>
      <div className="user-area">
        <p>{date.format(new Date(), "HH:mm ddd, MMM DD YYYY")}</p>
        <UserPopup />
      </div>
    </div>
  );
}
export default Topbar;
