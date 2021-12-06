import React from "react";
import "../style/routes/NoMatch.css";
import { HiEmojiSad } from "react-icons/hi";

function NoMatch() {
  return (
    <div className="nomatch">
      <div>
        <HiEmojiSad />
        <p id="sorry">Promiňte, ale tato stránka neexistuje.</p>
        <a href="/">Domů</a>
      </div>
    </div>
  );
}

export default NoMatch;
