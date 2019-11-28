const { describe, it, after, before } = require('mocha');
const puppeteer = require('puppeteer');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

const legacyBannerCloseSelector = '.widget-legacy-link-banner__accept';
const gpdrBannerCloseSelector = '.widget-gdpr-banner__accept';

const headlineSelector = '.page-homepage-index__section-headline';
const topNewsSelector = '.widget-article-top-news';
const topNewsCardSelector = `${topNewsSelector}__container-card`;
const topNewsPrimaryCardSelector = `${topNewsCardSelector}--primary`;

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async () => {
  try {
    describe('Home page test suite', async function () {
      this.timeout(50000);
      let browser, page;

      before(async () => {
        browser = await puppeteer.launch({
          headless: false,
        });
        page = await browser.newPage();
        page.on('dialog', async (dialog) => {
          await dialog.dismiss();
        });
        await page.goto('https://www.mackolik.com/?google_norender=true');

        (await page.$(legacyBannerCloseSelector)).click();
        (await page.$(gpdrBannerCloseSelector)).click();
      });

      after(async () => {
        await browser.close();
      });

      it('should have proper headline text', async () => {
        const headlineElement = await page.$(headlineSelector);
        const text = await page.evaluate(element => element.innerText.trim(), headlineElement);
        expect(text).to.equal('Son Haberler');
      });

      it('should have top news widget displayed', async () => {
        let element = null;
        try {
          element = await page.waitForSelector(topNewsSelector, {
            visible: true,
          });
        } catch (error) {}

        expect(element).to.not.equal(null);
      });

      it('should have proper news cards count displayed', async () => {
        const count = (await page.$$(topNewsCardSelector)).length;
        expect(count).to.equal(13);
      });

      it('should have proper primary news cards count displayed', async () => {
        const count = (await page.$$(topNewsPrimaryCardSelector)).length;
        expect(count).to.equal(1);
      });
    });
  } catch (ex) {
    console.log (new Error(ex.message));
  } finally {

  }
})();