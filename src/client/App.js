import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import './app.css';
import Main from './Components/Main Page/Main';

export default class App extends Component {
  refreshPage() {
    location.reload();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Main {...props} pageReloader={this.refreshPage}/>}/>
      </Switch>
    );
  }
}
