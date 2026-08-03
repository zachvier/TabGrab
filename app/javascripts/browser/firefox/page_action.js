var browser = require('webextension-polyfill');

var pageAction = {
  show: function(tabId) {
    // In MV3, action is always shown by default.
    // In MV2 Firefox, browserAction is also always shown.
    // No explicit show needed.
  },

  setIcon: function(option) {
    var iconPath, badgeText, badgeColor, title;
    if (option === 'enabled') {
        iconPath = {
            "16": "images/icons/icon16.png",
            "19": "images/icons/icon19.png",
            "32": "images/icons/icon32.png",
            "38": "images/icons/icon38-enabled.png",
            "48": "images/icons/icon48.png",
            "128": "images/icons/icon128.png"
        };
        badgeText = "";
        badgeColor = "#4688F1";
        title = "Zendesk TabGrab (Enabled)";
    } else {
        iconPath = {
            "16": "images/icons/icon16-disabled.png",
            "19": "images/icons/icon19-disabled.png",
            "32": "images/icons/icon32-disabled.png",
            "38": "images/icons/icon38-disabled.png",
            "48": "images/icons/icon48-disabled.png",
            "128": "images/icons/icon128-disabled.png"
        };
        badgeText = "OFF";
        badgeColor = "#999999";
        title = "Zendesk TabGrab (Disabled)";
    }

    var actionAPI = browser.action || browser.browserAction;
    if (!actionAPI) return;

    // Set global default state
    try {
        if (actionAPI.setIcon) actionAPI.setIcon({ path: iconPath });
        if (actionAPI.setBadgeText) actionAPI.setBadgeText({ text: badgeText });
        if (actionAPI.setBadgeBackgroundColor) actionAPI.setBadgeBackgroundColor({ color: badgeColor });
        if (actionAPI.setTitle) actionAPI.setTitle({ title: title });
    } catch (e) {}

  }
};

module.exports = pageAction;
