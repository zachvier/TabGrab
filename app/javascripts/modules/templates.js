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
        element.innerHTML = output;
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
    Handlebars.registerHelper('enabledSetting', function(settingName, expectedSettingValue) {
      var settingEnabled = '',
          settingValue   = browser.storage.get(settingName);

      if (expectedSettingValue == settingValue) {
        settingEnabled = 'enabled';
      }

      return settingEnabled;
    });
  }
};

templates.init();

module.exports = templates;
