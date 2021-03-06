import $ from 'jquery';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

        let pointCategory = Math.ceil((cost+1) / 20) * 20;
        let categoryName = (pointCategory <= 100) ? `up-to-${pointCategory}` : 'more-than-100';

        $link
          .addClass(categoryName)
          .attr('title', `-${cost} points`);
      }
    });
  }

  render() {
    const page = this.props.page;
    const title = page.get('title');

    return (
      <ReactCSSTransitionGroup component="div" className="page"
        transitionName="a-fade" transitionEnterTimeout={300} transitionLeave={false}>
        <header key={title} className="page-title">{properTitle(title)}</header>
        {page.get('html') && <div className="page-body" key="contents" ref='body' dangerouslySetInnerHTML={this.pageHTML(page)} onClick={this.handleClicks}/>}
      </ReactCSSTransitionGroup>
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
