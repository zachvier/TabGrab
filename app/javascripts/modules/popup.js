require('../../stylesheets/popup.scss'); // Import CSS for webpack
var templates = require('./templates.js'),
    browser   = require('./browser.js');

var popup = {

  init: async function() {
    var self         = this,
        disabledFor  = await browser.storage.get('disabledFor'),
        urlDetection = await browser.storage.get('urlDetection') || 'allUrls';

    templates.show('popup', {
      disabledDuration: disabledFor,
      currentUrlDetection: urlDetection
    }, document.body);

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


  },

  setUrlDetection: function(option) {
    var self = this;

    browser.storage.set('urlDetection', option);

    // Update UI immediately
    var allLinks = document.querySelectorAll("#settings-url-types a");
    allLinks.forEach(function(link) {
        if (link.getAttribute('data-url-type') === option) {
            link.classList.add('enabled');
        } else {
            link.classList.remove('enabled');
        }
    });

    switch(option) {
      case 'allUrls':
      case 'ticketUrls':
        self.enable();
        break;
      case 'noUrls':
        self.disable();
    }
  },

  disable: function(disableFor) {
    browser.pageAction.setIcon('disabled');
    setTimeout(() => { this.closePopup(); }, 150); // Small delay to show selection
  },

  enable: function() {
    browser.pageAction.setIcon('enabled');
    setTimeout(() => { this.closePopup(); }, 150); // Small delay to show selection
  },

  closePopup: function() {
    window.close();
  }
};

module.exports = popup;