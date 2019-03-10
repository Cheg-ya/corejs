import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import NoMatch from './Components/NoMatch/NoMatch';
import Review from './Components/Review/Review';
import Account from './Components/Account/Account';
import Posts from './Components/Posts/Posts';
import Main from './Components/Main/Main';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/user/:page" render={
          props => {
            if (props.match.params.page === "reviews") {
              return <Posts {...props} />
            } else {
              return <Account {...props} />
            }
          }
        } />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
