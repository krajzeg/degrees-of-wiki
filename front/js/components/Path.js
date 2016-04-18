import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {properTitle} from './helpers';

export default class Path extends Component {
  render() {
    const path = this.props.path;
    let pageLinks = path.get('pages').toArray().map(page => (
      <li key={`page:${page}`}>
        <PathLink page={page} goBackTo={this.props.goBackTo}/>
      </li>
    ));
    if (!this.props.won) {
      pageLinks.push((<span key='final'>...?</span>));
    }

    pageLinks = insertSeparator(pageLinks, (i) => (
      <li key={`sep:${i}`}>→</li>
    ));

    return (
      <ReactCSSTransitionGroup component="ul" className="path"
        transitionName='a-expand' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        {pageLinks}
      </ReactCSSTransitionGroup>
    );
  }
}

class PathLink extends Component {
  render() {
    const page = this.props.page;
    return (
      <a className="path-link" href={`page://${page}`} onClick={() => this.props.goBackTo(page)}>{properTitle(page)}</a>
    )
  }
}

function insertSeparator(list, separatorFn) {
  if (list.length <= 1) return list;
  const butLast = _.dropRight(list, 1), last = _.last(list);
  return _.flatten(_.map(butLast, (e, index) => [e, separatorFn(index)])).concat([last]);
}
