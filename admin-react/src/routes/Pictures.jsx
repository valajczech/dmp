import React from "react";
import "../style/routes/Pictures.css";
import { Link } from "react-router-dom";
import { FaHeart, FaImage } from "react-icons/fa";

// Helpers
import { Storage } from "../helpers/storage";
import emmiter from "../utils/EventEmitter";
import { Images } from "../helpers/images";
import { Collections } from "../helpers/collections";

class Pictures extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [], // The initial state is a empty array
    };
  }
  componentDidMount() {
    this.setState({
      data: Storage.Images.get(),
    });
    emmiter.addListener("updateEssentialData", () => {
      this.updateEssentialData();
    });
  }

  updateEssentialData = async () => {
    // Correctly update local Images
    this.setState({ data: await Images.Get.detailedImageList() }, () => {
      Storage.Images.set(this.state.data);
    });
    // Correctly update local collections
    Storage.Collections.set(await Collections.Get.detailedCollectionList());

    this.forceUpdate();
  };

  render() {
    this.state.data.sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });

    return (
      <div className="pictures">
        <h3>Všechny fotografie</h3>
        <div className="imagelist">
          <div className="head">
            <div className="dataset">
              <span>Název</span>
            </div>
            <div className="dataset">
              <span>Počet lajků</span>
            </div>
            <div className="dataset">
              <span>Velikost</span>
            </div>
            <div className="dataset">
              <span>Datum nahrání</span>
            </div>
          </div>
          {this.state.data.map((item) => (
            <Link to={`/pictures/${item.id}`} key={item.id}>
              <div className="picture-list-item">
                <div className="dataset">
                  <span className="icon">
                    <FaImage />
                    {item.name}
                  </span>
                </div>
                <div className="dataset">
                  <span id="likes">
                    {item.total_likes}
                    <FaHeart />
                  </span>
                </div>
                <div className="dataset">
                  <span>{Images.Meta.returnFileSize(item.size)}</span>
                </div>
                <div className="dataset">
                  <span>{item.uploadDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Pictures;

/*
{this.state.data.map((item) => (
              <tr className="picture-list-item">
                <Link to={`/pictures/${item.id}`}>
                  <div>
                    <span>
                      <FaImage />
                      {item.name}
                    </span>
                  </div>
                  <div>
                    <span id="size">
                      {Images.Meta.returnFileSize(item.size) || "?"}
                    </span>
                  </div>
                  <div>
                    <span id="likes">
                      {item.likes || 0}
                      <FaHeart />
                    </span>
                  </div>
                  <div>
                    <span id="date">{item.uploadDate}</span>
                  </div>
                </Link>
              </tr>
            ))}

*/
