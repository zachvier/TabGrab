var browser = require('webextension-polyfill');

var extension = {
  getUrl: function(file) {
    return browser.runtime.getURL(file);
  }
}

module.exports = extension;
