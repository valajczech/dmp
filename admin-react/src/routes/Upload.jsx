import Dropzone from "../components/Dropzone";
import React from "react";
import "../style/routes/Upload.css"

class UploadPage extends React.Component {
    render() {
        return (
          <div className="upload">
              <Dropzone />
          </div>
          );
    }
}

export default UploadPage;