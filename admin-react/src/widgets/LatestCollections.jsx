import React from "react";
import "../style/widgets/LatestCollections.css";
import { Link } from "react-router-dom";
import { Storage } from "../helpers/storage";
import { FaFolder } from "react-icons/fa";

class LatestCollections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.setState({
      data: Storage.Collections.get(),
    });
  }
  render() {
    //! Max 4
    return (
      <div className="latest-collections">
        <div className="header-controls">
          <h3>Nedávné alba</h3>
          <Link to="/collections">
            <span className="see-all">Vše</span>
          </Link>
        </div>
        <div className="list">
          {this.state.data.slice(0, 4).map((col) => {
            return (
              <div className="collection-square widget" key={col.id}>
                <div className="name">
                  <FaFolder />
                  <span>{col.name}</span>
                </div>
                <span>
                  {col.connectedImages.length > 0
                    ? "Celkem " + col.connectedImages.length + " fotek"
                    : "Prozatím žádné fotky."}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LatestCollections;
