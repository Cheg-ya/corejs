import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import firebase from 'firebase';
import './Header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  pageRefresher() {
    location.reload();
  }

  async clickToLogout() {
    try {
      const result = await firebase.auth().signOut().then(() => true);

      if (result) {
        localStorage.removeItem('token');
        return window.location = '/';
      }

    } catch(err) {
      alert(err.message);
    }
  }

  render() {
    return (
      <header className="barContainer">
        <div className="inner">
          <div className="logo" onClick={this.pageRefresher}>Core</div>
          <div className="options">
            <Link className="homeBtn" to="/posts">Home</Link>
            <Link className="reviewBtn" to="/user/reviews">My Review</Link>
            <div className="dropDown">
              <button className="dropBtn">Settings</button>
              <div className="dropBox">
                <Link className="accountBtn" to="/user/account">Account</Link>
                <button className="logoutBtn" onClick={this.clickToLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
