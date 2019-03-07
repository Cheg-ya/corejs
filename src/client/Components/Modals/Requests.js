import React, { Component } from 'react';
import './Requests.css';

class Requests extends Component {
  render() {
    return (
      <div className="requestsContainer">321
        {this.props.children}
      </div>
    );
  }
}

export default Requests;
