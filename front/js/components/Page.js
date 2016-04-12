import $ from 'jquery';
import React, { Component } from 'react';
import {properTitle} from './helpers';
import {linkCostByPosition} from '../logic/selectors';

export default class Page extends Component {
  constructor() {
    super();
    this.handleClicks = this.handleClicks.bind(this);
  }

  componentDidUpdate() { this.updateBody(this.refs.body); }
  componentDidRender() { this.updateBody(this.refs.body); }

  updateBody(body) {
    const $body = $(body), active = this.props.active;
    $body.find('a[href^="page://"]').toArray().forEach((link, index) => {
      const $link = $(link);
      if (!active) {
        // this page is inactive - the game was already won, no further
        // links can be followed
        return $link.replaceWith(`<span>${$link.text()}</span>`);
      } else {
        let cost = linkCostByPosition(index);

        let pointCategory = Math.floor(index / 10) + 1;
        if (pointCategory > 10) pointCategory = 10;

        $link
          .addClass(`c${pointCategory}`)
          .attr('title', `-${cost} points`);
      }
    });
  }

  render() {
    const page = this.props.page;
    const title = page.get('title');

    return (
      <div className="page">
        <header className="page-title">{properTitle(title)}</header>
        <div className="page-body" ref='body' dangerouslySetInnerHTML={this.pageHTML(page)} onClick={this.handleClicks}/>
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
      const cost = parseInt($target.data('points'));
      this.props.goTo(targetPage, cost);
      return false;
    }
  }
}
