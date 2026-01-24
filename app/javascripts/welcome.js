require('../stylesheets/welcome.scss');
var templates = require('./modules/templates.js');

document.addEventListener('DOMContentLoaded', function() {
  templates.show('welcome', null, document.body);
});