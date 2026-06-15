var urlMatch = require('./url_match.js');

var browser = {

  tabs:       require('@browser/tabs.js'),
  pageAction: require('@browser/page_action.js'),
  i18n:       require('@browser/i18n.js'),
  storage:    require('@browser/storage.js'),
  extension:  require('@browser/extension.js'),
  navigationDedupeWindow: 1000,
  recentNavigations: {},

  addPageAction: async function(tabId) {
    var detectionMode = await this.storage.get('urlDetection'),
        iconState     = (detectionMode !== 'noUrls') ? 'enabled' : 'disabled';

    this.pageAction.show(tabId);
    this.pageAction.setIcon(iconState);
  },

  didNavigate: async function(navDetails) {
    if (!this.shouldHandleNavigation(navDetails)) {
      return;
    }

    var tabDetails       = { id: navDetails.tabId, url: navDetails.url },
        detectionMode    = await this.storage.get('urlDetection'),
        zdUrlMatches     = urlMatch.extractMatches(navDetails.url, detectionMode);

    if ((detectionMode !== 'noUrls') && zdUrlMatches) {
      tabDetails.routeDetails = zdUrlMatches;
      this.openRouteInZendesk(tabDetails);
    }
  },

  shouldHandleNavigation: function(navDetails) {
    if (!navDetails || navDetails.frameId !== 0 || !navDetails.url) {
      return false;
    }

    var now = Date.now(),
        key = navDetails.tabId + '|' + navDetails.url,
        lastHandledAt = this.recentNavigations[key];

    if (lastHandledAt && now - lastHandledAt < this.navigationDedupeWindow) {
      return false;
    }

    this.recentNavigations[key] = now;
    this.pruneRecentNavigations(now);

    return true;
  },

  pruneRecentNavigations: function(now) {
    for (var key in this.recentNavigations) {
      if (now - this.recentNavigations[key] > this.navigationDedupeWindow) {
        delete this.recentNavigations[key];
      }
    }
  },

  restoreState: async function() {
    var detectionMode = await this.storage.get('urlDetection'),
        iconState     = (detectionMode !== 'noUrls') ? 'enabled' : 'disabled';

    this.pageAction.setIcon(iconState);
  },

  didInstall: function(details) {
    var self = this;

    // Find any tabs where the agent interface is open
    self.tabs.query('*://*.zendesk.com/agent/*', function(openTabs) {
      openTabs.forEach(function(tab) {
        self.addPageAction(tab.id);
      });
    });

    // Check if the settings we expect exist and set them if not
    self.storage.sanitize();
  },

  openRouteInZendesk: function(tab) {
    var subdomain  = tab.routeDetails.subdomain,
        route      = tab.routeDetails.path,
        self       = this;

    self.tabs.query('*://' + subdomain + '.zendesk.com/agent/*', function(openTabs) {
      var lotusTab = null;

      for (var i = 0, len = openTabs.length; i < len; i++) {
        lotusTab = openTabs[i];

        if (lotusTab.id !== tab.id && urlMatch.extractMatches(lotusTab.url, 'allUrls')) {
          self.updateLotusRoute(lotusTab.id, route);
          self.tabs.focus(lotusTab);
          self.tabs.remove(tab.id);

          break;
        }
      }
    });
  },

  updateLotusRoute: function(lotusTabId, route) {
    if (!urlMatch.isSafeRoute(route)) {
      return;
    }

    var message = { "target": "route", "memo": { "hash": route } };
    
    // Updated for V3: Pass function and args
    this.tabs.executeScript(lotusTabId, function(msgJson) {
        window.postMessage(msgJson, window.location.origin);
    }, [JSON.stringify(message)]);
  }

};

module.exports = browser;
