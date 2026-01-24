var storage = {
  get: function(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get([key], function(result) {
            resolve(result[key]);
        });
    });
  },

  set: function(key, value) {
    return new Promise((resolve) => {
        if (value) {
            var obj = {};
            obj[key] = value;
            chrome.storage.local.set(obj, resolve);
        } else {
            chrome.storage.local.remove(key, resolve);
        }
    });
  },

  drop: function() {
    return new Promise((resolve) => {
        chrome.storage.local.clear(resolve);
    });
  },

  sanitize: async function() {
    var val = await this.get('urlDetection');
    if (!val) {
      await this.set('urlDetection', 'allUrls');
    }
  }
};

module.exports = storage;