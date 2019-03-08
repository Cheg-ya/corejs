import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import './Spinner.css';

class Spinner extends Component {
  render() {
    if (!this.props.loading) {
      return null;
    }

    return (
      <div className="loaderWrapper">
        <div className="loaderCover">
          <Loader type="Plane" color={this.props.color} />
        </div>
      </div>
    );
  }
}

export default Spinner;
