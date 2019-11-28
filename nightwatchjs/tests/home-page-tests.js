const url = 'https://www.mackolik.com/?google_norender=true';
const headlineSelector = '.page-homepage-index__section-headline';
const topNewsSelector = '.widget-article-top-news';
const topNewsCardSelector = `${topNewsSelector}__container-card`;
const topNewsPrimaryCardSelector = `${topNewsCardSelector}--primary`;

module.exports = {
  'find and check headline text': (browser) => {
    browser
      .url(url)
      .closeBanners()
      .assert.containsText(headlineSelector, 'Son Haberler')
      .end();
  },
  'find and check top news widget': (browser) => {
    browser.url(url).closeBanners();
    browser.expect.element(topNewsSelector).to.be.visible;
    // browser.expect.elements(topNewsCardSelector).count.to.equal(13);
    // browser.expect.elements(topNewsPrimaryCardSelector).count.to.equal(1);
    browser.end();
  },
  'find and check visibility of top news widget': (browser) => {
    browser.url(url).closeBanners();
    browser.expect.element(topNewsSelector).to.be.visible;
    browser.end();
  },
  'find and check count of news cards': (browser) => {
    browser.url(url).closeBanners();
    browser.expect.elements(topNewsCardSelector).count.to.equal(13);
    browser.end();
  },
  'find and check count of primary news cards': (browser) => {
    browser.url(url).closeBanners();
    browser.expect.elements(topNewsPrimaryCardSelector).count.to.equal(1);
    browser.end();
  },
};
