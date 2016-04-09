import React, { Component } from 'react';

import {currentPage, score} from '../logic/selectors';
import Path from './Path';
import Page from './Page';

export default class Riddle extends Component {
  render() {
    const riddle = this.props.riddle,
      path = riddle.get('path'),
      page = currentPage(riddle);

    return (
      <div className='riddle'>
        <RiddleStatus riddle={this.props.riddle}/>
        <Path path={path} goBackTo={this.props.goBackTo}/>
        {page ? <Page page={page} goTo={this.props.goTo}/> : null}
      </div>
    );
  }
}

class RiddleStatus extends Component {
  render() {
    const riddle = this.props.riddle,
      riddleScore = score(this.props.riddle);
    const {start, goal} = riddle.toJS();

    return (
      <div className='riddle-status'>
        <div className='goal'>Get from <b>{start}</b> to <b>{goal}</b> clicking as few links as possible!</div>
        <div className='score'>Score: <span class='score-value'>{riddleScore}</span></div>
      </div>
    );
  }
}
