import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NoMatch from './Components/NoMatch/NoMatch';
import Main from './Components/Main/Main';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
