import React, { Component } from 'react';
import axios from 'axios';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.closeModal();
  }

  handleLogin() {
    this.props.githubLogin();
  }

  render() {
    return (
      <div className="signInCover">
        <div className="signInForm">
          <div className="formLogo">Core</div>
          <button className="githubBtn" onClick={this.handleLogin}>Github Sign In</button>
          <i className="closeBtn fas fa-times-circle" onClick={this.handleOnClick}></i>
        </div>
      </div>
    );
  }
}

export default SignIn;
