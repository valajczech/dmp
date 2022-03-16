import React from "react";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Analytics } from "../helpers/analytics";
import { Images } from "../helpers/images";
import "../style/widgets/TotalSizeGraph.css";

class TotalSizeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSize: 5400000000, // Should be 5 GB
      totalSize: 0,
      percentage: 0,
    };
  }
  componentDidMount() {
    this.setPercentage();
  }
  setPercentage = async () => {
    await Analytics.Images.getTotalSize().then((totalSize) => {
      this.setState({
        totalSize: totalSize,
        percentage: ((totalSize / this.state.maxSize) * 100).toFixed(2),
      });
    });
  };

  render() {
    return (
      <div className="size-widget">
        <span className="widget-header">Úložiště</span>
        <CircularProgressbarWithChildren
          value={this.state.percentage}
          styles={buildStyles({
            pathTransitionDuration: 1,
            pathColor: `#2196f3`,
            trailColor: "#212332",
            backgroundColor: "#fff",
          })}
        >
          <div className="widget-data">
            <span id="percentage">{this.state.percentage} %</span>
            <span id="ratio">
              {Images.Meta.returnFileSize(this.state.totalSize)} /{" "}
              {Images.Meta.returnFileSize(this.state.maxSize)}
            </span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  }
}

export default TotalSizeGraph;
