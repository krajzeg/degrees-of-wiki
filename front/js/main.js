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
import mainReducer from './reducers/main-reducer';
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
const actions = _.extend({},
  pageActions(api)
);

// React
import Page from './components/Page';
class Main extends Component {
  render() {
    return (
      <div>
        {this.props.page ? <Page page={this.props.page} loadPage={this.props.loadPage} replacePage={this.props.replacePage}/> : null}
      </div>
    );
  }
}

// React-Redux
function mapStateToProps(state) {
  return state.toObject();
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
});
