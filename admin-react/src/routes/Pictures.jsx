import React from "react";
import "../style/routes/Pictures.css";
import PictureListItem from "../components/PictureListItem";

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
  };

  render() {
    return (
      <div className="pictures">
        <h3>Všechny fotografie</h3>
        <table id="pictures-table">
          <thead>
            <tr id="table-head">
              <th>Název</th>
              <th id="size">Velikost</th>
              <th id="likes">Počet Lajků</th>
              <th id="date">Naposledy modifikováno</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <PictureListItem
                key={item.id}
                id={item.id}
                name={item.imgName}
                size={item.size}
                likes={item.total_likes}
                collections={item.imgAlbums} // This has to be array of objects because
                src={item.imgURL}
                lastModified={item.uploadDate}
                description={item.imgDescription}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pictures;
