import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import AppContainer from './Components/Containers/AppContainer';
import Account from './Components/Account/Account';
import Review from './Components/Review/Review';
import Posts from './Components/Posts/Posts';
import Main from './Components/Main/Main';
import './app.css';

class App extends Component {
  componentDidMount() {
    const { getLoginUserId, history, loginUser } = this.props;

    if (!loginUser.length) {
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
        <Route exact path="/post/review" component={Review} />
        <Route exact path="/user/:page" render={
          props => {
            if (loginUser.length) {
              const pageName = props.match.params.page;

              if (pageName === "reviews") {
                return <Posts {...props} />
              }
              
              if (pageName ==="account") {
                return <Account {...props} />
              }

              return <NoMatch />
            }

            return null;
          }
        } />
        <Route component={Main} />
      </Switch>
    );
  }
}

export default AppContainer(App);
