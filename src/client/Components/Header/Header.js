import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from 'firebase';
import './Header.css';
import config from '../../../config/firebase';
import axios from 'axios';

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

  async componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await axios.post('/api/auth/check', { token });
  
        if (result.data.message === 'valid') {
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }
        }
  
      } catch({ response }) {
        const { message } = response.data;
  
        localStorage.removeItem('token');
        window.location = '/';
        
        return alert(message);
      }
    }
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

  clickToLogout() {
    firebase.auth().signOut().then(function() {
      localStorage.removeItem('token');
      window.location = '/';

    }).catch(err => alert(err.message));
  }

  render() {
    if (!localStorage.token) {
      return (<Redirect to="/" />);
    }

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
            <Link className="reviewBtn" to="/reviews">My Review</Link>
            <div className="dropDown">
              <button className="dropBtn">Settings</button>
              <div className="dropBox">
                <Link className="accountBtn" to="/account">Account</Link>
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
