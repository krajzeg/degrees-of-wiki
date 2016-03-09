import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {fromJS} from 'immutable';
import $ from 'jquery';
import _ from 'lodash';
import 'scss/main.scss';

const GREETINGS = ["Hello", "Hi", "Greetings", "A heartfelt welcome", "Salutations"];

// Redux Store
var initialState = fromJS({greeting: 0});
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'nextGreeting':
      return state.update('greeting', (g) => (g+1) % GREETINGS.length);
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
        <h3>{GREETINGS[this.props.greeting]} from <em>Redux</em> with <em>Immutable</em>.</h3>
        <button onClick={this.props.nextGreeting}>Next!</button>
      </div>
    );
  }
}

// React-Redux
function mapStateToProps(state) {
  return {greeting: state.get('greeting')};
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


// Testing
$.ajax("http://localhost:3000/api/article/Poland", {contentType: 'text'}).then((data) => {
  $('#wiki').html(data);
});
