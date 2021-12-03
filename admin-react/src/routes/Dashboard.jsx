// Ideas and Inspirations for the design:
// 1. https://www.uplabs.com/posts/drive-storage-management-dashboard-concept

import React from "react";
import "../style/routes/Dashboard.css";
import { FaFolder, FaImages, FaRegClock } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import Photographer from "../assets/images/test.png"


// Components
import TotalSizeGraph from "../widgets/TotalSizeGraph";
import LatestCollections from "../widgets/LatestCollections";
import SummaryWidget from "../components/SummaryWidget";
import LatestImages from "../widgets/LatestImages";
import MostLikedImage from "../widgets/MostLikedImage";

// Helpers
import { Storage } from "../helpers/storage";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}, // The initial state is a empty object
    };
  }
  componentDidMount() {
    this.setState({
      data: Storage.Analytics.get(),
    });
  }
  render() {
    return (
      <div className="dashboard">
        <div className="left half">
          <div className="hello-banner widget ">
            <div className="text">
              <h3>Dobrý den, Milane!</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
                vero aliquid similique, odio neque aspernatur?
              </p>
            </div>
            <div className="drawing">
              <img src={Photographer} alt="" />
            </div>
          </div>
          <div className="summaries">
            <SummaryWidget
              data_name="Celkem návštěvníků"
              data_value={this.state.data.total_visitors || <FaRegClock />}
              icon={<BsPeopleFill />}
            />
            <SummaryWidget
              data_name="Celkem alb"
              data_value={this.state.data.total_collections || <FaRegClock />}
              icon={<FaFolder />}
            />
            <SummaryWidget
              data_name="Celkem fotek"
              data_value={this.state.data.total_images || <FaRegClock />}
              icon={<FaImages />}
            />
          </div>
          <LatestCollections />
          <LatestImages />
        </div>
        <div className="right half">
          <TotalSizeGraph />
          <MostLikedImage />
        </div>
      </div>
    );
  }
}

export default Dashboard;
