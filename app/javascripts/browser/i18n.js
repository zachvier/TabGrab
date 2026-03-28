var browser = require('webextension-polyfill');

var i18n = {
  getString: function(key) {
    return browser.i18n.getMessage(key) || "String not found: " + key;
  }
}

module.exports = i18n;
