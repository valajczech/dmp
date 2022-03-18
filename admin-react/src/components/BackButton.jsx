import React from "react";
import { useHistory } from "react-router-dom";

function BackButton(props) {
  const history = useHistory();
  return (
    <button
      id="back"
      onClick={() => {
        history.goBack();
      }}
    >
      Zpět
    </button>
  );
}

export default BackButton;
