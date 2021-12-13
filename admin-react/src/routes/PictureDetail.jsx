import React from "react";
import "../style/components/PictureListItem.css";



class PictureDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureId: this.props.match.params.id,
    };
  }
  render() {
    return(
      <h1>Hello</h1>
    )
  }
}

export default PictureDetail;
