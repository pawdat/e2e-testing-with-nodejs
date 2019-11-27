const Page = require('../lib/base-page');

const headlineSelector = '.page-homepage-index__section-headline';
const topNewsSelector = '.widget-article-top-news';
const topNewsCardSelector = `${topNewsSelector}__container-card`;
const topNewsPrimaryCardSelector = `${topNewsCardSelector}--primary`;

class HomePage extends Page {
  async getHeadlineText() {
    const element = await this.findBySelector(headlineSelector);
    const text = await element[0].getText();
    return text.trim();
  }

  async getTopNewsWidget() {
    const element = await this.findBySelector(topNewsSelector);
    return element[0];
  }

  async getCardsCount() {
    const elements = await this.findBySelector(topNewsCardSelector);
    return elements.length;
  }

  async getPrimaryCardsCount() {
    const elements = await this.findBySelector(topNewsPrimaryCardSelector);
    return elements.length;
  }
}

module.exports = HomePage;
