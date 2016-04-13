import React, { Component } from 'react';

import {currentPage, score, linksClicked, won} from '../logic/selectors';
import {properTitle} from './helpers';
import Path from './Path';
import Page from './Page';
import Win from './Win';

export default class Riddle extends Component {
  render() {
    const riddle = this.props.riddle,
      path = riddle.get('path'),
      page = currentPage(riddle),
      riddleWon = won(riddle);

    return (
      <div className='riddle'>
        <div className='fixed-top'>
          <div>
            <div className='riddle-bar'>
              <RiddleStatus riddle={this.props.riddle}/>
              <Path path={path} won={riddleWon} goBackTo={this.props.goBackTo}/>
            </div>
          </div>
        </div>

        <div className='main-content'>
          {riddleWon && <Win riddle={this.props.riddle}/>}
          <Page page={page} active={!riddleWon} goTo={this.props.goTo}/>
        </div>
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
