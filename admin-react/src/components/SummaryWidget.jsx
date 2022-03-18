import React from "react";
import "../style/components/SummaryWidget.css";
class SummaryWidget extends React.Component {
  render() {
    return (
      <div className="summary-widget">
        <div className="icon">
          <>{this.props.icon}</>
        </div>
        <div className="data">
          <p id="name">{this.props.data_name}</p>
          <p id="value">{this.props.data_value}</p>
        </div>
      </div>
    );
  }
}

export default SummaryWidget;
