// Ideas and Inspirations for the design:
// 1. https://www.uplabs.com/posts/drive-storage-management-dashboard-concept

import React, { Component, useEffect, useState } from "react";
import "../style/routes/Dashboard.css";
import SummaryWidget from "../components/SummaryWidget";
import { FaFolder, FaImages, FaRegClock } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

// Helpers
import { Storage } from "../helpers/storage";
import TotalSizeGraph from "../components/TotalSizeGraph";

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
        <div className="widgets">
          <TotalSizeGraph />
        </div>
      </div>
    );
  }
}

export default Dashboard;
