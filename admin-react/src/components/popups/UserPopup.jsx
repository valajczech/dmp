import React from "react";
import "../../style/components/UserPopup.css";
import { FaUser, FaTimes } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

class UserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  toggleUserModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  handleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert(error);
    });
  };
  render() {
    return (
      <div className="user-popup">
        <FaUser onClick={this.toggleUserModal} />
        <div className={this.state.isModalVisible ? "modal" : "modal hidden"}>
          <div className="controls">
            <button id="close" onClick={this.toggleUserModal}>
              <FaTimes />
            </button>
          </div>
          <div className="user-area">
            <FaUser />
            <span>Current user</span>
            <button onClick={this.handleLogout}>Odhlásit se</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPopup;
