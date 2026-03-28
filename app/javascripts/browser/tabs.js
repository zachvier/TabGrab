var browser = require('webextension-polyfill');

var tabs = {
  remove: function(tabId) {
    browser.tabs.remove(tabId).catch(() => {
      // Ignore error if tab is already closed
    });
  },

  create: function(url) {
    browser.tabs.create({ url: url }).catch((err) => {
        console.warn("Failed to create tab:", err);
    });
  },

  focus: function(tab) {
    var tabId    = tab.id,
        windowId = tab.windowId;

    browser.tabs.update(tabId, { active: true, highlighted: true })
      .catch(() => { /* Ignore if tab gone */ });

    browser.windows.update(windowId, { focused: true })
      .catch(() => { /* Ignore if window gone */ });
  },

  query: function(pattern, callback) {
    browser.tabs.query({ url: pattern }).then(callback);
  },

  executeScript: function(tabId, codeOrFunction, args) {
      if (typeof codeOrFunction === 'function') {
          if (browser.scripting) {
              // MV3 (Chrome, Firefox 120+)
              browser.scripting.executeScript({
                  target: { tabId: tabId },
                  func: codeOrFunction,
                  args: args || []
              }).catch((err) => {
                  // Tab might be closed or restricted
              });
          } else {
              // MV2 fallback (Firefox <120)
              var argStr = (args || []).map(function(a) { return JSON.stringify(a); }).join(',');
              var code = '(' + codeOrFunction.toString() + ')(' + argStr + ')';
              browser.tabs.executeScript(tabId, { code: code }).catch((err) => {
                  // Tab might be closed or restricted
              });
          }
      } else {
          console.warn("Passing code string to executeScript is deprecated in V3 migration.");
      }
  }

};

module.exports = tabs;
