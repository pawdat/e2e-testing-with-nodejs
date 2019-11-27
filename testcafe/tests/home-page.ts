import { Selector } from 'testcafe';

const legacyBannerCloseSelector = '.widget-legacy-link-banner__accept';
const gpdrBannerCloseSelector = '.widget-gdpr-banner__accept';

const headlineSelector = '.page-homepage-index__section-headline';
const topNewsSelector = '.widget-article-top-news';
const topNewsCardSelector = `${topNewsSelector}__container-card`;
const topNewsPrimaryCardSelector = `${topNewsCardSelector}--primary`;

fixture`Mackolick home page test suite`
  .beforeEach(async t => {
    await t
      .setNativeDialogHandler(() => true)
      .click(legacyBannerCloseSelector);
    await t.click(gpdrBannerCloseSelector);
  })
  .page`https://www.mackolik.com/?google_norender=true`;

test('find and check headline text', async t => {
  const header = await Selector(headlineSelector);

  await t.expect(header.innerText).eql('Son Haberler');
});

test('find and check visibility of top news widget', async t => {
  const widget = await Selector(topNewsSelector);

  await t.expect(widget.visible).eql(true);
});

test('find and check count of news cards', async t => {
  const newsCards = await Selector(topNewsCardSelector);

  await t.expect(newsCards.count).eql(13);
});

test('find and check count of primary news cards', async t => {
  const primaryCard = await Selector(topNewsPrimaryCardSelector);

  await t.expect(primaryCard.count).eql(1);
});