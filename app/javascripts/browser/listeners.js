var browser = require('../modules/browser.js');

// Adds page action to any /agent URLs
chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
  browser.addPageAction(details.tabId);
}, { url: [ { urlContains: 'zendesk.com/agent' } ] });

// Adds page action on initial installed or if the extension is reloaded
// or Chrome updates
chrome.runtime.onInstalled.addListener(function(details) {
  browser.didInstall(details);
});

// Restore icon state on browser startup
chrome.runtime.onStartup.addListener(function() {
  browser.restoreState();
});

// Listen for navigation events the moment they occur, for zendesk.com URLs
chrome.webNavigation.onBeforeNavigate.addListener(function(navDetails) {
  browser.didNavigate(navDetails);
}, { url: [ { hostSuffix: 'zendesk.com' } ] });

// Listen for navigation events that may not have been initiated by the user,
// e.g. safe redirects
chrome.webNavigation.onCommitted.addListener(function(navDetails) {
  browser.didNavigate(navDetails);
}, { url: [ { hostSuffix: 'zendesk.com' } ] });

// Sync icon state across tabs when settings change
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.urlDetection) {
    var newValue = changes.urlDetection.newValue;
    var iconState = (newValue !== 'noUrls') ? 'enabled' : 'disabled';
    browser.pageAction.setIcon(iconState);
  }
});
