var urlMatch = {

  ZENDESK_SUFFIX: '.zendesk.com',
  TICKET_BASE_PATHS: ['/agent/tickets', '/tickets', '/twickets', '/requests', '/hc/requests'],

  extractMatches: function(url, urlDetection) {
    var matches        = null,
        zendeskDetails = this._getZendeskDetails(url);

    if (!zendeskDetails || this._checkForRestrictedMatches(zendeskDetails)) {
      return matches;
    }

    var lotusUrlMatches  = this._getLotusUrlMatches(zendeskDetails),
        ticketUrlMatches = this._getTicketUrlMatches(zendeskDetails);

    if (ticketUrlMatches) {
      matches = ticketUrlMatches;
    } else if (lotusUrlMatches && (urlDetection === 'allUrls')) {
      matches = lotusUrlMatches;
    }

    return matches;
  },

  isSafeRoute: function(route) {
    return typeof route === 'string' &&
      route.charAt(0) === '/' &&
      route.indexOf('//') !== 0 &&
      !/^[a-z][a-z0-9+.-]*:/i.test(route) &&
      route.length <= 2048;
  },

  _getZendeskDetails: function(navUrl) {
    var parsedUrl;

    try {
      parsedUrl = new URL(navUrl);
    } catch (e) {
      return null;
    }

    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return null;
    }

    var hostname = parsedUrl.hostname.toLowerCase();
    if (!hostname.endsWith(this.ZENDESK_SUFFIX) || hostname === this.ZENDESK_SUFFIX.slice(1)) {
      return null;
    }

    var subdomain = hostname.slice(0, -this.ZENDESK_SUFFIX.length);
    if (!subdomain || subdomain.indexOf('..') !== -1) {
      return null;
    }

    return {
      parsedUrl: parsedUrl,
      subdomain: subdomain,
      pathname: parsedUrl.pathname,
      hash: parsedUrl.hash
    };
  },

  _getLotusUrlMatches: function(zendeskDetails) {
    var routeDetails = null,
        route        = this._getAgentRoute(zendeskDetails);

    if (route && this.isSafeRoute(route)) {
      routeDetails = {
        subdomain: zendeskDetails.subdomain,
        path: route
      };
    }

    return routeDetails;
  },

  _getTicketUrlMatches: function(zendeskDetails) {
    var routeDetails = null;

    for (var i = 0; i < this.TICKET_BASE_PATHS.length; i++) {
      var basePath = this.TICKET_BASE_PATHS[i],
          path     = zendeskDetails.pathname;

      if (path === basePath || path.indexOf(basePath + '/') === 0) {
        var ticketPath = path.slice(basePath.length).replace(/^\//, '');

        if (!ticketPath && zendeskDetails.hash) {
          ticketPath = zendeskDetails.hash.replace(/^#\/?/, '');
        }

        var route = '/tickets/' + ticketPath;
        if (this.isSafeRoute(route)) {
          routeDetails = {
            subdomain: zendeskDetails.subdomain,
            path: route
          };
        }

        break;
      }
    }

    return routeDetails;
  },

  _getAgentRoute: function(zendeskDetails) {
    var path = zendeskDetails.pathname;

    if (path !== '/agent' && path.indexOf('/agent/') !== 0) {
      return null;
    }

    var route = path.slice('/agent'.length).replace(/^\//, '');

    if (!route && zendeskDetails.hash) {
      route = zendeskDetails.hash.replace(/^#\/?/, '');
    }

    return '/' + route;
  },

  _checkForRestrictedMatches: function(zendeskDetails) {
    var agentRoute = this._getAgentRoute(zendeskDetails),
        path       = zendeskDetails.pathname;

    return /^\/?(chat|voice|talk|admin\/voice)(\/|$)/.test(agentRoute || '') ||
      /^\/tickets\/\d+\/print(\/|$)/.test(path) ||
      /^\/(agent\/)?tickets\/\d+\/comments\/\d+\/original_email(\/|$)/.test(path);
  }

};

module.exports = urlMatch;
