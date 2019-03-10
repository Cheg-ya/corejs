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

  componentDidMount() {
    const { getLoginUserId, loginUser } = this.props;
    
    if (!loginUser.length) {
      getLoginUserId();
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

const mapStateToProps = (state, ownProps) => {
  return {
    loginUser: state.loginUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    async getLoginUserId() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const result = await axios.post('/api/auth/check', { token });
          const { message, user} = result.data;

          if (message === 'valid') {
            if (!firebase.apps.length) {
              firebase.initializeApp(config);
            }

            dispatch(storeLoginUser(user));
            return true;
          }
    
        } catch({ response }) {
          const { message } = response.data;
    
          localStorage.removeItem('token');

          alert(message);

          return window.location = '/';
        }
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
