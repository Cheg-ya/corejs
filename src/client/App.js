import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import AppContainer from './Components/Containers/AppContainer';
import NoMatch from './Components/NoMatch/NoMatch';
import Account from './Components/Account/Account';
import Review from './Components/Review/Review';
import Posts from './Components/Posts/Posts';
import Main from './Components/Main/Main';
import './app.css';

class App extends Component {
  componentDidMount() {
    const { getLoginUserId, history } = this.props;
    const currentPath = this.props.location.pathname;

    if (currentPath !== '/') {
      if (!localStorage.token) {
        return history.replace('/');
      }

      getLoginUserId();
    }
  }

  render() {
    const { loginUser } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/posts" render={
          props => {
            if (loginUser.length) {
              return <Posts {...props} />
            }

            return null;
          }
        } />
        <Route exact path="/review" component={Review} />
        <Route exact path="/user/:page" render={
          props => {
            if (loginUser.length) {
              if (props.match.params.page === "reviews") {
                return <Posts {...props} />
              } else {
                return <Account {...props} />
              }
            }

            return null;
          }
        } />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default AppContainer(App);
