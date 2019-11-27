const assert = require('assert');
const url = 'https://www.mackolik.com/?google_norender=true';
const headlineSelector = '.page-homepage-index__section-headline';
const topNewsSelector = '.widget-article-top-news';
const topNewsCardSelector = `${topNewsSelector}__container-card`;
const topNewsPrimaryCardSelector = `${topNewsCardSelector}--primary`;

describe('home page', () => {
  it('should have proper headline text', () => {
    browser.url(url);
    const headlineElement = $(headlineSelector);
    assert.strictEqual(headlineElement.getText().trim(), 'Son Haberler');
  });

  it('should have top news widget displayed', () => {
    browser.url(url);
    const widget = $(topNewsSelector);
    assert.strictEqual(widget.isDisplayed(), true);
  });

  it('should have proper news cards count displayed', () => {
    browser.url(url);
    const newsCards = $$(topNewsCardSelector);
    assert.strictEqual(newsCards.length, 13);
  });

  it('should have proper primary news cards count displayed', async () => {
    browser.url(url);
    const newsCard = $$(topNewsPrimaryCardSelector);
    assert.strictEqual(newsCard.length, 1);
  });
});
