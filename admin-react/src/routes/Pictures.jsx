import React from "react";
import "../style/routes/Pictures.css";
import PictureListItem from "../components/PictureListItem";

// Helpers
import { Storage } from "../helpers/storage";

class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // The initial state is a empty array
    };
  }
  componentDidMount() {
    this.setState({
      data: Storage.Images.get(),
    });
  }
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
                key={item.Id || item.imgName} //TODO: automatic imageID
                name={item.imgName}
                size={item.size}
                likes={item.total_likes}
                src={item.imgURL}
                lastModified={item.uploadDate}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pictures;

/*
dummy data
 <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />

*/
