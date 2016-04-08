import $ from 'jquery';
import React, { Component } from 'react';

export default class Page extends Component {
  constructor() {
    super();
    this.handleClicks = this.handleClicks.bind(this);
  }

  render() {
    return (
      <div className="page">
        <header>{this.props.page.get('title')}</header>
        <div className="page-body" dangerouslySetInnerHTML={this.pageHTML()} onClick={this.handleClicks}/>
      </div>
    );
  }

  pageHTML() {
    return {__html: this.props.page.get('html')};
  }

  handleClicks(evt) {
    // Since this triggers whenever the text body is clicked, we want to see
    // if the original target was a link to another page
    const $target = $(evt.target);
    if ($target.is('a[href^="page://"]')) {
      // It was - we trigger a Redux action to replace the page with a new one
      const targetPage = $target.attr('href').replace('page://', '');
      this.props.loadPage(targetPage);

      return false;
    }
  }
}
