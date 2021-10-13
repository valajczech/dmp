import React from "react";
import "../style/routes/About.css"
class AboutPage extends React.Component {
  render() {
    return (
      <div className="about">
        <p>
          Custom CMS for Image and Album manipulations. <br />
           Base website: <a href="https://milanbures.cz">milanbures.cz</a> <br />
           All rights reserved by Orexin Solutions @2021
        </p>
      </div>
    );
  }
}

export default AboutPage;
