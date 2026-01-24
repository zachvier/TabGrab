var tabs = {
  remove: function(tabId) {
    chrome.tabs.remove(tabId).catch(() => {
      // Ignore error if tab is already closed
    });
  },

  create: function(url) {
    chrome.tabs.create({ url: url }).catch((err) => {
        console.warn("Failed to create tab:", err);
    });
  },

  focus: function(tab) {
    var tabId    = tab.id,
        windowId = tab.windowId;

    chrome.tabs.update(tabId, { active: true, highlighted: true })
      .catch(() => { /* Ignore if tab gone */ });
      
    chrome.windows.update(windowId, { focused: true })
      .catch(() => { /* Ignore if window gone */ });
  },

  query: function(pattern, callback) {
    chrome.tabs.query({ url: pattern }, callback);
  },

  // Updated for V3
  executeScript: function(tabId, codeOrFunction, args) {
      if (typeof codeOrFunction === 'function') {
           chrome.scripting.executeScript({
              target: { tabId: tabId },
              func: codeOrFunction,
              args: args || []
           }).catch((err) => {
               // Tab might be closed or restricted
               // console.debug("ExecuteScript failed:", err);
           });
      } else {
          // Fallback for passing string code - V3 doesn't support 'code' string easily without userGesture
          // We will wrap it in a function if possible or assume the caller has updated.
          // For this project, I will update the caller (browser.js) to pass a function/args.
          console.warn("Passing code string to executeScript is deprecated in V3 migration.");
      }
  }

};

module.exports = tabs;