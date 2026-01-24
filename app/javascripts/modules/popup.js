require('../../stylesheets/popup.scss'); // Import CSS for webpack
var templates = require('./templates.js'),
    browser   = require('./browser.js');

var popup = {

  init: function() {
    var self         = this,
        disabledFor  = browser.storage.get('disabledFor');

    templates.show('popup', { disabledDuration: disabledFor }, document.body);
    this.bindings();
  },

  bindings: function() {
    var self = this;

    // Blur links on click (aesthetic)
    var links = document.querySelectorAll("a");
    links.forEach(function(link) {
        link.blur();
    });

    // URL Type Settings
    var settingsLinks = document.querySelectorAll("#settings-url-types a");
    settingsLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Unsure if needed, original didn't have it but jQuery might handle it
            var urlType = this.getAttribute('data-url-type');
            self.setUrlDetection(urlType);
        });
    });

    // Help/Welcome Link
    var welcomeLink = document.getElementById("settings-help-welcome");
    if (welcomeLink) {
        welcomeLink.addEventListener("click", function() {
            browser.openWelcome();
        });
    }
  },

  disable: function(disableFor) {
    browser.pageAction.setIcon('disabled');
    this.closePopup();
  },

  enable: function() {
    browser.pageAction.setIcon('enabled');
    this.closePopup();
  },

  setUrlDetection: function(option) {
    var self = this;

    browser.storage.set('urlDetection', option);

    switch(option) {
      case 'allUrls':
      case 'ticketUrls':
        self.enable();
        break;
      case 'noUrls':
        self.disable();
    }
  },

  closePopup: function() {
    window.close();
  }
};

module.exports = popup;