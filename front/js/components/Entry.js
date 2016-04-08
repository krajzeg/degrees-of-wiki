import $ from 'jquery';
import React, { Component } from 'react';

export default class Entry extends Component {
  render() {
    return (
      <div className="entry">
        <header>{this.props.entry.get('title')}</header>
        <div className="entry-body" dangerouslySetInnerHTML={this.entryHTML()} onClick={this.click.bind(this)}/>
      </div>
    );
  }

  entryHTML() {
    return {__html: this.props.entry.get('html')};
  }

  click(evt) {
    // Since this triggers whenever the text body is clicked, we want to see
    // if the original target was a link to another page
    const $target = $(evt.target);
    console.log(this);
    if ($target.is('a[href^="page://"]')) {
      // It was - we trigger a Redux action to replace the entry with a new one
      const targetPage = $target.attr('href').replace('page://', '');
      this.props.replaceEntry(targetPage);
      this.props.loadEntry(targetPage);

      return false;
    }
  }
}
