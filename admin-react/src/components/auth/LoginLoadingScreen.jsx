import React from "react";
import { Redirect } from "react-router";
import "../../style/components/LoginLoadingScreen.css";
import { VscLoading } from "react-icons/vsc";

// Helpers
import { Storage } from "../../helpers/storage";
import { Images } from "../../helpers/images";
import { Collections } from "../../helpers/collections";
import { Analytics } from "../../helpers/analytics";

class LoginLoadingScreen extends React.Component {
  state = {
    isFetching: true,
  };

  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    try {
      Storage.Images.set(await Images.Get.detailedImageList());
      Storage.Collections.set(await Collections.Get.detailedCollectionList());
      Storage.Analytics.set(await Analytics.getSummaryData());
    } catch (error) {
      console.error(error);
    } finally {
     this.setState({ isFetching: false });
    }
  }
  render() {
    return this.state.isFetching ? (
      <div className="loading">
        <div className="msg">
          <VscLoading />
          <span>Nahrávání</span>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default LoginLoadingScreen;
