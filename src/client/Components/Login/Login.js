import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleLogin() {
    this.props.login();
  }
  
  handleOnClose() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className="loginForm">
        <div className="formLogo">Core</div>
        <button className="githubBtn" onClick={this.handleLogin}>Github Sign In</button>
        <i className="closeBtn fas fa-times-circle" onClick={this.handleOnClose}></i>
      </div>
    );
  }
}

export default Login;
