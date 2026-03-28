var browser = require('./browser.js');
var Handlebars = require('handlebars/runtime');

// Require templates directly so webpack can bundle them
var popupTemplate = require('../../templates/popup.handlebars');

var templates = {
  _templates: {
    'popup': popupTemplate
  },

  init: function() {
    this._registerHandlebarsHelpers();
  },

  render: function(templateName, context) {
    if (this._templates[templateName]) {
        return this._templates[templateName](context);
    }
    console.error("Template not found:", templateName);
    return "";
  },

  show: function(templateName, context, element) {
    var output = this.render(templateName, context);
    if (element) {
        element.id = templateName;
        var doc = new DOMParser().parseFromString(output, 'text/html');
        while (element.firstChild) element.removeChild(element.firstChild);
        while (doc.body.firstChild) element.appendChild(doc.body.firstChild);
    }
  },

  _registerHandlebarsHelpers: function() {
    // i18n Helper
    Handlebars.registerHelper('t', function(text) {
      return new Handlebars.SafeString(
        browser.i18n.getString(text) || "String not found: " + text
      );
    });

    // ifSettingEnabled Helper
    Handlebars.registerHelper('enabledSetting', function(currentValue, expectedValue) {
      var settingEnabled = '';

      if (currentValue == expectedValue) {
        settingEnabled = 'enabled';
      }

      return settingEnabled;
    });
  }
};

templates.init();

module.exports = templates;
