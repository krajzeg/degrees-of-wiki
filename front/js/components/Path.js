import React, { Component } from 'react';
import {properTitle} from './helpers';

export default class Path extends Component {
  render() {
    const path = this.props.path;
    let pageLinks = path.get('pages').toArray().map(page =>
      (<li><PathLink page={page} goBackTo={this.props.goBackTo}/></li>)
    );
    pageLinks.push((<span>...?</span>));
    pageLinks = insertSeparator(pageLinks, (<li>→</li>))

    return (
      <ul className="path">{pageLinks}</ul>
    )
  }
}

class PathLink extends Component {
  render() {
    const page = this.props.page;

    return (
      <a className="path-link" href="page://{page}" onClick={() => this.props.goBackTo(page)}>{properTitle(page)}</a>
    )
  }
}

function insertSeparator(list, separator) {
  if (list.length <= 1) return list;
  const butLast = _.dropRight(list, 1), last = _.last(list);
  return _.flatten(_.map(butLast, (e) => [e, separator])).concat([last]);
}
