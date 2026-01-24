var pageAction = {
  // In V3 'action' replaces 'page_action', and it's always 'shown' by default usually,
  // but we can still control icon per tab.
  show: function(tabId) {
    if (chrome.action) {
        // V3: No explicit 'show' needed usually for "action", 
    } else if (chrome.pageAction) {
        chrome.pageAction.show(tabId);
    }
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
        title = "QuickTab (Enabled)";
    } else {
        iconPath = {
            "16": "images/icons/icon16-disabled.png",
            "19": "images/icons/icon19-disabled.png",
            "32": "images/icons/icon32-disabled.png",
            "38": "images/icons/icon38-disabled.png",
            "48": "images/icons/icon38-disabled.png",
            "128": "images/icons/icon38-disabled.png"
        };
        badgeText = "OFF";
        badgeColor = "#999999";
        title = "QuickTab (Disabled)";
    }

    // For V3 action.setIcon
    var actionAPI = chrome.action || chrome.pageAction;
    if (!actionAPI) return;

    // Set global default state
    try {
        if (actionAPI.setIcon) actionAPI.setIcon({ path: iconPath });
        if (actionAPI.setBadgeText) actionAPI.setBadgeText({ text: badgeText });
        if (actionAPI.setBadgeBackgroundColor) actionAPI.setBadgeBackgroundColor({ color: badgeColor });
        if (actionAPI.setTitle) actionAPI.setTitle({ title: title });
    } catch (e) {}

    // Update ALL currently open tabs to reflect the new setting
    chrome.tabs.query({}, function(allTabs) {
      allTabs.forEach(function(tab) {
        try {
            if (actionAPI.setIcon) actionAPI.setIcon({ tabId: tab.id, path: iconPath });
            if (actionAPI.setBadgeText) actionAPI.setBadgeText({ tabId: tab.id, text: badgeText });
            if (actionAPI.setTitle) actionAPI.setTitle({ tabId: tab.id, title: title });
        } catch (e) {
            // Tab might be restricted (e.g. chrome://)
        }
      });
    });
  }
};

module.exports = pageAction;
