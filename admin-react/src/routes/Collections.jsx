import React from "react";
import CollectionItem from "../components/CollectionItem";
import "../style/routes/Collections.css";

class Collections extends React.Component {
  render() {
    return (
      <div className="collections">
        <div className="all">
          <CollectionItem title="Města" total="15"/>
          <CollectionItem title="Lesy" total="4"/>
          <CollectionItem title="Auta" total="45"/>
          <CollectionItem title="Domy"/>
        </div>
      </div>
    );
  }
}

export default Collections;
