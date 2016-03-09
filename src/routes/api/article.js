import _ from 'lodash';
import express from 'express';

module.exports = wikipediaRoute;

function wikipediaRoute(cfg) {

  var goodGuyJson = cfg.goodGuy.reconfigure({
    postprocess: parseWikipediaResponse,
    timeout: 5000
  });

  var route = express();
  route.get('/:title', fetchArticleHandler);
  return route;

  // ==================================================

  function fetchArticleHandler(req, res, next) {
    fetchWikipediaContent(req.params.title).then(function(content) {
      res
        .status(200)
        .set({
          'content-type': 'text/html'
        })
        .send(content);
    }).catch(next);
  }

  function fetchWikipediaContent(title) {
    return Promise.all([getIntroExtract(title), getLinksInText(title)])
      .then(([extract, links]) => {
        return mergeLinksIntoExtract(extract, links);
      });
  }

  function getIntroExtract(pageTitle) {
    return goodGuyJson(extractRequestForPage(pageTitle))
      .then((json) => {
        if (!(json && json.query && json.query.pages))
          throw new Error("Unable to parse Wikipedia API reponse - no json.query.pages");

        // we're expecting only one key under here, so we just take the first
        var jsonPages = json.query.pages;
        return jsonPages[_.keys(jsonPages)[0]].extract;
      });
  }

  function getLinksInText(pageTitle) {
    return goodGuyJson(wikiTextRequestForPage(pageTitle))
      .then((json) => {
        if (!(json && json.parse && json.parse.wikitext && json.parse.wikitext['*'])) {
          throw new Error("Unable to parse Wikipedia API response - no json.parse.wikitext.* field.");
        }
        var wikiText = json.parse.wikitext['*'];
        return parseInternalWikiLinks(wikiText);
      });
  }

  function mergeLinksIntoExtract(extract, links) {
    // sorting the links by length, descending makes sure longer link text takes priority
    links = _.sortBy(links, (l) => -l.linkText.length);

    // replace first occurence of each link text in the extract with an actual link
    links.forEach(({pageName, linkText}) => {
      extract = extract.replace(new RegExp("(\\s|>)" + linkText + "(\\s|<)"), `$1<a href="wikipage:${pageName}">${linkText}</a>$2`);
    });
    return extract;
  }

  function parseInternalWikiLinks(wikiText) {
    // captures [[Page name]] and [[Page name|Link text]] format links
    var WIKI_LINK_REGEX = /\[\[([^\]|]+)(\|(.+?))?\]\]/g;

    // .replace() is a hacky but easy way to iterate over all matches with groups
    // I wish regexes implemented .map() in ES6
    var links = [];
    wikiText.replace(WIKI_LINK_REGEX, (__, pageName, ___, linkText) => {
      // some links are internal Wiki details, and we ignore them
      if (linkShouldBeIncluded(pageName)) {
        links.push({pageName, linkText: linkText || pageName});
      }
    });
    return links;
  }

  function linkShouldBeIncluded(pageName) {
    if (pageName.includes(':')) return false;
    if (pageName.startsWith('List of ')) return false;
    if (pageName.startsWith('#')) return false;
    if (pageName.startsWith('.')) return false;

    return true;
  }

  function extractRequestForPage(pageTitle) {
    return wikiApiRequest({
      action: 'query',
      prop: 'extracts',
      format: 'json',
      exintro: 'true',
      redirects: 'true',
      titles: pageTitle
    });
  }

  function wikiTextRequestForPage(pageTitle) {
    return wikiApiRequest({
      page: pageTitle,
      action: 'parse',
      format: 'json',
      prop: 'wikitext',
      redirects: true,
      section: 0,
      disabletoc: true
    });
  }

  function parseWikipediaResponse(response) {
    var json = JSON.parse(response.body);
    if (json.error) {
      if (json.error.code == 'missingtitle') {
        throw _.extend(new Error(`No such page on Wikipedia.`), {status: 404});
      } else {
        throw new Error(`Wikipedia API returned an error: ${json.error.code} ${json.error.info}`);
      }
    }
    return json;
  }

  function wikiApiRequest(queryParams) {
    return {
      url: 'http://en.wikipedia.org/w/api.php',
      headers: { 'user-agent': 'Degrees-of-Wiki/0.1'},
      qs: queryParams
    };
  }
  
}


