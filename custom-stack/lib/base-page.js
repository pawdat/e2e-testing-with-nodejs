const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const legacyBannerCloseSelector = '.widget-legacy-link-banner__accept';
const gpdrBannerCloseSelector = '.widget-gdpr-banner__accept';

class Page {
  constructor() {
    let o = new chrome.Options();
    o.addArguments('disable-infobars');
    // o.addArguments('headless'); // running test on visual chrome browser
    o.setUserPreferences({ credential_enable_service: false });

    this.driver = new Builder()
      .setChromeOptions(o)
      .forBrowser('chrome')
      .build();
  }

  /**
   * Visit url
   * @param {string} url
   * @return {Promise<void>}
   */
  async visit(url) {
    return await this.driver.get(url);
  }

  async closeCookieAndLegacyBanners() {
    const buttons = await this.findBySelector([
      legacyBannerCloseSelector,
      gpdrBannerCloseSelector,
    ].join(','));

    buttons.forEach((button) => {
      button.click();
    });
  }

  /**
   * Quit browser
   * @return {Promise<void>}
   */
  async quit() {
    return await this.driver.quit();
  }

  /**
   * Find element by id
   * @param {string} id
   * @return {Promise<WebElementPromise>}
   */
  async findById(id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  }

  /**
   * Find element by class name
   * @param {string} className
   * @return {Promise<WebElement[]>}
   */
  async findByClass(className) {
    await this.driver.wait(
      until.elementLocated(By.className(className)),
      15000,
      'Looking for element'
    );
    return await this.driver.findElements(By.className(className));
  }

  /**
   * Find element by selector
   * @param {string} selector
   * @return {Promise<WebElement[]>}
   */
  async findBySelector(selector) {
    await this.driver.wait(
      until.elementLocated(By.css(selector)),
      15000,
      'Looking for element'
    );
    return await this.driver.findElements(By.css(selector));
  }
}

module.exports = Page;