import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import 'scss/main.scss';

class Greeting extends Component {
  render() {
    return (
      <h3>Greetings from <em>ES6</em> and <em>React</em>.</h3>
    );
  }
}

$(() => {
  render(<Greeting/>, $('#content')[0]);
});
