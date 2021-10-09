import React from "react";
import "../style/routes/Dashboard.css"
import SummaryWidget from "../components/SummaryWidget";

class Dashboard extends React.Component {
  render() {
    return <div className="dashboard">
        <div className="summaries">
            <SummaryWidget data_name="Počet iksde" data_value="306"/>
            <SummaryWidget data_name="Randoms" data_value="204"/>
            <SummaryWidget data_name="Dummy data" data_value="385"/>
            <SummaryWidget data_name="Dummy data 3" data_value="564"/>
        </div>
    </div>;
  }
}

export default Dashboard;
