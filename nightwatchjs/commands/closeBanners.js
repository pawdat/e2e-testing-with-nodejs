const legacyBannerCloseSelector = '.widget-legacy-link-banner__accept';
const gpdrBannerCloseSelector = '.widget-gdpr-banner__accept';

module.exports.command = function() {
  this.click(legacyBannerCloseSelector)
    .acceptAlert()
    .click(gpdrBannerCloseSelector);
};
