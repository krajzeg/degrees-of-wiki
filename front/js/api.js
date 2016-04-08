import $ from 'jquery';

export class Api {
  constructor(apiRoot) {
    if (apiRoot.endsWith('/'))
      apiRoot = apiRoot.substring(apiRoot.length-1);
    this.apiRoot = apiRoot;
  }

  loadPageHTML(pageTitle) {
    const url = `${this.apiRoot}/article/${pageTitle}`;
    return $.ajax(url, {contentType: 'text'});
  }
}
