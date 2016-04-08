import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {fromJS} from 'immutable';
import $ from 'jquery';
import _ from 'lodash';
import 'scss/main.scss';

import {promiseMiddleware} from './middleware/promise-middleware'
import Entry from './components/Entry'


// Redux Store
const initialState = fromJS({
  entry: {
    title: "Poland",
    html: "<b>Poland</b> is a country."
  }
});

function reducer(state = initialState, action) {
  console.log(action);
  switch(action.type) {
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
function loadHTMLFor(entryTitle) {
  return $.ajax(`http://localhost:3000/api/article/${entryTitle}`, {
    contentType: 'text'
  });
}

const actions = {
  loadEntry(entry) {
    return {
      type: 'ENTRY_LOAD',
      target: entry.get('title'),
      promiseCall: () => loadHTMLFor(entry.get('title')),
    }
  }
};

// React
class Main extends Component {
  render() {
    return (
      <div>
        <Entry entry={this.props.entry}/>
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

  store.dispatch(actions.loadEntry(store.getState().get('entry')));
});
