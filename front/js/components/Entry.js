import React, { Component } from 'react';

export default class Entry extends Component {
  render() {
    return (
      <div className="entry">
        <header>{this.props.entry.get('title')}</header>
        <div className="entry-body" dangerouslySetInnerHTML={this.entryHTML()}/>
      </div>
    );
  }

  entryHTML() {
    return {__html: this.props.entry.get('html')};
  }
}
