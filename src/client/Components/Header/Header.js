import { storeLoginUser } from '../../action/action';
import { Link, Redirect } from 'react-router-dom';
import config from '../../../config/firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };

    this.clickToLogout = this.clickToLogout.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    //ajax from props
  }

  handleOnChange(e) {
    const keyword = e.target.value;

    this.setState(() => {
      return {
        keyword
      };
    });
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
          <form className="searchCover" onSubmit={this.handleOnSubmit}>
            <input className="searchBar" type="text" autoFocus onChange={this.handleOnChange} />
            <button className="searchBtn"><i className="searchCon fas fa-search"></i></button>
          </form>
          <nav className="options">
            <Link className="homeBtn" to="/posts">Home</Link>
            <button className="requestBtn" onClick={this.toggleModal}>Request</button>
            <Link className="reviewBtn" to="/user/reviews">My Review</Link>
            <div className="dropDown">
              <button className="dropBtn">Settings</button>
              <div className="dropBox">
                <Link className="accountBtn" to="/user/account">Account</Link>
                <button className="logoutBtn" onClick={this.clickToLogout}>Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
