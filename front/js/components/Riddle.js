import React, { Component } from 'react';

import {currentPage, score, linksClicked} from '../logic/selectors';
import {properTitle} from './helpers';
import Path from './Path';
import Page from './Page';

export default class Riddle extends Component {
  render() {
    const riddle = this.props.riddle,
      path = riddle.get('path'),
      page = currentPage(riddle);

    return (
      <div className='riddle'>
        <div className='riddle-bar'>
          <RiddleStatus riddle={this.props.riddle}/>
          <Path path={path} goBackTo={this.props.goBackTo}/>
        </div>
        {page ? <Page page={page} goTo={this.props.goTo}/> : null}
      </div>
    );
  }
}

class RiddleStatus extends Component {
  render() {
    const riddle = this.props.riddle,
      points = score(riddle),
      links = linksClicked(riddle);
    const {start, goal} = riddle.toJS();

    return (
      <div className='riddle-status'>
        <div className='goal'>
          Build a path from <strong>{properTitle(start)}</strong> to <strong>{properTitle(goal)}</strong>!
        </div>
        <div className='score'>
          <div>Score: <strong>{points}</strong></div>
          <div>Links: {links ? links : 'none yet'}</div>
        </div>
      </div>
    );
  }
}
