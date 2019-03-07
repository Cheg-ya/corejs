import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NoMatch from './Components/NoMatch/NoMatch';
import Main from './Components/Main/Main';
import Posts from './Components/Posts/Posts';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/posts" component={Posts}/>
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
