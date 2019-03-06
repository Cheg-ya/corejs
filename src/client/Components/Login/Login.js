import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login();
  }

  render() {
    return (
      <div className="loginForm">
        <div className="formLogo">Core</div>
        <button className="githubBtn" onClick={this.handleLogin}>Github Sign In</button>
        <i className="closeBtn fas fa-times-circle"></i>
      </div>
    );
  }
}

export default Login;
