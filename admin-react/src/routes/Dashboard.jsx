import React, { Component, useEffect, useState } from "react";
import "../style/routes/Dashboard.css";
import SummaryWidget from "../components/SummaryWidget";
import { FaRegClock } from "react-icons/fa";

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
      data: Storage.Analytics.get()
    })
  }
  render() {
    return (
      <div className="dashboard">
        <div className="summaries">
          <SummaryWidget
            data_name="Celkem návštěvníků"
            data_value={this.state.data.total_visitors || <FaRegClock />}
          />
          <SummaryWidget
            data_name="Celkem alb"
            data_value={this.state.data.total_collections || <FaRegClock />}
          />
          <SummaryWidget
            data_name="Celkem fotek"
            data_value={this.state.data.total_images || <FaRegClock />}
          />
          <SummaryWidget
            data_name="Dummy data 3"
            data_value={this.state.data.total_visitors || <FaRegClock />}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
/*
function Dashboard() {
  //const [data, setData] = useState({});
  //! rewrite this so it doesnt use useState but a normal variable instead
  let data = {};
  async function fetchData() {
    this.data = {
      total_visitors: await Analytics.Visitors.getTotal(),
      total_collections:
        await Analytics.Collections.getTotalNumberOfCollections(),
      total_images: await Analytics.Images.getTotalNumberOfImages(),
    };
  }
  fetchData();
  return (
    <div className="dashboard">
      <div className="summaries">
        <SummaryWidget
          data_name="Celkem návštěvníků"
          data_value={data.total_visitors || <FaRegClock />}
        />
        <SummaryWidget
          data_name="Celkem alb"
          data_value={data.total_collections || <FaRegClock />}
        />
        <SummaryWidget
          data_name="Celkem fotek"
          data_value={data.total_images || <FaRegClock />}
        />
        <SummaryWidget
          data_name="Dummy data 3"
          data_value={data.total_visitors || <FaRegClock />}
        />
      </div>
    </div>
  );
}
*/
