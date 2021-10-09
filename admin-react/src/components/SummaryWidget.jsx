import React from "react";
import "../style/components/SummaryWidget.css"

class SummaryWidget extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
        return (
          <div className="summary-widget">
            <p id="value">{this.props.data_value}</p>
            <p id="name">{this.props.data_name}</p>
          </div>
          );
    }
}

export default SummaryWidget;