import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {fromJS} from 'immutable';
import $ from 'jquery';
import _ from 'lodash';
import 'scss/main.scss';

import {promiseMiddleware} from './middleware/promise-middleware'
import {Api} from './api';
import Entry from './components/Entry'

// API
const api = new Api(`${window.location.protocol}//${window.location.host}/api`);

// Redux Store
const initialState = fromJS({});

function reducer(state = initialState, action) {
  console.log(action);
  switch(action.type) {
    case 'ENTRY_LOAD_STARTED':
      return state.set('entry', fromJS({title: action.title}));
    case 'ENTRY_LOAD_RESOLVED':
      return state.setIn(['entry', 'html'], action.result);
    case 'ENTRY_LOAD_FAILED':
      console.error(action.error);
      return state;
    default:
      return state;
  }
}
let store = window.store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
);

// Redux Actions
const actions = {
  loadEntry(title) {
    return {
      type: 'ENTRY_LOAD', title,
      promise: () => api.loadPageHTML(title),
    };
  }
};

// React
class Main extends Component {
  render() {
    return (
      <div>
        {this.props.entry ? <Entry entry={this.props.entry} loadEntry={this.props.loadEntry} replaceEntry={this.props.replaceEntry}/> : null}
      </div>
    );
  }
}

// React-Redux
function mapStateToProps(state) {
  return {entry: state.get('entry')};
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
  store.dispatch(actions.loadEntry('Poland'));
});
