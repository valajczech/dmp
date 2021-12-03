import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/routes/NoMatch.css";
import { HiEmojiSad } from "react-icons/hi";
import { Redirect } from "react-router";

function NoMatch() {
  return (
    <div className="nomatch">
      <div>
        <HiEmojiSad />
        <p id="sorry">Sorry, this page doesn't exist.</p>
        <Link to="/">
          <button>Let's go home</button>
        </Link>
      </div>
    </div>
  );
}


export default NoMatch;
