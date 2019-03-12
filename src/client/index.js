import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer/reducer';
import logger from 'redux-logger';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import * as monaco from 'monaco-editor';

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

const editorCollection = document.getElementsByClassName('editorList');

for (let i = 0; i < editorCollection.length; i++) {
  monaco.editor.create(editorCollection[i], {
    language: 'javascript'
  });
}
