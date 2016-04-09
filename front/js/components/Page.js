import $ from 'jquery';
import React, { Component } from 'react';

export default class Page extends Component {
  constructor() {
    super();
    this.handleClicks = this.handleClicks.bind(this);
  }

  render() {
    const page = this.props.page;
    return (
      <div className="page">
        <header>{page.get('title')}</header>
        <div className="page-body" dangerouslySetInnerHTML={this.pageHTML(page)} onClick={this.handleClicks}/>
      </div>
    );
  }

  pageHTML(page) {
    return {__html: page.get('html')};
  }

  handleClicks(evt) {
    // Since this triggers whenever the text body is clicked, we want to see
    // if the original target was a link to another page
    const $target = $(evt.target);
    if ($target.is('a[href^="page://"]')) {
      // It was - we trigger a Redux action to replace the page with a new one
      const targetPage = $target.attr('href').replace('page://', '');
      this.props.goTo(targetPage);
      return false;
    }
  }
}
