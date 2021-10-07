import React from "react";
import {
  FaThLarge,
  FaChevronLeft,
  FaArrowLeft,
  FaArrowRight,
  FaUpload,
  FaImages,
  FaFolder,
  FaInfoCircle,
  FaHome,
  FaCamera,
} from "react-icons/fa";
import "../style/components/Sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: false,
    };
  }
  handleMinimize = () => {
    this.setState({ isMinimized: !this.state.isMinimized });
  };
  render() {
    return (
      <div className={this.state.isMinimized ? "sidebar minimized" : "sidebar"}>
        <div className="sidebar-content">
          <div className="brand">
            {this.state.isMinimized ? (
              <FaCamera />
            ) : (
              <>
                {" "}
                <FaCamera />
                <p>Milan Bureš - Administace</p>
              </>
            )}
          </div>
          <div className="bar-content">
            <div className="route">
              <div>
                <FaThLarge className="icon" />
                <p>Nástěnka</p>
              </div>
            </div>
            <div className="wrapper" id="modules">
              <h3>Moduly</h3>
              <div className="routes">
                <a href="#" className="route">
                  <div>
                    <FaHome className="icon" />
                    <p>Hlavní stránka</p>
                  </div>
                  <FaChevronLeft className="arrow" />
                </a>
                <a href="#" className="route">
                  <div>
                    <FaUpload className="icon" />
                    <p>Nahrát</p>
                  </div>
                  <FaChevronLeft className="arrow" />
                </a>
                <a href="#" className="route">
                  <div>
                    <FaImages className="icon" />
                    <p>Fotografie</p>
                  </div>
                  <FaChevronLeft className="arrow" />
                </a>
                <a href="#" className="route">
                  <div>
                    <FaFolder className="icon" />
                    <p>Alba</p>
                  </div>
                  <FaChevronLeft className="arrow" />
                </a>
                <a href="#" className="route">
                  <div>
                    <FaInfoCircle className="icon" />
                    <p>About</p>
                  </div>
                  <FaChevronLeft className="arrow" />
                </a>
              </div>
            </div>
          </div>
          <div className="minimize">
            <button onClick={this.handleMinimize}>
              {this.state.isMinimized ? <FaArrowRight /> : <FaArrowLeft />}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
