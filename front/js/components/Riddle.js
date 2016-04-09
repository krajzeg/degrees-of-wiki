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
        {page ? <Page page={page} loadPage={this.props.loadPage} goTo={this.props.goTo}/> : null}
      </div>
    );
  }
}

class RiddleStatus extends Component {
  render() {
    const riddle = this.props.riddle,
      riddleScore = score(this.props.riddle);

    return (
      <div className='riddle-status'>
        Score: <b>{riddleScore}</b>
      </div>
    );
  }
}
