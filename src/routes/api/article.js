import _ from 'lodash';
import express from 'express';
import cheerio from 'cheerio';

module.exports = wikipediaRoute;

function wikipediaRoute(cfg) {

  var wikiGoodGuy = cfg.goodGuy.reconfigure({
    postprocess: parseWikipediaResponse,
    timeout: 5000
  });

  var route = express();
  route.get('/:page', fetchArticleHandler);
  return route;

  // ==================================================

  function fetchArticleHandler(req, res, next) {
    fetchWikipediaContent(req.params.page).then(function(content) {
      res
        .status(200)
        .set({
          'content-type': 'text/html'
        })
        .send(content);
    }).catch(next);
  }

  function fetchWikipediaContent(pageId) {
    return getWikipediaHTML(pageId)
      .then(function(html) {
        var $ = cheerio.load(html);
        $ = cleanUpWikiContent($);
        return $.html($.root());
      });
  }

  function cleanUpWikiContent($) {
    // remove all non-paragraphs from the top level (various tables, notes, etc.)
    $.root().children(':not(p,ul)').remove();

    // remove all tags which we know we're not interested in
    const uninteresting = [
      ".reference",                        // no references needed
      ".error",                            // Wikipedia sometimes spits errors out, don't want those
      "img",                               // any leftover images are not really wanted
      ".metadata",                         // 'listen' links are often embedded in those
      "span#coordinates"                   // this is a special "geo" widget that uses a <p> wrapper
    ];
    uninteresting.forEach((selector) => $(selector).remove());

    // replace non-page links with just their text (external links, IPA links, Help: links, etc.)
    $('a').toArray().forEach((a) => {
      const $a = $(a), href = $a.attr('href');
      const needsReplacing = (!href.startsWith('/wiki')) || href.includes(':');
      if (needsReplacing) {
        // replace with an inert <span>, keep the text intact
        $(a).replaceWith($('<span>').text($a.text()));
      }
    });

    // tweak remaining page links to be 100% predictable
    $('a[href^="/wiki"]').toArray().forEach((a) => {
      const $a = $(a), href = $(a).attr('href');
      const newHref = href.replace('/wiki/', 'page://').replace(/#.*$/, '');
      $a.replaceWith($("<a>").attr('href', newHref).text($a.text()));
    });

    // remove anything that is empty after those operations
    // (repeatedly, since this might cause other tags to become empty)
    var $empty = $(':empty');
    while ($empty.length) {
      $empty.remove();
      $empty = $(':empty');
    }

    // done!
    return $;
  }

  function getWikipediaHTML(pageId) {
    return wikiGoodGuy(wikiRequestHtmlForPage(pageId))
      .then((json) => {
        if (!(json && json.parse && json.parse.text && json.parse.text['*'])) {
          throw new Error("Unable to parse Wikipedia response, no json.parse.text.* present.");
        }
        return json.parse.text['*'];
      });
  }

  function wikiRequestHtmlForPage(pageId) {
    return wikiApiRequest({
      action: 'parse',
      format: 'json',
      prop: 'text',
      page: pageId,
      section: 0,
      redirects: true,
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


