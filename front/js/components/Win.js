import React, {Component} from 'react';
import {score, linksClicked} from '../logic/selectors';

export default class Win extends Component {
  render() {
    const riddle = this.props.riddle;
    return (
      <div className="win">
        <h2>You win!</h2>
        <h3>Got it in <strong>{linksClicked(riddle)}</strong> links and <strong>{score(riddle)}</strong> points!</h3>
      </div>
    );
  }
}
