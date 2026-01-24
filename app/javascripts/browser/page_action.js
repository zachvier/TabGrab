var pageAction = {
  // In V3 'action' replaces 'page_action', and it's always 'shown' by default usually,
  // but we can still control icon per tab.
  show: function(tabId) {
    if (chrome.action) {
        // V3: No explicit 'show' needed usually for "action", 
        // but if we used declarativeContent it would be different.
        // For simple migration, we assume it's enabled.
    } else if (chrome.pageAction) {
        chrome.pageAction.show(tabId);
    }
  },

  setIcon: function(option) {
    var icon;
    if (option === 'enabled') {
        icon = 'images/icons/icon38-enabled.png';
    } else {
        icon = 'images/icons/icon38-' + option + '.png';
    }

    // For V3 action.setIcon
    var setIconAPI = chrome.action ? chrome.action.setIcon : (chrome.pageAction ? chrome.pageAction.setIcon : null);

    if (!setIconAPI) return;

    // Set the global icon (Manifest V3)
    // This changes the default icon for all tabs and new tabs
    try {
        setIconAPI({ path: icon }); 
    } catch (e) {
        // Fallback or ignore if running in a context where global set isn't allowed (rare)
    }

    // Also update existing matching tabs to ensure they reflect the change immediately
    chrome.tabs.query({ url: '*://*.zendesk.com/agent/*' }, function(openTabs) {
      openTabs.forEach(function(tab) {
        setIconAPI({ tabId: tab.id, path: icon });
      });
    });
  }
};

module.exports = pageAction;
