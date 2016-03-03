import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import $ from 'jquery';
import _ from 'lodash';
import 'scss/main.scss';

const GREETINGS = ["Hello", "Hi", "Greetings", "A heartfelt welcome", "Salutations"];

// Redux Store
var initialState = {greeting: 0};
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'nextGreeting':
      var newGreeting = (state.greeting + 1) % GREETINGS.length;
      var newState = Object.assign({}, state, {greeting: newGreeting});
      return newState;
    default:
      return state;
  }
}
var store = createStore(reducer);

// Redux Actions
var actions = {
  nextGreeting() { return {type: "nextGreeting"}; }
};

// React
class Greeting extends Component {
  render() {
    return (
      <div>
        <h3>{GREETINGS[this.props.greeting]} from <em>Redux</em>.</h3>
        <button onClick={this.props.nextGreeting}>Next!</button>
      </div>
    );
  }
}

// React-Redux
function mapStateToProps(state) {
  let {greeting} = state;
  return {greeting};
}
var GreetingC = connect(mapStateToProps, actions)(Greeting);

// Rendering with React
$(() => {
  var main = (
    <Provider store={store}>
      <GreetingC/>
    </Provider>
  );
  render(main, $('#content')[0])
});
