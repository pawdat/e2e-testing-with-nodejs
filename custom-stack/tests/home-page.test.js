const { describe, it, after, before } = require('mocha');
const Page = require('../pages/home-page');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async () => {
  try {
    describe('Home page test suite', async function () {
      this.timeout(50000);
      let driver, page;

      before(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit('https://www.mackolik.com/?google_norender=true');
        await page.closeCookieAndLegacyBanners();
      });

      after(async () => {
        await page.quit();
      });

      it('should have proper headline text', async () => {
        const result = await page.getHeadlineText();
        expect(result).to.equal('Son Haberler');
      });

      it('should have top news widget displayed', async () => {
        const element = await page.getTopNewsWidget();
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed).to.equal(true);
      });

      it('should have proper news cards count displayed', async () => {
        const count = await page.getCardsCount();
        expect(count).to.equal(13);
      });

      it('should have proper primary news cards count displayed', async () => {
        const count = await page.getPrimaryCardsCount();
        expect(count).to.equal(1);
      });
    });
  } catch (ex) {
    console.log (new Error(ex.message));
  } finally {

  }
})();