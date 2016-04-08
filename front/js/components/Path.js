import React, { Component } from 'react';

export default class Path extends Component {
  render() {
    const path = this.props.path;
    const pageLinks = path.map(page =>
      (<li><PathLink page={page} goBackTo={this.props.goBackTo}/></li>)
    );

    return (
      <ul className="path">{pageLinks}</ul>
    )
  }
}

class PathLink extends Component {
  render() {
    const page = this.props.page;

    return (
      <a href="backto://{page}" onClick={() => this.props.goBackTo(page)}>{page}</a>
    )
  }
}
