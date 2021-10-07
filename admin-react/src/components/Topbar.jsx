import React, { useContext } from "react";
import date from "date-and-time";
import "../style/components/Topbar.css";
import UserPopup from "./popups/UserPopup";

class Topbar extends React.Component {
  render() {
    return (
      <div className="topbar">
        <p>{date.format(new Date(), "HH:mm ddd, MMM DD YYYY")}</p>
        <UserPopup />
      </div>
    );
  }
}

export default Topbar;
