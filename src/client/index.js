import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer/reducer';
import logger from 'redux-logger';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route render={props => <App {...props} />} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
