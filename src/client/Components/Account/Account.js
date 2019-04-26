import React, { Component, Fragment } from 'react';
import './Account.css';
import Header from '../Header/Header';

class Account extends Component {
  render() {
    return (
      <Fragment>
        <Header history={this.props.history}/>
        <div className="onBuildingCover">
          <img className="onBuilding" src="../public/images/underMaintenance.png" alt="" />
          <div>This page is currently under Maintenance</div>
          <div>Thank you for your understanding</div>
        </div>
      </Fragment>
    );
  }
}

export default Account;
