import React from "react";
import "../style/widgets/MostLikedImage.css";
import { FaHeart } from "react-icons/fa";
// Helpers
import { Images } from "../helpers/images";

class MostLikedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getImage();
  }
  getImage = async () => {
    await Images.Get.mostLikedImage().then((imgData) => {
      console.log(imgData);
      this.setState({ data: imgData });
    });
  };
  render() {
    return (
      <div className="most-liked-image">
        <div className="img">
          <img src={this.state.data.url} alt="" />
        </div>
        <div className="image-data">
          <span id="text">Nejlajkovanější fotka</span>
          <span id="header">{this.state.data.name}</span>
          <span id="likes">
            {this.state.data.total_likes}
            {""}
            <FaHeart />
          </span>
        </div>
      </div>
    );
  }
}

export default MostLikedImage;
