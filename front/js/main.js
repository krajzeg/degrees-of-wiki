import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider, connect} from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';
import 'scss/main.scss';

// API
import Api from './api';
const api = new Api(`${window.location.protocol}//${window.location.host}/api`);

// Redux Store
import mainReducer from './logic/main-reducer';
import promiseMiddleware from './middleware/promise-middleware';
let store = createStore(
  mainReducer,
  compose(
    applyMiddleware(promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// Redux Actions
import pageActions from './actions/page-actions';
import pathActions from './actions/path-actions';
const actions = _.extend({},
  pageActions(api),
  pathActions()
);

// React
import Riddle from './components/Riddle';
import {riddle, currentPage} from './logic/selectors';
class Main extends Component {
  render() {
    const {state, goTo, goBackTo, loadPage} = this.props
    return (
      <Riddle riddle={riddle(state)}
        goTo={goTo} goBackTo={goBackTo} loadPage={loadPage}/>
    )
  }
}

// React-Redux
function mapStateToProps(state) {
  return {state}
}
var MainC = connect(mapStateToProps, actions)(Main);

// Rendering with React
$(() => {
  var view = (
    <Provider store={store}>
      <MainC/>
    </Provider>
  );
  render(view, $('#content')[0])
});

// Startup
$(() => {
  store.dispatch(actions.loadPage('Poland'));
  store.dispatch(actions.goTo('Poland'));
});
