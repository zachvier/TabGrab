var browser = require('webextension-polyfill');

var storage = {
  get: function(key) {
    return browser.storage.local.get(key).then(function(result) {
      return result[key];
    });
  },

  set: function(key, value) {
    if (value) {
      var obj = {};
      obj[key] = value;
      return browser.storage.local.set(obj);
    } else {
      return browser.storage.local.remove(key);
    }
  },

  drop: function() {
    return browser.storage.local.clear();
  },

  sanitize: async function() {
    var val = await this.get('urlDetection');
    if (!val) {
      await this.set('urlDetection', 'allUrls');
    }
  }
};

module.exports = storage;
